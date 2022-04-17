import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import {
  Editable,
  GlideFrame as GlideFrameT,
  makeGlideFrame,
} from "../../model/frames-editing";

export const GlideFrame: React.FC<Editable<GlideFrameT>> = (props) => {
  const editState = props.editState;
  switch (editState.status) {
    case "saved":
      return (
        <div>
          {"self.glide_to_xy( "}
          <span className="changeableText">{props.frame.Xvalue} </span> {", "}
          <span className="changeableText">{props.frame.Yvalue} </span> {", "}
          <span className="changeableText">{props.frame.seconds}</span> {" )"}
        </div>
      );
    case "being-edited": {
      const onXChange = (value: string) => {
        editState.modify(
          makeGlideFrame({
            Xvalue: value,
            Yvalue: props.frame.Yvalue,
            seconds: props.frame.seconds,
          })
        );
      };

      const onYChange = (value: string) => {
        editState.modify(
          makeGlideFrame({
            Xvalue: props.frame.Xvalue,
            Yvalue: value,
            seconds: props.frame.seconds,
          })
        );
      };

      const onSecChange = (value: string) => {
        editState.modify(
          makeGlideFrame({
            Xvalue: props.frame.Xvalue,
            Yvalue: props.frame.Yvalue,
            seconds: value,
          })
        );
      };

      return (
        <div>
          {"self.glide_to_xy( "}
          <Form.Control
            type="text"
            value={props.frame.Xvalue}
            onChange={(evt) => onXChange(evt.target.value)}
          ></Form.Control>
          {", "}
          <Form.Control
            type="text"
            value={props.frame.Yvalue}
            onChange={(evt) => onYChange(evt.target.value)}
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
