import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import {
  Editable,
  IfFrame as IfFrameT,
  makeIfFrame,
  makeEditable,
} from "../../model/frames-editing";
import { Frame } from "./Frame";
import { useStoreActions } from "../../store"

export const IfFrame: React.FC<Editable<IfFrameT>> = (props) => {
  const editState = props.editState;
  
  const frameActions = useStoreActions((actions) => actions.framesEditor);
  const editableFrames = props.frame.body.map((f) =>
    makeEditable(f, frameActions)
  );

  switch (editState.status) {
    case "saved":
      return <div> {"if "} {props.frame.condition} {":"}
      <div>
        {editableFrames.map((f) => <Frame {...f} key={f.frame.id} />)}
      </div>
      </div>;
    case "being-edited": {
      const onTextChange = (value:string) => {
        editState.modify(makeIfFrame({ condition: value, body:props.frame.body }));
      }
      return (
        <div>
          {"if "}
          <Form.Control
            type="text"
            value={props.frame.condition}
            onChange={(evt) => onTextChange(evt.target.value)}
          ></Form.Control>
          {":"}
          {editableFrames.map((f) => <Frame {...f} key={f.frame.id} />)}
          <Button>Insert</Button>
        </div>
      );
    }
  }
};
