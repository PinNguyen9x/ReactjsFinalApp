import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import "./ProductDetailPage.css";
import { withRouter } from "react-router";
import productApi from "../../Api/productApi";
import categoriesApi from "../../Api/categoriesApi";
import Breadcrumbs from "../../components/Categories/Breadcrumbs/Breadcrumbs";
import queryString from "query-string";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addToCart } from "../../actions/cart";

class ProductDetailPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      quantity: 0,
      imgIsShow: "",
      categoryName: ""
    };
  }

  handleIncreaseClick = () => {
    this.setState(prev => {
      return {
        quantity: prev.quantity + 1
      };
    });
  };

  handleReduceClick = () => {
    this.setState(prev => {
      if (prev.quantity <= 0) {
        return {
          quantity: 0
        };
      } else {
        return {
          quantity: prev.quantity - 1
        };
      }
    });
  };

  handleAddToCart = (product, quantity) => {
    this.props.addToCart(product, quantity);
  };
  componentDidMount = async () => {
    const { productId, categoryId } = this.props.match.params;
    if (productId) {
      try {
        const productResponse = await productApi.getDetail(productId);
        const { body: product } = productResponse;
        if (product) {
          try {
            const categoryIdResponse = await categoriesApi.categoryExists(
              product.categoryId
            );
            if (categoryIdResponse.body.exists) {
              try {
                const categoryResponse = await categoriesApi.getDetail(
                  categoryId
                );
                const { body } = categoryResponse;
                const { name } = body;
                if (name) {
                  this.setState({
                    categoryName: name,
                    product,
                    imgIsShow: product.thumbnail
                  });
                }
              } catch (error) {
                console.log(error.message);
              }
            }
          } catch (error) {
            console.log(error.message);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  handleAddClssActive = srcImg => {
    const { imgIsShow } = this.state;
    return srcImg === imgIsShow ? "active" : "";
  };

  handleOnClick = srcImg => {
    this.setState({ imgIsShow: srcImg });
  };

  render() {
    const { product, quantity, imgIsShow,categoryName } = this.state;
    const { thumbnails } = product;
    let firstImg = "";
    let secondImg = "";
    if (thumbnails) {
      [firstImg, secondImg] = thumbnails;
    }
    return (
      <div>
        <div className="container product_section_container">
          <div className="row">
            <div className="col">
              <Breadcrumbs categoryType = {categoryName} categoryDetail={"Single Product"}  />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-7">
              <div className="single_product_pics">
                <div className="row">
                  <div className="col-lg-3 thumbnails_col order-lg-1 order-2">
                    <div className="single_product_thumbnails">
                      <ul>
                        <li
                          className={this.handleAddClssActive(
                            product.thumbnail
                          )}
                          onClick={() => this.handleOnClick(product.thumbnail)}
                        >
                          <img src={product.thumbnail} alt="" />
                        </li>
                        <li
                          className={this.handleAddClssActive(firstImg)}
                          onClick={() => this.handleOnClick(firstImg)}
                        >
                          <img src={firstImg} alt="" />
                        </li>
                        <li
                          className={this.handleAddClssActive(secondImg)}
                          onClick={() => this.handleOnClick(secondImg)}
                        >
                          <img src={secondImg} alt="" />
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-9 image_col order-lg-2 order-1">
                    <div className="single_product_image">
                      <div
                        className="single_product_image_background"
                        style={{ backgroundImage: `url(${imgIsShow})` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="sigle_product_details">
                <div className="sigle_product_details_title">
                  <h2>{product.name}</h2>
                  <p>
                    Nam tempus turpis at metus scelerisque placerat nulla
                    deumantos solicitud felis. Pellentesque diam dolor,
                    elementum etos lobortis des mollis ut...
                  </p>
                </div>
                <div className="free_delivery d-flex flex-row align-items-center justify-content-center">
                  <span className="ti-truck" />
                  <span>free delivery</span>
                </div>
                <div className="original_price">
                  {product.originalPrice + "$"}
                </div>
                <div className="sigle_product_price">
                  {product.salePrice + "$"}
                </div>
                <ul className="star_rating">
                  <li>
                    <i className="fa fa-star" aria-hidden="true" />
                  </li>
                  <li>
                    <i className="fa fa-star" aria-hidden="true" />
                  </li>
                  <li>
                    <i className="fa fa-star" aria-hidden="true" />
                  </li>
                  <li>
                    <i className="fa fa-star" aria-hidden="true" />
                  </li>
                  <li>
                    <i className="fa fa-star-o" aria-hidden="true" />
                  </li>
                </ul>
                <div className="sigle_product_color">
                  <span>Select Color:</span>
                  <ul>
                    <li style={{ background: "#e54e5d" }} />
                    <li style={{ background: "#252525" }} />
                    <li style={{ background: "#60b3f3" }} />>
                  </ul>
                </div>
                <div className="quantity d-flex flex-column flex-sm-row align-items-sm-center">
                  <span>Quantity:</span>
                  <div className="quantity_selector">
                    <span
                      className="minus"
                      onClick={() => this.handleReduceClick()}
                    >
                      <i className="fa fa-minus" aria-hidden="true" />
                    </span>
                    <span id="quantity_value">{quantity.toString()}</span>
                    <span
                      className="plus"
                      onClick={() => this.handleIncreaseClick()}
                    >
                      <i className="fa fa-plus" aria-hidden="true" />
                    </span>
                  </div>
                  <div
                    className="sigle_red_button sigle_add_to_cart_button"
                    onClick={() => this.handleAddToCart(product, quantity)}
                  >
                    <a href="#">add to cart</a>
                  </div>
                  <div className="sigle_product_favorite d-flex flex-column align-items-center justify-content-center" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tabs_section_container">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="tabs_container">
                  <ul className="tabs d-flex flex-sm-row flex-column align-items-left align-items-md-center justify-content-center">
                    <li className="tab active" data-active-tab="tab_1">
                      <span>Description</span>
                    </li>
                    <li className="tab" data-active-tab="tab_2">
                      <span>Additional Information</span>
                    </li>
                    <li className="tab" data-active-tab="tab_3">
                      <span>Reviews (2)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div id="tab_1" className="tab_container active">
                  <div className="row">
                    <div className="col-lg-5 desc_col">
                      <div className="tab_title">
                        <h4>Description</h4>
                      </div>
                      <div className="tab_text_block">
                        <h2>Pocket cotton sweatshirt</h2>
                        <p>
                          Nam tempus turpis at metus scelerisque placerat nulla
                          deumantos solicitud felis. Pellentesque diam dolor,
                          elementum etos lobortis des mollis ut...
                        </p>
                      </div>
                      <div className="tab_image">
                        <img src="/images/desc_1.jpg" alt="" />
                      </div>
                      <div className="tab_text_block">
                        <h2>Pocket cotton sweatshirt</h2>
                        <p>
                          Nam tempus turpis at metus scelerisque placerat nulla
                          deumantos solicitud felis. Pellentesque diam dolor,
                          elementum etos lobortis des mollis ut...
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-5 offset-lg-2 desc_col">
                      <div className="tab_image">
                        <img src="/images/desc_2.jpg" alt="" />
                      </div>
                      <div className="tab_text_block">
                        <h2>Pocket cotton sweatshirt</h2>
                        <p>
                          Nam tempus turpis at metus scelerisque placerat nulla
                          deumantos solicitud felis. Pellentesque diam dolor,
                          elementum etos lobortis des mollis ut...
                        </p>
                      </div>
                      <div className="tab_image desc_last">
                        <img src="images/desc_3.jpg" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
                <div id="tab_2" className="tab_container">
                  <div className="row">
                    <div className="col additional_info_col">
                      <div className="tab_title additional_info_title">
                        <h4>Additional Information</h4>
                      </div>
                      <p>
                        COLOR:<span>Gold, Red</span>
                      </p>
                      <p>
                        SIZE:<span>L,M,XL</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div id="tab_3" className="tab_container">
                  <div className="row">
                    <div className="col-lg-6 reviews_col">
                      <div className="tab_title reviews_title">
                        <h4>Reviews (2)</h4>
                      </div>
                      <div className="user_review_container d-flex flex-column flex-sm-row">
                        <div className="user">
                          <div className="user_pic" />
                          <div className="user_rating">
                            <ul className="star_rating">
                              <li>
                                <i className="fa fa-star" aria-hidden="true" />
                              </li>
                              <li>
                                <i className="fa fa-star" aria-hidden="true" />
                              </li>
                              <li>
                                <i className="fa fa-star" aria-hidden="true" />
                              </li>
                              <li>
                                <i className="fa fa-star" aria-hidden="true" />
                              </li>
                              <li>
                                <i
                                  className="fa fa-star-o"
                                  aria-hidden="true"
                                />
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="review">
                          <div className="review_date">27 Aug 2016</div>
                          <div className="user_name">Brandon William</div>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                          </p>
                        </div>
                      </div>
                      <div className="user_review_container d-flex flex-column flex-sm-row">
                        <div className="user">
                          <div className="user_pic" />
                          <div className="user_rating">
                            <ul className="star_rating">
                              <li>
                                <i className="fa fa-star" aria-hidden="true" />
                              </li>
                              <li>
                                <i className="fa fa-star" aria-hidden="true" />
                              </li>
                              <li>
                                <i className="fa fa-star" aria-hidden="true" />
                              </li>
                              <li>
                                <i className="fa fa-star" aria-hidden="true" />
                              </li>
                              <li>
                                <i
                                  className="fa fa-star-o"
                                  aria-hidden="true"
                                />
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="review">
                          <div className="review_date">27 Aug 2016</div>
                          <div className="user_name">Brandon William</div>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 add_review_col">
                      <div className="add_review">
                        <form>
                          <div>
                            <h1>Add Review</h1>
                            <input
                              id="review_name"
                              className="form_input input_name"
                              type="text"
                              name="name"
                              placeholder="Name*"
                              required="required"
                              data-error="Name is required."
                            />
                            <input
                              id="review_email"
                              className="form_input input_email"
                              type="email"
                              name="email"
                              placeholder="Email*"
                              required="required"
                              data-error="Valid email is required."
                            />
                          </div>
                          <div>
                            <h1>Your Rating:</h1>
                            <ul className="user_star_rating">
                              <li>
                                <i className="fa fa-star" aria-hidden="true" />
                              </li>
                              <li>
                                <i className="fa fa-star" aria-hidden="true" />
                              </li>
                              <li>
                                <i className="fa fa-star" aria-hidden="true" />
                              </li>
                              <li>
                                <i className="fa fa-star" aria-hidden="true" />
                              </li>
                              <li>
                                <i
                                  className="fa fa-star-o"
                                  aria-hidden="true"
                                />
                              </li>
                            </ul>
                          </div>
                          <div className="text-left text-sm-right">
                            <button
                              id="review_submit"
                              type="submit"
                              className="sigle_red_button review_submit_btn trans_300"
                              value="Submit"
                            >
                              submit
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProductDetailPage.propTypes = {
  location: PropTypes.object,
  match: PropTypes.object,
  addToCart: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  categoriesList: state.categories.list
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
)(withRouter(ProductDetailPage));
