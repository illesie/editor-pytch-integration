import { Action, action, Actions } from "easy-peasy";
import { assertNever } from "../utils";

////////////////////////////////////////////////////////////////////////

type FrameBase<KindLiteral extends string> = {
  id: number;
  kind: KindLiteral;
  depth: number;
};

const nextId = (() => {
  let id = 10000;
  return () => id++;
})();

////////////////////////////////////////////////////////////////////////
// Comment

type CommentCore = {
  commentText: string;
};

export type CommentFrame = FrameBase<"comment"> & CommentCore;

export const makeCommentFrame = (core: CommentCore): CommentFrame => ({
  id: nextId(),
  kind: "comment",
  depth: 0,
  ...core,
});

// Generic Statement

type StatementCore = {
  statementText: string;
};

export type StatementFrame = FrameBase<"statement"> & StatementCore;

export const makeStatementFrame = (core: StatementCore): StatementFrame => ({
  id: nextId(),
  kind: "statement",
  depth: 0,
  ...core,
});

// Print Statement

type PrintCore = {
  printText: string;
};

export type PrintFrame = FrameBase<"print"> & PrintCore;

export const makePrintFrame = (core: PrintCore): PrintFrame => ({
  id: nextId(),
  kind: "print",
  depth: 0,
  ...core,
});

// Assignment
type AssignmentCore = {
  variableName: string;
  valueText: string;
};

export type AssignmentFrame = FrameBase<"assignment"> & AssignmentCore;

export const makeAssignmentFrame = (core: AssignmentCore): AssignmentFrame => ({
  id: nextId(),
  kind: "assignment",
  depth: 0,
  ...core,
});

// List
type ListAssignmentCore = {
  variableName: string;
  valueText: Array<string>;
};

export type ListAssignmentFrame = FrameBase<"list"> & ListAssignmentCore;

export const makeListAssignmentFrame = (
  core: ListAssignmentCore
): ListAssignmentFrame => ({
  id: nextId(),
  kind: "list",
  depth: 0,
  ...core,
});

// If
type IfCore = {
  condition: string;
  body: Array<PreEditableFrame>;
};

export type IfFrame = FrameBase<"if"> & IfCore;

export const makeIfFrame = (core: IfCore): IfFrame => ({
  id: nextId(),
  kind: "if",
  depth: 0,
  ...core,
});

// For Loop
type ForLoopCore = {
  condition: string,
  body: Array<PreEditableFrame>,
};

export type ForLoopFrame = FrameBase<"for"> & ForLoopCore;

export const makeForLoopFrame = (core: ForLoopCore): ForLoopFrame => ({
  id: nextId(),
  kind: "for",
  depth: 0,
  ...core,
});

// While Loop
type WhileLoopCore = {
  condition: string;
  body: Array<PreEditableFrame>;
};

export type WhileLoopFrame = FrameBase<"while"> & WhileLoopCore;

export const makeWhileLoopFrame = (core: WhileLoopCore): WhileLoopFrame => ({
  id: nextId(),
  kind: "while",
  depth: 0,
  ...core,
});

// Class Definition
type ClassCore = {
  name: string;
  body: Array<PreEditableFrame>;
};

export type ClassFrame = FrameBase<"class"> & ClassCore;

export const makeClassFrame = (core: ClassCore): ClassFrame => ({
  id: nextId(),
  kind: "class",
  depth: 0,
  ...core,
});

// Function Definition
type DefCore = {
  name: string;
  body: Array<PreEditableFrame>;
};

export type DefFrame = FrameBase<"def"> & DefCore;

export const makeDefFrame = (core: DefCore): DefFrame => ({
  id: nextId(),
  kind: "def",
  depth: 0,
  ...core,
});

// Glide
type GlideCore = {
  Xvalue: string;
  Yvalue: string;
  seconds: string;
};

export type GlideFrame = FrameBase<"glide"> & GlideCore;

export const makeGlideFrame = (core: GlideCore): GlideFrame => ({
  id: nextId(),
  kind: "glide",
  depth: 0,
  ...core,
});

// Say for Seconds
type SayForSecondsCore = {
  text: string;
  seconds: string;
};

export type SayForSecondsFrame = FrameBase<"sayforseconds"> & SayForSecondsCore;

export const makeSayForSecondsFrame = (
  core: SayForSecondsCore
): SayForSecondsFrame => ({
  id: nextId(),
  kind: "sayforseconds",
  depth: 0,
  ...core,
});

// Wait
type WaitCore = {
  seconds: string;
};

export type WaitFrame = FrameBase<"wait"> & WaitCore;

