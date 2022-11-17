import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { AmplifyAuthenticator } from "@aws-amplify/ui-react";
import { createBook } from "../api/mutations";
import config from "../aws-exports";
import { Link } from "react-router-dom";

const {
  aws_user_files_s3_bucket_region: region,
  aws_user_files_s3_bucket: bucket,
} = config;

const AddBook = () => {
  const [image, setImage] = useState(null);
  const [bookDetails, setBookDetails] = useState({
    title: "",
    description: "",
    image: "",
    author: "",
    quantity: "",
    price: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!bookDetails.title || !bookDetails.price) return;
      await API.graphql(graphqlOperation(createBook, { input: bookDetails }));

      // eslint-disable-next-line no-restricted-globals
      location.reload();
    } catch (err) {
      console.log("error creating book:", err);
    }
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const extension = file.name.split(".")[1];
    const name = file.name.split(".")[0];
    const key = `images/${uuidv4()}${name}.${extension}`;
    const url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;
    try {
      // Upload the file to s3 with public access level.
      await Storage.put(key, file, {
        level: "public",
        contentType: file.type,
      });
      // Retrieve the uploaded file to display
      const image = await Storage.get(key, { level: "public" });
      setImage(image);
      setBookDetails({ ...bookDetails, image: url });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="admin-wrapper">
      <AmplifyAuthenticator style={{ margin: "20px" }}>
        <section className="form">
          <header className="form-header">
            <h3>Add New Book</h3>
            <Link to="/admin" className="btn btn-primary">
              All Books
            </Link>
          </header>

          <form onSubmit={handleSubmit}>
            <div className="mb-4 row">
              <label className="col-sm-2 col-form-label">Image</label>
              <div className="col-sm-10">
                {image ? (
                  <img className="image-preview" src={image} alt="img" style={{marginRight:"15%"}} />
                ) : (
                  <input
                    type="file"
                    accept="image/jpg"
                    onChange={(e) => handleImageUpload(e)}
                    className="form-control"
                    required
                  />
                )}
              </div>
            </div>

            <div className="mb-4 row">
              <label className="col-sm-2 col-form-label">Title</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  onChange={(e) =>
                    setBookDetails({ ...bookDetails, title: e.target.value })
                  }
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
                  placeholder="Type the author's name"
                  onChange={(e) =>
                    setBookDetails({ ...bookDetails, author: e.target.value })
                  }
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
                  placeholder="Type the description of the book"
                  onChange={(e) =>
                    setBookDetails({
                      ...bookDetails,
                      description: e.target.value,
                    })
                  }
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
                    placeholder="What is the Price of the book (USD)"
                    onChange={(e) =>
                      setBookDetails({ ...bookDetails, price: e.target.value })
                    }
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
                  placeholder="How many books"
                  onChange={(e) =>
                    setBookDetails({
                      ...bookDetails,
                      quantity: e.target.value,
                    })
                  }
                  required
                  className="form-control"
                  autoComplete={"off"}
                />
              </div>
            </div>

            <div className="form-check d-flex justify-content-center mb-4">
              <input
                className="form-check-input me-2"
                type="checkbox"
                value=""
                id="form6Example8"
                checked={bookDetails.featured}
                onChange={() =>
                  setBookDetails({
                    ...bookDetails,
                    featured: !bookDetails.featured,
                  })
                }
              />
              <label className="form-check-label" for="form6Example8">
                {" "}
                Featured?{" "}
              </label>
            </div>

            <div className="mb-3 row">
              <div className="col-sm-2"></div>
              <div className="col-sm-10">
                <button
                  type="submit"
                  className="btn btn-primary btn-block mb-4"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </section>
      </AmplifyAuthenticator>
    </section>
  );
};

export default AddBook;
