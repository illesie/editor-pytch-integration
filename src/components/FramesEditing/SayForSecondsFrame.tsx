import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import {
  Editable,
  SayForSecondsFrame as SayForSecondsFrameT,
  makeSayForSecondsFrame,
} from "../../model/frames-editing";
import {FaCheck} from "react-icons/fa";

// self.say_for_seconds(text, seconds)
export const SayForSecondsFrame: React.FC<Editable<SayForSecondsFrameT>> = (props) => {
  const [text, setText] = useState(props.frame.text);
  const [seconds, setSeconds] = useState(props.frame.seconds);

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
      const save = () =>
        editState.save(
          makeSayForSecondsFrame({ text: text, seconds: seconds })
        );

      return (
        <div>
          <span onClick={save}>
            <FaCheck color="indigo" size={50}/>
          </span>
          {"self.say_for_seconds( "}
          <Form.Control
            type="text"
            value={text}
            onChange={(evt) => setText(evt.target.value)}
          ></Form.Control>
          {", "}
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
