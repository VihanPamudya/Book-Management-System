import React, { useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { BookContext } from "../context/books";
import { CartContext } from "../context/cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const BookDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const { books } = useContext(BookContext);
  const { addToCart } = useContext(CartContext);

  const book = books.find((book) => {
    return book.id === id;
  });
  if (!book) {
    return <h3>Loading...</h3>;
  }

  const { image: url, title, description, author, quantity, price } = book;

  return (
    <section className="book-details">
      {/* <div className="detail-image">
        <img src={url} alt="10x Rule" />
      </div>
      <div className="detail-description">
        <h2>{title}</h2>
        <p>{description}</p>
        <h3>{author}</h3>
        <h3>{quantity}</h3>
        <h4>Price - $ {price}</h4>
        <button
          className="btn"
          onClick={() => {
            addToCart({ ...book, id });
            history.push("/cart");
          }}
        >
          Add to Cart
        </button>
      </div> */}

      <div className="container bootdey">
        <div className="col-md-12">
          <section className="panel">
            <div className="d-flex">
              <div className="col-md-6" style={{ marginRight: "50px" }}>
                <div className="pro-img-details">
                  <img
                  style={{height:"500px"}}
                    src={url}
                    alt={title}
                  />
                </div>
              </div>
              <div className="col-md-6" style={{ marginRight: "50px" }}>
                <h2 className="mt-5">{title}</h2>
                <p className="desc mt-4">{description}</p>
                <hr />
                <div className="Author mt-4">
                  <span className="posted_in">
                    {" "}
                    <strong>Author : {author}</strong>
                  </span>
                </div>
                <div className="Quantity mt-2">
                  <span className="posted_in">
                    {" "}
                    <strong>Quantity : {quantity}</strong>
                  </span>
                </div>
                <div className="Price mt-2">
                  {" "}
                  <strong>Price : </strong>{" "}
                  <span className="pro-price"> ${price}</span>
                </div>
                <p>
                  <button
                    className="btn btn-round btn-danger mt-5"
                    type="button"
                    onClick={() => {
                      addToCart({ ...book, id });
                      history.push("/cart");
                    }}
                  >
                    <FontAwesomeIcon
                      style={{ marginRight: "10px" }}
                      icon={faShoppingCart}
                    />
                    Add to Cart
                  </button>
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default BookDetails;
