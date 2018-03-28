<template>
    <v-app>
        <v-content>
            <v-container fluid pa-0 fill-height>
                <drawer-core></drawer-core>
                <v-layout row wrap>
                    <v-flex xs12>
                        <button @click="login();" class="form-control">Connexion</button>
                        <button @click="DTMF($store.state.Settings.voip.sip+'#');" class="form-control">Login dinomi</button>
                        <webview id="view-elastix" style="height: 100%;width: 100%;" :src="'https://'+ this.$store.state.Settings.voip.host"></webview>
                    </v-flex>
                    <v-flex xs12>
                        <webview id="view-script" style="height: 100%; width: 100%;" src="" nodeintegration></webview>
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
    import PageTab from './WebPhonePage/PageTab'
    import DrawerCore from './WebPhonePage/DrawerCore'
    import SettingsDialog from './WebPhonePage/PageTab'

    export default {
        name: "web-phone-page",
        components: { PageTab, DrawerCore, SettingsDialog },
        data () {
            return {
                // Extension dans la quelle serons enregistrer les preuves sonores
                extension: '.wav',

                // Variables de sauvgardes
                recordPath: '',
                dateRFN: '',
                registerCount: 0,

                // Modifie l'état du bouton Connexion / Déconnexion
                loginState: true,

                // Modifie l'état du bouton Mute
                muteState: true,

                // Modifie l'état du bouton Mettre en attente
                holdState: true,

                // Si en appel manuel alors : true
                manualCallingStatus: false,

                // Si en appel entrant alors : true
                ingoingCallStatus: false,

                // Bouton pour commencer l'appel manuel

            }
        },
        created(){

            webphone_api.onStart(function (){
                // Affichage de la page de chargement pendant l'enregistration du SIP
                //tabFrame.src = "http://1.30.0.1/webphone_dev/status/registering.php";
                console.log('DO U KNOW DA WAY');
            });

            webphone_api.onCallStateChange(function (event, direction, peername, peerdisplayname, line)
            {
                if (event === 'callSetup')
                {

                    if (direction == 1)
                    {
                        // means it's outgoing call
                    }
                    else if (direction == 2)
                    {
                        webphone_api.accept();
                    }
                }

                //detecting the end of a call, even if it wasn't successfull
                if (event === 'callDisconnected')
                {
                }
            });
        },
        methods: {
            // Permet de se connecter/déconnecter au Webphone ainsi que d'enregistrer/désenregistrer le SIP
            login(){
                if (this.loginState === true)
                {
                    this.registerCount = 0;

                    webphone_api.setparameter('serveraddress', this.$store.state.Settings.voip.host);
                    webphone_api.setparameter('username', this.$store.state.Settings.voip.sip);
                    webphone_api.setparameter('password', this.$store.state.Settings.voip.sipPass);
                    webphone_api.setparameter('destination', "");

                    webphone_api.start();

                    //tabFrame.src = "http://1.30.0.1/webphone_dev/status/registering.php";
                    this.loginState = false;
                    //b_login.innerHTML = 'Déconnexion';
                }else
                {
                    //Hangup();
                    webphone_api.unregister();

                    //DisconnectSession();
                }

            },
            DTMF(code){
                webphone_api.dtmf(code);
            }
        }
    }
</script>

<style scoped>

</style>