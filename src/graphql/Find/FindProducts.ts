import axios from "axios";

const graphqlProductData = `
query findProducts($skip:Int!, $limit: Int, $search: BaseSearch, $sort: ProductSort, $filter: ProductFilter){
  findProducts(skip: $skip, limit: $limit, search: $search, sort: $sort, filter: $filter){
    count
    products{
      id
      images
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

const findProductById = `
  query findProductById($id:String!){
    findProductById(id: $id){
      ...ProductFragment
    }
  }
`

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
        query: graphqlProductData,
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

export const FindProductById = async (id: string) => {
  try {
    const response = await axios({
      url: "https://test-api.nine.deals/graphql",
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: {
        query: findProductById,
        variables: {
          id
        }
      },
    });
    console.log("response",response);
    const data = await response.data;
    console.log("find product by id response data",response.data);
    return data.data.findProducts;
  } catch (err) {
    console.error(err);
  }
} 