export const makeWaitFrame = (core: WaitCore): WaitFrame => ({
  id: nextId(),
  kind: "wait",
  depth: 0,
  ...core,
});

// Invisible Frame for Insertion Points
export type InvisibleFrame = FrameBase<"invisible">;

export const makeInvisibleFrame = (): InvisibleFrame => ({
  id: nextId(),
  kind: "invisible",
  depth: 0,
});

//Actions
export type SpriteClickedFrame = FrameBase<"spriteClicked">;
export const makeSpriteClickedFrame = (): SpriteClickedFrame => ({
  id: nextId(),
  kind: "spriteClicked",
  depth: 0,
});

export type FlagClickedFrame = FrameBase<"flagClicked">;
export const makeFlagClickedFrame = (): FlagClickedFrame => ({
  id: nextId(),
  kind: "flagClicked",
  depth: 0,
});

// Comment

type KeyPressedCore = {
  key_name: string;
};

export type KeyPressedFrame = FrameBase<"keyPressed"> & KeyPressedCore;

export const makeKeyPressedFrame = (core: KeyPressedCore): KeyPressedFrame => ({
  id: nextId(),
  kind: "keyPressed",
  depth: 0,
  ...core,
});

////////////////////////////////////////////////////////////////////////
// All frame kinds

export type Frame =
  | InvisibleFrame 
  | CommentFrame
  | AssignmentFrame
  | StatementFrame
  | IfFrame
  | PrintFrame
  | GlideFrame
  | SayForSecondsFrame
  | WaitFrame
  | ForLoopFrame
  | WhileLoopFrame
  | ClassFrame
  | DefFrame
  | SpriteClickedFrame
  | FlagClickedFrame
  | KeyPressedFrame
  ;

////////////////////////////////////////////////////////////////////////
// Editing a frame

// This is all a bit cumbersome because I'm trying to bridge the purely
// functional world of props-based React components with the "one huge
// global variable" world of Easy-Peasy.

// The type of the EditState.save() function (below) when in state
// "being-edited" could be tighter, because we only want to update the
// frame with one of the same kind.  But I spent too long down the
// rabbit-hole of how to explain this to the TypeScript type system
// without getting to a good answer!

// This type will mostly be used further below (in makeEditable), but I
// define it here so I don't have to repeat myself about the valid
// values for the "status" property.

export type EditState =
  | {
      status: "being-edited";
      // If the frame is currently being edited, then we can do the
      // following things to it:
      save: () => void;
      modify: (newFrame: Frame) => void;
      delete: () => void;
      selectIndex: () => void;
    }
  | {
      status: "saved";
      // If the frame is currently "saved" (not being edited), then we
      // can do the following things to it:
      edit: () => void;
      delete: () => void;
      selectIndex: () => void;
    };

// A frame along with the information as to whether it's being edited or
// is saved, but without the functions to save / cancel / delete /
// begin-editing.
export type PreEditableFrame = Frame & {
  editStatus: EditState["status"];
};

// Information required when replacing a frame (i.e., when the user
// clicks "SAVE" to finish editing a frame).
type ReplaceFrameDescriptor = {
  idToReplace: number;
  newFrame: Frame;
};

// The type of the model slice within the huge Easy-Peasy-based global
// variable.
export interface IFramesEditor {
  frames: Array<PreEditableFrame>;

  index_path: Array<number>;

  /** Set the frame within state.frames with ID matching that of the
   * passed-in frame to "being-edited" mode. */
  editFrame: Action<IFramesEditor, Frame>;

  /** Replace the frame within state.frames having the given ID with the
   * given replacement frame, noting its status as "saved". */
  saveFrame: Action<IFramesEditor>;

  /** Replace the frame within state.frames having the given ID with the
   * given replacement frame while its status remains "being-edited". */
  modifyFrame: Action<IFramesEditor, ReplaceFrameDescriptor>;

  /** Remove the frame within state.frames with ID matching that of
   * passed-in frame. */
  deleteFrame: Action<IFramesEditor, Frame>;

  onSelectIndex: Action<IFramesEditor, Frame>;

  addFrame: Action<IFramesEditor, Frame>;

  // TODO:
  //
  // insertFrameBefore: Action<IFramesEditor, InsertionDescriptor>;
  //
  // where the type InsertionDescriptor has properties for the
  // to-be-inserted frame and for the frame (maybe by ID?) before which
  // the new frame is to be inserted.  For appending a frame to the
  // whole list, the "frame before which to insert the new frame" can be
  // null.
  //
  // Could consider renaming to "moveFrameBefore", where the
  // to-be-inserted frame is removed from its current place in the list
  // if it's already in the list.  Or just have a separate
  // "moveFrameBefore" action.  Gets a bit more complicated if you want
  // to be able to move frames from within the body-suite of a "while"
  // to top-level.
  //
  // Likely to be some thought needed about how to handle frame kinds
  // which have nested suites of code, e.g., WhileLoopFrame or
  // IfElseFrame.

