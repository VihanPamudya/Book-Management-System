import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="hero">
            <h2>Nerdcast Book Store</h2>
            <h3>The world is a book and those who do not travel <br/> read only one page</h3>
            <Link className="home_btn" to="/books">View All Books</Link>
        </section>
    )
}

export default Hero
