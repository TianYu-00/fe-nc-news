import React, { useState, useEffect } from "react";
import { fetchArticles, fetchTopics } from "../../api";
import { useSearchParams } from "react-router-dom";

//MUI
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

export default function Topic_Articles() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [articles, setAllArticles] = useState([]);
  const [isArticleLoading, setIsArticleLoading] = useState(false);
  const [allTopics, setAllTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("none");
  const [articlesShowing, setArticlesShowing] = useState([]);
  const [selectedSortBy, setSelectedSortBy] = useState("");
  const [selectedSortByOrder, setSelectedSortByOrder] = useState("DESC");
  // Allowed SortBy["", "created_at", "title", "votes", "author", "comment_count"]

  useEffect(() => {
    // Check url once
    const topicFromUrl = searchParams.get("topic") || "none";
    setSelectedTopic(topicFromUrl);
    const sortByFromUrl = searchParams.get("sort_by") || "";
    setSelectedSortBy(sortByFromUrl);
    const sortByOrderFromUrl = searchParams.get("order") || "DESC";
    setSelectedSortByOrder(sortByOrderFromUrl);
    // Fetch topics once
    fetchTopics().then((topics) => {
      setAllTopics(topics);
    });
  }, []);

  useEffect(() => {
    if (!isArticleLoading) {
      setIsArticleLoading(true);
      fetchArticles(selectedSortBy, selectedSortByOrder).then((articles) => {
        setAllArticles(articles);
        if (selectedTopic === "none") {
          setArticlesShowing(articles);
        } else {
          const tempFilteredArticle = articles.filter((article) => article.topic === selectedTopic);
          setArticlesShowing(tempFilteredArticle);
        }
        setIsArticleLoading(false);
      });
    }
  }, [selectedTopic, selectedSortBy, selectedSortByOrder]);

  if (isArticleLoading) {
    return <p>Loading Content...</p>;
  }

  function onChangeHandle_topicChange(event) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("topic", event.target.value);
    setSearchParams(newSearchParams);
    setSelectedTopic(event.target.value);
  }

  function onChangeHandle_sortByChange(event) {
    // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("sort_by", event.target.value);
    setSearchParams(newSearchParams);
    setSelectedSortBy(event.target.value);
  }

  function onClickHandle_sortByOrderChange(order) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("order", order);
    setSearchParams(newSearchParams);
    setSelectedSortByOrder(order);
  }

  // console.log(searchParams);
  return (
    <div>
      <h1>Topic Articles </h1>
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
                    {topic.slug}
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
      <Box sx={{ minWidth: 120, border: "1px solid red", width: "100%" }}>
        <Stack spacing={2}>
          {articlesShowing.map((article, index) => {
            let articleDate = new Date(article.created_at).toLocaleDateString("en-UK");
            return (
              <React.Fragment key={index}>
                <Link to={`/article/${article.article_id}`}>
                  <Item sx={{ maxWidth: "750px" }}>
                    <Grid container sx={{ border: "1px solid blue" }}>
                      <Grid xs={12} sm={6} sx={{ border: "1px solid pink" }}>
                        <img
                          src={article.article_img_url}
                          alt={article.title}
                          style={{ width: "100%", objectFit: "cover" }}
                          loading="lazy"
                        />
                      </Grid>
                      <Grid xs={12} sm={6} sx={{ border: "1px solid pink" }}>
                        <h4>{article.title}</h4>
                        <p>{article.author}</p>
                        <p>Topic: {article.topic}</p>
                      </Grid>
                    </Grid>
                    <Grid>
                      <p style={{ fontSize: "0.75rem", textWrap: "nowrap" }}>
                        Votes: {article.votes} | Comments: {article.comment_count} | Created At: {articleDate}
                      </p>
                    </Grid>
                  </Item>
                </Link>
              </React.Fragment>
            );
          })}
        </Stack>
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
