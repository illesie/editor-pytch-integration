import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import {
  Editable,
  StatementFrame as StatementFrameT,
  makeStatementFrame,
} from "../../model/frames-editing";
import {FaCheck} from "react-icons/fa"

export const StatementFrame: React.FC<Editable<StatementFrameT>> = (props) => {
  const [text, setText] = useState(props.frame.statementText);

  const editState = props.editState;
  switch (editState.status) {
    case "saved":
      return <div> {props.frame.statementText}</div>;
    case "being-edited": {
      const save = () =>
        editState.save(makeStatementFrame({ statementText: text }));

      const onTextChange = (value:string) => {
        setText(value);
        editState.modify(makeStatementFrame({ statementText: value }));
      }
      
      return (
        <div>
          <span onClick={save}>
            <FaCheck color="indigo" size={50}/>
          </span>
          <Form.Control
            type="text"
            value={text}
            onChange={(evt) => onTextChange(evt.target.value)}
          ></Form.Control>
        </div>
      );
    }
  }
};
