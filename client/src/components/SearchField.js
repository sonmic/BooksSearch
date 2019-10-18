import { fade, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import React from "react";

const useStyles = makeStyles(theme => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  }
}));

function bookSearch(query) {
  return axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=${query}&key=AIzaSyDPW-tCMp7LrSdITc6L3UZ3Wcal4viwG7w`
  );
}

function convertBooks(response) {
  const { data = {} } = response;
  const { items = [] } = data;
  return items.map(item => {
    const { volumeInfo } = item;
    const {
      title,
      subtitle,
      authors = [],
      description,
      imageLinks = {},
      canonicalVolumeLink
    } = volumeInfo;
    const { smallThumbnail } = imageLinks;
    return {
      authors,
      description,
      image: smallThumbnail,
      link: canonicalVolumeLink,
      title,
      subtitle
    };
  });
}

export default function SearchField({ onSearch }) {
  const classes = useStyles();
  return (
    <div className={classes.search}>
      <TextField
        onChange={event => {
          bookSearch(event.target.value).then(response =>
            onSearch(convertBooks(response))
          );
        }}
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
    </div>
  );
}
