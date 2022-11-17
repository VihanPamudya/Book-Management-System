import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BookContext } from "../context/books";

const Books = () => {
  const { books } = useContext(BookContext);

  if (!books.length) {
    return <h3>No Books Available</h3>;
  }

  return (
    <section className="books">
      {books.map(({ image, id, title}) => (
        <article key={id} className="book">
          <div className="card">
            <img className="card-img-top" src={image} alt={title} />
            <div className="card-body-book">
              <h5 className="card-title">{title}</h5>
              <Link to={`books/${id}`} className="btn btn-primary mt-2">
                details
              </Link>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
};

export default Books;
