import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import ProductDetailPage from '../ProductDetailPage/ProductDetailPage'
import CategoriesPage from "../Categories/CategoriesPage/CategoriesPage";
import './ProductPage.css'

class ProductPage extends PureComponent {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/categories/:categoryId/products/:productId" component={ProductDetailPage} />
          <Route component={CategoriesPage} />
        </Switch>
      </div>
    );
  }
}

ProductPage.propTypes = {};

export default ProductPage;
