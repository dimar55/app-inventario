<template>
    <Header></Header>
    <FacturaCompra></FacturaCompra>
</template>

<script>
import Header from '@/components/Header';
import FacturaCompra from '@/components/FacturaCompra';
export default{
    name: 'Ingreso',
    components: {
        Header,
        FacturaCompra,
    }
}
</script>