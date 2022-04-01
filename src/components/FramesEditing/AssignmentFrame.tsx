import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import {
  Editable,
  AssignmentFrame as AssignmentFrameT,
  makeAssignmentFrame,
} from "../../model/frames-editing";
import {FaCheck} from "react-icons/fa";

export const AssignmentFrame: React.FC<Editable<AssignmentFrameT>> = (props) => {
  const [text, setText] = useState(props.frame.variableName);
  const [value, setValue] = useState(props.frame.valueText);

  const editState = props.editState;

  switch (editState.status) {
    case "saved":
      return <div> {props.frame.variableName} {" = "} {props.frame.valueText}</div>;
    case "being-edited": {
      const save = () =>
        editState.save(makeAssignmentFrame({ variableName: text, valueText: value }));
      return (
        <div>
          <span onClick={save}>
            <FaCheck color="indigo" size={50}/>
          </span>
          <Form.Control
            type="text"
            value={text}
            onChange={(evt) => setText(evt.target.value)}
          ></Form.Control>
          {" = "}
          <Form.Control
            type="text"
            value={value}
            onChange={(evt) => setValue(evt.target.value)}
          ></Form.Control>
        </div>
      );
    }
  }
};
