import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import "./Homepage.css";
import Herobanner from "../../components/home/HeroBanner/herobanner";
import Quickcatetories from "../../components/home/QuickCatetories/quickcatetories";
import NewArrival from "../../components/home/NewArrival/NewArrival";
import Dealoftheweek from "../../components/home/DealOfTheWeek/dealoftheweek";
import productApi from "../../Api/productApi";
import categoriesApi from "../../Api/categoriesApi";

class Homepage extends PureComponent {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      categoriesList: [],
      newArrivalCategories: [],
      currentProductList: [],
      isLoading: true,
      itemCategoryIsActive: ""
    };
  }

  componentDidMount = async () => {
    this._isMounted = true;
    try {
      const filter = {
        limit: 4,
        skip: 0,
        order: "name asc",
        where: {
          name: { neq: null }
        }
      };
      const productFilter = {
        limit: 8,
        skip: 0
      };
      const params = {
        filter: JSON.stringify(filter)
      };
      const paramsProduct = {
        filter: JSON.stringify(productFilter)
      };
      const categoriesResponse = await categoriesApi.getAll(params);
      const { body: categoriesList } = categoriesResponse;
      const allcategoryType = {
        id: "all",
        name: "All"
      };
      const newArrivalCategoriesList = [...categoriesList];
      newArrivalCategoriesList.push(allcategoryType);
      const newArrivalCategoriesSort = newArrivalCategoriesList.sort(
        (beforItem, afterItem) =>
          beforItem.name > afterItem.name
            ? 1
            : afterItem.name > beforItem.name
            ? -1
            : 0
      );
      const productListResponse = await productApi.getAll(paramsProduct);
      const { body: productList } = productListResponse;
      const allCategoryIdx = newArrivalCategoriesSort.findIndex(
        item => item.name === "All"
      );
      if (allCategoryIdx >= 0) {
        if (this._isMounted) {
          this.setState({
            categoriesList,
            newArrivalCategories: newArrivalCategoriesSort,
            currentProductList: productList,
            itemCategoryIsActive: newArrivalCategoriesSort[allCategoryIdx].name
          });
        }
      } else {
        if (this._isMounted) {
          this.setState({
            categoriesList,
            newArrivalCategoriesList: newArrivalCategoriesSort,
            currentProductList: productList
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };
  handleOnClick = async filterByCategory => {
    if (filterByCategory.name === "All") {
      try {
        const filter = {
          limit: 8,
          skip: 0
        };
        const params = {
          filter: JSON.stringify(filter)
        };
        const productList = await productApi.getAll(params);
        const { body: allProductList } = productList;
        this.setState({
          currentProductList: allProductList,
          itemCategoryIsActive: filterByCategory.name
        });
      } catch (error) {
        console.log(error.message);
      }
    } else {
      const filter = {
        limit: 8,
        skip: 0
      };
      const params = {
        filter: JSON.stringify(filter)
      };
      try {
        const productListResponse = await productApi.getProductListById(
          filterByCategory.id,
          params
        );
        const { body: productList } = productListResponse;
        this.setState({
          currentProductList: productList,
          itemCategoryIsActive: filterByCategory.name
        });
      } catch (error) {
        console.log(error.message);
      }
    }
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

  render() {
    const {
      categoriesList,
      currentProductList,
      itemCategoryIsActive,
      newArrivalCategories
    } = this.state;
    return (
      <div className="super_container">
        <Herobanner />
        <Quickcatetories categoriesList={categoriesList} />
        <NewArrival
          categoriesList={newArrivalCategories}
          currentProductList={currentProductList}
          itemCategoryIsActive={itemCategoryIsActive}
          onClick={this.handleOnClick}
          goToProductDetail={this.goToProductDetail}
        />
        <Dealoftheweek />
      </div>
    );
  }
}

Homepage.propTypes = {
  history: PropTypes.object.isRequired
};

export default Homepage;
