import React, { useContext } from "react";
import { AmplifyAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { BookContext } from "../context/books";
import { Link } from "react-router-dom";
import { deleteBook } from "../api/mutations";
import { API, graphqlOperation } from "aws-amplify";

const Admin = () => {
  const { books } = useContext(BookContext);

  

  const deleteBoook = async(id) =>{
    try{
      await API.graphql(graphqlOperation(deleteBook, { input: {id}}));
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    } catch (err) {
      console.log("error deleting book:", err);
    }
  }

  return (
    <section className="admin-wrapper">
      <AmplifyAuthenticator style={{ margin: "20px" }}>
        <header className="form-header">
          <h3>All Book Details</h3>
          <Link to="/addbook" className="btn btn-primary">
            Add Book
          </Link>
        </header>
        <section className="allbooks">
          <table className="table align-middle mb-0 bg-white">
            <thead className="bg-light">
              <tr style={{fontSize:"17px"}}>
                <th>Title</th>
                <th>Author</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            {books.map(({ image, id, title, author, price, quantity }) => (
              <tbody key={id}>
                <tr style={{fontSize:"17px"}}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={image}
                        alt=""
                        style={{ width: "45px", height: "45px" }}
                      />
                      <div className="ms-4">
                        <p
                          className="mb-1"
                          style={{ fontWeight: "600"}}
                        >
                          {title}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">{author}</p>
                  </td>
                  <td>
                    <span
                      className="badge badge-primary rounded-pill d-inline"
                      style={{fontSize:"14px"}}
                    >
                      ${price}
                    </span>
                  </td>
                  <td>{quantity}</td>
                  <td>
                    <Link
                      to={`admin/${id}`}
                      className="btn btn-link btn-sm btn-rounded"
                      style={{fontSize:"14px"}}
                    >
                      EDIT
                    </Link>
                    <button
                      className="btn btn-link btn-sm btn-rounded"
                      style={{color:"red", fontSize:"14px"}}
                      onClick={()=>{deleteBoook(id)}}
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
          <div className="mt-5">
            <AmplifySignOut></AmplifySignOut>
          </div>
        </section>
      </AmplifyAuthenticator>
    </section>
  );
};

export default Admin;
