<template>
    <Header></Header>
    <OpcionesOp></OpcionesOp>
</template>

<script>
import Header from '@/components/Header';
import OpcionesOp from '@/components/OpcionesOp';
export default{
    name: 'MenuOp',
    components: {
        Header,
        OpcionesOp
    }
}
</script>