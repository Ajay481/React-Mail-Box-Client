import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ViewCard = () => {
  const [objectMail, setObjectMail] = useState({});

  const { id, type } = useParams();

  const inbox = useSelector((state) => state?.detail?.inboxList);
  const sent = useSelector((state) => state?.detail?.sentList);

  useEffect(() => {
    const detailObject =
      type === "inbox"
        ? inbox?.filter((item) => item.id === id)
        : sent?.filter((item) => item.id === id);
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
