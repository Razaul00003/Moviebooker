import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";

function MovieBox({ show }) {
  return (
    <div className=" col-12 col-md-6 col-lg-3 mt-3 ">
      <Card style={{ width: "20rem" }}>
        <Card.Img
          variant="top"
          style={{ height: "350px" }}
          src={show.show?.image ? show?.show?.image?.original : "/no-photo.png"}
          alt="No image available "
        />
        <Card.Body>
          <Card.Title>{show.show.name}</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>
            Rating:{" "}
            {show.show.rating.average ? show.show.rating.average : "N/A"} / 10
          </ListGroup.Item>
          <ListGroup.Item> Language: {show.show.language}</ListGroup.Item>
          <ListGroup.Item>
            Genre:{" "}
            {show.show.genres &&
              show.show.genres.map((genre, i) => <span key={i}>{genre} </span>)}
          </ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Link
            className=" d-block w-100 bg-success text-white p-3 text-center fw-bold"
            to={`/show/${show.show.id}`}
          >
            Details
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default MovieBox;
