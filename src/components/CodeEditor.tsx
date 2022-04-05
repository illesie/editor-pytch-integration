import React, { useEffect } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-searchbox";
import { useStoreState, useStoreActions } from "../store";
import { setAceController } from "../skulpt-connection/code-editor";
import { IAceEditor } from "react-ace/lib/types";
import { PytchAceAutoCompleter } from "../skulpt-connection/code-completion";
import { failIfNull } from "../utils";
import { HelpSidebar, HelpSidebarOpenControl } from "./HelpSidebar";
import { CodeAsFrames } from "./FramesEditing/CodeAsFrames";
import {
  makeEditable,
  makeCommentFrame,
  makeAssignmentFrame,
  makeStatementFrame,
  makeIfFrame,
  makePrintFrame,
  makeGlideFrame,
  makeSayForSecondsFrame,
  makeWaitFrame,
  makeInvisibleFrame,
  makeForLoopFrame,
  makeWhileLoopFrame,
  makeClassFrame,
  makeDefFrame,
  makeSpriteClickedFrame,
  makeFlagClickedFrame,
  makeKeyPressedFrame,
} from "../model/frames-editing";
import Button from "react-bootstrap/Button";
import {
  FaCar,
  FaHashtag,
  FaEquals,
  FaCode,
  FaPenFancy,
  FaCodeBranch,
  FaCircleNotch,
  FaHandPointer,
} from "react-icons/fa";
import { InvisibleFrame } from "./FramesEditing/InvisibleFrame";
import { SpriteClickedFrame } from "./FramesEditing/SpriteClickedFrame";

const ReadOnlyOverlay = () => {
  const syncState = useStoreState((state) => state.activeProject.syncState);

  // TODO: Handle "failed" state.
  const maybeMessage =
    syncState.loadState === "pending"
      ? "Loading..."
      : syncState.saveState === "pending"
      ? "Saving..."
      : null;

  if (maybeMessage != null) {
    return (
      <div className="ReadOnlyOverlay">
        <p>{maybeMessage}</p>
      </div>
    );
  }
  return null;
};

const CodeAceEditor = () => {
  const { codeTextOrPlaceholder, syncState } = useStoreState(
    (state) => state.activeProject
  );
  const build = useStoreActions((actions) => actions.activeProject.build);

  const aceRef: React.RefObject<AceEditor> = React.createRef();

  // We don't care about the actual value of the stage display size, but
  // we do need to know when it changes, so we can resize the editor in
  // our useEffect() call below.
  useStoreState((state) => state.ideLayout.stageDisplaySize);

  useEffect(() => {
    const ace = failIfNull(aceRef.current, "CodeEditor effect: aceRef is null");
    ace.editor.resize();
    ace.editor.commands.addCommand({
      name: "buildAndGreenFlag",
      bindKey: { mac: "Ctrl-Enter", win: "Ctrl-Enter" },
      exec: () => build("running-project"),
    });
    ace.editor.commands.addCommand({
      name: "buildAndGreenFlagKeepFocus",
      bindKey: { mac: "Ctrl-Shift-Enter", win: "Ctrl-Shift-Enter" },
      exec: () => build("editor"),
    });
  });

  const { setCodeText, noteCodeChange } = useStoreActions(
    (actions) => actions.activeProject
  );

  const readOnly =
    syncState.loadState === "pending" || syncState.saveState === "pending";
  const setGlobalRef = (editor: IAceEditor) => {
    setAceController(editor);
  };

  // (The cast "as any" for the "enableBasicAutocompletion" option is
  // because it is typed as taking either a boolean or an array of
  // strings, whereas it will in fact take an array of class instances,
  // which is how we use it here.)

  const updateCodeText = (text: string) => {
    setCodeText(text);
    noteCodeChange();
  };

  return (
    <>
      <AceEditor
        ref={aceRef}
        mode="python"
        theme="github"
        enableBasicAutocompletion={[new PytchAceAutoCompleter() as any]}
        value={codeTextOrPlaceholder}
        name="pytch-ace-editor"
        fontSize={16}
        width="100%"
        height="100%"
        onLoad={setGlobalRef}
        onChange={updateCodeText}
        readOnly={readOnly}
      />
      <ReadOnlyOverlay />
    </>
  );
};

