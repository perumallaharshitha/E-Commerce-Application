import React, { useEffect, useState } from 'react';
import Product from '../product/Product'; // Ensure this is the correct path to your Product component

function Products() {
  const [products, setProducts] = useState([]);

  async function getProducts() {
    try {
      const response = await fetch('http://localhost:4000/product-api/products');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const productsData = await response.json();
      setProducts(productsData.payload);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-5">
        {products.map((productObj, index) => (
          <div className="col" key={`${productObj.id}-${index}`}> {/* Ensure each product has a unique key */}
            <Product productObj={productObj} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
