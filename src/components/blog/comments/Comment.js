import React from "react";

const Comment = ({ id, text }) => <li key={id}>{text}</li>;

export { Comment as default };
