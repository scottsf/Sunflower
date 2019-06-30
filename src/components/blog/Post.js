import React from "react";
import { Link } from "react-router-dom";

const Post = ({ id, title, body, image, totalLikes }) => (
  <li
    className="post"
    style={{
      background: `url(${image}) center center / cover no-repeat`
    }}
  >
    <Link to={`/post/${id}`}>
      <div className="container">
        <h4> {title} </h4>
        <p> {body} </p>
        <p>Total likes: {totalLikes}</p>
      </div>
    </Link>
  </li>
);

export { Post as default };
