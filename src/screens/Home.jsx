import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieBox from "../components/MovieBox";
import Row from "react-bootstrap/Row";

function Home(props) {
  const [shows, setShows] = useState([]);
  const url = `https://api.tvmaze.com/search/shows?q=all`;
  useEffect(() => {
    axios.get(url).then((res) => {
      setShows(res.data);
    });
  }, [url]);

  return (
    <div className=" container-fluid p-5">
      <Row className="">
        {shows &&
          shows.length > 0 &&
          shows.map((show, i) => <MovieBox key={i} show={show} />)}
      </Row>
    </div>
  );
}

export default Home;
