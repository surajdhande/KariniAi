import React, { useState, useEffect } from "react";
import { Button, Col, Row } from "antd";
import axios from "axios";
import "./list.scss";

const Lists = ({ data }) => {
  const [cartStatus, setCartStatus] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    const updateCartStatus = async () => {
      try {
        if (id && cartStatus !== null) {
          const apiUrl = `http://localhost:8001/updateCart?id=${id}&cartStatus=${cartStatus}`;
          await axios
            .put(apiUrl)
            .then((res) => {
              alert(res.data.message);
              window.location.reload();
            })
            .catch((err) => console.log("err", err));
          setCartStatus(null);
        }
      } catch (error) {
        console.error("Error updating cart:", error);
      }
    };

    updateCartStatus();
  }, [id, cartStatus]);

  const handleAddToCart = (productId, status) => {
    setId(productId);
    setCartStatus(status);
  };

  return (
    <div className="lists">
      {data?.map((product, idx) => (
        <Row gutter={16} className="lists-data" key={idx}>
          <Col className="lists-data-img" span={8}>
            <img src={product?.["Image Src"]} alt="Product" />
          </Col>
          <Col className="lists-data-description" span={14}>
            <h2>Title: {product?.Title || "Not Available"}</h2>
            <p>Uses: {product?.Body || "Not Available"}</p>
            <h3>Product Details:</h3>
            <ul>
              <li>
                <strong>Handle:</strong> {product?.Handle || "-"}
              </li>
              <li>
                <strong>Vendor:</strong> {product?.Vendor || "-"}
              </li>
              <li>
                <strong>Type:</strong> {product?.Type || "-"}
              </li>
              <li>
                <strong>Tags:</strong> {product?.Tags || "-"}
              </li>
            </ul>
            <h3>Variant Details:</h3>
            <ul>
              <li>
                <strong>SKU:</strong> {product?.["Variant SKU"] || "-"}
              </li>
              <li>
                <strong>Inventory Qty:</strong>{" "}
                {product?.["Variant Inventory Qty"] || "-"}
              </li>
              <li>
                <strong>Price:</strong> ${product?.["Variant Price"] || "-"}
              </li>
              <li>
                <strong>Compare At Price:</strong>{" "}
                {product?.["Variant Compare At Price"] || "-"}
              </li>
            </ul>
            {product?.isAddedToCart ? (<>
              <Button className="cart-go">Already Added</Button>
              <Button
              className="cart-remove"
              onClick={() => handleAddToCart(product?._id, false)}
            >
              Remove
            </Button>
            </>
            ) : (
              <>
                <Button
                  className="cart-add"
                  onClick={() => handleAddToCart(product?._id, true)}
                >
                  Add To Cart
                </Button>{" "}
              </>
            )}
            
          </Col>
        </Row>
      ))}
    </div>
  );
};

export default Lists;
