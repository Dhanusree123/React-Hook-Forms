import axios from "axios";
import { useState } from "react";
import { UpdateProductSchema } from "../../types/Schema";

const Mutation = `
    mutation updateProduct($id: string, $input: UpdateProductDto){
        mutation updateProduct(id: $id, input: $input){
            id
            active
            code
            dealPrice
            description
            expired
            handPicked
            listPrice
            mrp
            rating
            reviews
            title
        }
    }
`;

const UpdateProduct = (id: string, active: boolean, code: string, description: string, expired: boolean, 
    handPicked: boolean, listPrice: number, mrp:number, rating: number, reviews: number, title: string) => {

        const [response, setResponse] = useState<typeof UpdateProductSchema | null>(null);
    
    const updateProduct = async () => {

        const AUTH_TOKEN =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2EwNjc3ODQyNmQ4YTYxZmVhMGU5MzAiLCJlbWFpbCI6ImludGVybnNAbWljcm9mb3guY28iLCJpYXQiOjE3Mzk4ODEzNzQsImV4cCI6MTc0MjQ3MzM3NH0.dETDtbMAPh0uE6VFQ4O28qZqdG7H2dNhPEjkD40nWSI";

    try {
        const res = await axios.post("https://test-api.nine.deals/graphql", {
            query: Mutation,
            variables: {
                id: id,
                input: {
                    active,
                    code,
                    description,
                    expired,
                    handPicked,
                    listPrice,
                    mrp,
                    rating,
                    reviews,
                    title
                },
            },
        },
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + AUTH_TOKEN,
            }
        }   
    );
    setResponse(res.data.data.updateProduct);
    }catch (err){
        console.log(err);
    }
}
    return {updateProduct, response}
};

export default UpdateProduct