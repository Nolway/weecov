<template>
    <v-app>
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm10>
                        <v-card class="elevation-5">
                            <v-card-text>
                                <v-container grid-list-md text-xs-center>
                                    <v-layout row wrap>

                                        <v-flex xs12>
                                            <img src="~@/assets/img/logo.png" id="logo">
                                        </v-flex>

                                        <v-flex xs12>
                                            <h1 class="headline">Connexion à Elastix</h1>
                                        </v-flex>

                                        <v-flex xs12>
                                            <v-select
                                                    :items="agentList"
                                                    v-model="agentSelected"
                                                    @click.native="getAgents"
                                                    item-text="agent"
                                                    label="Merci de sélectionner votre profil"
                                                    autocomplete
                                            ></v-select>
                                        </v-flex>
                                            <v-flex xs6 sm6>
                                                <v-card>
                                                    <v-card-title primary-title>
                                                        <div>
                                                            <h3 class="headline mb-0 text-center">Serveur 1</h3>
                                                        </div>
                                                    </v-card-title>
                                                    <v-card-actions>
                                                        <v-btn block @click.native="startWebphone('192.168.1.192')" color="blue">connexion</v-btn>
                                                    </v-card-actions>
                                                </v-card>
                                            </v-flex>
                                            <v-flex xs6 sm6>
                                                <v-card>
                                                    <v-card-title primary-title>
                                                        <div>
                                                            <h3 class="headline mb-0 text-center">Serveur 2</h3>
                                                        </div>
                                                    </v-card-title>
                                                    <v-card-actions>
                                                        <v-btn block @click.native="startWebphone('192.168.1.190')" color="blue">connexion</v-btn>
                                                    </v-card-actions>
                                                </v-card>
                                            </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
        <v-footer class="grey lighten-2">
            <v-spacer></v-spacer>
            <div class="pa-1">&copy; 2017 - {{ new Date().getFullYear() }}</div>
        </v-footer>
    </v-app>
</template>

<script>
    export default {
        name: "home-page",
        data: () => ({
            drawer: null,
            agentSelected: null,
            agentList: []

        }),
        methods:{
            getAgents: function (){
                this.$http.get('http://1.30.0.1:27560/agent/')
                    .then((response) => {
                        this.agentList = (response.status == 200 ? response.data : "Erreur lors de la connection")
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            },
            startWebphone: function (server) {
                if (this.agentSelected != null){
                    this.$store.dispatch('setAgent', this.agentSelected);
                    let numHidden = this.$store.state.Agent.agentConnected.num_hidden;
                    let idAgent = this.$store.state.Agent.agentConnected.id_agent;

                    this.$store.commit('setHost', server);
                    this.$store.commit('setSip', numHidden == 1 ? idAgent + 4000 : idAgent);
                    this.$store.commit('setSipPass', numHidden == 1 ? "ext" + (idAgent + 4000) : "ext" + idAgent);

                    this.$router.push({name:'webphone-page'});
                }else{

                }
            }

        }
    }
</script>

<style scoped>

</style>