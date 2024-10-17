import React, { useEffect, useState } from "react";
import mangas from "../components/manga-content";
import MangasList from "../components/MangasList";
import axios from "axios";

const MangaListPage = () => {
  const [mangaList, setMangaList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchManga = async () => {
      const response = await axios.get("/api/mangas");
      const data = response.data;
      console.log(data);
      setMangaList(data);
      setIsLoading(false);
    };
    fetchManga();
  }, []);
  if (isLoading) {
    return <h1>LOADING...</h1>;
  }
  return (
    <>
      <h1>Manga List</h1>
      <MangasList mangas={mangaList} />
    </>
  );
};

export default MangaListPage;
