import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="main-head">
            <nav>
                <h1 id="logo">Walden</h1>
                <ul>
                    <li>
                        <Link className='h_names' to="/">Home</Link>
                    </li>
                    <li>
                        <Link className='h_names' to="/books">Books</Link>
                    </li>
                    <li>
                        <Link className='h_names' to="/cart">Cart</Link>
                    </li>
                    <li>
                        <Link className='h_names' to="/checkout">Checkout</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
