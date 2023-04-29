import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ViewCard = () => {
  const [objectMail, setObjectMail] = useState({});

  const { id } = useParams();

  const mailDetail = useSelector((state) => state?.detail?.detailList);

  useEffect(() => {
    const detailObject = mailDetail?.filter((item) => item.id === id);
    setObjectMail(detailObject[0]);
  }, []);

  return (
    <div>
      <div>From:{objectMail.senderEmail}</div>
      <div>To:{objectMail.receiverEmail}</div>
      <div>{objectMail.message}</div>
    </div>
  );
};

export default ViewCard;
