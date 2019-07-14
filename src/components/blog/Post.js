import React from "react";
import { Link } from "react-router-dom";

const Post = ({ id, title, body, image, totalLikes }) => (
  <li
    className="post"
    style={{
      background: `url(${image}) center center / cover no-repeat`,
      // width: "50px"
    }}
  >
    <Link to={`/post/${id}`}>
      <div className="container">
        <h4> {title} </h4>
        <h5> {body} </h5>
        <p>Total likes: {totalLikes}</p>
      </div>
    </Link>
  </li>
);

export { Post as default };
