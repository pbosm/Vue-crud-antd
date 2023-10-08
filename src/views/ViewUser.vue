<template>
  <div>
    <!-- <ComponentUser :id="route.params.id" /> -->  
    <component :is="ComponentUser"></component>
  </div>
</template>
  
<script setup>
  import ComponentUser from '../components/ComponentUser.vue';
</script>
