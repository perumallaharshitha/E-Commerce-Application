import './Product.css';
import { useContext } from 'react';
import { userLoginContext } from '../../contexts/UserLoginContext';
import { useNavigate } from 'react-router-dom';

function Product({ productObj }) {
  let { currentUser } = useContext(userLoginContext);
  let navigate = useNavigate();

  async function addProductToCart(productObj) {
    console.log(productObj);
    // Add current user data to productObj
    let username = currentUser.username;
    let res = await fetch(`https://e-commerce-application-7iv1zxxd4-p-harshithas-projects.vercel.app/user-api/add-to-cart/${username}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(productObj)
    });

    let result = await res.json();
    console.log(result);
    // Navigate to cart component
    if (result.payload.modifiedCount === 1) {
      navigate('/user-profile/cart');
    }
  }

  return (
    <div className='card text-center h-100 bg-light'>
      <div className="card-body d-flex flex-column justify-content-between">
        <img src={productObj.thumbnail} alt={productObj.title} className="card-img-top" />
        <p className="fs-4 text-secondary">{productObj.title}</p>
        <p className="fs-6 text-danger">{productObj.brand}</p>
        {/* <p className="lead">{productObj.description}</p> */}
        <p className="fs-3 text-warning">${productObj.price}</p>
        <button className="btn btn-success" onClick={() => addProductToCart(productObj)}>Add to cart</button>
      </div>
    </div>
  );
}

export default Product;