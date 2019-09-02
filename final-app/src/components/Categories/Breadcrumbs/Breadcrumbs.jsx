import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import './Breadcrumbs.css';

class Breadcrumbs extends PureComponent {
  render() {
    const { categoryType,categoryDetail } = this.props;

    return (
      <div className="breadcrumbs d-flex flex-row align-items-center">
        <ul>
          <li>
            <Link to="/Home"> Home </Link>
          </li>
          <li className="active">
            <i className="fa fa-angle-right" aria-hidden="true" />
            {categoryType === "All"
              ? "All"
              : categoryType.charAt(0).toUpperCase() +
                categoryType.slice(1) +
                "'s"}
          </li>
          { (categoryDetail) && <li className="active">
            <i className="fa fa-angle-right" aria-hidden="true" />
            {categoryDetail}
            </li>}
        </ul>
      </div>
    );
  }
}

Breadcrumbs.propTypes = {
  categoryType: PropTypes.string.isRequired,
  categoryDetail: PropTypes.string.isRequired,
};

Breadcrumbs.defaultProps = {
  categoryType:'',
  categoryDetail: '',
};

export default Breadcrumbs;
