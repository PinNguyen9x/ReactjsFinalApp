import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import "./Pagination.css";

class Pagination extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const { pagination, onClick } = this.props;
    let totalPage = 0;
    let pageNumber;
    let pages = [];
    let classNextButton = "page_next";
    if (pagination) {
      totalPage = Math.floor(
        (pagination.total + pagination.limit - 1) / pagination.limit
      );
      if (pagination.skip === 0) {
        pageNumber = 1;
      } else {
        pageNumber = Math.floor(pagination.skip / pagination.limit) + 1;
      }
    }
    for (let index = 1; index <= totalPage; index++) {
      const objPageNumber = {
        id: Math.floor(Math.random() * 1001) + 2000,
        value: index
      };
      pages.push(objPageNumber);
    }
    if (pageNumber === totalPage) {
      classNextButton = "page_next_hidden";
    }

    return (
      <div className="product_sorting_container product_sorting_container_bottom clearfix">
        <ul className="product_sorting">
          <li>
            <span>Show:</span>
            <span className="num_sorting_text">
              {pagination.limit.toString()}
            </span>
            <i className="fa fa-angle-down" />
            <ul className="sorting_num">
              <li
                className="num_sorting_btn"
                onClick={() => {
                  onClick(...[, 6]);
                }}
              >
                <span>6</span>
              </li>
              <li
                className="num_sorting_btn"
                onClick={() => {
                  onClick(...[, 12]);
                }}
              >
                <span>12</span>
              </li>
              <li
                className="num_sorting_btn"
                onClick={() => {
                  onClick(...[, 24]);
                }}
              >
                <span>24</span>
              </li>
            </ul>
          </li>
        </ul>
        <span className="showing_results">
          Showing {pageNumber.toString()}–{totalPage.toString()} of
          {" " + pagination.limit.toString()} results
        </span>
        <div className="pages d-flex flex-row align-items-center">
          <div className="page_current">
            <span>{pageNumber.toString()}</span>
            <ul className="page_selection">
              {pages.map(item => (
                <li
                  key={item.id}
                  onClick={() => {
                    onClick(
                      ...[
                        ,
                        pagination.limit,
                        pagination.limit * (item.value - 1)
                      ]
                    );
                  }}
                >
                  <a href="#">{item.value}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="page_total">
            <span>of </span>
            {totalPage.toString()}
          </div>
          <div
            id="next_page_1"
            className={classNextButton}
            onClick={() => {
              onClick(...[, pagination.limit, pageNumber * pagination.limit]);
            }}
          >
            <a href="#">
              <i className="fa fa-long-arrow-right" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

Pagination.propTypes = {
  pagination: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Pagination;
