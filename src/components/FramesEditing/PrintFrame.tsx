import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import {
  Editable,
  PrintFrame as PrintFrameT,
  makePrintFrame,
} from "../../model/frames-editing";

export const PrintFrame: React.FC<Editable<PrintFrameT>> = (props) => {
  const editState = props.editState;
  switch (editState.status) {
    case "saved":
      return (
        <div>
          {" "}
          {"print( "}{" "}
          <span className="changeableText">
            {props.frame.printText}
          </span>
          {" )"}
        </div>
      );
    case "being-edited": {
      const onTextChange = (value: string) => {
        editState.modify(makePrintFrame({ printText: value }));
      };

      return (
        <div>
          {"print( "}
          <Form.Control
            type="text"
            value={props.frame.printText}
            onChange={(evt) => onTextChange(evt.target.value)}
          ></Form.Control>
          {" )"}
        </div>
      );
    }
  }
};
