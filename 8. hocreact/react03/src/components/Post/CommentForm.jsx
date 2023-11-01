import React from "react";

const CommentForm = () => {
  return (
    <form>
      <div className="mb-3">
        <input type="text" className="form-control" placeholder="Tên..." />
      </div>
      <div className="mb-3">
        <textarea className="form-control" placeholder="Nội dung..."></textarea>
      </div>
      <div className="text-end">
        <button type="submit" className="btn btn-primary">
          Bình luận
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
