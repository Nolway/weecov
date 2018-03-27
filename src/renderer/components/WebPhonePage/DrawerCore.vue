<template>
    <v-navigation-drawer stateless hide-overlay :mini-variant.sync="mini" v-model="drawer" class="elevation-0">
        <v-toolbar flat class="transparent">
            <v-list class="pa-0">
                <v-list-tile avatar @click.native.stop="mini = !mini">
                    <v-list-tile-avatar :tile="tile">
                        <img src="~@/assets/img/favicon.png" >
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ this.$store.state.Agent.agentConnected.agent }}</v-list-tile-title>
                        <v-list-tile-sub-title>{{ this.$store.state.Agent.agentConnected.team.name }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-toolbar>
        <v-list class="pt-0" dense>
            <v-divider></v-divider>

            <v-list-tile @click.stop="login();">
                <v-list-tile-action>
                    <v-icon>power_settings_new</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Connexion</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile @click.stop="openSettings();" >
                <v-list-tile-action>
                    <v-icon>settings</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Paramètres</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

        </v-list>
    </v-navigation-drawer>
</template>

<script>
    export default {
        name: "drawer-core",
        data () {
            return {
                drawer: true,
                mini: true,
                right: null,
                tile: true
            }
        },
        methods: {
            openSettings: function () {
                this.$store.dispatch('openSettings');
            }
        }
    }
</script>

<style scoped>

</style>