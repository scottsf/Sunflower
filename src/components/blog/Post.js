import React from "react";
import { Link } from "react-router-dom";

const Post = ({ id, title, body, totalLikes }) => (
  <li className="post"
    style={{background: `url('https://images.unsplash.com/photo-1560775664-5010c750aeed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80') 
    center center / cover no-repeat
    `}}
  
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
