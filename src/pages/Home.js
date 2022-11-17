import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";

import { BookContext } from "../context/books";

const Home = () => {
  const { featured } = useContext(BookContext);
  if (!featured.length) {
    return <h3>No Featured Books</h3>;
  }
  return (
    <>
      <Hero />
      <section className="featured">
        <header className="featured-head">
          <h3>Featured Collection</h3>
        </header>
        <div className="books featured-list">
          {featured.map(({ id, image, title}) => (
            <article key={id} className="home">
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
        </div>
      </section>
    </>
  );
};

export default Home;
