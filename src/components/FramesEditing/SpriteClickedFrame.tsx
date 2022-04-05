import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import {
  Editable,
  SpriteClickedFrame as SpriteClickedFrameT,
  makeSpriteClickedFrame,
} from "../../model/frames-editing";

export const SpriteClickedFrame: React.FC<Editable<SpriteClickedFrameT>> = () => {
  return (<div>{"@pytch.when_this_sprite_clicked"}</div>);
};
