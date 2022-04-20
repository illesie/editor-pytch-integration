import React from "react";
import { Form } from "react-bootstrap";
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
      return <div> {"for "} <span className="changeableText">{props.frame.item}</span> {" in "} <span className="changeableText">{props.frame.sequence}</span> {":"}
      <div>
        {editableFrames.map((f) => <Frame {...f} key={f.frame.id} />)}
      </div>
      </div>;
    case "being-edited": {
      const onItemChange = (value:string) => {
        editState.modify(makeForLoopFrame({ item: value, sequence: props.frame.sequence, body:props.frame.body }));
      }
      const onSequenceChange = (value:string) => {
        editState.modify(makeForLoopFrame({ item: props.frame.item, sequence: value, body:props.frame.body }));
      }
      return (
        <div>
          {"for "}
          <Form.Control
            type="text"
            value={props.frame.item}
            onChange={(evt) => onItemChange(evt.target.value)}
          ></Form.Control>
          {" in "}
          <Form.Control
            type="text"
            value={props.frame.sequence}
            onChange={(evt) => onSequenceChange(evt.target.value)}
          ></Form.Control>
          {":"}
          {editableFrames.map((f) => <Frame {...f} key={f.frame.id} />)}
        </div>
      );
    }
  }
};
