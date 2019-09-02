import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./checkoutpage.css";
import { addToCart } from "../../actions/cart";

class checkoutpage extends PureComponent {
  render() {
    const { productList, total } = this.props;
    console.log("Product List Check Out Page", productList);
    return (
      <div className="container product_section_container">
        <div className="row">
          <div className="col product_section clearfix">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Currency</th>
                  <th scope="col">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((item, idx) => (
                  <tr key={item.id}>
                    <th scope="row">{idx + 1}</th>
                    <td>{item.product.name}</td>
                    <td>{item.product.salePrice}</td>
                    <td>USD</td>
                    <td>{item.quantity}</td>
                  </tr>
                ))}
                <tr>
                  <td>Total:</td>
                  <td>{total} $USD</td>
                  <td />
                  <td />
                  <td />
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

checkoutpage.propTypes = {
  productList: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  productList: state.cart.list,
  total: state.cart.total
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addToCart
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(checkoutpage);
