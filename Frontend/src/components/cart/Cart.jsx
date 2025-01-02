import { useState, useEffect, useContext } from "react";
import { userLoginContext } from "../../contexts/UserLoginContext";
import { MdDeleteOutline } from "react-icons/md";
import "./Cart.css";

function Cart() {
  let { currentUser } = useContext(userLoginContext);
  let [cart, setCart] = useState([]);

  console.log(currentUser);

  // Get latest cart
  async function getUserCart() {
    if (currentUser) {
      let res = await fetch(`http://localhost:4000/user-api/cart/${currentUser.username}`);
      let data = await res.json();
      setCart(data.payload.products);
    }
  }

  useEffect(() => {
    getUserCart();
  }, [currentUser]);

  // Delete product from cart
  async function deleteProduct(productId) {
    let res = await fetch(`http://localhost:4000/user-cart/${productId}`, {
      method: "DELETE",
    });
    console.log(res);
    getUserCart();
  }

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>No items in the cart.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={item.id || index}>
                <td>{item.title}</td>
                <td>${item.price}</td>
                <td>{item.quantity}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => deleteProduct(item.id)}>
                    <MdDeleteOutline /> Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
  
}

export default Cart;
