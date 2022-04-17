import React from "react";
import Button from "react-bootstrap/Button";

import { Editable, Frame as FrameT } from "../../model/frames-editing";
import { InvisibleFrame } from "./InvisibleFrame";
import { CommentFrame } from "./CommentFrame";
import { AssignmentFrame } from "./AssignmentFrame";
import { StatementFrame } from "./StatementFrame";
import { IfFrame } from "./IfFrame";
import { PrintFrame } from "./PrintFrame";
import { GlideFrame } from "./GlideFrame";
import { SayForSecondsFrame } from "./SayForSecondsFrame";
import { WaitFrame } from "./WaitFrame";
import { ForLoopFrame } from "./ForLoopFrame";
import { WhileLoopFrame } from "./WhileLoopFrame";
import { ClassFrame } from "./ClassFrame";
import { DefFrame } from "./DefFrame";
import { SpriteClickedFrame } from "./SpriteClickedFrame";
import { FlagClickedFrame } from "./FlagClickedFrame";
import { KeyPressedFrame } from "./KeyPressedFrame";

import { FaTimes, FaPen, FaCheck } from "react-icons/fa";

const componentFromKind = {
  invisible: InvisibleFrame,
  comment: CommentFrame,
  assignment: AssignmentFrame,
  statement: StatementFrame,
  if: IfFrame,
  print: PrintFrame,
  glide: GlideFrame,
  sayforseconds: SayForSecondsFrame,
  wait: WaitFrame,
  for: ForLoopFrame,
  while: WhileLoopFrame,
  class: ClassFrame,
  def: DefFrame,
  spriteClicked: SpriteClickedFrame,
  flagClicked: FlagClickedFrame,
  keyPressed: KeyPressedFrame,
};

const FrameContent: React.FC<Editable<FrameT>> = (props) => {
  const mComponent = componentFromKind[props.frame.kind];
  if (mComponent != null) {
    // Need "as any" because TypeScript can't work out that the runtime
    // behaviour will be for the types to match.
    return React.createElement(mComponent as any, props, null);
  } else {
    return <div>UNKNOWN FRAME-KIND!?</div>;
  }
};

export const Frame: React.FC<Editable<FrameT>> = (props) => {

  var buttons = ((editState) => {
    switch (editState.status) {
      case "saved":
        return (
          <>
            <span onClick={editState.delete}>
              <FaTimes color="#e33" size={25} />
            </span>
            <span onClick={editState.edit}>
              <FaPen color="indigo" />
            </span>
          </>
        );
      case "being-edited":
        return (
          <>
            <span onClick={editState.delete}>
              <FaTimes color="#e33" size={25} />
            </span>
            <span onClick={editState.save}>
              <FaCheck color="indigo" size={50} />
            </span>
          </>
        );
    }
  })(props.editState);

  var indexButton = ((editState) => {
    switch (props.frame.isIndexSelected) {
      case false:
        return (
          <div>
            <div
              className="index-button"
              onClick={() => editState.selectIndex()}
            />
          </div>
        );
      case true:
        return (
          <div>
            <div
              className="selected-index-button"
              onClick={() => props.editState.selectIndex()}
            />
          </div>
        );
    }
  })(props.editState);

  if (props.frame.kind == "invisible") {
    return <div> {indexButton} </div>;
  }

  if(props.frame.kind == 'class'){
    buttons = <></>;
  }

  if(['spriteClicked', 'flagClicked'].includes(props.frame.kind)){
    buttons = ((editState) => {
      switch (editState.status) {
        case "saved":
          return (
              <span onClick={editState.delete}>
                <FaTimes color="#e33" size={25} />
              </span>
          );
        case "being-edited":
          return (
              <span onClick={editState.delete}>
                <FaTimes color="#e33" size={25} />
              </span>
          );
      }
    })(props.editState);
  }

  switch (props.editState.status) {
    case "saved":
      return (
        <>
          <div className="frame">
            <div>{buttons}</div>
            <div className="code-content">
              <FrameContent {...props} />
            </div>
          </div>
          <div>{indexButton}</div>
        </>
      );
    case "being-edited":
      return (
        <>
          <div className="frame">
            <div>{buttons}</div>
            <div className="code-content">
              <FrameContent {...props} />
            </div>
          </div>
          {indexButton}
        </>
      );
  }
};
