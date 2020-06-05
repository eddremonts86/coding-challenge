import axiosConnection from "../axios/axiosConnection.js";

const entry = {
    state: {
        apiUrl: "entry/",
     },
    mutations: {},
    actions: {
        putEntry({ state }, dataObject) {
            const urlBase = state.apiUrl + "stop";
            return axiosConnection.post(urlBase, dataObject);
        },

        postEntry({ state }, dataObject) {
            const urlBase = state.apiUrl + "start";
            return axiosConnection.post(urlBase, dataObject);
        },

        entryDelete({ state }, dataObject) {
            const urlBase = state.apiUrl + "delete";
            return axiosConnection.post(urlBase, dataObject);
        }
    },
    getters: {}
};
export default entry;
