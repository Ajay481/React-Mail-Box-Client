import React, { useEffect } from "react";
import { Container, Badge } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Header from "./Header";
import Card from "../Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetail } from "../store/detailSlice";
import { updateDetail } from "../store/detailSlice";

const InboxScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const mailDetail = useSelector((state) => state.detail);
  const loggedInEmailId = useSelector((state) => state.auth);
  console.log(mailDetail.detailList);

  const detailId = (id) => {
    const detailObject = mailDetail?.detailList?.filter(
      (item) => item.id === id
    );

    dispatch(updateDetail(detailObject[0]));
    history.push(`/view/${id}`);
  };

  useEffect(() => {
    dispatch(fetchDetail(loggedInEmailId.userId));
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
          <button
            className="w-100 p-1 border border-none"
            onClick={() => history.push("/inbox")}
          >
            Inbox
            <Badge bg="info">
              {
                mailDetail?.detailList?.filter(
                  (item) => item.markAsRead === false
                ).length
              }
              Unread
            </Badge>
          </button>
          <button className="w-100 p-1 border border-none">Unread</button>
          <button className="w-100 p-1 border border-none">Starred</button>
          <button className="w-100 p-1 border border-none">Drafts</button>
          <button className="w-100 p-1 border border-none">Archive</button>
          <button className="w-100 p-1 border border-none">Spam</button>
          <button className="w-100 p-1 border border-none">
            Deleted Items
          </button>
          <button className="w-100 p-1 border border-none">Sent</button>
        </div>
      </Container>
      {mailDetail?.detailList?.map((item) => (
        <Card
          onClick={() => detailId(item.id)}
          key={item.id}
          mailId={item.senderEmail}
          message={item.message}
          src={
            !item?.markAsRead
              ? "https://www.kindpng.com/picc/m/78-785490_blue-dot-transparent-background-hd-png-download.png"
              : null
          }
        />
      ))}
    </div>
  );
};

export default InboxScreen;
