<template>

  <div v-if="pathName == 'login'">
    <LoginPage></LoginPage>
  </div>

  <div v-if="pathName == 'NotFound'">
    <NotFound></NotFound>
  </div>

  <div v-if="pathName != 'login' &&  pathName != 'NotFound'" class="container" id="mainContainer">
    <SideComponent></SideComponent>

    <div class="layout-main">
        <NavComponent></NavComponent>
        <div class="ml-5 mr-5">
          <router-view></router-view>
        </div>
    </div>
  </div>
  
</template>

<script>

  import NavComponent from './views/NavComponent.vue';
  import SideComponent from './views/SideComponent.vue';
  import LoginPage from './views/LoginComponent.vue';
  import NotFound from './views/NotFound.vue';
  import {ref} from 'vue';

  // const pathName = ref(null);

  export default {
    name: 'App',
    data(){
      return{
        pathName: ''
      }
    },
    components: {
      NavComponent, SideComponent, LoginPage, NotFound
    },
    watch: {
        $route(curRoute) {
            this.pathName = curRoute.name;
            // console.log(this.pathName);
        },
    }
  }
</script>

<style scoped>

</style>
