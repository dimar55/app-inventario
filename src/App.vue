<template>
  <div id="app" class="app">
    <router-view></router-view>
  </div>
  
</template>


<script>
import axios from "axios";
import config from './utils/utils';
export default {
  name: "App",
  methods: {
    cerrarSesion(){
      let token = sessionStorage.getItem("jwt")
      axios.post(config.server+"/usuario/cerrar", {token});
      sessionStorage.clear();
      return null; 
    }
  },
  mounted(){
    localStorage.setItem('test', 'hola');
  },
};
</script>

<style>


* {

  font-family: 'League Gothic', sans-serif;
  padding: 0;
  margin: 0;
  }

  #app{
    background-color: #194F5D;
  }
</style>
