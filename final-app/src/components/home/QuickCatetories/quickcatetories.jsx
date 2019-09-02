import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import "./quickcatetories.css";
import { NavLink } from "react-router-dom";

class quickcatetories extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const {categoriesList} = this.props;
    return (
      <div className="banner">
        <div className="container">
          <div className="row">
            {categoriesList.map((categoryItem, idx )=> (
              <div key={categoryItem.id} className="col-md-4">
                <div
                  className="banner_item align-items-center"
                  style={{
                    backgroundImage: categoryItem.name === 'women' ? `url(/images/banner_1.jpg)` : (categoryItem.name === 'men' ? `url(/images/banner_3.jpg)` : `url(/images/banner_2.jpg)`)
                  }}
                >
                  <div className="banner_category">
                    <NavLink
                      exact
                      to={{
                        pathname: "/categories",
                        categoryProps: {
                          name: categoryItem.name,
                          id: categoryItem.id
                        }
                      }}
                      activeClassName="selected"
                    >
                      {categoryItem.name
                        .toString()
                        .charAt(0)
                        .toUpperCase() +
                        categoryItem.name.toString().slice(1) +
                        "'s"}
                    </NavLink>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

quickcatetories.propTypes = {
  categoriesList: PropTypes.array.isRequired
};

export default quickcatetories;
