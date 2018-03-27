<template>
    <v-app>
        <v-container class="fluid pa-0 fill-height">
            <v-layout>
                <v-navigation-drawer stateless hide-overlay :mini-variant.sync="mini" v-model="drawer" class="elevation-0">
                    <v-toolbar flat class="transparent">
                        <v-list class="pa-0">
                            <v-list-tile @click.native.stop="mini = !mini">
                                <v-list-tile-avatar >
                                    <img src="~@/assets/img/favicon.png" >
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                    <v-list-tile-title>{{ this.$store.state.Agent.agentConnected.agent }}</v-list-tile-title>
                                    <v-list-tile-sub-title>{{ this.$store.state.Agent.agentConnected.team.name }}</v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-list-tile-action>

                                </v-list-tile-action>
                            </v-list-tile>
                        </v-list>
                    </v-toolbar>
                    <v-list class="pt-0" dense>
                        <v-divider></v-divider>

                        <v-list-tile @click.stop="$v.start()">
                            <v-list-tile-action>
                                <v-icon>power_settings_new</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>Connexion</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>

                        <v-list-tile @click.stop="activeDialog()" >
                            <v-list-tile-action>
                                <v-icon>settings</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>Paramètres</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-navigation-drawer>
                <v-flex class="wrap" xs3>
                    <webview id="elastix" class="fill-height" src="https://192.168.1.190"></webview>
                </v-flex>
                <v-flex class="wrap" xs9>
                    <webview id="script" class="fill-height" src=""></webview>
                </v-flex>
            </v-layout>
        </v-container>

        <v-footer class="grey lighten-2">
            <v-spacer></v-spacer>
            <div class="pa-1">&copy; 2017 - {{ new Date().getFullYear() }}</div>
        </v-footer>

        <v-layout row justify-center>
            <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" :overlay="false">
                <v-card>
                    <v-toolbar dark color="blue">
                        <v-btn icon @click.native="dialog = false" dark>
                            <v-icon>close</v-icon>
                        </v-btn>
                        <v-toolbar-title>Paramètres</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn dark flat @click.native="dialog = false">Sauvgarder</v-btn>
                        </v-toolbar-items>
                    </v-toolbar>

                    <v-list three-line subheader>
                        <v-subheader>VoIP</v-subheader>
                        <v-list-tile avatar>
                            <v-list-tile-content>
                            </v-list-tile-content>
                        </v-list-tile>

                        <v-list-tile avatar>
                            <v-list-tile-content>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile avatar>
                            <v-list-tile-content>
                            </v-list-tile-content>
                        </v-list-tile>

                        <v-list-tile avatar>
                            <v-list-tile-content>
                                <v-list-tile-title>Etat du WebPhone</v-list-tile-title>
                                <v-list-tile-sub-title></v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                    <v-divider></v-divider>
                </v-card>
            </v-dialog>
        </v-layout>
    </v-app>
</template>

