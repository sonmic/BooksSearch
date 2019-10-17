import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import FavoriteIcon from "@material-ui/icons/Favorite";
import InfoIcon from "@material-ui/icons/Info";
import IconButton from "@material-ui/core/IconButton";

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

function Book({ book }) {
  const { volumeInfo } = book;
  const {
    title,
    subtitle,
    authors,
    description,
    imageLinks,
    canonicalVolumeLink
  } = volumeInfo;
  const { smallThumbnail } = imageLinks;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={9}>
            <div className={classes.paper}>
              <div className="title">{title} </div>
              <div className="subTitle">{subtitle} </div>
              <div className="author">{authors} </div>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className={classes.paper}>
              <a href={canonicalVolumeLink} target="_blank">
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </a>
              <IconButton>
                <FavoriteIcon />
              </IconButton>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className={classes.paper}>
              <div className="preview">
                <img src={smallThumbnail} alt="preview" className="bookImage" />
              </div>
            </div>
          </Grid>
          <Grid item xs={9}>
            <div className={classes.paper}>
              <div className="description">{description} </div>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
function Search({ books }) {
  const { data = {} } = books;
  const { items = [] } = data;
  return (
    <div className="searchContainer">
      {items.map(book => (
        <Book book={book} />
      ))}
    </div>
  );
}

export default Search;
