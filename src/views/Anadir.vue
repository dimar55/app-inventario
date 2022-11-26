<template>
    <Header></Header>
    <AnadirSaldo></AnadirSaldo>
</template>

<script>

import Header from '@/components/Header';
import AnadirSaldo from '@/components/AnadirSaldo';

export default{
    name: 'Añadir',
    components: {
       Header,
       AnadirSaldo
    }
}
</script>