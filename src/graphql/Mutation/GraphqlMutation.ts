import axios from "axios";
import { Brand } from "../../types/Schema";
import { useState } from "react";

const GraphqlMutation = () => {
    const [response, setResponse] = useState<Brand | null>(null);

    const graphqlMutation = async (title: string) => {
        const AUTH_TOKEN =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2EwNjc3ODQyNmQ4YTYxZmVhMGU5MzAiLCJlbWFpbCI6ImludGVybnNAbWljcm9mb3guY28iLCJpYXQiOjE3MzkzNjA5ODAsImV4cCI6MTc0MTk1Mjk4MH0.6_YZvgDR0yKkSMdvB67vanGJyk6G7yNkevJCid3jL50";
     
        try {
          const res = await axios.post(
            "https://test-api.nine.deals/graphql",
            {
              query: `
                mutation createBrand($input:CreateBrandDto!) {
                  createBrand(input: $input) {
                    title
                    active
                  }
                }
              `,
              variables: {
                input: {
                  title: title,
                },
              },
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + AUTH_TOKEN,
              },
            }
          );
        setResponse(res.data.data.createBrand);
    } catch (err) {
        console.log(err);
    }
    }
  return {graphqlMutation, response};
}

export default GraphqlMutation