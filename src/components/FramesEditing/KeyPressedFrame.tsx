import React from "react";
import { Form } from "react-bootstrap";
import {
  Editable,
  KeyPressedFrame as KeyPressedFrameT,
  makeKeyPressedFrame,
} from "../../model/frames-editing";

export const KeyPressedFrame: React.FC<Editable<KeyPressedFrameT>> = (props) => {
  const editState = props.editState;
  switch (editState.status) {
    case "saved":
      return <div> {"@pytch.when_key_pressed("} <span className="changeableText">{props.frame.key_name}</span> {")"}</div>;
    case "being-edited": {

      const onTextChange = (value:string) => {
        editState.modify(makeKeyPressedFrame({ key_name: value }));
      } 
      return (
        <div>
          {"@pytch.when_key_pressed("} 
          <Form.Control
            type="text"
            value={props.frame.key_name}
            onChange={(evt) => onTextChange(evt.target.value)}
          ></Form.Control>
          {")"} 
        </div>
      );
    }
  }
};
