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
    <>
      <h1>MangaPage wth the ID of {mangaId}</h1>
      <div className="upvotes-section">
        <button onClick={addUpvote}>Upvote</button>
        <p>This manga has {mangaInfo.upvotes} upvote(s)</p>
      </div>
      {mangaInfo?.description.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      <AddCommentForm
        mangaId={mangaId}
        onMangaUpdated={(updatedManga) => setMangaInfo(updatedManga)}
      />
      <CommentsList comments={mangaInfo.comments} />
    </>
  );
};

export default MangaPage;
