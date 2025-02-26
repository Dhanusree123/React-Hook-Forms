import axios from "axios";
import { IResource } from "../../types/resources";

const baseURL = `https://reqres.in/api`

export const Get = (url="", page=1, perPage=6) => {
    return axios.get(`${baseURL}/${url}?page=${page}&per_page=${perPage}`);
}

export const GetById = (url="", id: string) => {
    return axios.get(`${baseURL}/${url}/${id}`);
}

export const Update = (url="", id: string, data:IResource) => {
    return axios.patch(`${baseURL}/${url}/${id}`, data);
}

export const DeleteById = (url="", id: string) => {
    return axios.delete(`${baseURL}/${url}/${id}`);
}