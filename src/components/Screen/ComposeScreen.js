import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch, useSelector } from "react-redux";
import { detailList } from "../store/detailSlice";
import { convertToRaw, ContentState } from "draft-js";
import "./ComposeScreen.css";
import { useHistory } from "react-router-dom";

const ComposeScreen = () => {
  const [mailId, setMailId] = useState("");
  const [subject, setSubject] = useState("");
  const senderEmail = useSelector((state) => state.auth.userId);
  const _contentState = ContentState.createFromText("");
  const raw = convertToRaw(_contentState);
  const [contentState, setContentState] = useState(raw);
  const history = useHistory()

  const dispatch = useDispatch();

  const mailIdHandler = (e) => {
    e.preventDefault();
    setMailId(e.target.value);
  };

  const subjectHandler = (e) => {
    e.preventDefault();
    setSubject(e.target.value);
  };

  const sendHandler = (e) => {
    e.preventDefault();
    dispatch(
      detailList({
        receiverEmail: mailId,
        senderEmail: senderEmail,
        subject: subject,
        message: contentState.blocks[0].text,
        history
      })
    );
  };
  return (
    <div>
      <div>
        <input
          name="mailId"
          type="email"
          placeholder="To"
          onChange={mailIdHandler}
          value={mailId}
          className="w-75 p-3 border-0 border-bottom"
        />
      </div>
      <input
        name="subject"
        type="text"
        placeholder="Subject"
        onChange={subjectHandler}
        value={subject}
        className="w-75 p-3 border-0 border-bottom"
      />
      <Editor
        defaultContentState={contentState}
        onContentStateChange={setContentState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editor"
      />
      <button className="bg-primary text-white" onClick={sendHandler}>
        Send
      </button>
    </div>
  );
};

export default ComposeScreen;
