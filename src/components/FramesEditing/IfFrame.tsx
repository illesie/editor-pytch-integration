import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import {
  Editable,
  IfFrame as IfFrameT,
  makeIfFrame,
  makeEditable
} from "../../model/frames-editing";

import { FrameControls } from "../CodeEditor";

import { CodeAsFrames } from "./CodeAsFrames";

import { useStoreState, useStoreActions } from "../../store"

export const IfFrame: React.FC<Editable<IfFrameT>> = (props) => {
  const [text, setText] = useState(props.frame.condition);
  const [frames, setFrames] = useState(props.frame.body);

  const editState = props.editState;
  
  const codeAsFrames = useStoreState((state) => state.framesEditor);
  const frameActions = useStoreActions((actions) => actions.framesEditor);
  const editableFrames = codeAsFrames.frames.map((f) =>
    makeEditable(f, frameActions)
  );

//< CodeAsFrames frames={editableFrames} />

  switch (editState.status) {
    case "saved":
      return <div> {"if "} {props.frame.condition} 
      <div>
        If body
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
          <Button>Insert</Button>
          <Button onClick={save}>SAVE</Button>
        </div>
      );
    }
  }
};
