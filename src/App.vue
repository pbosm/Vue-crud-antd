<template>
  <header class="text-center mt-3 mb-5">
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
  </header>
    
  <div style="text-align: center;">
    <router-link to="/">CreateUser</router-link>
    <router-link to="/viewUsuarios" style="padding-right: 50px; padding-left: 50px;">ShowUsers</router-link>
    <router-link to="/viewShowEdit">viewShowEdit</router-link>
    <router-view />
  </div>

  <footer>
    <div class="text-center mt-5">By Pablo Dev</div>
  </footer>
</template>

<style src="./assets/css/style.css"></style>
