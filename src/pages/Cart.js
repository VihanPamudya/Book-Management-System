import React, { useContext } from "react";
import { CartContext } from "../context/cart";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
  const history = useHistory();
  const { cart, total, increaseAmount, decreaseAmount, clearCart } =
    useContext(CartContext);

  if (!cart.length) {
    return <h3>Empty Cart</h3>;
  }
  return (
    <section class="gradient-custom">
      <div class="container py-5">
        <div class="row d-flex justify-content-center my-4" style={{backgroundColor:"lightGray"}}>
          <div class="col-md-8">
            <div class="card mb-4">
              <div class="card-header py-3 d-flex justify-content-between">
                <h5 class="mb-0">My Cart</h5>
                <button
                          type="button"
                          class="btn btn-danger btn-sm me-1 mb-2"
                          data-mdb-toggle="tooltip"
                          title="Remove item"
                          onClick={() => clearCart()}
                        >
                          <FontAwesomeIcon icon={faTrashCan} style={{width:"14px",height:"14px"}} />
                        </button>
              </div>
              <div class="card-body">
                {cart.map(({ id, title, price, image, amount }) => (
                  <article key={id}>
                    <div class="row">
                      <div className="col-lg-3 col-md-12 mb-4 mb-lg-0" style={{height:"25vh"}}>
                        <div
                          class="bg-image hover-overlay hover-zoom ripple rounded"
                          data-mdb-ripple-color="light"
                          style={{height:"25vh"}}
                        >
                          <img
                            src={image}
                            class="w-100"
                            alt="Blue Jeans Jacket"
                          />
                          <a href="#!">
                            <div class="mask"></div>
                          </a>
                        </div>
                      </div>

                      <div class="col-lg-5 col-md-6 mb-4 mb-lg-0">
                        <p>
                          <strong>{title}</strong>
                        </p>
                        
                      </div>

                      <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
                        <div class="d-flex mb-4" style={{marginLeft:"70px"}}>
                          <button
                            class="btn btn-primary px-3 me-2"
                            onClick={() => decreaseAmount(id, amount)}
                          >
                            <FontAwesomeIcon icon={faMinus} />
                          </button>

                          <p className="mt-3">{amount}</p>

                          <button
                            class="btn btn-primary px-3 ms-2"
                            onClick={() => increaseAmount(id)}
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </button>
                        </div>

                        <p style={{width:"250px", textAlign:"center"}}>
                          <strong>${price}</strong>
                        </p>
                      </div>
                    </div>
                    <hr class="my-4" />
                  </article>
                ))}
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card mb-4">
              <div class="card-header py-3">
                <h5 class="mb-0">Summary</h5>
              </div>
              <div class="card-body">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Products
                    <span>${total}</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount</strong>
                    </div>
                    <span>
                      <strong>${total}</strong>
                    </span>
                  </li>
                </ul>
                <button
                  type="button"
                  class="btn btn-primary btn-lg btn-block"
                  onClick={() => history.push("/checkout")}
                >
                  Go to checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
