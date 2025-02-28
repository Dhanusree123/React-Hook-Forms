import axios from "axios";

export const graphqlStoresData = `
query findStores($skip:Int!, $limit: Int, $search: BaseSearch, $sort: BaseSort, $filter: BaseFilter){
  findStores(skip: $skip, limit: $limit, search: $search, sort: $sort, filter: $filter){
    id
    title
    active
    metadata {
      content
      description
      keywords
      title
    }
  }
}`;

export const FindStores = async (skip: number, limit?: number, search?: {title: string}, sort?: "asc" | "desc", filter?: {active: boolean}) => {
  try {
    const response = await axios({
      url: "https://test-api.nine.deals/graphql",
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: {
        query: graphqlStoresData,
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
    return data.data.findStores;
  } catch (err) {
    console.error(err);
  }
};
