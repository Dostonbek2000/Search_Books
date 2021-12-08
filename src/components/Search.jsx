import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Input from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import SearchIcon from "@material-ui/icons/Search";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useHistory  } from 'react-router-dom';
import { Link } from "react-router-dom";
import "../App.css";

const Search = () => {
  const [text, settext] = useState("javascript");
  const [data, setdata] = useState([]);
  const [maxResult, setmaxResult] = useState(40);
  const [startIndex, setstartIndex] = useState(0);
  const [orderBy, setorderBy] = useState("relevance");
  const [category, setcategory] = useState("All");
  const [realData, setrealData] = useState([]);
  const [render, setRender] = useState(false);
  const [resulttitle, setresulttitle] = useState("");
  const history = useHistory()
  // console.log("realData", realData);
  // console.log("data", data);

  useEffect(() => {
    try {
      axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=${text}&orderBy=${orderBy}&startIndex=${startIndex}&maxResults=${maxResult}`
        )
        .then((res) => {
          setdata(res.data.items);
        });
    } catch (error) {
      console.log(error);
    }
  }, [text, orderBy, category, startIndex, maxResult]);

  const Onclick = () => {
    realData.length = 0;
    try {
      for (let i = 0; i < data.length; i++) {
        if (data[i].volumeInfo.categories[0].includes(category) === true) {
          realData.push(data[i]);
          setresulttitle(`Founded books : ${realData.length} book(s)`);
        } else if(category==='All'){
          realData.push(data[i]);
          setresulttitle(`Founded books : ${realData.length} book(s)`);
          console.log("category is all");
        }else {
          realData.length === 0
            ? setresulttitle("no books found with this category")
            : setresulttitle("");
        }
      }
    } catch (error) {
      setRender(!render);
      console.log(error);
    }
  };
  const onChange = (e) => {
    settext(e.target.value);
    realData.length = 0;
    setstartIndex(0);
    setmaxResult(30);
  };

  const Increment = () => {
    setstartIndex(startIndex + 30);
    setmaxResult(maxResult + 30);
    Onclick();
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      Onclick();
    }
  };

  const MoveData = (item) => {
    localStorage.setItem('mydata',JSON.stringify(item))
    history.push('reusable')

  }

  return (
    <div style={{width:'100%'}}>
      <Box style={{width:'100%'}}>
        <AppBar position="fixed" style={{ width: "100%" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
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
          width: "400px",
          margin: "auto",
          padding: 30,
          // border:'1px solid red',
          marginTop:70

        }}
      >
        <Input
          style={{ width: 400 }}
          variant="outlined"
          type="text"
          value={text}
          placeholder="Search your book ..."
          onChange={onChange}
          onKeyPress={Onclick}
        />

        <IconButton style={{ marginLeft: -50 }} onClick={Onclick}>
          <SearchIcon style={{ fontSize: 28, color: "blue" }} />
        </IconButton>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: "50%",
          margin: "auto",
          padding: 10,
        }}
      >
        <Box
          sx={{ minWidth: 120 }}
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
            margin: "auto",
            padding: 10,
            flexWrap: "wrap",
          }}
        >
          <FormControl>
            <Select
              value={category}
              label="Age"
              style={{ width: 200 ,marginTop:20}}
              onChange={(e) => setcategory(e.target.value)}
            >
              <MenuItem value={"All"}>All</MenuItem>
              <MenuItem value={"Art"}>Art</MenuItem>
              <MenuItem value={"Biography"}>Biography</MenuItem>
              <MenuItem value={"Computers"}>Computers</MenuItem>
              <MenuItem value={"History"}>History</MenuItem>
              <MenuItem value={"Medical"}>Medical</MenuItem>
              <MenuItem value={"Poetry"}>Poetry</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <Select
              value={orderBy}
              style={{ width: 200 ,marginTop:20}}
              label="Age"
              onChange={(e) => {
                setorderBy(e.target.value);
                console.log(e.target.value);
              }}
            >
              <MenuItem value={"relevance"}>relevance</MenuItem>
              <MenuItem value={"newest"}>newest</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
          margin: "auto",
          padding: 10,
          flexWrap: "wrap",
        }}
      >
        {resulttitle}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {realData.length !== 0
          ? realData.map((item, index) => {
              return (
                <div key={index}>
                  <Card
                    sx={{ maxWidth: 345 }}
                    style={{ margin: 10, height: 500, width: 400 }}
                  >
                    <CardActionArea
                      onClick={() => MoveData(item)}
                      style={{ height: 450 }}
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        style={{ width: "50%", margin: "auto" }}
                        image={
                          item.volumeInfo.imageLinks.thumbnail !== undefined
                            ? item.volumeInfo.imageLinks.thumbnail
                            : ""
                        }
                        alt="green iguana"
                      />
                      <CardContent>
                      <Typography gutterBottom variant="p" component="div" style={{textDecorationLine:'underline',color:'blue'}}>
                          {item.volumeInfo.categories ? item.volumeInfo.categories : ""}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                          {item.volumeInfo.title ? item.volumeInfo.title : ""}
                        </Typography>
                        
                        <Typography variant="body2" color="text.secondary">
                          {item.volumeInfo.publisher
                            ? item.volumeInfo.publisher.slice(0, 20)
                            : ""}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                    <Button size="small" color="primary" >
                    <Link style={{width:'100%',textDecoration:'none',fontFamily:"-moz-initial"}}  to={{ pathname: item.volumeInfo.previewLink }} target="_blank" >Preview</Link>
                      </Button>
                    </CardActions>
                  </Card>
                </div>
              );
            })
          : ""}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 100,
        }}
      >
        <Button variant="outlined" style={{display:realData.length !==0 ? 'block' : 'none'}} onClick={Increment}>
          Load More
        </Button>
      </div>
    </div>
  );
};

export default Search;
