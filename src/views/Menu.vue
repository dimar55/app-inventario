<template>
    <Header></Header>
    <Opciones></Opciones>
</template>

<script>
import Header from '@/components/Header';
import Opciones from '@/components/Opciones';
export default{
    name: 'Menu',
    components: {
        Header,
        Opciones
    }
}
</script>