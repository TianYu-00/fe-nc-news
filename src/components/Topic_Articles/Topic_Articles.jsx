import React, { useState, useEffect, useContext } from "react";
import { fetchArticles, fetchTopics, fetchUsers } from "../../api";
import { useSearchParams } from "react-router-dom";

// MUI
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import Avatar from "@mui/material/Avatar";

export default function Topic_Articles() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [articles, setAllArticles] = useState([]);
  const [isArticleLoading, setIsArticleLoading] = useState(true);
  const [allTopics, setAllTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("none");
  const [articlesShowing, setArticlesShowing] = useState([]);
  const [selectedSortBy, setSelectedSortBy] = useState("");
  const [selectedSortByOrder, setSelectedSortByOrder] = useState("DESC");
  const [currentPage, setCurrentPage] = useState(1);
  const maxArticlesPerPage = 5;
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const topicFromUrl = searchParams.get("topic") || "none";
    const sortByFromUrl = searchParams.get("sort_by") || "";
    const sortByOrderFromUrl = searchParams.get("order") || "DESC";
    const pageFromUrl = parseInt(searchParams.get("page")) || 1;

    setSelectedTopic(topicFromUrl);
    setSelectedSortBy(sortByFromUrl);
    setSelectedSortByOrder(sortByOrderFromUrl);
    setCurrentPage(pageFromUrl);

    Promise.all([fetchTopics(), fetchUsers()])
      .then(([topics, users]) => {
        setAllTopics(topics);
        setAllUsers(users);
        return fetchArticles(sortByFromUrl, sortByOrderFromUrl);
      })
      .then((articles) => {
        setAllArticles(articles);
        applyFilters(articles, topicFromUrl, pageFromUrl);
        setIsArticleLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsArticleLoading(false);
      });
  }, []);

  useEffect(() => {
    if (isArticleLoading) return;

    fetchArticles(selectedSortBy, selectedSortByOrder)
      .then((articles) => {
        setAllArticles(articles);
        applyFilters(articles, selectedTopic, currentPage);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
      });
  }, [selectedSortBy, selectedSortByOrder]);

  function applyFilters(articles, selectedTopic, page) {
    let filteredArticles = articles;
    if (selectedTopic !== "none") {
      filteredArticles = articles.filter((article) => article.topic === selectedTopic);
    }
    setTotalPageCount(Math.ceil(filteredArticles.length / maxArticlesPerPage));
    const startIndex = (page - 1) * maxArticlesPerPage;
    const endIndex = startIndex + maxArticlesPerPage;
    setArticlesShowing(filteredArticles.slice(startIndex, endIndex));
  }

  function onChangeHandle_pageChange(event, value) {
    setCurrentPage(value);
    applyFilters(articles, selectedTopic, value);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", value);
    setSearchParams(newSearchParams);
  }

  function onChangeHandle_topicChange(event) {
    const newTopic = event.target.value;
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("topic", newTopic);
    newSearchParams.set("page", 1);
    setSearchParams(newSearchParams);
    setSelectedTopic(newTopic);
    setCurrentPage(1);
    applyFilters(articles, newTopic, 1);
  }

  function onChangeHandle_sortByChange(event) {
    const newSortBy = event.target.value;
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("sort_by", newSortBy);
    newSearchParams.set("page", 1);
    setSearchParams(newSearchParams);
    setSelectedSortBy(newSortBy);
    setCurrentPage(1);
  }

  function onClickHandle_sortByOrderChange(order) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("order", order);
    newSearchParams.set("page", 1);
    setSearchParams(newSearchParams);
    setSelectedSortByOrder(order);
    setCurrentPage(1);
  }

  if (isArticleLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "83vh",
          backgroundColor: (theme) => theme.palette.background.container,
        }}
      >
        <Stack
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
          <Typography variant="h3">Getting data from server...</Typography>
        </Stack>
      </Box>
    );
  }

  return (
    <div>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: (theme) => theme.palette.background.container,
        }}
      >
        <Box
          sx={{
            maxWidth: "800px",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto",
          }}
        >
          <Typography variant="h4" sx={{ marginBottom: "20px" }}>
            ARTICLES
          </Typography>
          {/* Select */}
          <Box sx={{ minWidth: 120, marginBottom: "20px", padding: "10px" }}>
            {/* Main container */}
            <Grid container spacing={2} wrap="nowrap">
              <Grid xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="id_select_topic">Topics</InputLabel>
                  <Select
                    labelId="id_select_topic"
                    id="topic-select"
                    label="Topics"
                    value={selectedTopic}
                    onChange={onChangeHandle_topicChange}
                  >
                    <MenuItem value="none">None</MenuItem>
                    {allTopics.map((topic) => (
                      <MenuItem key={topic.slug} value={topic.slug}>
                        {topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid xs>
                <Grid container spacing={0} alignItems="center">
                  <Grid xs>
                    <FormControl fullWidth>
                      <InputLabel id="id_select_sortBy">Sort By</InputLabel>
                      <Select
                        labelId="id_select_sortBy"
                        id="sortBy-select"
                        label="Sort By"
                        value={selectedSortBy}
                        onChange={onChangeHandle_sortByChange}
                      >
                        {/* Allowed SortBy["", "created_at", "title", "votes", "author", "comment_count"] */}
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="created_at">Date</MenuItem>
                        <MenuItem value="title">Title</MenuItem>
                        <MenuItem value="votes">Votes</MenuItem>
                        <MenuItem value="author">Author</MenuItem>
                        <MenuItem value="comment_count">Comment Count</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid>
                    <ButtonGroup orientation="vertical" aria-label="Vertical button group">
                      <Button
                        key="asc"
                        size="small"
                        onClick={() => {
                          onClickHandle_sortByOrderChange("ASC");
                        }}
                      >
                        ↑
                      </Button>
                      <Button
                        key="desc"
                        size="small"
                        onClick={() => {
                          onClickHandle_sortByOrderChange("DESC");
                        }}
                      >
                        ↓
                      </Button>
                    </ButtonGroup>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>

          {/* Articles Below */}
          <Box sx={{ minWidth: 120, width: "100%" }}>
            <Stack spacing={2} sx={{ justifyContent: "center", alignItems: "center", margin: "0 auto" }}>
              {articlesShowing.map((article, index) => {
                let articleDate = new Date(article.created_at).toLocaleDateString("en-UK");
                // get avatar url
                const avatarImgURL = allUsers.reduce((tempURL, user) => {
                  if (user.username === article.author) {
                    tempURL = user.avatar_url;
                  }
                  return tempURL;
                }, "");
                return (
                  <React.Fragment key={index}>
                    <Link to={`/article/${article.article_id}`} style={{ textDecoration: "none" }}>
                      <Item
                        sx={{
                          maxWidth: "750px",
                          borderRadius: "10px",
                          margin: "auto 5px",
                          transition: "transform 0.3s ease-in-out",
                          "&:hover": {
                            transform: "scale(1.02)",
                          },
                          backgroundColor: (theme) => theme.palette.background.default,
                        }}
                      >
                        <Grid container>
                          <Grid xs={12} sm={6}>
                            <img
                              src={article.article_img_url}
                              alt={"image alt " + article.title}
                              style={{ width: "100%", objectFit: "cover", borderRadius: "10px" }}
                              loading="lazy"
                            />
                          </Grid>

                          {/* Right side item grid */}
                          <Grid
                            xs={12}
                            sm={6}
                            sx={{
                              paddingLeft: "20px",
                              paddingRight: "10px",
                            }}
                          >
                            <Grid
                              xs={8}
                              sx={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                              }}
                            >
                              <Typography variant="h5" color="text.primary" sx={{ textAlign: "left" }}>
                                {article.title}
                              </Typography>
                              <Grid
                                container
                                sx={{
                                  justifyContent: "left",
                                  alignItems: "flex-end",
                                  margin: "20px 0",
                                }}
                              >
                                <Avatar
                                  alt={"avatar image of " + article.author}
                                  src={avatarImgURL}
                                  sx={{ width: 45, height: 45, border: "1px solid black" }}
                                />
                                <Stack>
                                  <Typography variant="body1" sx={{ paddingLeft: "10px", fontWeight: "bold" }}>
                                    by {article.author}
                                  </Typography>
                                  <Typography variant="body1">{articleDate}</Typography>
                                </Stack>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid>
                          <Typography variant="body1" sx={{ textWrap: "nowrap" }}>
                            Votes: {article.votes} | Comments: {article.comment_count}
                          </Typography>
                        </Grid>
                      </Item>
                    </Link>
                  </React.Fragment>
                );
              })}
            </Stack>
          </Box>

          {/* Pagination */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
              paddingBottom: "20px",
            }}
          >
            <Pagination
              count={totalPageCount}
              page={currentPage}
              variant="outlined"
              onChange={onChangeHandle_pageChange}
              color="primary"
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));
