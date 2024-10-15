import React from "react";
import mangas from "../components/manga-content";
import MangasList from "../components/MangasList";

const MangaListPage = () => {
  return (
    <>
      <h1>Manga List</h1>
      <MangasList mangas={mangas} />
    </>
  );
};

export default MangaListPage;
