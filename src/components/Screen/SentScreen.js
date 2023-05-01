import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Card from "../Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { sentDetail } from "../store/detailSlice";
import { updateDetail } from "../store/detailSlice";
import { deleteDetail } from "../store/detailSlice";
import Layout from "./Layout";

const SentScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const mailDetail = useSelector((state) => state.detail);
  const loggedInEmailId = useSelector((state) => state.auth);

  const detailId = (id) => {
    const detailObject = mailDetail?.sentList?.filter((item) => item.id === id);

    // dispatch(updateDetail(detailObject[0]));
    history.push(`/view/${id}/sent`);
  };

  useEffect(() => {
    dispatch(sentDetail(loggedInEmailId.userId));
  }, []);

  const removeHandler = (id) => {
    dispatch(
      deleteDetail({
        id,
        dispatch,
        fn: sentDetail,
        email: loggedInEmailId.userId,
        type: "sent",
      })
    );
  };

  return (
    <Layout>
      <div>
        {mailDetail?.sentList?.map((item) => (
          <Card
            onClick={() => detailId(item.id)}
            key={item.id}
            id={item.id}
            mailId={item.senderEmail}
            createdAt={item?.createdAt}
            message={item.message}
            removeHandler={removeHandler}
          />
        ))}
      </div>
    </Layout>
  );
};

export default SentScreen;
