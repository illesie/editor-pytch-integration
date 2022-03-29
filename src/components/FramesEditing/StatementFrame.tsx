import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import {
  Editable,
  StatementFrame as StatementFrameT,
  makeStatementFrame,
} from "../../model/frames-editing";

export const StatementFrame: React.FC<Editable<StatementFrameT>> = (props) => {
  const [text, setText] = useState(props.frame.statementText);

  const editState = props.editState;
  switch (editState.status) {
    case "saved":
      return <div> {props.frame.statementText}</div>;
    case "being-edited": {
      const save = () =>
        editState.save(makeStatementFrame({ statementText: text }));

      return (
        <div>
          <Form.Control
            type="text"
            value={text}
            onChange={(evt) => setText(evt.target.value)}
          ></Form.Control>
          <Button onClick={save}>SAVE</Button>
        </div>
      );
    }
  }
};
