import React from "react";
import { Link } from "react-router-dom";

const Post = ({ id, title, body }) => (
  <li>
    <Link to={`/post/${id}`}>
      <h4> {title} </h4>
      <p> {body} </p>
    </Link>
  </li>
);

export { Post as default };