<script>
    export default {
        name: "webphone-page",
        components: {},
        data () {
            return {
                dialog: false,
                drawer: true,
                mini: true,
                // Extension dans la quelle serons enregistrer les preuves sonores
                extension: ".wav",

                // Variables de sauvgardes
                recordPath: "",
                campName: "",
                daterfn: "",
                registerCount: 0,

                // Modifie l'état du bouton Connexion / Déconnexion
                loginstate: true,

            }
        },
        methods: {
            activeDialog(){
                this.dialog = true;
            },
        },
        render: function (){
            webphone_api.onLoaded(function (){
                Login();
            });

            // Permet de se connecter/déconnecter au Webphone ainsi que d'enregistrer/désenregistrer le SIP
            function Login(){
                if (loginstate === true)
                {

                    webphone_api.setparameter('serveraddress', this.$store.state.Settings.voip.host);
                    webphone_api.setparameter('username', this.$store.state.Settings.voip.sip);
                    webphone_api.setparameter('password', this.$store.state.Settings.voip.sipPass);
                    webphone_api.setparameter('destination', "");

                    webphone_api.start();

                    document.getElementById('script').src = "http://1.30.0.1/webphone_dev/status/registering.php";
                    loginstate = false;
                }else
                {
                    Hangup();
                    webphone_api.unregister();

                    this.$router.push({name:'home-page'});
                }

            }
            ///////////////////////////////////////

            // Evenement : Charge les informations de base du Webphone et le démarre
            webphone_api.onLoaded(function (){
                Login();
            });


            // Evenement : Lors du démarrage du Webphone
            webphone_api.onStart(function (){
                // Affichage de la page de chargement pendant l'enregistration du SIP
                document.getElementById('elastix').src = "http://1.30.0.1/webphone_dev/status/registering.php";
            });


            // Evenement : Lors du démarrage de l'enregistrement du SIP
            webphone_api.onRegistered(function (){

                // Vérifie si c'est bien la première fois qu'on passe dans la boucle
                if(registerCount === 0){
                    webphone_api.setvolume(0, 50);
                    webphone_api.setvolume(1, 50);
                    webphone_api.setvolume(2, 50);

                    document.getElementById('elastix').src = "https://"+ this.$store.state.Settings.voip.host +"/index.php?menu=ccpro_agent_console";

                    registerCount++;
                }
            });


            // Evenement : Lors du désenregistrer du SIP
            webphone_api.onUnRegistered(function (){
                document.getElementById('elastix').src = "http://1.30.0.1/webphone_dev/status/stop.php";
            });


            // Evenement : Lors d'un changement sur l'état de l'appel
            webphone_api.onCallStateChange(function (event, direction, peername, peerdisplayname, line){
                if (event === 'callSetup')
                {

                    if(direction == 1)
                    {

                    }
                    else if(direction == 2)
                    {
                        // means it's icoming call
                        if(line === 1 && peerdisplayname.substr(0,10) === "Agent/"+ this.store && peerdisplayname.slice(-5) === "Login"){

                            webphone_api.accept();

                            setTimeout("DTMF('<?= $_SESSION['AGENT_NUM'] ?>#');", 1000);
                            setTimeout("DTMF('<?= $_SESSION['AGENT_NUM'] ?>#');", 5000);
                            setTimeout("DTMF('<?= $_SESSION['AGENT_NUM'] ?>#');", 10000);



                        }else{
                        }

                    }

                }

                //detecting the end of a call, even if it wasn't successfull
                if(event === 'callDisconnected'){
                    clearTimeout('getRecordingStatus();');

                    if(manualCallingStatus === true){
                        ManualCall(false);
                    }

                    if(ingoingCallStatus === true){
                        HangupIngoingCall();
                    }

                    if(mutestate === false){
                        Mute();
                    }

                    if(holdstate === false){
                        Hold();
                    }

                    incomingButtons.style.display = 'none';
                    b_mute.disabled = true;
                    b_conference.disabled = true;
                    b_hold.disabled = true;

                }
            });




            // Permet de se connecter/déconnecter au Webphone ainsi que d'enregistrer/désenregistrer le SIP
            function Login(){
                if (loginstate === true)
                {
                    registerCount = 0;

                    webphone_api.setparameter('serveraddress', "<?= $_SESSION["SERVER_IP"] ?>");
                    webphone_api.setparameter('username', "<?= $_SESSION['AGENT_SIP'] ?>");
                    webphone_api.setparameter('password', "ext<?= $_SESSION['AGENT_SIP'] ?>");
                    webphone_api.setparameter('destination', "");

                    webphone_api.start();

                    tabFrame.src = "http://1.30.0.1/webphone_dev/status/registering.php";
                    loginstate = false;
                }else
                {
                    Hangup();
                    webphone_api.unregister();

                    DisconnectSession();
                }

            }

            // Appeler
            function Call(destnr){
                webphone_api.setparameter('destination', destnr);
                webphone_api.call(destnr);
            }


            // Raccrocher l'appel
            function Hangup(){
                webphone_api.hangup();
            }


            // Raccrocher l'appel entrant
            function HangupIngoingCall(){
                Hangup();
                ingoingCallButtons.style.display = 'none';
            }


            // Envoi un code DTMF
            function DTMF(code){
                webphone_api.dtmf(code);
            }


            // Traite le nom pour éviter les comflits
            function LastnameProcess(lastname){
                // Caractères à remplacer
                var regBlank = new RegExp("\s");
                lastname = lastname.replace(regBlank, '-');
                lastname = lastname.toLowerCase();
                return lastname;
            }

            // Récupère le status et les informations
            /*function GetRecordingStatus(){
                setTimeout('GetRecordingStatus();',2000);
                $.ajaxSetup({async: false});
                $.ajax({
                    // chargement du fichier externe xxx.php
                    url : "ajax/getRecordingStatus.php",
                    // Passage des données au fichier externe
                    data : {agentnum : <?= $_SESSION['AGENT_NUM'] ?>},
                cache : false,
                    dataType : "json",
                    error : function(request, error) { // Info Debuggage si erreur
                    alert("ERREUR : Merci de contacter immédiatement votre superviseur");
                    alert("Erreur GetRecordingStatus : responseText: " + request.responseText + "   Error : " + error);
                },
                success  : function(data) {
                    if(data.status === "1"){

                        // Récupération de la date/heure de la preuve sonore
                        daterfn = "";
                        daterfn = data.daterfn;

                        // Set du nom du dossier
                        GetCampName(data.campagneid);

                        // Création du dossier
                        CheckRecordDir();

                        // Traite le nom
                        var lastnamePOn = LastnameProcess(data.lastname);

                        var recordNameOn = lastnamePOn + "_" + data.callid + "_" + data.uniqueid + "_" + daterfn;
                        recordPath = recordPath + "" + recordNameOn;

                        // Lance l'enregistrement
                        webphone_api.voicerecord(true, recordPath + extension);

                        console.log("Recording : Démarrage de l'enregistrement de : " + recordPath + extension);

                    }else if(data.status === "0"){

                        // Set du nom du dossier
                        GetCampName(data.campagneid);

                        // Création du dossier
                        CheckRecordDir();

                        // Traite le nom
                        var lastnamePOff = LastnameProcess(data.lastname);

                        var recordNameOff = lastnamePOff + "_" + data.callid + "_" + data.uniqueid + "_" + daterfn;
                        recordPath = recordPath + "" + recordNameOff;

                        // Arrête l'enregistrement
                        webphone_api.voicerecord(false, recordPath + extension);

                        // Ajoute le nom de la preuve sonore à la table HistoRecording
                        SetHistoRecordName(data.refprospect, data.campagneid, data.callid, recordNameOff + extension);

                        console.log("Recording : Arrêt de l'enregistrement de : " + recordPath + extension);

                    }else{
                        // console.log("Recording : Aucune action");
                    }
                }
            });
            }*/


            // En cas de fermeture de la page
            window.onbeforeunload = function(){
                Login();
            };
        }
    }
</script>

<style scoped>

</style>