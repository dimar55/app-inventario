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
import axios from "axios";
import Swal from "sweetalert2";
import config from '../utils/utils';
import controlers from '../controllers/abonar_saldoCtlr';
import cliente from '../models/model_verCliente';

export default{
    name: 'AbonarSaldo',
    data() {
        return {
            cliente,

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
            this.updateAbono.estado_saldo = (this.saldo - this.abono == 0 ) ? 'Pagado' : 'Pendiente';
            this.updateAbono.saldo = Number (this.saldo - this.abono);
            this.updateAbono.id_saldo = this.id;
            axios.put(config.server+"/saldo", this.updateAbono) 
            .then((result)=>{
                if(result.data.success){
                    Swal.fire({
                            icon: "success",
                            title: "Abono realizado exitosamente",
                            showConfirmButton: false,
                            timer: 1000,
                        });
                        this.$router.push({ path: '/Saldos' });
                }else{
                    console.log(result);
                    Swal.fire({
                            icon: "error",
                            title: "No se ha realizado el abono",
                            showConfirmButton: false,
                            timer: 1200,
                        });
                }
            }).catch((err)=>{
                console.log(err);
            })
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
        this.saldo = Number(this.$route.query.saldo);
        this.cedula =  Number(this.$route.query.cedula);
        this.id =  Number(this.$route.query.id);
        this.cliente =  await controlers.cargarcliente(this.cedula);

    }
}

</script>