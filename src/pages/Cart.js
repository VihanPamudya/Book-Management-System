import React, { useContext } from "react";
import { CartContext } from "../context/cart";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";


const Cart = () => {
  const history = useHistory();
  const { cart, total, increaseAmount, decreaseAmount, clearCart } =
    useContext(CartContext);

  if (!cart.length) {
    return <h3>Empty Cart</h3>;
  }
  return (
    <section>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12">
            <div
              className="card card-registration card-registration-2"
              style={{ borderRadius: "15px" }}
            >
              <div className="card-body p-0">
                <div className="row g-0">
                  <div className="col-lg-8">
                    <div className="p-5">
                      <div className="d-flex justify-content-between align-items-center mb-5">
                        {/* <div className="clearCart">
                          <button onClick={() => clearCart()}>clear</button>
                        </div> */}
                        <h1 className="fw-bold mb-0 text-black">My Cart</h1>
                        <h6 className="mb-0 text-muted">3 items</h6>
                      </div>
                      <hr className="my-4" />

                      {cart.map(({ id, title, price, image, amount }) => (
                        <article key={id}>
                          <div
                            className="row mb-4 d-flex justify-content-between align-items-center"
                            key={id}
                          >
                            <div className="col-md-2 col-lg-2 col-xl-2">
                              <img
                                src={image}
                                className="img-fluid rounded-3"
                                alt="cart item"
                              />
                            </div>
                            <div className="col-md-3 col-lg-3 col-xl-3">
                              <h6 className="text-black mb-0">{title}</h6>
                            </div>
                            <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                              <button
                                className="btn btn-link px-2"
                                onClick={() => decreaseAmount(id, amount)}
                              >
                                <FontAwesomeIcon icon={faMinus} />
                              </button>

                              <p className="mt-3">{amount}</p>
                              
                              <button
                                className="btn btn-link px-2"
                                onClick={() => increaseAmount(id)}
                              >
                               <FontAwesomeIcon icon={faPlus} />
                              </button>
                            </div>
                            <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                              <h6 className="mb-0">$ {price}</h6>
                            </div>
                            <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                              <a href="#!" className="text-muted">
                                <i className="fas fa-times"></i>
                              </a>
                            </div>
                          </div>
                          <hr className="my-4" />
                        </article>
                      ))}
                    </div>
                  </div>
                  <div className="col-lg-4 bg-grey">
                    <div className="p-5">
                      <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-5">
                        <h5 className="text-uppercase">Total price</h5>
                        <h5>$ {total}</h5>
                      </div>

                      <button
                        type="button"
                        className="btn btn-dark btn-block btn-lg"
                        data-mdb-ripple-color="dark"
                        onClick={() => history.push("/checkout")}
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
