import React from "react";
import { Form } from "react-bootstrap";
import {
  Editable,
  WaitFrame as WaitFrameT,
  makeWaitFrame,
} from "../../model/frames-editing";

export const WaitFrame: React.FC<Editable<WaitFrameT>> = (props) => {

  const editState = props.editState;
  switch (editState.status) {
    case "saved":
      return (
        <div>
          {" pytch.wait_seconds( "}
          <span className="changeableText">
          {props.frame.seconds} {" )"}
          </span>
        </div>
      );
    case "being-edited": {

        const onSecChange = (value:string) => {
          editState.modify(makeWaitFrame({ seconds: value }));
        }

      return (
        <div>
          {"self.pytch.wait_seconds( "}
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
