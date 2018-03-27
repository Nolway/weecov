const state = {
    voip: {
        host: null,
        sip: null,
        sipPass: null,
        event: null
    }
}

const mutations = {
    setHost (state, host){
        state.voip.host = host;
    },
    setSip (state, sip){
        state.voip.sip = sip;
    },
    setSipPass (state, sipPass){
        state.voip.sipPass = sipPass;
    }
}

export default {
    state,
    mutations
}
