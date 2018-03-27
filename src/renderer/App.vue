<template>
  <div id="app">
      <transition name="fade">
        <router-view></router-view>
      </transition>
  </div>
</template>

<script>
  export default {
    name: 'weecov'
  }
</script>

<style>
  @import '~@/assets/style/material-icons.min.css';
  html {
    overflow-y: hidden;
  }
  .fade-enter-active, .fade-leave-active {
       transition: opacity .5s;
   }
  .fade-enter, .fade-leave-to {
      opacity: 0;
  }
</style>
