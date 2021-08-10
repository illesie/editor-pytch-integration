import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import { JoiningSessionState } from "../model/study-session";
import { useStoreActions } from "../store";
import { SessionToken } from "../database/study-server";

const maybeJoinStudyCode = () => {
  const joinMatcher = new RegExp("/join/([0-9a-f-]*)$");
  const joinMatch = joinMatcher.exec(window.location.href);
  return joinMatch == null ? null : joinMatch[1];
};

const ActionPendingSpinner = () => {
  return (
    <div className="modal-waiting-spinner">
      <Spinner animation="border" variant="primary" />
    </div>
  );
};

const JoinStudyModal: React.FC<JoiningSessionState> = (props) => {
  const [code, setCode] = useState("");

  const requestSession = useStoreActions(
    (actions) => actions.sessionState.requestSession
  );
  const setSession = useStoreActions(
    (actions) => actions.sessionState.setSession
  );

  const submit = () =>
    requestSession({
      studyCode: props.studyCode,
      participantCode: code,
    });

  const joinFun = (token: SessionToken) => () =>
    setSession({ token, next: "go-to-homepage" });

  const button = (() => {
    const phase = props.phase;
    switch (phase.status) {
      case "awaiting-user-input":
        return <Button onClick={submit}>Join</Button>;
      case "requesting-session":
        return <Button disabled>Joining...</Button>;
      case "awaiting-user-ok":
        return <Button onClick={joinFun(phase.token)}>OK</Button>;
    }
  })();

  const textPara = (() => {
    switch (props.phase.status) {
      case "awaiting-user-input":
      case "requesting-session":
        return <p>Please enter your participant code:</p>;
      case "awaiting-user-ok":
        return <p>You have successfully joined the study.</p>;
    }
  })();

  const needRetryPara =
    props.nFailedAttempts > 0 && props.phase.status !== "awaiting-user-ok";

  const retryPara = needRetryPara && (
    <p className="try-again-alert">
      Sorry, that participant code was not recognised. Please check it and try
      again.
    </p>
  );

  return (
    <div className="join-study-form-container">
      <Form>
        <h2>Pytch: Join study</h2>
        <p>Thank you for making Pytch better by taking part in this study.</p>
        {textPara}
        {props.phase.status !== "awaiting-user-ok" && (
          <Form.Control
            type="text"
            readOnly={props.phase.status !== "awaiting-user-input"}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Participant code"
          />
        )}
        {retryPara}
        <div className="buttons">{button}</div>
      </Form>
    </div>
  );
};

export const StudySessionManager = () => {
  return (
    <div className="App">
    </div>
  );
};
