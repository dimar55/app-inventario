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
                    <tr v-for="cliente in clientes" :key="cliente.cedula_cli">
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

import cliente from '../models/model_verCliente';
import controlers from '../controllers/ver_clientesCtlr';

export default{
    name: 'VerClientes',
    data(){
        return {
            cliente, 
            clientes:[]
        }
    },
   async mounted(){
    this.clientes =  await controlers.cargarClientes();
    }
}
</script>