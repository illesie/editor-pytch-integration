import React from "react";
import {
  Editable,
  SpriteClickedFrame as SpriteClickedFrameT,
} from "../../model/frames-editing";

export const SpriteClickedFrame: React.FC<Editable<SpriteClickedFrameT>> = () => {
  return (<div>{"@pytch.when_this_sprite_clicked"}</div>);
};
