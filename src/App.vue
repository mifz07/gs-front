<template>
  <SideComponent></SideComponent>

  <div class="layout-main">
      <NavComponent></NavComponent>
      <div class="ml-5">
        <router-view></router-view>
      </div>
      <!-- <Paginator :rows="10" :totalRecords="120" :rowsPerPageOptions="[10, 20, 30]"></Paginator> -->
      
  </div>
  </template>

<script>

  import NavComponent from './views/NavComponent.vue';
  import SideComponent from './views/SideComponent.vue';

  export default {
    name: 'App',
    components: {
      NavComponent, SideComponent
    }
  }
</script>

<style scoped>

</style>
