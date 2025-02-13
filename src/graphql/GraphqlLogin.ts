import axios from 'axios';

export const login = async (input: { email: string; password: string }) => {
    const query = `
    mutation Login($input: LoginInputDto!) {
        login(input: $input) {
            accessToken
            refreshToken
         }
        }
    `;
      
    const response = await axios.post("https://test-api.nine.deals/graphql", {
        query,
        variables: { input },
    }, {
        headers: {
        'Content-Type': 'application/json',
        },
    });
      
    return response.data?.data?.login;
};

export const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
};