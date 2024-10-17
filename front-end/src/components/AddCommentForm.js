import axios from "axios";
import React, { useState } from "react";

const AddCommentForm = ({ mangaId, onMangaUpdated }) => {
  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");

  const AddComment = async () => {
    if (name !== "" && commentText !== "") {
      const response = await axios.post(`/api/mangas/${mangaId}/comments`, {
        postedBy: name,
        text: commentText,
      });

      const updatedManga = response.data;
      onMangaUpdated(updatedManga);
      setName("");
      setCommentText("");
    }
  };

  return (
    <div id="add-comment-form">
      <h3>Add a Comment</h3>
      <label>
        Name:
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          required
        />
      </label>
      <label>
        Comment:
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          rows={4}
          cols={50}
          required
        />
      </label>
      <button onClick={AddComment}>Add Comment</button>
    </div>
  );
};

export default AddCommentForm;
