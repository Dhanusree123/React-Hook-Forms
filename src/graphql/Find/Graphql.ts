import axios from "axios";

export const graphqlData = `
query findBrands($skip:Int!, $limit: Int, $search: BaseSearch, $sort: BaseSort, $filter: BaseFilter){
  findBrands(skip: $skip, limit: $limit, search: $search, sort: $sort, filter: $filter){
    count
    brands{
      id
      title
      active
    }
  }
}`;

export const Graphql = async (skip: number, limit?: number, search?: {title: string}, sort?: "asc" | "desc", filter?: {active: boolean}) => {
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
    const data = await response.data;
    console.log("Find Brands", data);
    return data.data.findBrands;
  } catch (err) {
    console.error(err);
  }
};
