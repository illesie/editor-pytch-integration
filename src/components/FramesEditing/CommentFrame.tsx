import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import {
  Editable,
  CommentFrame as CommentFrameT,
  makeCommentFrame,
} from "../../model/frames-editing";

export const CommentFrame: React.FC<Editable<CommentFrameT>> = (props) => {
  const editState = props.editState;
  switch (editState.status) {
    case "saved":
      return <div># {props.frame.commentText}</div>;
    case "being-edited": {

      const onTextChange = (value:string) => {
        editState.modify(makeCommentFrame({ commentText: value }));
      } 
      return (
        <div>
          {"# "}
          <Form.Control
            type="text"
            value={props.frame.commentText}
            onChange={(evt) => onTextChange(evt.target.value)}
          ></Form.Control>
        </div>
      );
    }
  }
};
