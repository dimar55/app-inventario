<template>
    <Header></Header>
    <AnadirProveedor></AnadirProveedor>
</template>

<script>

import Header from '@/components/Header';
import AnadirProveedor from '@/components/AnadirProveedor';

export default{
    name: 'Añadir',
    components: {
       Header,
       AnadirProveedor
    }
}
</script>