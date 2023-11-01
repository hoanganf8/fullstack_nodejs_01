import React from "react";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

const Post = () => {
  return (
    <div className="container py-3">
      <h2>Thông tin bài viết</h2>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident
        adipisci accusantium nisi sit optio sint dignissimos distinctio expedita
        aperiam eum? Obcaecati sint reprehenderit accusamus magni harum
        aspernatur pariatur officiis. Aliquam.
      </p>
      <CommentList />
      <CommentForm />
    </div>
  );
};

export default Post;
