import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Header from "./Header";
import Card from "../Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetail } from "../store/detailSlice";

const InboxScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const mailDetail = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(fetchDetail());
  }, []);

  return (
    <div>
      <Header />
      <Container className="bg-dark w-25 vh-100 position-absolute">
        <div>
          <button
            className="w-100 p-2 mt-5 mb-5 bg-primary text-white border border-none"
            onClick={() => history.push("/compose")}
          >
            Compose
          </button>
          <button className="w-100 p-1 border border-none">Inbox</button>
          <button className="w-100 p-1 border border-none">Unread</button>
          <button className="w-100 p-1 border border-none">Starred</button>
          <button className="w-100 p-1 border border-none">Drafts</button>
          <button className="w-100 p-1 border border-none">Archive</button>
          <button className="w-100 p-1 border border-none">Spam</button>
          <button className="w-100 p-1 border border-none">
            Deleted Items
          </button>
        </div>
      </Container>
      {mailDetail?.detailList?.map((item) => (
        <Card
          key={item.id}
          mailId={item.senderEmail}
          subject={item.subject}
          message={item.message}
        />
      ))}
    </div>
  );
};

export default InboxScreen;
