<template>
    <Header></Header>
    <FacturaCompra></FacturaCompra>
</template>

<script>
import Header from '@/components/Header';
import FormIngreso from '@/components/FormIngreso';
import FacturaCompra from '@/components/FacturaCompra';
export default{
    name: 'Ingreso',
    components: {
        Header,
        FormIngreso,
        FacturaCompra,
    }
}
</script>