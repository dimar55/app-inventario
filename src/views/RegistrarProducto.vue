<template>
    <Header></Header>
    <FormProducto></FormProducto>
</template>

<script>
import Header from '@/components/Header';
import FormProducto from '@/components/FormProducto';

export default{
    name: 'RegistrarProducto',
    components:{
        Header,
        FormProducto
    }
}
</script>