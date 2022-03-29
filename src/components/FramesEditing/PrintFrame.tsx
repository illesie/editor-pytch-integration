import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import {
  Editable,
  PrintFrame as PrintFrameT,
  makePrintFrame,
} from "../../model/frames-editing";

export const PrintFrame: React.FC<Editable<PrintFrameT>> = (props) => {
  const [text, setText] = useState(props.frame.printText);

  const editState = props.editState;
  switch (editState.status) {
    case "saved":
      return <div> {"print( "} {props.frame.printText} {" )"}</div>;
    case "being-edited": {
      const save = () =>
        editState.save(makePrintFrame({ printText: text }));

      return (
        <div>
          {"print( "}
          <Form.Control
            type="text"
            value={text}
            onChange={(evt) => setText(evt.target.value)}
          ></Form.Control>
          {" )"}
          <Button onClick={save}>SAVE</Button>
        </div>
      );
    }
  }
};
