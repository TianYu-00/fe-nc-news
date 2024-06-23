import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const AvatarContainer = styled("div")({
  position: "relative",
  display: "inline-block",
  "&:hover .boxBelowAvatar": {
    display: "block",
  },
});

const ContentBelowAvatar = styled(Box)({
  display: "none",
  position: "absolute",
  top: "100%",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 9999,
});

const HeaderAvatarWithHoverBox = ({ avatarURL, avatarAlt, boxContent }) => {
  return (
    <AvatarContainer>
      <Avatar alt={avatarAlt} src={avatarURL} sx={{ width: 35, height: 35 }} />
      <ContentBelowAvatar className="boxBelowAvatar">{boxContent}</ContentBelowAvatar>
    </AvatarContainer>
  );
};

export default HeaderAvatarWithHoverBox;
