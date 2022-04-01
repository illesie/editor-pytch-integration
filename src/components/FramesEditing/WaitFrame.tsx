import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import {
  Editable,
  WaitFrame as WaitFrameT,
  makeWaitFrame,
} from "../../model/frames-editing";
import {FaCheck} from "react-icons/fa";

export const WaitFrame: React.FC<Editable<WaitFrameT>> = (props) => {
  const [seconds, setSeconds] = useState(props.frame.seconds);

  const editState = props.editState;
  switch (editState.status) {
    case "saved":
      return (
        <div>
          {" pytch.wait_seconds( "}
          {props.frame.seconds} {" )"}
        </div>
      );
    case "being-edited": {
      const save = () =>
        editState.save(
          makeWaitFrame({ seconds: seconds })
        );

      return (
        <div>
          <span onClick={save}>
            <FaCheck color="indigo" size={50}/>
          </span>
          {"self.pytch.wait_seconds( "}
          <Form.Control
            type="text"
            value={seconds}
            onChange={(evt) => setSeconds(evt.target.value)}
          ></Form.Control>
          {" )"}
        </div>
      );
    }
  }
};
