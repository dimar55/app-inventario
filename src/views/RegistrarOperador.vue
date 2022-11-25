<template>
    <Header></Header>
    <FormOperador></FormOperador> 
</template>

<script>
import Header from '@/components/Header';
import FormOperador from '@/components/FormOperador';
export default{
    name: 'RegistrarOperador',
    components: {
        Header,
        FormOperador
    }
}
</script>