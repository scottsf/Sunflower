import React from "react";
import { Link } from "react-router-dom";

const Post = ({ id, title, body, totalLikes}) => (
  <li>
    <Link to={`/post/${id}`}>
      <h4> {title} </h4>
      <p> {body} </p>
      <p>Total likes: {totalLikes}</p>
    </Link>
  </li>
);

export { Post as default };
