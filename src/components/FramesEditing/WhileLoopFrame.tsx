import React from "react";
import { Form } from "react-bootstrap";
import {
  Editable,
  WhileLoopFrame as WhileLoopFrameT,
  makeWhileLoopFrame,
  makeEditable,
} from "../../model/frames-editing";
import { Frame } from "./Frame";
import { useStoreActions } from "../../store"

export const WhileLoopFrame: React.FC<Editable<WhileLoopFrameT>> = (props) => {
  const editState = props.editState;
  
  const frameActions = useStoreActions((actions) => actions.framesEditor);
  const editableFrames = props.frame.body.map((f) =>
    makeEditable(f, frameActions)
  );

  switch (editState.status) {
    case "saved":
      return <div> {"while "} <span className="changeableText">{props.frame.condition}</span> {":"}
      <div>
        {editableFrames.map((f) => <Frame {...f} key={f.frame.id} />)}
      </div>
      </div>;
    case "being-edited": {
      const onTextChange = (value:string) => {
        editState.modify(makeWhileLoopFrame({ condition: value, body:props.frame.body }));
      }
      return (
        <div>
          {"while "}
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
