import axios, { AxiosResponse } from 'axios';

async function get(url:string): Promise<AxiosResponse<any, any>> {
    return await axios.get(url);
};

async function post(url:string, body:any): Promise<AxiosResponse<any, any>> {
    return await axios.post(url, body);
}


export const ApiService = {
    get,
    post
};