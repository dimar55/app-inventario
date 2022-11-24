<template>
    <Header></Header>
    <FormCliente></FormCliente> 
</template>

<script>
import Header from '@/components/Header';
import FormCliente from '@/components/FormCliente';
export default{
    name: 'RegistrarCliente',
    components: {
        Header,
        FormCliente
    }
}
</script>