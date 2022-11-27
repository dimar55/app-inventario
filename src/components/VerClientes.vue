<template>
    <div class="ctn-saldo">
        <h1>Ver Clientes</h1>
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
                    <tr v-for="cliente in clientes">
                        <td>{{cliente.nombre_cli}}</td>
                        <td>{{cliente.cedula_cli}}</td>
                        <td>{{cliente.telefono_cli}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        </div>
        
    </div>
</template>

<script>
import axios from "axios";
import config from '../utils/utils';
export default{
    name: 'VerClientes',
    data(){
        return {
            cliente: {
                cedula_cli: "",
                nombre_cli: "",
                telefono_cli: ""
            },  
            clientes:[]
        }
    },
    methods: { 

        cargarClientes(){
            axios.get(config.server+"/cliente")
                .then((result) => {
                    if (result.data.success) this.clientes = result.data.body;
                }).catch((err) => {
                    console.log(err)
                })
        },
    },
    mounted(){
        this.cargarClientes();
    }
 

}
</script>