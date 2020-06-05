import axiosConnection from "../axios/axiosConnection.js";

const projects = {
    state: {
        projects: [],
        project: [],
        apiUrl: "projects/",
        message: false
    },
    mutations: {
        setProjects(state, data) {
            state.projects = data;
        },
        setProject(state, data) {
            state.project = data;
        },
        setMessage(state, data) {
            state.message = data;
        }
    },
    actions: {
        async fetchAll({ commit, state }) {
            const urlBase = state.apiUrl;
            let data = axiosConnection.getAll(urlBase);
            await data.then(resp => {
                commit("setProjects", resp.data);
            });
            return data;
        },

        fetchById({ commit , state}, id) {
            const urlBase = state.apiUrl;
            axiosConnection.getById(urlBase, id).then(resp => {
                commit("setProject", resp.data.data);
            });
        },

        async fetchByName({ state, commit }, parameters) {
            const urlBase = state.apiUrl + "search";
            return await axiosConnection.getByFilter(urlBase, parameters);
        },

        deleteProject({ state, commit }, dataObject) {
            const urlBase = state.apiUrl + "delete";
            let data = axiosConnection.delete(urlBase, dataObject);
            commit("setAlertState", false);
            return data;
        },

        putProject({ state }, dataObject) {
            const urlBase = state.apiUrl + "update";
            return axiosConnection.post(urlBase, dataObject);
        },

        postProject({ state }, dataObject) {
            const urlBase = state.apiUrl + "add";
            return axiosConnection.post(urlBase, dataObject);
        }
    },
    getters: {
        getProjects(state) {
            return state.projects;
        },
        getProject(state) {
            return state.project;
        },
        getMessage(state) {
            return state.message;
        }
    }
};
export default projects;
