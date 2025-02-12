export const FIND_BRAND_BY_ID = `
  query findBrandById($id:String!){
    findBrandById(id:$id){
      id
      active
      title
    }
  }`;

export const UPDATE_BRAND = `
          mutation updateBrand($id:String!,$input:UpdateBrandDto!) {
            updateBrand(id:$id,input: $input) {
              title
              active
            }
          }
        `;
