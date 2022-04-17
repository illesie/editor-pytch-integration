import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import {
  Editable,
  AssignmentFrame as AssignmentFrameT,
  makeAssignmentFrame,
} from "../../model/frames-editing";

export const AssignmentFrame: React.FC<Editable<AssignmentFrameT>> = (
  props
) => {
  const editState = props.editState;

  switch (editState.status) {
    case "saved":
      return (
        <div>
          {" "}
          <span className="changeableText">
            {props.frame.variableName}
          </span>
          {" = "} 
          <span className="changeableText">
          {props.frame.valueText}
          </span>
        </div>
      );
    case "being-edited": {
      const onTextChange = (value: string) => {
        editState.modify(
          makeAssignmentFrame({
            variableName: value,
            valueText: props.frame.valueText,
          })
        );
      };

      const onValueTextChange = (value: string) => {
        editState.modify(
          makeAssignmentFrame({
            variableName: props.frame.variableName,
            valueText: value,
          })
        );
      };

      return (
        <div>
          <Form.Control
            type="text"
            value={props.frame.variableName}
            onChange={(evt) => onTextChange(evt.target.value)}
          ></Form.Control>
          {" = "}
          <Form.Control
            type="text"
            value={props.frame.valueText}
            onChange={(evt) => onValueTextChange(evt.target.value)}
          ></Form.Control>
        </div>
      );
    }
  }
};
