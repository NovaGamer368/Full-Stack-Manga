import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NotFoundPage from "./NotFoundPage";
import CommentsList from "../components/CommentsList";
import AddCommentForm from "../components/AddCommentForm";

const MangaPage = () => {
  const [mangaInfo, setMangaInfo] = useState({ upvotes: 0, comments: [] });
  const { mangaId } = useParams();

  useEffect(() => {
    const loadMangaInfo = async () => {
      const response = await axios.get(`/api/mangas/${mangaId}`);
      const newMangaInfo = response.data;
      setMangaInfo(newMangaInfo);
    };
    loadMangaInfo();
  }, []);

  const addUpvote = async () => {
    const response = await axios.put(`/api/mangas/${mangaId}/upvote`);
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
        <button className="upvote-btn" onClick={addUpvote}>
          Upvote
        </button>
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
      <AddCommentForm
        mangaId={mangaId}
        onMangaUpdated={(updatedManga) => setMangaInfo(updatedManga)}
      />
    </div>
  );
};

export default MangaPage;
