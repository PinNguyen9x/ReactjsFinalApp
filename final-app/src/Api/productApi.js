import BaseApi from "./baseApi";
import AppConstants from "../appConstants.js";
import fetchClient from "./fetchClient.js";

class ProductApi extends BaseApi {
  constructor(props) {
    super(props);
    this.resourceName = "categories";
  }
  getResourceName() {
    return "products";
  }

  getProductListById(categoryId, params) {
    const url = `${AppConstants.API_URL}/${this.resourceName}/${categoryId}/products`;
    return fetchClient.get(url, params);
  }
}

const productApi = new ProductApi();
export default productApi;
