import axios from "axios";

const graphqlData = `
query findProducts($skip:Int!, $limit: Int, $search: BaseSearch, $sort: ProductSort, $filter: ProductFilter){
  findProducts(skip: $skip, limit: $limit, search: $search, sort: $sort, filter: $filter){
    count
    products{
      id
      title
      active
      brand
      dealPrice
      listPrice
      mrp
      code
      description
      rating
      reviews
      slug
    }
  }
}`;

export const FindProducts = async (skip: number, limit?: number, search?: {title: string}, 
    sort?: {createdAt: "asc" | "desc", dealPrice: "asc" | "desc"}, 
    filter?: {active?: boolean;
    expired?: boolean;
    handPicked?: boolean;}) => {
  try {
    const response = await axios({
      url: "https://test-api.nine.deals/graphql",
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: {
        query: graphqlData,
        variables: {
          skip,
          limit,
          search,
          sort,
          filter,
        }
      },
    });
    console.log("response",response);
    const data = await response.data;
    console.log("response data",response.data);
    return data.data.findProducts;
  } catch (err) {
    console.error(err);
  }
};
