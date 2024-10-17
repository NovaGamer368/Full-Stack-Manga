import React from "react";
import { Link } from "react-router-dom";

const MangasList = ({ mangas }) => {
  return (
    <>
      {mangas && (
        <>
          {mangas.map((manga) => (
            <Link
              key={manga._id}
              className="manga-list-item"
              to={`/mangas/${manga._id}`}
            >
              <div>
                <img
                  src={manga.imageUrl}
                  alt={manga.title + " manga cover"}
                  height={200}
                  width={143}
                />
                <section>
                  <h3>{manga.title}</h3>
                  <p>{manga.description[0].substring(0, 150)}...</p>
                </section>
              </div>
            </Link>
          ))}
        </>
      )}
    </>
  );
};

export default MangasList;
