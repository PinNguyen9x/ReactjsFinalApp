import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import "./ProductList.scss";
import Product from "../Product/Product";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

class ProductList extends PureComponent {
  constructor(props) {
    super(props);
  }

  renderPruductItem = product => {
    const {onProductClick, goToProductDetail} = this.props;
    return <Product product={product} onProductClick={onProductClick} goToProductDetail={goToProductDetail}  />;
  };

  render() {
    const { productList} = this.props;
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} className="product-grid">
          <Grid container justify="center" spacing={2}>
            {productList.map(product => (
              <Grid key={product.id} item>
                <Paper>{this.renderPruductItem(product)}</Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

ProductList.propTypes = {
    productList : PropTypes.array.isRequired,
    onProductClick : PropTypes.func,
    goToProductDetail: PropTypes.func.isRequired,
};

export default ProductList;
