import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import {
  Editable,
  IfFrame as IfFrameT,
  makeIfFrame,
  makeEditable
} from "../../model/frames-editing";

import { Frame } from "./Frame";

import { useStoreActions } from "../../store"

export const IfFrame: React.FC<Editable<IfFrameT>> = (props) => {
  const [text, setText] = useState(props.frame.condition);
  const editState = props.editState;
  
  const frameActions = useStoreActions((actions) => actions.framesEditor);
  const editableFrames = props.frame.body.map((f) =>
    makeEditable(f, frameActions)
  );

//< CodeAsFrames frames={editableFrames} />

  switch (editState.status) {
    case "saved":
      return <div> {"if "} {props.frame.condition} {":"}
      <div>
        {editableFrames.map((f) => <Frame {...f} key={f.frame.id} />)}
      </div>
      </div>;
    case "being-edited": {
      const save = () =>
        editState.save(makeIfFrame({ condition: text, body: []}));
      return (
        <div>
          {"if "}
          <Form.Control
            type="text"
            value={text}
            onChange={(evt) => setText(evt.target.value)}
          ></Form.Control>
          {":"}
          {editableFrames.map((f) => <Frame {...f} key={f.frame.id} />)}
          <Button>Insert</Button>
          <Button onClick={save}>SAVE</Button>
        </div>
      );
    }
  }
};
