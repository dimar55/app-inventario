<template>
    <Header></Header>
    <AbonarSaldo></AbonarSaldo>
</template>

<script>
import Header from '@/components/Header';
import AbonarSaldo from '@/components/AbonarSaldo';

export default{
    name: 'Abonar',
    components:{
        Header,
        AbonarSaldo
    }
}
</script>