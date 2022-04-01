import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import {
  Editable,
  PrintFrame as PrintFrameT,
  makePrintFrame,
} from "../../model/frames-editing";
import {FaCheck} from "react-icons/fa";

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
          <span onClick={save}>
            <FaCheck color="indigo" size={50}/>
          </span>
          {"print( "}
          <Form.Control
            type="text"
            value={text}
            onChange={(evt) => setText(evt.target.value)}
          ></Form.Control>
          {" )"}
        </div>
      );
    }
  }
};
