<template>
    <Header></Header>
    <HistorialSaldos></HistorialSaldos>
</template>

<script>
 import Header from '@/components/Header';
 import HistorialSaldos from '@/components/HistorialSaldos';

export default{
    name: 'Saldos',
    components:{
        Header,
        HistorialSaldos
    } 
}
</script>