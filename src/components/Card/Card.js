import React, { useState } from "react";
import { Container } from "react-bootstrap";

const Card = (props) => {
  const [selected, setSelected] = useState("yes");

  const handleChange = (e) => {
    setSelected(e.target.value);
  };
  return (
    <Container className="position-relative right-0 end-0 d-flex me-5 border border-primary bg-info fw-bold w-75 justify-content-between">
      <div>
        <input name="checkbox" type="checkbox" className="me-2" />
        <input
          name="radio"
          type="radio"
          onChange={handleChange}
          value={"yes"}
          checked={selected === "yes"}
        />
      </div>
      <div>{props.mailId}</div>
      <div>{props.subject}</div>
      <div>{props.message}</div>
    </Container>
  );
};

export default Card;
