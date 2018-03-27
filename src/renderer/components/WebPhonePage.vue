<template>
    <v-app>

        <v-footer class="grey lighten-2">
            <v-spacer></v-spacer>
            <div class="pa-1">&copy; 2017 - {{ new Date().getFullYear() }}</div>
        </v-footer>
    </v-app>
</template>

<script>
    import PageTab from './WebPhonePage/PageTab'

    export default {
        name: "web-phone-page",
        components: { PageTab }

    }
</script>

<style scoped>

</style>