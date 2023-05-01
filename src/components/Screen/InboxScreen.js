import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Card from "../Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { inboxDetail } from "../store/detailSlice";
import { updateDetail } from "../store/detailSlice";
import { deleteDetail } from "../store/detailSlice";
import Layout from "./Layout";

const InboxScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const mailDetail = useSelector((state) => state.detail);
  const loggedInEmailId = useSelector((state) => state.auth);

  const detailId = (id) => {
    const detailObject = mailDetail?.inboxList?.filter(
      (item) => item.id === id
    );

    dispatch(updateDetail(detailObject[0]));
    history.push(`/view/${id}/inbox`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(inboxDetail(loggedInEmailId.userId));
    }, [2000]);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const removeHandler = (id) => {
    dispatch(
      deleteDetail({
        id,
        dispatch,
        fn: inboxDetail,
        email: loggedInEmailId.userId,
        type: "inbox",
      })
    );
  };

  return (
    <Layout>
      <div>
        {mailDetail?.inboxList?.map((item) => (
          <Card
            onClick={() => detailId(item.id)}
            key={item.id}
            id={item.id}
            mailId={item.senderEmail}
            message={item.message}
            createdAt={item?.createdAt}
            src={
              !item?.markAsRead
                ? "https://www.kindpng.com/picc/m/78-785490_blue-dot-transparent-background-hd-png-download.png"
                : null
            }
            removeHandler={removeHandler}
          />
        ))}
      </div>
    </Layout>
  );
};

export default InboxScreen;
