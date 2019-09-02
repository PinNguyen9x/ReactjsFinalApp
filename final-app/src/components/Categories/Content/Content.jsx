import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import ProductList from "../../common/ProductList/ProductList";
import Pagination from "./Pagination/Pagination";
import ProductSorting from "./ProductSorting/ProductSorting";
import './Content.css';

class Content extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const { productList,onClick ,pagination,sorting, addToCartClick,goToProductDetail} = this.props;
    return (
      <div className="main_content">
        <div className="products_iso">
          <div className="row">
            <div className="col">
              <ProductSorting sorting={sorting} pagination={pagination} onClick={onClick} />
              <ProductList productList={productList} onProductClick={addToCartClick} goToProductDetail ={goToProductDetail} />
              <Pagination pagination={pagination} onClick={onClick} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Content.propTypes = {
  productList : PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
  sorting: PropTypes.object.isRequired,
  addToCartClick: PropTypes.func,
  goToProductDetail : PropTypes.func.isRequired,
};

export default Content;
