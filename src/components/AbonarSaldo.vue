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
                <button class="btn" @click="registrarSaldo">Registrar Saldo</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import config from '../utils/utils';
//import cliente from '../models/model_verCliente';
import controlers from '../controllers/abonar_saldoCtlr';

export default{
    name: 'AbonarSaldo',
    data() {
        return {
            cliente:{
                cedula_cli: "",
                nombre_cli: "",
                telefono_cli: "" 
            },

            updateAbono: {
                id_saldo: "",
                estado_saldo: "",
                saldo: "",
               
            },

            id:  "",
            saldo: "",
            cedula:"",
            abono: "",
            estado: ""
            
        }
    }, 
    methods:{
        update_abono(){
            this.estado_saldo = (this.saldo - this.abono == 0 ) ? 'Pagado' : 'Pendiente';
            this.id_saldo = this.saldo;
            axios.put(config.server+"/saldo"+this.updateAbono)
            
        },
        formatoMoneda(valor) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            minimumFractionDigits: 2,
            currency: 'COP'
        }) 
        return formatter.format(valor)
        }
    },
   async mounted(){
       
        console.log(this.$route.query);
        this.saldo = Number(this.$route.query.saldo);
        this.cedula =  Number(this.$route.query.cedula);
        this.id =  Number(this.$route.query.id);
        this.cliente =   await controlers.cargarcliente(this.cedula);
      
        //console.log(controlers.cargarcliente(this.cedula));
        
    }
}

</script>