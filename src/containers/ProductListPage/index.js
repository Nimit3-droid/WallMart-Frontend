/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { getProductsBySlug } from "../../actions";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { generatePublicUrl } from "../../urlConfig";

function ProductListPage(props) {
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(props);
    const { match } = props;
    console.log(match.params.slug);
    dispatch(getProductsBySlug(match.params.slug));
  }, []);

  return (
    <Layout>
      {Object.keys(product.productsByPrice).map((key, index) => {
        return (
          <div className="card">
            <div className="cardHeader">
              {props.match.params.slug} mobile {key}
              <button>View all</button>
            </div>
            <div style={{display: 'flex'}}>
              {product.productsByPrice[key].map((product) => {
                return (
                  <div className="productContainer">
                    <div className="productImgContainer">
                      <img
                        src={generatePublicUrl(product.productPictures[0].img)}
                        alt=""
                      />
                    </div>
                    <div className="productInfo">
                      <div>
                        <div style={{ margin: "5px 0" }}>
                          {product.name}
                        </div>
                        <span>4.5</span>&nbsp;
                        <span>3333</span>
                      </div>
                      <div className="productPrice">{`Rs. ${product.price}`}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </Layout>
  );
}

export default ProductListPage;
