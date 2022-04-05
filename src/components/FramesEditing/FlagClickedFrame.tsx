import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import {
  Editable,
  FlagClickedFrame as FlagClickedFrameT,
  makeFlagClickedFrame,
} from "../../model/frames-editing";

export const FlagClickedFrame: React.FC<Editable<FlagClickedFrameT>> = () => {
  return (<div>{"@pytch.when_green_flag_clicked"}</div>);
};
