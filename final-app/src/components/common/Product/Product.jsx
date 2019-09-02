import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import "./Product.css";

class Product extends PureComponent {
  render() {
    const { product, onProductClick,goToProductDetail } = this.props;
    return (
      <div className="product-item">
        <div className="product">
          <div className="product_image">
            <img src={product.image} alt="" />
          </div>
          <div className="favorite favorite_left" />
          {product.salePrice !== product.originalPrice && (
            <div className="product_bubble product_bubble_right product_bubble_red d-flex flex-column align-items-center">
              <span>SALE</span>
            </div>
          )}
          <div className="product_info">
            <h6 className="product_name">
            <a href="#" onClick ={()=> goToProductDetail(product)} >{product.name}</a>
            </h6>
            {product.salePrice !== product.originalPrice ? (
              <div className="product_price">
                {product.salePrice}
                <span>{product.originalPrice}</span>
              </div>
            ) : (
              <div className="product_price">{product.salePrice}</div>
            )}
          </div>
        </div>
        <div
          className="red_button add_to_cart_button"
          onClick={()=> onProductClick(product)}
        >
          <a href="#">add to cart</a>
        </div>
      </div>
    );
  }
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
  onProductClick: PropTypes.func,
  goToProductDetail: PropTypes.func.isRequired,

};

export default Product;
