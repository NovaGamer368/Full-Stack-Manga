import React from "react";
import dayjs from "dayjs";

const CommentsList = ({ comments }) => {
  return (
    <>
      <h3>Comments:</h3>
      {comments.map((comment) => (
        <div className="comment" key={comment.postedBy + ": " + comment.text}>
          <div className="comment-title">
            <h4>{comment.postedBy}</h4>
            <p>{dayjs(comment.postedAt).format("M/DD/YYYY h:mmA")}</p>
          </div>
          <p>{comment.text}</p>
        </div>
      ))}
    </>
  );
};

export default CommentsList;
