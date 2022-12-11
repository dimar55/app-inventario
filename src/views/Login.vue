<template>
    <FormLogin v-if="login" @recuperar-usuario="recuUsuario" @recuperar-clave="recuClave"></FormLogin>
    <RecuperarUsuario v-if="recUsuario" @goLogin="goLogin"></RecuperarUsuario>
    <RecuperarClave v-if="reClave" @goLogin="goLogin"></RecuperarClave>
</template>


<script>
import FormLogin from '@/components/FormLogin';
import RecuperarUsuario from '@/components/RecuperarUsuario';
import RecuperarClave from '../components/RecuperarClave.vue';
export default{
    name: 'Login',
    data(){
        return {
            login: true,
            recUsuario: false,
            reClave: false
        }
    },
    components: {
        FormLogin,
        RecuperarUsuario,
        RecuperarClave
        
    },
    methods: {
        recuUsuario(){
            this.login = false;
            this.recUsuario = true;
            this.reClave = false;
        },
        goLogin(){
            this.login = true;
            this.recUsuario = false;
            this.reClave = false;
        },
        recuClave(){
            this.login = false;
            this.reClave = true;
            this.recUsuario = false;
        }

    }

}

</script>

