import React from "react";
import { Link } from "react-router-dom";

const MangasList = ({ mangas }) => {
  return (
    <>
      {mangas?.map((manga) => (
        <Link
          key={manga.id}
          className="manga-list-item"
          to={`/mangas/${manga.id}`}
        >
          <h3>{manga.title}</h3>
          <p>{manga.content[0].substring(0, 150)}...</p>
        </Link>
      ))}
    </>
  );
};

export default MangasList;
