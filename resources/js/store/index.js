import Vue from "vue";
import Vuex from "vuex";
import projects from "./modules/projects";
import entry from "./modules/entry";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
    modules: {
        projects:projects,
        entry:entry
    },
    strict: debug
});
