import React from "react";
import { useParams } from "react-router-dom";
import mangas from "../components/manga-content";

const MangaPage = () => {
  const { mangaId } = useParams();

  const manga = mangas.find((manga) => manga.id === mangaId);
  return (
    <>
      <h1>MangaPage wth the ID of {mangaId}</h1>
      {manga?.content.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </>
  );
};

export default MangaPage;
