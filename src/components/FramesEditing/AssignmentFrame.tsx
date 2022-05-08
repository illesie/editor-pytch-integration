import React from "react";
import { Form } from "react-bootstrap";
import {
  Editable,
  AssignmentFrame as AssignmentFrameT,
  makeAssignmentFrame,
} from "../../model/frames-editing";

export const AssignmentFrame: React.FC<Editable<AssignmentFrameT>> = (
  props
) => {
  const editState = props.editState;

  const changeableBox = ((text: String, regex: any) => {
    if(text == "" || !(text).match(regex)){
      return (<span className="changeableTextInvalid"> {text} </span>);
    }
    else{
      return (<span className="changeableText"> {text} </span>);
    }
    
  });

 var varNameRegex = '^([a-zA-Z_$\p{Zs}][0-9a-zA-Z_$,=\p{Zs}]*)$';
 var valueRegex = '.';

  switch (editState.status) {
    case "saved":
      return (
        <div>
          {" "}
            {changeableBox(props.frame.variableName, varNameRegex )}
          {" = "} 
            {changeableBox(props.frame.valueText, valueRegex)}
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
