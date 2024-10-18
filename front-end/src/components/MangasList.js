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
              <section>
                <div>
                  <img
                    src={manga.imageUrl}
                    alt={manga.title + " manga cover"}
                    height={225}
                  />
                  <div>Upvotes: {manga.upvotes}</div>
                </div>

                <div>
                  <span>
                    <h3>{manga.title}</h3>
                  </span>
                  <h5>Author(s): {manga.author}</h5>
                  <p>{manga.description[0].substring(0, 150)}...</p>
                </div>
              </section>
            </Link>
          ))}
        </>
      )}
    </>
  );
};

export default MangasList;
