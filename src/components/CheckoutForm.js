import React, { useState, useEffect, useContext } from "react";
import { BookContext } from "../context/books";
import { CartContext } from "../context/cart";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const CheckoutForm = () => {
  const { cart, total } = useContext(CartContext);
  const { checkout } = useContext(BookContext);
  const [orderDetails, setOrderDetails] = useState({
    cart,
    total,
    address: null,
    token: null,
  });
  const [error, setError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (orderDetails.token) {
      checkout(orderDetails);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderDetails]);

  // Handle real-time validation errors from the card Element.
  const handleChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  // Handle form submission.
  const handleSubmit = async (event) => {
    event.preventDefault();
    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    if (result.error) {
      // Inform the user if there was an error.
      setError(result.error.message);
    } else {
      setError(null);
      // Send the token to your server.
      const token = result.token;
      setOrderDetails({ ...orderDetails, token: token.id });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5">
      <div class="form-group mb-4">
      <label class="form-label" for="form6Example6">
          Shipping Address
        </label>
        <input
          type="text"
          class="form-control form-control-lg"
          id="checkout-address"
          onChange={(e) =>
            setOrderDetails({ ...orderDetails, address: e.target.value })
          }
          placeholder="Enter the shipping Address"
          autoComplete={"off"}
        />
      </div>

      <div class="mb-4">
        <div className="stripe-section">
          <label htmlFor="stripe-element" className="mb-1"> Credit or debit card </label>
          <CardElement
            id="stripe-element"
            options={CARD_ELEMENT_OPTIONS}
            onChange={handleChange}
          />
        </div>
        <div className="card-errors" role="alert">
          {error}
        </div>
      </div>

      <button class="btn btn-primary btn-lg btn-block" type="submit">Submit Payment</button>
    </form>
  );
};

export default CheckoutForm;
