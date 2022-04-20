import React from "react";
import {
  Editable,
  FlagClickedFrame as FlagClickedFrameT,
} from "../../model/frames-editing";

export const FlagClickedFrame: React.FC<Editable<FlagClickedFrameT>> = () => {
  return (<div>{"@pytch.when_green_flag_clicked"}</div>);
};
