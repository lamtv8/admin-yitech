import axios from "axios";

export class ApiService {
  get = url => {
    var token = localStorage.getItem("token");
    var consfig = {
      // withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    return axios.get(url, consfig);
  };

  post = (url, data) => {
    var token = localStorage.getItem("token");
    var consfig = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    return axios.post(url, data, consfig);
  };

  put = (url, data) => {
    var token = localStorage.getItem("token");
    var consfig = {
      // withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    return axios.put(url, data, consfig);
  };

  delete = url => {
    var token = localStorage.getItem("token");
    var consfig = {
      // withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    return axios.delete(url, consfig);
  };
}

export const httpService = new ApiService();
