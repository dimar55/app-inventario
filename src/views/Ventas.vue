<template>
    <Header></Header>
    <HistorialVentas></HistorialVentas>
</template>

<script>

import Header from '@/components/Header';
import HistorialVentas from '@/components/HistorialVentas';

export default{
    name: 'Ventas',
    components: {
        Header,
        HistorialVentas
    }
}
</script>