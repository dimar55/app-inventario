<template>
    <Header></Header>
    <FormProveedor></FormProveedor>
</template>


<script>
import Header from '@/components/Header';
import FormProveedor from '../components/FormProveedor';

export default{
    name: 'RegistrarProveedor',
    components:{
        Header,
        FormProveedor
    }
}
</script>