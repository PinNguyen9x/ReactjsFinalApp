import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import "./Sidebar.scss";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

class Sidebar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      itemCategoryIsActive: 0,
    };
  }
  handleCategoryItemSelected = categoryItem => {
    console.log('handleCategoryItemSelected',categoryItem);
    const { onClick } = this.props;
    onClick(categoryItem);
    this.setState({ itemCategoryIsActive: categoryItem.id });
  };

  handleItemIsActive = item => {
    const { categoryType } = this.props;
    const activeClass = "activeSelectedItem";
    if (item.name === categoryType) {
      return activeClass;
    }
    return this.state.itemCategoryIsActive === item.id ? activeClass : "";
  };

  handleShowIconActive = item => {
    const { categoryType } = this.props;
    const showIcon = "isShowItem";
    const hiddenIcon = "isHidden";
    if (item.name === categoryType) {
      return showIcon;
    }
    return this.state.itemCategoryIsActive === item.id ? showIcon : hiddenIcon;
  };

  render() {
    const { categoriesList,handleFilterClick,valueFilter,handleOnChangeValueFilter} = this.props;
    const _value = {
      min : +valueFilter.min,
      max : +valueFilter.max,
    }
    return (
      <div className="sidebar">
        <div className="sidebar_section">
          <div className="sidebar_title">
            <h5>Product Category</h5>
          </div>
          <ul className="sidebar_categories">
            {categoriesList.map(categoryItem => (
              <li
                key={categoryItem.id}
                className={this.handleItemIsActive(categoryItem)}
                onClick={() => {
                  this.handleCategoryItemSelected(categoryItem);
                }}
              >
                <span className={this.handleShowIconActive(categoryItem)}>
                  <i className="fa fa-angle-double-right" aria-hidden="true" />
                </span>
                {" " +
                  categoryItem.name.charAt(0).toUpperCase() +
                  categoryItem.name.slice(1)}
              </li>
            ))}
          </ul>
        </div>
        <div className="sidebar_section">
          <div className="sidebar_title">
            <h5>Filter by Price</h5>
          </div>
          <div>
            <InputRange
              maxValue={700}
              minValue={0}
              step={2}
              value= {_value}
              onChange={(_value) => handleOnChangeValueFilter(_value)}
            />
          </div>
          <div id="slider-range" />
          <div className="filter_button" onClick={() => {handleFilterClick(_value)}} >
            <span>filter</span>
          </div>
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  onClick: PropTypes.func.isRequired,
  categoryType: PropTypes.string.isRequired,
  categoriesList: PropTypes.array.isRequired,
  handleFilterClick: PropTypes.func,
  valueFilter : PropTypes.object.isRequired,
  handleOnChangeValueFilter: PropTypes.func,
};
Sidebar.defaultProps = {
  valueFilter : {
    min:0,
    max:700
  }
};

export default Sidebar;
