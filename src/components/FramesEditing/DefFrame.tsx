import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import {
  Editable,
  DefFrame as DefFrameT,
  makeDefFrame,
  makeEditable,
} from "../../model/frames-editing";
import { Frame } from "./Frame";
import { useStoreActions } from "../../store"

export const DefFrame: React.FC<Editable<DefFrameT>> = (props) => {
  const editState = props.editState;
  
  const frameActions = useStoreActions((actions) => actions.framesEditor);
  const editableFrames = props.frame.body.map((f) =>
    makeEditable(f, frameActions)
  );

  switch (editState.status) {
    case "saved":
      return <div> {"def "} {props.frame.name} {"(self):"}
      <div>
        {editableFrames.map((f) => <Frame {...f} key={f.frame.id} />)}
      </div>
      </div>;
    case "being-edited": {
      const onTextChange = (value:string) => {
        editState.modify(makeDefFrame({ name: value, body:props.frame.body }));
      }
      return (
        <div>
          {"def "}
          <Form.Control
            type="text"
            value={props.frame.name}
            onChange={(evt) => onTextChange(evt.target.value)}
          ></Form.Control>
          {"(self):"}
          {editableFrames.map((f) => <Frame {...f} key={f.frame.id} />)}
        </div>
      );
    }
  }
};