export const FrameControls = () => {
  //const appendFrame = useStoreActions((actions) => actions.framesEditor.appendFrame);

  const addFrame = useStoreActions((actions) => actions.framesEditor.addFrame);

  const addCommentFrame = () => {
    const newFrame = makeCommentFrame({ commentText: "" });
    addFrame(newFrame);
  };

  const addAssignmentFrame = () => {
    const newFrame = makeAssignmentFrame({ variableName: "", valueText: "" });
    addFrame(newFrame);
  };

  const addStatementFrame = () => {
    const newFrame = makeStatementFrame({ statementText: "" });
    addFrame(newFrame);
  };

  const addIfFrame = () => {
    const newFrame = makeIfFrame({ condition: "", body: [] });
    const InvisibleFrame = makeInvisibleFrame();
    newFrame.body = [
      {
        ...InvisibleFrame,
        editStatus: "saved",
      },
    ];
    addFrame(newFrame);
  };

  const addForLoopFrame = () => {
    const newFrame = makeForLoopFrame({ condition: "", body: [] });
    const InvisibleFrame = makeInvisibleFrame();
    newFrame.body = [
      {
        ...InvisibleFrame,
        editStatus: "saved",
      },
    ];
    addFrame(newFrame);
  };

  const addWhileLoopFrame = () => {
    const newFrame = makeWhileLoopFrame({ condition: "", body: [] });
    const InvisibleFrame = makeInvisibleFrame();
    newFrame.body = [
      {
        ...InvisibleFrame,
        editStatus: "saved",
      },
    ];
    addFrame(newFrame);
  };

  const addClassFrame = () => {
    const newFrame = makeClassFrame({ name: "", body: [] });
    const InvisibleFrame = makeInvisibleFrame();
    newFrame.body = [
      {
        ...InvisibleFrame,
        editStatus: "saved",
      },
    ];
    addFrame(newFrame);
  };

  const addDefFrame = () => {
    const newFrame = makeDefFrame({ name: "", body: [] });
    const InvisibleFrame = makeInvisibleFrame();
    newFrame.body = [
      {
        ...InvisibleFrame,
        editStatus: "saved",
      },
    ];
    addFrame(newFrame);
  };

  const addPrintFrame = () => {
    const newFrame = makePrintFrame({ printText: "" });
    addFrame(newFrame);
  };

  const addGlideFrame = () => {
    const newFrame = makeGlideFrame({ Xvalue: "", Yvalue: "", seconds: "1" });
    addFrame(newFrame);
  };

  const addSayForSecondsFrame = () => {
    const newFrame = makeSayForSecondsFrame({ text: "", seconds: "1" });
    addFrame(newFrame);
  };

  const addSpriteClickedFrame = () => {
    const newFrame = makeSpriteClickedFrame();
    addFrame(newFrame);
  };

  const addFlagClickedFrame = () => {
    const newFrame = makeFlagClickedFrame();
    addFrame(newFrame);
  };

  const addKeyPressedFrame = () => {
    const newFrame = makeKeyPressedFrame({ key_name: ""});
    addFrame(newFrame);
  };

  const addWaitFrame = () => {
    const newFrame = makeWaitFrame({ seconds: "1" });
    addFrame(newFrame);
  };

  return (
    <div className="frame-controls">
      Add Frames
      <div className="dropdown">
        <Button className="dropbtn">
          {" "}
          <div className="button-icon">
            {" "}
            <FaCar size={20} />{" "}
          </div>{" "}
          My Sprite
        </Button>
        <div className="dropdown-content">
          <Button className="frame-control-buttons" onClick={addGlideFrame}>
            Glide
          </Button>
          <Button
            className="frame-control-buttons"
            onClick={addSayForSecondsFrame}
          >
            Say
          </Button>
          <Button className="frame-control-buttons" onClick={addWaitFrame}>
            Wait
          </Button>
        </div>
      </div>
      <div className="dropdown">
        <Button className="dropbtn">
          <div className="button-icon">
            <FaHandPointer size={20} />
          </div>
          Actions
        </Button>
        <div className="dropdown-content">
          <Button
            className="frame-control-buttons"
            onClick={addSpriteClickedFrame}
          >
            Sprite Clicked
          </Button>
          <Button
            className="frame-control-buttons"
            onClick={addFlagClickedFrame}
          >
            Green Flag Clicked
          </Button>
          <Button
            className="frame-control-buttons"
            onClick={addKeyPressedFrame}
          >
            KeyPressed
          </Button>
        </div>
      </div>
      <Button className="frame-control-buttons" onClick={addCommentFrame}>
        <div className="button-icon">
          {" "}
          <FaHashtag size={15} />
        </div>
        Comment
      </Button>
      <Button className="frame-control-buttons" onClick={addAssignmentFrame}>
        <div className="button-icon">
          {" "}
          <FaEquals size={15} />
        </div>
        Assignment
      </Button>
      <Button className="frame-control-buttons" onClick={addStatementFrame}>
        <div className="button-icon">
          {" "}
          <FaCode size={15} />
        </div>
        Statement
      </Button>
      <Button className="frame-control-buttons" onClick={addPrintFrame}>
        <div className="button-icon">
          {" "}
          <FaPenFancy size={15} />
        </div>
        Print
      </Button>
      <Button className="frame-control-buttons" onClick={addIfFrame}>
        <div className="button-icon">
          {" "}
          <FaCodeBranch size={15} />
        </div>
        If
      </Button>
      <Button className="frame-control-buttons" onClick={addForLoopFrame}>
        <div className="button-icon">
          {" "}
          <FaCircleNotch size={15} />
        </div>
        For Loop
      </Button>
      <Button className="frame-control-buttons" onClick={addWhileLoopFrame}>
        <div className="button-icon">
          {" "}
          <FaCircleNotch size={15} />
        </div>
        While Loop
      </Button>
      Advanced Frames
      <Button className="frame-control-buttons" onClick={addClassFrame}>
        New Sprite Class
      </Button>
      <Button className="frame-control-buttons" onClick={addDefFrame}>
        Function Definition
      </Button>
    </div>
  );
};

const CodeEditor = () => {
  const codeAsFrames = useStoreState((state) => state.framesEditor);
  const frameActions = useStoreActions((actions) => actions.framesEditor);
  const editableFrames = codeAsFrames.frames.map((f) =>
    makeEditable(f, frameActions)
  );

  return (
    <div className="frame-based-editor">
      <CodeAsFrames frames={editableFrames} />
      <FrameControls />
    </div>
  );
};

export default CodeEditor;
