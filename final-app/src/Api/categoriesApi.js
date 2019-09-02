import BaseApi from "./baseApi";
import AppConstants from "../appConstants.js";
import fetchClient from "./fetchClient.js";

class CategoriesApi extends BaseApi {
  constructor(props) {
    super(props);
    this.resourceName = "categories";
  }
  getResourceName() {
    return "categories";
  }

  categoryExists(categoryId) {
    const url = `${AppConstants.API_URL}/${
      this.resourceName
    }/${categoryId}/exists`;
    return fetchClient.get(url);
  }
}

const categoriesApi = new CategoriesApi();
export default categoriesApi;
