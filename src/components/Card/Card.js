import React from "react";
import { Container } from "react-bootstrap";
import "../Screen/ComposeScreen.css";

const Card = (props) => {
  return (
    <Container
      onClick={props.onClick}
      style={{ cursor: "pointer" }}
      className="position-relative right-0 end-0 d-flex me-5 border border-primary fw-bold w-75 justify-content-between cursor-pointer"
    >
      <div className="d-flex">
        <input name="checkbox" type="checkbox" className="me-4" />
        {props.src ? (
          <img src={props.src} alt="blueDot" className="blueDot" />
        ) : null}
        <div className="ms-2">{props.mailId}</div>
      </div>
      <div>{props.message}</div>
    </Container>
  );
};

export default Card;
