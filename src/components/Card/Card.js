import React from "react";
import { Container } from "react-bootstrap";
import "../Screen/ComposeScreen.css";

const Card = (props) => {
  return (
    <div className="d-flex">
      <Container
        onClick={props.onClick}
        style={{ cursor: "pointer" }}
        className="position-relative right-0 end-0 d-flex me-5 border border-primary fw-bold justify-content-between cursor-pointer"
      >
        <div className="d-flex">
          <input name="checkbox" type="checkbox" className="me-4" />
          {props.src ? (
            <img src={props.src} alt="blueDot" className="blueDot" />
          ) : null}
          <div className="ms-2">{props.mailId}</div>
        </div>
        <div>{props.message}</div>
        <div>{new Date(props?.createdAt).toLocaleString()}</div>
      </Container>
      <button onClick={() => props.removeHandler(props.id)}>Delete</button>
    </div>
  );
};

export default Card;
