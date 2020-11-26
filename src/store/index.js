import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    user: null
};

export default new Vuex.Store({
    state
});