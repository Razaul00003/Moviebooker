import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function ShowDetails(props) {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState([]);
  const [show, setShow] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const url = `https://api.tvmaze.com/search/shows?q=all`;
  useEffect(() => {
    axios.get(url).then((res) => {
      setMovies(res.data);
    });
  }, [url, id]);

  useEffect(() => {
    movies.map((movie) => movie.show?.id === +id && setMovie(movie));
  }, [movies, id]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const { name, email } = user;
    setEmail(email);
    setName(name);
  }, []);

  const handleFormSubmit = () => {
    const userInfo = {
      name,
      email,
      movieName: movie.show?.name,
    };
    localStorage.setItem("user", JSON.stringify(userInfo));
    setShow(false);
  };

  return (
    <>
      {!movie ? (
        <div className="container">
          <img src="/loading.gif" alt="loading" />
        </div>
      ) : (
        <>
          <div className="row justify-content-center p-5 m-3 ">
            <div className="col-12 col-md-5">
              <div className="container px-5 ">
                <img
                  style={{ width: "80%", height: "auto" }}
                  src={
                    movie.show?.image?.medium
                      ? movie.show?.image?.medium
                      : "/no-photo.png"
                  }
                  alt={movie.show?.name}
                />
              </div>
            </div>
            <div className="col-12 col-md-7">
              <div
                dangerouslySetInnerHTML={{ __html: movie.show?.summary }}
                className="container mt-4 mt-md-0"
              ></div>
              <div className="container mb-4">
                <button
                  onClick={handleShow}
                  className="text-primary d-block text-white bg-success border-0 p-2 px-5"
                >
                  Book{" "}
                </button>
              </div>
            </div>
          </div>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>User Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Movie Name</Form.Label>
                  <Form.Control placeholder={movie.show?.name} disabled />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Your Name"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    placeholder="Your email"
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button
                type="submit"
                variant="success"
                onClick={handleFormSubmit}
              >
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
}

export default ShowDetails;
