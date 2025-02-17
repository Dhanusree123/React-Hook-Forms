import axios from "axios";

const urlQuery = `
query scraper($url: String!) {
    scraper(url: $url) {
        title
        description
        mrp
        listPrice
        dealPrice
        rating
        reviews
        code
    }
}
`;

const AUTH_TOKEN = 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2EwNjc3ODQyNmQ4YTYxZmVhMGU5MzAiLCJlbWFpbCI6ImludGVybnNAbWljcm9mb3guY28iLCJpYXQiOjE3Mzk1MDUyNjYsImV4cCI6MTc0MjA5NzI2Nn0.whX2xH0vw4kQPFXWX4h0bDFhndnat0Dlj38Imrv4d3o";

export const GraphqlScraper = async (url: string) => {
    
    try {
        const response = await axios({
                url: "https://test-api.nine.deals/graphql",
                method: "post",
                headers: { 
                    //"Content-Type": "application/json",
                    Authorization: `Bearer ${AUTH_TOKEN}`,
                },
                data: {
                    query: urlQuery,
                    variables: {
                        url
                    }
                },
            });
            console.log("scraper",response.data);
            return response.data.data?.scraper;
    }catch (err) {
        console.log(err);
        return null;
    }

};