import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import "./NewArrival.css";
import ProductList from "../../common/ProductList/ProductList";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addToCart } from "../../../actions/cart";

class NewArrival extends PureComponent {
  handleItemIsActive = item => {
    const activeClass =
      "grid_sorting_button button d-flex flex-column justify-content-center align-items-center activeItem";
    const nonActiveClass =
      "grid_sorting_button button d-flex flex-column justify-content-center align-items-center";
    return this.props.itemCategoryIsActive === item.name
      ? activeClass
      : nonActiveClass;
  };

  handleAddToCart = (product) => {
    this.props.addToCart(product);
  };

  render() {
    const { categoriesList, currentProductList ,goToProductDetail} = this.props;
    return (
      <div className="new_arrivals">
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <div className="section_title new_arrivals_title">
                <h2>New Arrivals</h2>
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col text-center">
              <div className="new_arrivals_sorting">
                <ul className="arrivals_grid_sorting clearfix button-group filters-button-group">
                  {categoriesList.map(category => (
                    <li
                      key={category.id}
                      className={this.handleItemIsActive(category)}
                      onClick={() => {
                        this.props.onClick(category);
                      }}
                    >
                      {category.name === "men"
                        ? "men's"
                        : category.name === "women"
                        ? "women's"
                        : category.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <ProductList
            productList={currentProductList}
            onProductClick={this.handleAddToCart}
            goToProductDetail ={goToProductDetail}
          />
        </div>
      </div>
    );
  }
}

NewArrival.propTypes = {
  categoriesList: PropTypes.array.isRequired,
  currentProductList: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  itemCategoryIsActive: PropTypes.string.isRequired,
  addToCart: PropTypes.func.isRequired,
  goToProductDetail: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addToCart
    },
    dispatch
  );
};

export default connect(
  null,
  mapDispatchToProps
)(NewArrival);
