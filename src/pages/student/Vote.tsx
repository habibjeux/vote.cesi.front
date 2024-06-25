// Vote.js
import React from "react";
import { useOutletContext } from "react-router-dom";

function Vote() {
  const { student } = useOutletContext();

  return (
    <div>
      <h2>Vote Page</h2>
      {student && (
        <div>
          <p>Name: {student.name}</p>
          <p>ID: {student.firstName}</p>
          {/* Render other student details as needed */}
        </div>
      )}
    </div>
  );
}

export default Vote;
