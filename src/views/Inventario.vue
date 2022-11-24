<template>
    <Header></Header>
    <VerInventario></VerInventario>
</template>

<script>
import Header from '@/components/Header';
import VerInventario from '@/components/VerInventario.vue';

export default{
    name: 'Inventario',
    components:{
        Header,
        VerInventario
    }
}
</script>