  // TODO:
  // setFramesFromJSON: Action<IFramesEditor, string>;

  // TODO:
  // framesAsJSON: Computed<IFramesEditor, string>;
}

const frameIndexByIdOrFail = (
  frames: Array<PreEditableFrame>,
  targetId: number
) => {
  const frameIndex = frames.findIndex((f) => f.id === targetId);
  //if (frameIndex === -1)
  //  throw new Error(`could not find frame with id ${targetId}`);
  return frameIndex;
};

const findIndexPath = (
  path: Array<number>,
  frame: PreEditableFrame,
  targetId: number,
) => {
  if (!frame) {
    return false;
  }

  path.push(frame.id);
  if (frame.id === targetId) {
    return true;
  } else {
    //if (complexFrameKinds.includes(frame.kind)) {
    if ('body' in frame) {
      for (var j = 0; j < frame.body.length; j++) {
        if (findIndexPath(path, frame.body[j], targetId)) {
          return true;
        }
      }
    }
    path.pop();
    return false;
  }
};

const saveFrameHelper = (frames: PreEditableFrame[]) => {
  frames.forEach((frame) => {
    if ('body' in frame) {
      saveFrameHelper(frame.body);
    }
    frame.editStatus = "saved";
  });
};

// Value of the model slice when the app starts up.
export const framesEditor: IFramesEditor = {
  // Sample data to develop with; in the final thing this will be
  // instead be
  //
  /*
  frames: [
    {
      id: 1000,
      kind: "class",
      editStatus:"saved",
      name: "MySprite",
      body: [
        { 
          id: 1000,
          kind: "invisible",
          editStatus: "saved",
          depth: 0,
        },
      ]
    }
  ]
  */
  // so the editor starts empty.
  frames: [
    {
      id: 10,
      kind: "class",
      editStatus:"saved",
      name: "MySprite",
      depth: 0,
      body: [
        { 
          id: 1000,
          kind: "invisible",
          editStatus:"saved",
          depth: 1,
        },
        { 
          id: 1001,
          kind: "assignment",
          variableName: "Costumes",
          valueText: '["Snake.png"]',
          editStatus:"saved",
          depth: 1,
        },
        {
          id:1002,
          kind: "flagClicked",
          editStatus:"saved",
          depth: 1,
        },
        {
          id:1003,
          kind: "def",
          editStatus:"saved",
          depth: 1,
          name: "speak",
          body: [
            { 
              id: 1004,
              kind: "invisible",
              editStatus:"saved",
              depth: 2,
            },
            {
              id:1005,
              kind: "sayforseconds",
              seconds: "2.0",
              text: '"Hello"',
              editStatus:"saved",
              depth: 2,
            }
          ]
        },
      ],
    },
  ],

  index_path: [0],

  editFrame: action((state, frame) => {
    saveFrameHelper(state.frames);
    // ------------ Select index to currently edited frame ------------
    state.index_path = [];
    // temporary root for the frames
    const rootFrame: PreEditableFrame = {
      id: 999,
      kind: "if",
      editStatus: "saved",
      condition: "",
      depth: -1,
      body: state.frames,
    };

    const found = findIndexPath(state.index_path, rootFrame, frame.id);
    state.index_path.shift();
    //------------------------------------------------------------------
    const newFrames = state.frames.slice();
    var place = [frameIndexByIdOrFail(newFrames, state.index_path[0])];

    if (state.index_path.length == 1) {
      newFrames[place[0]].editStatus = "being-edited";
      state.frames = newFrames;
    } else {
      var temp = newFrames[place[0]];
      for (let j = 1; j < state.index_path.length; j++) {
        if ('body' in temp) {
          place.push(frameIndexByIdOrFail(temp.body, state.index_path[j]));
          temp = temp.body[place[j]];
        }
      }
      temp.editStatus = "being-edited";
    }
  }),

  saveFrame: action((state) => {
    saveFrameHelper(state.frames);
  }),

  ////////////////////////////////////////////////////////////////////////

  // TODO
  modifyFrame: action((state, replaceDescriptor) => {
    // ------------ Select index to currently edited frame ------------
    state.index_path = [];
    // temporary root for the frames
    const rootFrame: PreEditableFrame = {
      id: 999,
      kind: "if",
      editStatus: "saved",
      condition: "",
      body: state.frames,
      depth: -1,
    };

    const found = findIndexPath(
      state.index_path,
      rootFrame,
      replaceDescriptor.idToReplace
    );
    state.index_path.shift();
    //------------------------------------------------------------------
    var place = [frameIndexByIdOrFail(state.frames, state.index_path[0])];

    if (state.index_path.length == 1) {
      const originalId = state.frames[place[0]].id;
      state.frames[place[0]] = {
        ...replaceDescriptor.newFrame,
        id: originalId,
        editStatus: "being-edited",
        depth: 0,
      };
    } else {
      const newFrames = state.frames.slice();
      var temp = newFrames[place[0]];
      var prev = temp;
      for (let j = 1; j < state.index_path.length; j++) {
        if ('body' in temp) {
          prev = temp;
          place.push(frameIndexByIdOrFail(temp.body, state.index_path[j]));
          temp = temp.body[place[j]];
        }
      }
      if ('body' in prev) {
        const originalId = prev.body[place[place.length - 1]].id;

        prev.body[place[place.length - 1]] = {
          ...replaceDescriptor.newFrame,
          id: originalId,
          editStatus: "being-edited",
          depth: prev.depth + 1,
        };
      }
    }
  }),

  ////////////////////////////////////////////////////////////////////////
  deleteFrame: action((state, frame) => {
    // Find the index and filter by that, to ensure that we do indeed
    // find the to-be-deleted frame.

    // ------------ Select index to currently edited frame ------------
    state.index_path = [];
    // temporary root for the frames
    const rootFrame: PreEditableFrame = {
      id: 999,
      kind: "if",
      editStatus: "saved",
      condition: "",
      body: state.frames,
      depth: -1,
    };

    const found = findIndexPath(state.index_path, rootFrame, frame.id);
    state.index_path.shift();
    //------------------------------------------------------------------

    const newFrames = state.frames.slice();
    var place = [frameIndexByIdOrFail(newFrames, state.index_path[0])];
    if (state.index_path.length == 1) {
      state.frames = newFrames.filter((_frame, idx) => idx !== place[0]);
    } else {
      var temp = newFrames[place[0]];
      var prev = temp;
      for (let j = 1; j < state.index_path.length; j++) {
        if ('body' in temp) {
          prev = temp;
          place.push(frameIndexByIdOrFail(temp.body, state.index_path[j]));
          temp = temp.body[place[j]];
        }
      }
      if ('body' in prev) {
        prev.body = prev.body.filter(
          (_frame, idx) => idx !== place[place.length - 1]
        );
      }
    }
  }),

  ////////////////////////////////////////////////////////////////////////

  onSelectIndex: action((state, current_frame) => {
    state.index_path = [];
    // temporary root for the frames
    const rootFrame: PreEditableFrame = {
      id: 999,
      kind: "if",
      editStatus: "saved",
      condition: "",
      body: state.frames,
      depth: -1,
    };

    const found = findIndexPath(state.index_path, rootFrame, current_frame.id);
    state.index_path.shift();
  }),

  ////////////////////////////////////////////////////////////////////////

  addFrame: action((state, newFrame) => {
    const newEditableFrame: PreEditableFrame = {
      ...newFrame,
      editStatus: "saved",
    };

    const newFrames = state.frames.slice();
    var place = [frameIndexByIdOrFail(newFrames, state.index_path[0])];
    if (state.index_path.length == 1) {
      newFrames.splice(place[0] + 1, 0, newEditableFrame);
    } else {
      var temp = newFrames[place[0]];
      var prev = temp;
      for (let j = 1; j < state.index_path.length; j++) {
        if ('body' in temp) {
          prev = temp;
          place.push(frameIndexByIdOrFail(temp.body, state.index_path[j]));
          temp = temp.body[place[j]];
        }
      }

      if ('body' in prev) {
        newEditableFrame.depth = prev.depth + 1;
        prev.body.splice(place[place.length - 1] + 1, 0, newEditableFrame);
      }
    }
    state.frames = newFrames.slice();
  }),
};

