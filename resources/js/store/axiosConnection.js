import Axios from "axios";

class axiosConnection {
  urlBase() {
    return process.env.VUE_APP_ApiUrlBase;
  }
  urlFacebookProxy() {
    return process.env.VUE_APP_FacebookProxy;
  }
  axiosConf() {
    return {
      headers: {
        "content-type": "application/json"
      }
    };
  }
  async getById(apiUrl, id) {
    const url = this.urlBase() + apiUrl + "/" + id;
    return await Axios.get(url, this.axiosConf(), id);
  }
  async getByFilter(apiUrl, filter) {
    const url = this.urlBase() + apiUrl + "/?" + filter;
    return await Axios.get(url, this.axiosConf());
  }
  async getAll(apiUrl) {
    const url = this.urlBase() + apiUrl;
    const data = await Axios.get(url, this.axiosConf());
    return data;
  }
  async getFacebookProxy(apiUrl) {
    const url = this.urlFacebookProxy() + apiUrl;
    const data = await Axios.get(url, this.axiosConf());
    return data;
  }
  async delete(apiUrl, id) {
    const url = this.urlBase() + apiUrl + "/" + id;
    return await Axios.delete(url, this.axiosConf());
  }
  async put(apiUrl, id, object) {
    const url = this.urlBase() + apiUrl + "/" + id + "/";
    return await Axios.put(url, object, this.axiosConf());
  }
  async post(apiUrl, object) {
    const url = this.urlBase() + apiUrl + "/";
    return await Axios.post(url, object, this.axiosConf());
  }
  async patch(apiUrl, id, object) {
    const url = this.urlBase() + apiUrl + "/" + id + "/";
    return await Axios.patch(url, object, this.axiosConf());
  }
}

export default new axiosConnection();
