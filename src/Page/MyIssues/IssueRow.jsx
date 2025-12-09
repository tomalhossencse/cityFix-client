import React from "react";
import { DateFormat } from "../../Utility/FormateDate";

const IssueRow = ({ issue, index }) => {
  const {
    issueTitle,
    createAt,
    photo,
    district,
    region: Region,
    priority,
    status,
    upvoteCount,
    category,
    displayName,
    number,
    email,
    trackingId,
    _id,
    information,
    area,
  } = issue;
  return (
    <tr>
      <th>{index + 1}</th>
      <td>{issueTitle}</td>
      <td>{trackingId}</td>
      <td>{DateFormat(createAt)}</td>
      <td>{status}</td>
      <td>
        <button className="btn-small">Edit</button>
        <button className="btn-small-red">Delete</button>
      </td>
    </tr>
  );
};

export default IssueRow;
