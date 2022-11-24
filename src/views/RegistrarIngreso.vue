<template>
    <Header></Header>
    <FormIngreso></FormIngreso>
</template>

<script>
import Header from '@/components/Header';
import FormIngreso from '@/components/FormIngreso';

export default{
    name: 'Ingreso',
    components: {
        Header,
        FormIngreso
    }
}
</script>