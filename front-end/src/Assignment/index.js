import React, { useEffect, useState } from "react";
import ajax from "../Services/fetchService";
import { useLocalState } from "../util/useLocalStorage";

const AssignmentView = () => {
  const assignmentsID = window.location.href.split("/assignments/")[1];
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [assignments, setAssignments] = useState({
    branch: "",
    githubUrl: "",
  });

  useEffect(() => {
    ajax("/api/assignments/" + assignmentsID, "GET", jwt).then((data) => {
      if (data.branch === null) data.branch = "";
      if (data.githubUrl === null) data.githubUrl = "";
      setAssignments(data);
      console.log("data: ");
      console.log(data);
    });
  }, []);

  function save() {
    ajax(
      "/api/assignments/updateAssignment/" + assignmentsID,
      "POST",
      jwt,
      assignments
    ).then((data) => {
      console.log("data: ");
      console.log(data);
    });
  }

  function updateAssignment(props, value) {
    const newAssignment = { ...assignments };
    newAssignment[props] = value;
    setAssignments(newAssignment);
    console.log(assignments);
  }

  return (
    <div>
      <h1 className="assignmentsID">Assignment{" " + assignmentsID}</h1>
      {assignments ? (
        <h1>Assignment status:{" " + assignments.status}</h1>
      ) : (
        <></>
      )}
      <h1>
        {" "}
        <label htmlFor="branch">
          Branch:
          <input
            type="text"
            id="branch"
            onChange={(e) => updateAssignment("branch", e.target.value)}
            value={assignments.branch}
          />
        </label>
        <br></br>
      </h1>

      <h1>
        <label htmlFor="githubURL">
          GithubURL:
          <input
            id="githubURL"
            onChange={(e) => updateAssignment("githubUrl", e.target.value)}
            value={assignments.githubUrl}
          />
        </label>
        <br></br>
      </h1>
      <button onClick={() => save()}>Submit</button>
    </div>
  );
};

export default AssignmentView;
