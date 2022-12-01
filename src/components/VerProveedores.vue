<template>
    <div class="ctn-saldo">
        <h1>Ver Proveedores</h1>
        <div class="ctn-registrar-saldo">
            <div class="ctn-tablita">
            <table class="tablita">
                <thead>
                    <tr>
                        <th>NOMBRE</th>
                        <th>CODIGO</th>
                        <th>TELEFONO</th>
                        <th>CORREO</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="proveedor in proveedores" :key="proveedor.nombre_pro">
                        <td>{{proveedor.nombre_pro}}</td>
                        <td>{{proveedor.cedula_pro}}</td>
                        <td>{{proveedor.telefono_pro}}</td>
                        <td>{{proveedor.correo_pro}}</td>
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
    name: 'VerProveedores',
    data(){
        return { 
            proveedores:[]
        }
    },
    methods: { 

        cargarProveedores(){
            axios.get(config.server+"/proveedor")
                .then((result) => {
                    if (result.data.success) this.proveedores = result.data.body;
                }).catch((err) => {
                    console.log(err)
                })
        },
    },
    mounted(){
        this.cargarProveedores();
    }
 

}
</script>