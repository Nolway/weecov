import axios from 'axios'

const state = {
    agentConnected: null
};

const mutations = {
    agentConnected (state, agent){
        state.agentConnected = agent;
    },
    agentConnectedTeam (state, team){
        state.agentConnected.team = team;
    }
};

const getters = {

};

const actions = {
    setAgent({state, commit}, agent) {
        axios.get('http://1.30.0.1:27560/team/' + agent.team)
            .then((response) => {
                //agent.team = (response.status == 200 ? 1 : "")
            })
            .catch((error) => {
                console.log(error)
            })
        commit('agentConnected', agent)
    }
};

export default {
    state,
    mutations,
    getters,
    actions
}