////////////////////////////////////////////////////////////////////////
// Bridge between Easy-Peasy and React-props worlds

export type Editable<Frame> = {
  frame: Frame;
  editState: EditState;
};

/**
 * Combine the given pre-editable-frame with the given actions to
 * produce an "editable frame", i.e., one which includes functions to
 * take the appropriate actions based on the frame's edit-status:  A
 * "saved" frame can be edited or deleted; a "being-edited" frame can be
 * saved or deleted.
 * @param frame
 * @param actions
 * @returns editableFrame
 */
export const makeEditable = (
  frame: PreEditableFrame,
  actions: Actions<IFramesEditor>
): Editable<Frame> => {
  const bareFrame: Frame = Object.assign({}, frame);
  delete (bareFrame as any).editStatus;

  switch (frame.editStatus) {
    case "saved":
      return {
        frame: bareFrame,
        editState: {
          status: "saved",
          edit: () => actions.editFrame(bareFrame),
          delete: () => actions.deleteFrame(bareFrame),
          selectIndex: () => actions.onSelectIndex(bareFrame),
        },
      };
    case "being-edited":
      return {
        frame: bareFrame,
        editState: {
          status: "being-edited",
          save: () => actions.saveFrame(),
          modify: (replacementFrame) =>
            actions.modifyFrame({
              idToReplace: bareFrame.id,
              newFrame: replacementFrame,
            }),
          delete: () => actions.deleteFrame(bareFrame),
          selectIndex: () => actions.onSelectIndex(bareFrame),
        },
      };
    default:
      return assertNever(frame.editStatus);
  }
};

