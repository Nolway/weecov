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
                                                    :items="this.$store.state.listAgents"
                                                    v-model="agentSelect"
                                                    label="Merci de sélectionner votre profil"
                                                    autocomplete
                                                    item-text="name"
                                                    color="orange"
                                            ></v-select>
                                        </v-flex>

                                        <v-flex xs12>
                                            <v-btn color="blue">Connexion</v-btn>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>

                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        name: "home-page",
        data: () => ({
            drawer: null,
            agentSelected: null,
            agentSelect: null
        }),
        props: {
            source: String
        }
    }
</script>

<style scoped>

</style>