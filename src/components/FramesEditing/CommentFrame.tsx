import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import {
  Editable,
  CommentFrame as CommentFrameT,
  makeCommentFrame,
} from "../../model/frames-editing";
import {FaCheck} from "react-icons/fa";

export const CommentFrame: React.FC<Editable<CommentFrameT>> = (props) => {
  const [text, setText] = useState(props.frame.commentText);
  const editState = props.editState;
  switch (editState.status) {
    case "saved":
      return <div># {props.frame.commentText}</div>;
    case "being-edited": {
      const save = () =>{
        editState.save(makeCommentFrame({ commentText: text }));
      }
        

      return (
        <div>
          <span onClick={save}>
            <FaCheck color="indigo" size={50}/>
          </span>
          #{" "}
          <Form.Control
            type="text"
            value={text}
            onChange={(evt) => setText(evt.target.value)}
          ></Form.Control>
        </div>
      );
    }
  }
};
