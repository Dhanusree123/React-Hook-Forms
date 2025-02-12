import axios from "axios";

const graphqlData = `
query findBrands($limit: Int $search: BaseSearch $skip: Int! $sort: BaseSort $filter: BaseFilter){ 
  findBrands(limit:$limit, search:$search, skip:$skip, sort:$sort, filter:$filter){
    count
    brands{
      id
      title
      active
    }
  }
}`;

export const FetchData = async (
  limit: number,
  search: { title: string },
  skip: number,
  sort?: "asc" | "desc",
  filter?: { active: boolean }
) => {
  try {
    const response = await axios({
      url: "https://test-api.nine.deals/graphql",
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: {
        query: graphqlData,
        variables: {
          limit,
          search,
          skip,
          sort,
          filter,
        },
      },
    });
    const data = await response.data;
    const brands = data.data.findBrands;
    // const count = data.data.findBrands.count;
    return brands;
  } catch (err) {
    console.error(err);
  }
};
