import React from "react";

const Comment = ({ id, text, author_id, createdAt }) => (
  <li className="comment">
    <h6 className="comment_author-letter">{author_id.name[0]}</h6>
    <section className="text">
      <p className="comment_author-name">{author_id.name}</p>
      <span>{createdAt}</span>
      <p className="clear">{text}</p>
    </section>
  </li>
);

export { Comment as default };
