import axiosConnection from "../axiosConnection.js";

const projects = {
    state: {
        projects : {},
        project:{},
        apiUrl: [],

    },
    mutations: {
        setProjects(state, data) {
            state.projects = data;
        },
        setProject(state, data) {
            state.project = data;
        }
    },
    actions: {

        fetchTasks({state, commit}, parameters) {
            const urlBase = "/api/findProjectByName/" + parameters;
            axios.get(urlBase).then(response => {
                commit("setProjects", response.data, state.headers);
            });
        },
        async fetchAccount({ commit, state }, id) {
            let data = axiosConnection.getById(state.apiUrl, id);
            await data.then(resp => {
                commit("setProjects", resp.data);
            });
            return data;
        },
        fetchAccountList({ commit, state }) {
            let data = axiosConnection.getAll(state.apiUrl);
            data.then(resp => {
                commit("setProjects", resp.data);
            });
        },
        fetchActiveAccounts({ commit }, data) {
            commit("setProjects", data);
        },
        deleteAccount({ state }, id) {
            let data = axiosConnection.delete(state.apiUrl, id);
            return data;
        },
        postAccount({ state }, dataObject) {
            return axiosConnection.post(state.apiUrl, dataObject);
        },
        putAccount({ state }, dataObject) {
            return axiosConnection.put(
                state.apiUrl,
                dataObject.id,
                dataObject.obj
            );
        }
    },
    getters: {
        getAccount(state) {
            return state.account;
        },
        getAccountList(state) {
            return state.accountList;
        },

    }
};
export default projects;

