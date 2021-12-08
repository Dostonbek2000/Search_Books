import React from "react";
import { NavLink, Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const Reusable = () => {
  const data = JSON.parse(localStorage.getItem("mydata"));

  return (
    <div>
      <Box>
        <AppBar position="static" style={{ width: "100%" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              component={NavLink}
              to={"/"}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Search Books
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: "50%",
          margin: "auto",
          padding: 30,
        }}
      >
        <h1 style={{ color: "black", fontFamily: "monospace" }}>
          Book Information
        </h1>
      </div>
      <div style={{ width: "100%" }}>
        <Card className="Card">
          <CardMedia
            className="Cardmedia"
            style={{ height: "60%", width: "30%" }}
            component="img"
            alt="green iguana"
            height="140"
            image={
              data.volumeInfo.imageLinks.thumbnail !== undefined
                ? data.volumeInfo.imageLinks.thumbnail
                : "/static/images/cards/contemplative-reptile.jpg"
            }
          />
          <div
            style={{ width: "70%", paddingLeft: 30, alignItems: "flex-end" }}
          >
            <CardContent style={{ height: "75%" }}>
              <Typography gutterBottom variant="h5" component="div">
                {data.volumeInfo.title ? data.volumeInfo.title : ""}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                {data.volumeInfo.authors
                  ? "Author: " + data.volumeInfo.authors
                  : ""}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {data.volumeInfo.description
                  ? data.volumeInfo.description.slice(0, 800) + "..."
                  : ""}
              </Typography>
            </CardContent>
            <CardActions
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignSelf: "self-end",
              }}
            >
              <Button size="small">
                <Link
                  style={{ width: "100%" }}
                  to={{ pathname: data.accessInfo.webReaderLink }}
                  target="_blank"
                >
                  Download
                </Link>
              </Button>
              <Button size="small">
                <Link
                  style={{ width: "100%" }}
                  to={{ pathname: data.volumeInfo.previewLink }}
                  target="_blank"
                >
                  Preview
                </Link>
              </Button>
            </CardActions>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Reusable;