const printPythonCode = (frame: PreEditableFrame) => {
  let py_text = "";
  if(frame.depth == -1){
    return py_text;
  }
  
  for (let j = 0; j < frame.depth; j++) {
    py_text = py_text.concat("    ");
  }
  if (frame.kind === "assignment") {
    py_text = py_text.concat(
      frame.variableName + " = " + frame.valueText
    );
  } else if (frame.kind === "comment") {
    py_text = py_text.concat("# " + frame.commentText);
  } else if (frame.kind === "statement") {
    py_text = py_text.concat(frame.statementText);
  } else if (frame.kind === "if") {
    py_text = py_text.concat(
      "if " + frame.condition + ":");   
  } else if (frame.kind === "for") {
    py_text = py_text.concat(
      "for " + frame.condition + ":");      
  }else if (frame.kind === "while") {
    py_text = py_text.concat(
      "while " + frame.condition + ":");
  } else if (frame.kind === "class") {
    py_text = py_text.concat(
      "class " + frame.name + "( pytch.Sprite ):");
  } else if (frame.kind === "def") {
    py_text = py_text.concat(
      "def " + frame.name + "(self):");
  } else if (frame.kind === "print") {
    py_text = py_text.concat("print(" + frame.printText + ")");
  } else if (frame.kind === "glide") {
    py_text = py_text.concat(
      "self.glide_to_xy(" +
        frame.Xvalue +
        ", " +
        frame.Yvalue +
        ", " +
        frame.seconds +
        ")"
    );
  } else if (frame.kind === "wait") {
    py_text = py_text.concat("pytch.wait_seconds( " + frame.seconds+")");
  } else if (frame.kind === "spriteClicked") {
    py_text = py_text.concat("@pytch.when_this_sprite_clicked");
  } else if (frame.kind === "flagClicked") {
  py_text = py_text.concat("@pytch.when_green_flag_clicked");
  } else if (frame.kind === "keyPressed") {
  py_text = py_text.concat("@pytch.when_key_pressed("+frame.key_name+")");
  } else if (frame.kind === "sayforseconds") {
  py_text = py_text.concat('self.say_for_seconds('+frame.text+', '+frame.seconds+")");
  }
  return py_text;
};

const printPreorder = (frame: PreEditableFrame, codeLines: Array<string>) => {
  if( frame.kind != "invisible" ){
    codeLines.push(printPythonCode(frame) + "\n");
  }

  if ('body' in frame) {
    for (var j = 0; j < frame.body.length; j++) {
      printPreorder(frame.body[j], codeLines);
    }
  }
};

//TODO - Implement Preprder Tree Traversal
export const PythonCode = (frames: Array<PreEditableFrame>): string => {
  let py_text = "import pytch\nimport random\n";

  // temporary root for the frames
  const rootFrame: PreEditableFrame = {
    id: 999,
    kind: "if",
    condition: "",
    editStatus: "saved",
    body: frames,
    depth: -1,
  };

  let codeLines = [py_text];

  printPreorder(rootFrame, codeLines);
  
  //let tempcode = 'import pytch\n\nclass DoubleSnake(pytch.Sprite):\n    Costumes = ["python-logo.png"]\n    @pytch.when_this_sprite_clicked\n    def say_hello(self):\n        self.say_for_seconds("Hello!", 2.0)\n    @pytch.when_key_pressed("ArrowLeft")\n    def move_left(self):\n        self.change_x(-10)\n    @pytch.when_key_pressed("ArrowRight")\n    def move_right(self):\n        self.change_x(10)\nclass GreenBurst(pytch.Stage):\n    Backdrops = ["green-burst.jpg"]'; 

  console.log(codeLines.join(""));
  return codeLines.join("");
};
