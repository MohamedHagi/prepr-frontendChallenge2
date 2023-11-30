import React from "react";

export default function Success({}) {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="successPage">
      <h1>Success!</h1>
      {!!user && (
        <>
          <h3> First Name: {user.firstName}</h3>
          <h3> Last Name: {user.lastName}</h3>
          <h3> Username: {user.username}</h3>
          <h3> Email: {user.email}</h3>
          <h3> User Type: {user.userType}</h3>
          <h3> Language: {user.language}</h3>
        </>
      )}
    </div>
  );
}
