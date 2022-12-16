<template>
    <div>
       <div class="ctn-saldo">
        <h1>Abonar Saldo</h1>
        <div class="ctn-registrar-saldo">

            <div class="ctn-tablita">
                <table class="tablita">
                    <thead>
                        <tr>
                            <th>NOMBRE</th>
                            <th>CODIGO</th>
                            <th>TELEFONO</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{this.cliente.nombre_cli}}</td>
                            <td>{{this.cliente.cedula_cli}}</td>
                            <td>{{this.cliente.telefono_cli}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="abono">
                <p>Abono:</p>
                <input type="number" v-model="abono" @keyup="changeAbono" placeholder="0">
            </div>
            <div class="totales">
                <p> Total: ${{this.formatoMoneda(this.saldo)}}</p>
                <p> Abono: ${{this.formatoMoneda(this.abono)}}</p>
                <p> Total: ${{this.formatoMoneda(this.saldo - this.abono)}}</p>
            </div>
            <div class="btn-registrar"> 
                <button class="btn" @click="update_abono">Registrar Saldo</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import controlers from '../controllers/abonar_saldoCtlr';
import cliente from '../models/model_verCliente';

export default{
    name: 'AbonarSaldo',
    data() {
        return {
            cliente,
            id:  "",
            saldo: "",
            cedula:"",
            abono: "",
            estado: ""
            
        }
    }, 
    methods:{
        changeAbono(event){
            if(this.abono>this.saldo){
                this.abono = this.saldo
            }
        },
        async update_abono(){
            let abono = await controlers.update_abono(this.abono, this.id);
            if(abono){
                this.$router.push({ path: '/Saldos' });
            }
        },
        formatoMoneda(valor) {
            return controlers.formatoMoneda(valor);
        }  
    },
   async mounted(){
        this.saldo = Number(this.$route.query.saldo);
        this.cedula =  Number(this.$route.query.cedula);
        this.id =  Number(this.$route.query.id);
        this.cliente =  await controlers.cargarcliente(this.cedula);

    }
}

</script>