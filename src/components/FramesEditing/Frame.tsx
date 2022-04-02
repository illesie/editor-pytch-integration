import React from "react";
import Button from "react-bootstrap/Button";

import { Editable, Frame as FrameT } from "../../model/frames-editing";
import { CommentFrame } from "./CommentFrame";
import { AssignmentFrame } from "./AssignmentFrame";
import { StatementFrame } from "./StatementFrame";
import { IfFrame } from "./IfFrame";
import { PrintFrame } from "./PrintFrame";
import { GlideFrame } from "./GlideFrame";
import { SayForSecondsFrame } from "./SayForSecondsFrame";
import { WaitFrame } from "./WaitFrame";
import { FaTimes, FaPen, FaCheck } from "react-icons/fa";

const componentFromKind = {
  comment: CommentFrame,
  assignment: AssignmentFrame,
  statement: StatementFrame,
  if: IfFrame,
  print: PrintFrame,
  glide: GlideFrame,
  sayforseconds: SayForSecondsFrame,
  wait: WaitFrame,
  // TODO: Add
  // ---
  // all frame types when implemented.
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
  const buttons = ((editState) => {
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

  switch (props.editState.status) {
    case "saved":
      return (
        <>
          <div className="frame" onDoubleClick={props.editState.edit}>
            <div>{buttons}</div>
            <div className="code-content">
              <FrameContent {...props} />
            </div>
          </div>
          <Button
            className="index-button"
            onClick={() => props.editState.selectIndex()}
          />
        </>
      );
    case "being-edited":
      return (
        <div className="frame">
          <div>{buttons}</div>
          <div className="code-content">
            <FrameContent {...props} />
          </div>
          <Button
            className="index-button"
            onClick={() => props.editState.selectIndex()}
          />
        </div>
      );
  }
};
