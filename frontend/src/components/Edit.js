import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export default function Edit({ editLink, onDelete }) {
  return (
    <Fragment>
      <span style={{ marginLeft: "10px" }}>
        <Link to={editLink} style={{ color: "green" }}>
          <FontAwesomeIcon icon={faEdit} />
        </Link>
      </span>
      <span style={{ marginLeft: "10px" }}>
        <a onClick={() => onDelete()} style={{ color: "red" }}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </a>
      </span>
    </Fragment>
  );
}
