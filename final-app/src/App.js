import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import "./App.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import HomePage from "./container/home/Homepage";
import Header from "./components/common/Header/header";
import Footer from "./components/common/Footer/footer";
import Shippinginfomation from "./components/home/ShippingInformation/shippinginfomation";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CategoriesPage from "./container/Categories/CategoriesPage/CategoriesPage";
import { addToCart } from "./actions/cart";
import ProductPage from "./container/ProductPage/ProductPage";
import Checkoutpage from "./container/checkout/checkoutpage";

class App extends PureComponent {
  render() {
    const { countProduct } = this.props;
    return (
      <BrowserRouter>
        <Header countProduct={countProduct} />
        <main>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/categories" component={CategoriesPage} />
            <Route
              path="/categories/:categoryId/products/:productId"
              component={ProductPage}
            />
            <Route exact path="/checkout" component={Checkoutpage} />
            <Route component={HomePage} />
          </Switch>
        </main>
        <Shippinginfomation />
        <Footer />
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  countProduct: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  countProduct: state.cart.count
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
)(App);
