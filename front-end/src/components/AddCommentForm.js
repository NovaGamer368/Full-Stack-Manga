import axios from "axios";
import React, { useState } from "react";
import useUser from "../hooks/useUser";

const AddCommentForm = ({ mangaId, onMangaUpdated }) => {
  const [commentText, setCommentText] = useState("");

  const { user } = useUser();

  const AddComment = async () => {
    if (commentText !== "") {
      const token = user && (await user.getIdToken());
      const headers = token ? { authtoken: token } : {};

      const response = await axios.post(
        `/api/mangas/${mangaId}/comments`,
        {
          text: commentText,
        },
        { headers: headers }
      );

      const updatedManga = response.data;
      onMangaUpdated(updatedManga);
      setCommentText("");
    }
  };

  return (
    <div id="add-comment-form">
      <h3>Add a Comment</h3>
      {user && <p>You are posting as {user.email}</p>}
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        rows={4}
        cols={50}
        required
      />
      <button onClick={AddComment}>Add Comment</button>
    </div>
  );
};

export default AddCommentForm;
