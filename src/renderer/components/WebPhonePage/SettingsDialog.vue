<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" :overlay="false">
            <v-btn color="primary" dark slot="activator">Open Dialog</v-btn>
            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon @click.native="closeSettings();" dark>
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Settings</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark flat @click.native="closeSettings();">Save</v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-list three-line subheader>
                    <v-subheader>User Controls</v-subheader>
                    <v-list-tile avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>Content filtering</v-list-tile-title>
                            <v-list-tile-sub-title>Set the content filtering level to restrict apps that can be downloaded</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>Password</v-list-tile-title>
                            <v-list-tile-sub-title>Require password for purchase or use password to restrict purchase</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
                <v-divider></v-divider>
                <v-list three-line subheader>
                    <v-subheader>General</v-subheader>
                </v-list>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
    export default {
        name: "settings-dialog",
        data () {
            return {
                dialog: false,
            }
        },
        methods: {
            closeSettings: function () {
                this.$store.commit('closeSettings');
            }
        }
    }
</script>

<style scoped>

</style>