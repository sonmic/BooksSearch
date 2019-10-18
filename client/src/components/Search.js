import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import FavoriteIcon from "@material-ui/icons/Favorite";
import InfoIcon from "@material-ui/icons/Info";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3, 2)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary
  }
}));

function Book({ book, showDeleteButton, onDelete }) {
  const { authors, description = "", image, link, title, subtitle } = book;
  const classes = useStyles();
  const [favoriteOnly, setFavoriteOnly] = useState(false);

  return (
    <div className={classes.root}>
      <Paper className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={10}>
            <div className={classes.paper}>
              <div className="title">
                <a href={link} target="_blank">
                  {title}{" "}
                </a>
              </div>
              <div className="subTitle">{subtitle} </div>
              <div className="author">{authors.join(", ")}</div>
            </div>
          </Grid>
          <Grid item xs={2}>
            <div className="viewFavContainer">
              <a href={link} target="_blank">
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </a>
              {showDeleteButton && (
                <IconButton
                  onClick={() => {
                    return axios
                      .delete("/api/books/" + book._id)
                      .then(response => onDelete())
                      .catch(error => {
                        alert("Could not delete: " + error);
                      });
                  }}
                >
                  <DeleteForeverIcon />
                </IconButton>
              )}
              {!showDeleteButton && (
                <IconButton
                  onClick={() => {
                    return axios
                      .post("/api/books", book)
                      .then(response => {
                        setFavoriteOnly(!favoriteOnly);
                      })
                      .catch(error => {
                        alert("Could not save: " + error);
                      });
                  }}
                >
                  <FavoriteIcon
                    color={favoriteOnly ? "secondary" : "inherit"}
                  />
                </IconButton>
              )}
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className={classes.paper}>
              <div className="preview">
                <a href={link} target="_blank">
                  <img src={image} alt="preview" className="bookImage" />
                </a>
              </div>
            </div>
          </Grid>
          <Grid item xs={9}>
            <div className={classes.paper}>
              <div className="description">
                {description.replace(/(.{800})..+/, "$1…")}{" "}
              </div>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
function Search({ books, showDeleteButton, onDelete }) {
  return (
    <div className="searchContainer">
      {books.map(book => (
        <Book
          book={book}
          showDeleteButton={showDeleteButton}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default Search;
