<template>
    <Header></Header>
    <VerProveedores></VerProveedores>
</template>

<script>
import VerProveedores from '@/components/VerProveedores';
import Header from '@/components/Header';
export default{
    name: 'Proveedores',
    components:{
        Header,
        VerProveedores,
    }
}
</script>