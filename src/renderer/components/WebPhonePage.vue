<template>
    <v-app>
        <v-content>
            <v-container fluid pa-0 fill-height>
                <drawer-core></drawer-core>

                <v-card height="100%" width="100%" style="overflow: hidden;">
                    <v-card-text class="text-xs-center">
                        <v-btn flat color="primary" @click.native="e31 = !e31">Toggle Nav</v-btn>
                    </v-card-text>
                    <v-bottom-nav absolute :value="e31" :active.sync="e3" color="transparent">
                        <v-btn flat color="teal">
                            <span>Recents</span>
                            <v-icon>history</v-icon>
                        </v-btn>
                        <v-btn flat color="teal">
                            <span>Favorites</span>
                            <v-icon>favorite</v-icon>
                        </v-btn>
                        <v-btn flat color="teal">
                            <span>Nearby</span>
                            <v-icon>place</v-icon>
                        </v-btn>
                    </v-bottom-nav>
                </v-card>
            </v-container>
        </v-content>

        <v-footer class="grey lighten-2">
            <v-spacer></v-spacer>
            <div class="pa-1">&copy; 2017 - {{ new Date().getFullYear() }}</div>
        </v-footer>
    </v-app>
</template>

<script>
    import PageTab from './WebPhonePage/PageTab'
    import DrawerCore from './WebPhonePage/DrawerCore'
    import SettingsDialog from './WebPhonePage/PageTab'

    export default {
        name: "web-phone-page",
        components: { PageTab, DrawerCore, SettingsDialog },
        data () {
            return {
                e3: 1,
                e31: true
            }
        }

    }
</script>

<style scoped>

</style>