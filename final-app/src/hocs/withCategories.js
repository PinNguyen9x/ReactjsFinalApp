import React, { PureComponent } from "react";
import categoriesApi from "../Api/categoriesApi";
import axios from "axios";

export const withCategories = WrappedComponent => {
  class HOC extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        categoriesList: []
      };
    }
    componentDidMount = async () => {
      try {
        const filter = {
          limit: 4,
          skip: 0,
          order: "name asc",
          where: {
            name: { neq: null }
          }
        };
        const params = {
          filter: JSON.stringify(filter)
        };
        const categoriesResponse = await categoriesApi.getAll(params);
        const { body: categoriesList } = categoriesResponse;
        this.setState({ categoriesList });
      } catch (error) {
        console.log(error);
      }
    };

    render() {
      const { categoriesList } = this.state;
      const newProps = {
        ...this.props,
        categoriesList: categoriesList
      };
      return <WrappedComponent {...newProps} />;
    }
  }

  return HOC;
};
