import Vue from "vue";
import Vuex from "vuex";
import projects from "./modules/projects";
import entry from "./modules/entry";

import state  from "./global/state";
import mutations  from "./global/mutations";
import actions  from "./global/actions";
import getters  from "./global/getters";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules: {
        projects:projects,
        entry:entry
    },
    strict: debug
});
