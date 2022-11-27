<template>
    <Header></Header>
    <VerClientes></VerClientes>
</template>

<script>
import VerClientes from '@/components/VerClientes';
import Header from '@/components/Header';
export default{
    name: 'Clientes',
    components:{
        Header,
        VerClientes,
    }
}
</script>