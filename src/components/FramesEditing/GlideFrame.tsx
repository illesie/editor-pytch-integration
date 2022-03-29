import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import {
  Editable,
  GlideFrame as GlideFrameT,
  makeGlideFrame,
} from "../../model/frames-editing";

// self.glide_to_xy(x, y, seconds)

export const GlideFrame: React.FC<Editable<GlideFrameT>> = (props) => {
  const [Xvalue, setX] = useState(props.frame.Xvalue);
  const [Yvalue, setY] = useState(props.frame.Yvalue);
  const [seconds, setSeconds] = useState(props.frame.seconds);

  const editState = props.editState;
  switch (editState.status) {
    case "saved":
      return (
        <div>
          {"self.glide_to_xy( "}
          {props.frame.Xvalue} {", "}
          {props.frame.Yvalue} {", "}
          {props.frame.seconds} {" )"}
        </div>
      );
    case "being-edited": {
      const save = () =>
        editState.save(
          makeGlideFrame({ Xvalue: Xvalue, Yvalue: Yvalue, seconds: seconds })
        );

      return (
        <div>
          {"self.glide_to_xy( "}
          <Form.Control
            type="text"
            value={Xvalue}
            onChange={(evt) => setX(evt.target.value)}
          ></Form.Control>
          {", "}
          <Form.Control
            type="text"
            value={Yvalue}
            onChange={(evt) => setY(evt.target.value)}
          ></Form.Control>
          {", "}
          <Form.Control
            type="text"
            value={seconds}
            onChange={(evt) => setSeconds(evt.target.value)}
          ></Form.Control>
          {" )"}
          <Button onClick={save}>SAVE</Button>
        </div>
      );
    }
  }
};
