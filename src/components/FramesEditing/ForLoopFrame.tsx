import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import {
  Editable,
  ForLoopFrame as ForLoopFrameT,
  makeEditable,
  makeForLoopFrame,
} from "../../model/frames-editing";
import { Frame } from "./Frame";
import { useStoreActions } from "../../store"

export const ForLoopFrame: React.FC<Editable<ForLoopFrameT>> = (props) => {
  const editState = props.editState;
  
  const frameActions = useStoreActions((actions) => actions.framesEditor);
  const editableFrames = props.frame.body.map((f) =>
    makeEditable(f, frameActions)
  );

  switch (editState.status) {
    case "saved":
      return <div> {"for "} <span className="changeableText">{props.frame.condition}</span> {":"}
      <div>
        {editableFrames.map((f) => <Frame {...f} key={f.frame.id} />)}
      </div>
      </div>;
    case "being-edited": {
      const onTextChange = (value:string) => {
        editState.modify(makeForLoopFrame({ condition: value, body:props.frame.body }));
      }
      return (
        <div>
          {"for "}
          <Form.Control
            type="text"
            value={props.frame.condition}
            onChange={(evt) => onTextChange(evt.target.value)}
          ></Form.Control>
          {":"}
          {editableFrames.map((f) => <Frame {...f} key={f.frame.id} />)}
        </div>
      );
    }
  }
};
