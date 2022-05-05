import React from "react";
import { Form } from "react-bootstrap";
import {
  Editable,
  ClassFrame as ClassFrameT,
  makeClassFrame,
  makeEditable,
} from "../../model/frames-editing";
import { Frame } from "./Frame";
import { useStoreActions } from "../../store"

export const ClassFrame: React.FC<Editable<ClassFrameT>> = (props) => {
  const editState = props.editState;
  
  const frameActions = useStoreActions((actions) => actions.framesEditor);
  const editableFrames = props.frame.body.map((f) =>
    makeEditable(f, frameActions)
  );

  const changeableBox = ((text: String, regex: any) => {
    if(text == "" || !(text).match(regex)){
      return (<span className="changeableTextInvalid"> {text} </span>);
    }
    else{
      return (<span className="changeableText"> {text} </span>);
    }
    
  });

 var nameRegex = '^([a-zA-Z_$][0-9a-zA-Z_$,]*)$';

  switch (editState.status) {
    case "saved":
      return <div> {"class "}
       {changeableBox(props.frame.name, nameRegex)} 
       {"(pytch.Sprite):"}
      <div>
        {editableFrames.map((f) => <Frame {...f} key={f.frame.id} />)}
      </div>
      </div>;
    case "being-edited": {
      const onTextChange = (value:string) => {
        editState.modify(makeClassFrame({ name: value, body:props.frame.body }));
      }
      return (
        <div>
          {"class "}
          <Form.Control
            type="text"
            value={props.frame.name}
            onChange={(evt) => onTextChange(evt.target.value)}
          ></Form.Control>
          {"(pytch.Sprite):"}
          {editableFrames.map((f) => <Frame {...f} key={f.frame.id} />)}
        </div>
      );
    }
  }
};
