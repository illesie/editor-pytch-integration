import React from "react";
import { Form } from "react-bootstrap";
import {
  Editable,
  StatementFrame as StatementFrameT,
  makeStatementFrame,
} from "../../model/frames-editing";

export const StatementFrame: React.FC<Editable<StatementFrameT>> = (props) => {
  const editState = props.editState;
  switch (editState.status) {
    case "saved":
      return (
        <div>
          <span className="changeableText"> {props.frame.statementText} </span>
        </div>
      );
    case "being-edited": {
      const onTextChange = (value: string) => {
        editState.modify(makeStatementFrame({ statementText: value }));
      };

      return (
        <div>
          <Form.Control
            type="text"
            value={props.frame.statementText}
            onChange={(evt) => onTextChange(evt.target.value)}
          ></Form.Control>
        </div>
      );
    }
  }
};
