import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import {
  Editable,
  SayForSecondsFrame as SayForSecondsFrameT,
  makeSayForSecondsFrame,
} from "../../model/frames-editing";

export const SayForSecondsFrame: React.FC<Editable<SayForSecondsFrameT>> = (props) => {

  const editState = props.editState;
  switch (editState.status) {
    case "saved":
      return (
        <div>
          {"self.say_for_seconds( "}
          {props.frame.text} {", "}
          {props.frame.seconds} {" )"}
        </div>
      );
    case "being-edited": {

        const onTextChange = (value:string) => {
          editState.modify(makeSayForSecondsFrame({ text: value , seconds:props.frame.seconds}));
        }

        const onSecChange = (value:string) => {
          editState.modify(makeSayForSecondsFrame({ text: value , seconds:props.frame.seconds}));
        }

      return (
        <div>
          {"self.say_for_seconds( "}
          <Form.Control
            type="text"
            value={props.frame.text}
            onChange={(evt) => onTextChange(evt.target.value)}
          ></Form.Control>
          {", "}
          <Form.Control
            type="text"
            value={props.frame.seconds}
            onChange={(evt) => onSecChange(evt.target.value)}
          ></Form.Control>
          {" )"}
        </div>
      );
    }
  }
};
