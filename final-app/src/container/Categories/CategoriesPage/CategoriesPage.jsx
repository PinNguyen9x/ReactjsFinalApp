import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Breadcrumbs from "../../../components/Categories/Breadcrumbs/Breadcrumbs";
import Sidebar from "../../../components/Categories/Sidebar/Sidebar";
import queryString from "query-string";
import Content from "../../../components/Categories/Content/Content";
import categoriesApi from "../../../Api/categoriesApi";
import productApi from "../../../Api/productApi";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getCategoryList } from "../../../actions/categories";
import { addToCart } from "../../../actions/cart";
import "./CategoriesPage.css";

class CategoriesPage extends PureComponent {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      categoryType: "All",
      _sorting: {
        caseProductSorting: "Default Sorting",
        numberRecord: 6,
      },
      _pagination: {
        limit: 0,
        skip: 0,
        total: 0
      },
      _value: { min: 0, max: 700 }
    };
  }
  handleGetProductByCategoryId = async (
    category,
    filter,
    order,
    skip,
    limit,
    priceMin,
    priceMax
  ) => {
    const { history } = this.props;
    const { _value, _pagination, _sorting } = this.state;
    if (category) {
      if (category.name === "All") {
        try {
          const criteria = {
            limit: limit ? limit : _sorting.numberRecord,
            skip: skip ? skip : 0,
            order: order
              ? order === "Default Sorting"
                ? "salePrice asc"
                : order === "Price"
                ? "salePrice desc"
                : "name desc"
              : "salePrice asc",
            where: {
              and: [
                { salePrice: { gte: priceMin ? +priceMin : _value.min } },
                { salePrice: { lte: priceMax ? +priceMax : _value.max } }
              ]
            }
          };
          const params = {
            filter: JSON.stringify(criteria)
          };
          const productListResponse = await productApi.getAll(params);
          const { body: productList, pagination } = productListResponse;
          const newPaging = {
            ..._pagination,
            limit: pagination.limit,
            skip: pagination.skip,
            total: pagination.total
          };
          const newValueFilter = {
            ..._value,
            min: priceMin ? +priceMin : _value.min,
            max: priceMax ? +priceMax : _value.max
          };
          const newSorting = {
            ..._sorting,
            caseProductSorting: order ? order : _sorting.caseProductSorting
          };
          this.setState({
            productList,
            categoryType: category.name,
            _pagination: newPaging,
            _sorting: newSorting,
            _value: newValueFilter
          });
          history.push({
            pathname: "categories",
            search: `?order=${newSorting.caseProductSorting}&skip=${
              newPaging.skip
            }&limit=${newPaging.limit}`
          });
        } catch (error) {
          console.log(error.message);
        }
      } else {
        try {
          const criteria = {
            limit: limit ? limit : _sorting.numberRecord,
            skip: skip ? skip : 0,
            order: order
              ? order === "Default Sorting"
                ? "salePrice asc"
                : order === "Price"
                ? "salePrice desc"
                : "name desc"
              : "salePrice asc",
            where: {
              and: [
                { salePrice: { gte: priceMin ? +priceMin : _value.min } },
                { salePrice: { lte: priceMax ? +priceMax : _value.max } }
              ]
            }
          };
          const params = {
            filter: JSON.stringify(criteria)
          };
          const productListResponse = await productApi.getProductListById(
            category.id,
            params
          );
          const { body: productList, pagination } = productListResponse;
          const newPaging = {
            ..._pagination,
            limit: pagination.limit,
            skip: pagination.skip,
            total: pagination.total
          };
          const newValueFilter = {
            ..._value,
            min: priceMin ? +priceMin : _value.min,
            max: priceMax ? +priceMax : _value.max
          };
          const newSorting = {
            ..._sorting,
            caseProductSorting: order ? order : _sorting.caseProductSorting
          };
          this.setState({
            productList,
            categoryType: category.name,
            _pagination: newPaging,
            _sorting: newSorting,
            _value: newValueFilter
          });
          history.push({
            pathname: "categories",
            search: `?filter=${category.id}&order=${
              newSorting.caseProductSorting
            }&skip=${newPaging.skip}&limit=${newPaging.limit}&priceMin=${
              _value.min
            }&priceMax=${_value.max}`
          });
        } catch (error) {
          console.log(error.message);
        }
      }
    } else {
      if (filter) {
        try {
          const response = await categoriesApi.categoryExists(filter);
          const { body } = response;
          const { exists } = body;
          if (exists) {
            try {
              const criteria = {
                limit: limit ? +limit : _sorting.numberRecord,
                skip: skip ? +skip : 0,
                order: order
                  ? order === "Default Sorting"
                    ? "salePrice asc"
                    : order === "Price"
                    ? "salePrice desc"
                    : "name desc"
                  : "salePrice asc",
                where: {
                  and: [
                    { salePrice: { gte: priceMin ? +priceMin : _value.min } },
                    { salePrice: { lte: priceMax ? +priceMax : _value.max } }
                  ]
                }
              };
              const params = {
                filter: JSON.stringify(criteria)
              };
              const productListResponse = await productApi.getProductListById(
                filter,
                params
              );
              const { body: productList, pagination } = productListResponse;
              try {
                const categoryResponse = await categoriesApi.getDetail(filter);
                if (categoryResponse.body) {
                  const newPaging = {
                    ..._pagination,
                    limit: pagination.limit,
                    skip: pagination.skip,
                    total: pagination.total
                  };
                  const newValueFilter = {
                    ..._value,
                    min: priceMin ? +priceMin : _value.min,
                    max: priceMax ? +priceMax : _value.max
                  };
                  const newSorting = {
                    ..._sorting,
                    caseProductSorting: order
                      ? order
                      : _sorting.caseProductSorting,
                      numberRecord: limit? limit : _sorting.numberRecord
                  };
                  this.setState({
                    productList,
                    categoryType: categoryResponse.body.name,
                    _pagination: newPaging,
                    _value: newValueFilter,
                    _sorting: newSorting
                  });
                  history.push({
                    pathname: "categories",
                    search: `?filter=${filter}&order=${
                      newSorting.caseProductSorting
                    }&skip=${newPaging.skip}&limit=${
                      newPaging.limit
                    }&priceMin=${newValueFilter.min}&priceMax=${newValueFilter.max}`
                  });
                } else {
                  const newPaging = {
                    ..._pagination,
                    limit: pagination.limit,
                    skip: pagination.skip,
                    total: pagination.total
                  };
                  const newValueFilter = {
                    ..._value,
                    min: priceMin ? +priceMin : _value.min,
                    max: priceMax ? +priceMax : _value.max
                  };
                  const newSorting = {
                    ..._sorting,
                    caseProductSorting: order
                      ? order
                      : _sorting.caseProductSorting,
                      numberRecord: criteria.limit
                  };
                  this.setState({
                    productList,
                    _pagination: newPaging,
                    _value: newValueFilter,
                    _sorting: newSorting
                  });
                  history.push({
                    pathname: "categories",
                    search: `?filter=${filter}&order=${
                      newSorting.caseProductSorting
                    }&skip=${newPaging.skip}&limit=${
                      newPaging.limit
                    }&priceMin=${newValueFilter.min}&priceMax=${newValueFilter.max}`
                  });
                }
              } catch (error) {
                console.log(error.message);
              }
            } catch (error) {
              console.log(error.message);
            }
          } else {
            try {
              const criteria = {
                limit: limit ? limit : _sorting.numberRecord,
                skip: skip ? skip : 0,
                order: order
                  ? order === "Default Sorting"
                    ? "salePrice asc"
                    : order === "Price"
                    ? "salePrice desc"
                    : "name desc"
                  : "salePrice asc",
                where: {
                  and: [
                    { salePrice: { gte: priceMin ? priceMin : _value.min } },
                    { salePrice: { lte: priceMax ? priceMax : _value.max } }
                  ]
                }
              };
              const params = {
                filter: JSON.stringify(criteria)
              };
              const productListResponse = await productApi.getAll(params);
              const { body: productList, pagination } = productListResponse;
              const newPaging = {
                ..._pagination,
                limit: pagination.limit,
                skip: pagination.skip,
                total: pagination.total
              };
              const newValueFilter = {
                ..._value,
                min: priceMin ? priceMin : _value.min,
                max: priceMax ? priceMax : _value.max
              };
              const newSorting = {
                ..._sorting,
                caseProductSorting: order ? order : _sorting.caseProductSorting,
                numberRecord:criteria.limit,
              };
              this.setState({
                productList,
                _value: newValueFilter,
                _pagination: newPaging,
                _sorting: newSorting
              });
              history.push({
                pathname: "categories",
                search: `?order=${newSorting.caseProductSorting}&skip=${
                  newPaging.skip
                }&limit=${newPaging.limit}&priceMin=${
                  _value.min
                }&priceMax=${_value.max}`
              });
            } catch (error) {
              console.log(error.message);
            }
          }
        } catch (error) {
          console.log(error.message);
        }
      } else {
        try {
          const criteria = {
            limit: limit ? limit : _sorting.numberRecord,
            skip: skip ? skip : 0,
            order: order
              ? order === "Default Sorting"
                ? "salePrice asc"
                : order === "Price"
                ? "salePrice desc"
                : "name desc"
              : "salePrice asc",
            where: {
              and: [
                { salePrice: { gte: priceMin ? +priceMin : _value.min } },
                { salePrice: { lte: priceMax ? +priceMax : _value.max } }
              ]
            }
          };
          const params = {
            filter: JSON.stringify(criteria)
          };
          const productListResponse = await productApi.getAll(params);
          const { body: productList, pagination } = productListResponse;
          const newPaging = {
            ..._pagination,
            limit: pagination.limit,
            skip: pagination.skip,
            total: pagination.total
          };
          const newValueFilter = {
            ..._value,
            min: priceMin ? +priceMin : _value.min,
            max: priceMax ? +priceMax : _value.max
          };
          const newSorting = {
            ..._sorting,
            caseProductSorting: order ? order : _sorting.caseProductSorting,
            numberRecord:criteria.limit
          };
          this.setState({
            productList,
            _pagination: newPaging,
            _value: newValueFilter,
            _sorting: newSorting
          });
          history.push({
            pathname: "categories",
            search: `?order=${newSorting.caseProductSorting}&skip=${
              newPaging.skip
            }&limit=${newPaging.limit}&priceMin=${newValueFilter.min}&priceMax=${newValueFilter.max}`
          });
        } catch (error) {
          console.log(error.message);
        }
      }
    }
  };
  componentDidMount = async () => {
    this._isMounted = true;
    const { getCategoryList } = this.props;
    getCategoryList();
    const { categoryProps, search } = this.props.location;
    const values = queryString.parse(search);
    const { filter, order, skip, limit, priceMin, priceMax } = values;

    this.handleGetProductByCategoryId(
      ...[
        categoryProps,
        filter,
        order,
        skip,
        limit,
        priceMin,
        priceMax
      ]
    );
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  handleCategoryItemClick = async category => {
    console.log('handleCategoryItemClick', category);
    if (category.name === "All") {
      try {
        await this.handleGetProductByCategoryId(category);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      try {
        await this.handleGetProductByCategoryId(...[category, category.id]);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  handleProductSorting = async (caseSorting, _limit, _skip) => {
    console.log('_limit',_limit);
    console.log('skip',_skip );
    const { _sorting, _pagination, _value } = this.state;
    const { history } = this.props;
    const { search } = this.props.location;
    const values = queryString.parse(search);
    const { filter,priceMin ,priceMax } = values;
    if (filter) {
      try {
        const _filter = {
          limit: _limit ? _limit : _sorting.numberRecord,
          skip: _skip ? _skip : 0,
          order:
            caseSorting === "Default Sorting"
              ? "salePrice asc"
              : caseSorting === "Price"
              ? "salePrice desc"
              : `${caseSorting} desc`,
              where: {
                and: [
                  {
                    salePrice: { gte: priceMin ? +priceMin : _value.min }
                  },
                  { salePrice: { lte: priceMax ? +priceMax  : _value.max } }
                ]
              }
        };
        const params = {
          filter: JSON.stringify(_filter)
        };
        const productListResponse = await productApi.getProductListById(
          filter,
          params
        );
        const { body: productList, pagination } = productListResponse;
        const newPaging = {
          ..._pagination,
          limit: pagination.limit,
          skip: pagination.skip,
          total: pagination.total
        };
        const newSorting = {
          ..._sorting,
          caseProductSorting: caseSorting
            ? caseSorting
            : _sorting.caseProductSorting,
          numberRecord: _limit? _limit : _sorting.numberRecord,
        };
        const newValueFilter = {
          ..._value,
          min: priceMin ? +priceMin : _value.min,
          max: priceMax ? +priceMax : _value.max
        };
        this.setState({
          productList,
          _pagination: newPaging,
          _sorting: newSorting,
          _value : newValueFilter
        });
        history.push({
          pathname: "categories",
          search: `?filter=${filter}&order=${
            newSorting.caseProductSorting
          }&skip=${newPaging.skip}&limit=${newPaging.limit}&priceMin=${newValueFilter.min}&priceMax=${newValueFilter.max}`
        });
      } catch (error) {
        console.log(error.message);
      }
    } else {
      try {
        const _filter = {
          limit: _limit ? _limit : _sorting.numberRecord,
          skip: _skip ? _skip : 0,
          order:
            caseSorting === "Default Sorting"
              ? "salePrice asc"
              : caseSorting === "Price"
              ? "salePrice desc"
              : `${caseSorting} desc`,
              where: {
                and: [
                  {
                    salePrice: { gte: priceMin ? +priceMin : _value.min }
                  },
                  { salePrice: { lte: priceMax ? +priceMax  : _value.max } }
                ]
              }
        };
        const params = {
          filter: JSON.stringify(_filter)
        };
        const productListResponse = await productApi.getAll(params);
        const { body: productList, pagination } = productListResponse;
        const newPaging = {
          _pagination,
          limit: pagination.limit,
          skip: pagination.skip,
          total: pagination.total
        };
        const newSorting = {
          _sorting,
          caseProductSorting: caseSorting
            ? caseSorting
            : _sorting.caseProductSorting,
            numberRecord: _filter.limit,
        };
        const newValueFilter = {
          ..._value,
          min: priceMin ? +priceMin : _value.min,
          max: priceMax ? +priceMax : _value.max
        };
        this.setState({
          productList,
          _pagination: newPaging,
          _sorting: newSorting,
          _value: newValueFilter,
        });
        history.push({
          pathname: "categories",
          search: `?order=${newSorting.caseProductSorting}&skip=${
            newPaging.skip
          }&limit=${newPaging.limit}&priceMin=${newValueFilter.min}&priceMax=${newValueFilter.max}`
        });
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  handleAddToCart = product => {
    this.props.addToCart(product);
  };

  goToProductDetail = product => {
    const { history } = this.props;
    history.push({
      pathname: `/categories/${product.categoryId}/products/${product.id}`,
      propsProduct: {
        productId: product.id
      }
    });
  };

  handleFilterClick = async valueFilter => {
    const { history } = this.props;
    const { _value, _pagination,_sorting } = this.state;
    const { search } = this.props.location;
    const values = queryString.parse(search);
    const { filter, order, skip, limit} = values;
    const filterParam = {
      limit: limit ? limit : _sorting.numberRecord,
      skip: skip ? skip : 0,
      order: order
        ? order === "Default Sorting"
          ? "salePrice asc"
          : order === "Price"
          ? "salePrice desc"
          : "name desc"
        : "salePrice asc",
      where: {
        and: [
          {
            salePrice: { gte: valueFilter.min ? valueFilter.min : _value.min }
          },
          { salePrice: { lte: valueFilter.max ? valueFilter.max : _value.max } }
        ]
      }
    };
    const params = {
      filter: JSON.stringify(filterParam)
    };
    if (filter) {
      try {
        const ProductListResponse = await productApi.getProductListById(
          filter,
          params
        );
        const { body: productList, pagination } = ProductListResponse;
        const newPaging = {
          ..._pagination,
          limit: pagination.limit,
          skip: pagination.skip,
          total: pagination.total
        };
        const newValueFilter = {
          ..._value,
          min: valueFilter.min ? valueFilter.min : _value.min,
          max: valueFilter.max ? valueFilter.max : _value.max
        };
        const newSorting = {
          ..._sorting,
          caseProductSorting: order
            ? order
            : _sorting.caseProductSorting,
            numberRecord: filterParam.limit
        };
        this.setState({
            productList,
            _pagination: newPaging,
            _value: newValueFilter,
            _sorting: newSorting
        });

        history.push({
          pathname: "categories",
          search: `?filter=${filter}&order=${
            newSorting.caseProductSorting
          }&skip=${newPaging.skip}&limit=${newPaging.limit}&priceMin=${newValueFilter.min}&priceMax=${newValueFilter.max}`
        });
      } catch (error) {
        console.log(error.message);
      }
    } else {
      try {
        const ProductListResponse = await productApi.getAll(params);
        const { body: productList, pagination } = ProductListResponse;
        const newPaging = {
          ..._pagination,
          limit: pagination.limit,
          skip: pagination.skip,
          total: pagination.total
        };
        const newValue = {
          ..._value,
          min: valueFilter.min ? valueFilter.min : _value.min,
          max: valueFilter.max ? valueFilter.max : _value.max
        };
        const newSorting = {
          ..._sorting,
          caseProductSorting: order ? order : _sorting.caseProductSorting,
          numberRecord:pagination.limit,
        };
        this.setState({
            productList,
            _pagination: newPaging,
            _value: newValue,
            _sorting : newSorting
        });
        history.push({
          pathname: "categories",
          search: `?order=${newSorting.caseProductSorting}&skip=${newPaging.skip}&limit=${newPaging.limit}&priceMin=${
            newValue.min
          }&priceMax=${newValue.max}`
        });
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  handleOnChangeValueFilter = valueFilter => {
    this.setState(prev => {
      const _value = {
        ...prev._value,
        min: valueFilter.min,
        max: valueFilter.max
      };
      return {
        _value
      };
    });
  };
  render() {
    const {
      productList,
      _pagination,
      categoryType,
      _sorting,
      _value
    } = this.state;
    const { categoriesList } = this.props;
    return (
      <div className="container product_section_container">
        <div className="row">
          <div className="col product_section clearfix">
            <Breadcrumbs categoryType={categoryType} />
            <Sidebar
              onClick={this.handleCategoryItemClick}
              categoriesList={categoriesList}
              categoryType={categoryType}
              handleFilterClick={this.handleFilterClick}
              valueFilter={_value}
              handleOnChangeValueFilter={this.handleOnChangeValueFilter}
            />
            <Content
              sorting={_sorting}
              productList={productList}
              pagination={_pagination}
              onClick={this.handleProductSorting}
              addToCartClick={this.handleAddToCart}
              goToProductDetail={this.goToProductDetail}
            />
          </div>
        </div>
      </div>
    );
  }
}

CategoriesPage.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  getCategoryList: PropTypes.func.isRequired,
  categoriesList: PropTypes.array.isRequired,
  tatalProductInCart: PropTypes.number.isRequired,
  addToCart: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  categoriesList: state.categories.list,
  tatalProductInCart: state.cart.count
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getCategoryList,
      addToCart
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesPage);
