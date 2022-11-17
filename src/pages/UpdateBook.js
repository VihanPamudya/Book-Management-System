import React, { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { AmplifyAuthenticator } from "@aws-amplify/ui-react";
import { updateBook } from "../api/mutations";
import { Link } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";
import { getBook } from "../api/queries";

const UpdateBook = () => {
  const { id } = useParams();
  let history = useHistory();
  const [bookDetails, setBookDetails] = useState({
    title: "",
    description: "",
    author: "",
    quantity: "",
    price: "",
  });

  const { title, description, author, quantity, price } = bookDetails;
  const onInputChange = (e) => {
    setBookDetails({ ...bookDetails, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadBook();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadBook = async () => {
    const result = await API.graphql(graphqlOperation(getBook, { id: id }));
    setBookDetails(result.data.getBook);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataObj = {
      id: bookDetails.id,
      title: bookDetails.title,
      description: bookDetails.description,
      author: bookDetails.author,
      quantity: bookDetails.quantity,
      price: bookDetails.price,
    };
    try {
      await API.graphql(graphqlOperation(updateBook, { input: dataObj }));
      history.push("/admin");
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    } catch (err) {
      console.log("error updating book:", err);
    }
  };

  return (
    <section className="admin-wrapper">
      <AmplifyAuthenticator style={{ margin: "20px" }}>
        <section className="form">
          <header className="form-header">
            <h3>Update Book</h3>
            <Link to="/admin" className="btn btn-primary">
              All Books
            </Link>
          </header>

          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-4 row">
              <label className="col-sm-2 col-form-label">Title</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => onInputChange(e)}
                  required
                  className="form-control"
                  placeholder="Type the book name"
                  autoComplete={"off"}
                />
              </div>
            </div>

            <div className="mb-4 row">
              <label className="col-sm-2 col-form-label">Author</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  name="author"
                  value={author}
                  onChange={(e) => onInputChange(e)}
                  placeholder="Type the author's name"
                  required
                  className="form-control"
                  autoComplete={"off"}
                />
              </div>
            </div>

            <div className="mb-4 row">
              <label className="col-sm-2 col-form-label">Description</label>
              <div className="col-sm-10">
                <textarea
                  className="form-control"
                  rows="4"
                  name="description"
                  value={description}
                  onChange={(e) => onInputChange(e)}
                  placeholder="Type the description of the book"
                  required
                  autoComplete={"off"}
                ></textarea>
              </div>
            </div>

            <div className="mb-4 row">
              <label className="col-sm-2 col-form-label"> Price ($)</label>
              <div className="col-sm-4">
                <div className="input-group">
                  <input
                    type="text"
                    name="price"
                    value={price}
                    onChange={(e) => onInputChange(e)}
                    placeholder="What is the Price of the book (USD)"
                    required
                    className="form-control"
                    autoComplete={"off"}
                  />
                </div>
              </div>
              <label className="col-sm-2 col-form-label">Quantity</label>
              <div className="col-sm-4">
                <input
                  type="text"
                  name="quantity"
                  value={quantity}
                  onChange={(e) => onInputChange(e)}
                  placeholder="How many books"
                  required
                  className="form-control"
                  autoComplete={"off"}
                />
              </div>
            </div>

            <div className="mb-3 row">
              <div className="col-sm-2"></div>
              <div className="col-sm-10">
                <button
                  type="submit"
                  className="btn btn-primary btn-block mb-4"
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </section>
      </AmplifyAuthenticator>
    </section>
  );
};

export default UpdateBook;
