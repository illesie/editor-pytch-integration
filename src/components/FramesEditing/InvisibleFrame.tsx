import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import {
  Editable,
  InvisibleFrame as InvisibleFrameT,
} from "../../model/frames-editing";

export const InvisibleFrame: React.FC<Editable<InvisibleFrameT>> = (props) => {
  
  return <div><Button>hello?</Button></div>
};
