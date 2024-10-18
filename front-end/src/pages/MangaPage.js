import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NotFoundPage from "./NotFoundPage";
import CommentsList from "../components/CommentsList";
import AddCommentForm from "../components/AddCommentForm";
import useUser from "../hooks/useUser";

const MangaPage = () => {
  const [mangaInfo, setMangaInfo] = useState({ upvotes: 0, comments: [] });
  const { mangaId } = useParams();

  const { canUpvote } = mangaInfo;

  const { user, isLoading } = useUser();

  useEffect(() => {
    const loadMangaInfo = async () => {
      const token = user && (await user.getIdToken());
      const headers = token ? { authtoken: token } : {};

      const response = await axios.get(`/api/mangas/${mangaId}`, {
        headers: headers,
      });
      const newMangaInfo = response.data;
      setMangaInfo(newMangaInfo);
    };

    if (isLoading) {
      loadMangaInfo();
    }
  }, [isLoading, user]);

  const addUpvote = async () => {
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};

    const response = await axios.put(`/api/mangas/${mangaId}/upvote`, null, {
      headers: headers,
    });
    const updatedManga = response.data;
    setMangaInfo(updatedManga);
  };

  if (!mangaInfo._id) {
    return <NotFoundPage />;
  }

  return (
    <div className="manga-page-container">
      <h1>{mangaInfo.title}</h1>
      <h3>Author(s): {mangaInfo.author}</h3>

      <div className="upvotes-section">
        {user ? (
          <button className="upvote-btn" onClick={addUpvote}>
            {canUpvote ? "Upvote" : "Already Upvoted"}
          </button>
        ) : (
          <button className="upvote-btn"> Login to Upvote</button>
        )}
        <p>This manga has {mangaInfo.upvotes} upvote(s)</p>
      </div>
      <img
        src={mangaInfo.imageUrl}
        alt={`${mangaInfo.title} manga cover`}
        className="manga"
      />

      {mangaInfo?.description.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      <CommentsList comments={mangaInfo.comments} />

      {user ? (
        <AddCommentForm
          mangaId={mangaId}
          onMangaUpdated={(updatedManga) => setMangaInfo(updatedManga)}
        />
      ) : (
        <button className="comment-check">Login to Comment</button>
      )}
    </div>
  );
};

export default MangaPage;
