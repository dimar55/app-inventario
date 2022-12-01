<template>
    <div class="ctn-venta">
        <div class="titulo">
            <h1> VENTA</h1>
        </div>
    <div class="contenedores">
        <div class="ctn-buscar">
            <form class="filtro"  v-on:submit.prevent="buscarProducto">
                <input type="text" placeholder="Buscar Producto" v-model="id_producto">
            </form>
            <div class="products-venta">
                <div class="product" v-if="filtrado" v-for="(prod, index) in prods_filtro" :key="prod.nombre_product">
                    <p>{{prod.nombre_product}} {{prod.marca_product}} {{prod.cantidad_product}}{{prod.unidad_poduct}}</p>
                    <p>${{prod.precio_venta}}</p>
                    <div class="ctn-text">
                        <p style="color:#555555"> Disponilbles: {{prod.cantidad_lote}}</p>
                        <button class="btn" @click="agregarProd(index)"> Añadir</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="lista-venta">
            <div class="producto-select" v-for="(prod, index) in prods_venta" :key="prod.nombre_product">
                <div class="ctn-text">
                    <p>{{prod.nombre_product}} {{prod.marca_product}} {{prod.cantidad_product}}{{prod.unidad_poduct}}</p>
                    <img src="../assets/icon_delete.png" alt="" @click="eliminarProd(index)">
                </div>
                <div>
                    <p>${{prod.precio_venta}}</p>
                </div>
                <div>
                    <div class="ctn-text">
                        <p>Disponibles: {{prod.cantidad_lote}}</p>
                        <img src="../assets/icon_plus.png" alt="" @click="sumCantidad(prod.id_product)">
                        <p style="color: #55B77E">{{prod.cant_venta}}</p>
                        <img src="../assets/icon_minus.png" alt="" @click="resCantidad(prod.id_product)">
                        <p>{{prod.cant_venta}}*{{prod.precio_venta}} = {{prod.cant_venta*prod.precio_venta}}</p>
                    </div>
                </div>  
            </div>
            <div class="ctn-text">
                <button class="btn" @click="registrarVenta(false)">Registrar venta</button>
                <button class="btn" @click="registrarVenta(true)">Abrir saldo</button>
            </div>
            <div class="totales">
                <p> Total: ${{this.total}}</p>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import config from '../utils/utils';
export default{
    name: 'Venta',
    data(){
        return {
            filtrado: false,
            id_producto: "",
            total:  0,
            prods_filtro: [],
            prods_venta: []

        }
    },
    methods: {
        buscarProducto(){
            axios.get(config.server+"/loteP/id/"+this.id_producto)
            .then((result)=>{
                if(result.data.success && result.data.body.length>0){
                    this.prods_filtro = result.data.body
                    this.filtrado = true;
                }else{
                    this.filtrado = false;
                    Swal.fire({
                            icon: "error",
                            title: "No se encontraron resultados",
                            showConfirmButton: false,
                            timer: 1200,
                        });
                }
            }).catch((err)=>{
                this.filtrado = false;
                console.log(err);
                Swal.fire({
                            icon: "error",
                            title: "No se encontraron resultados",
                            showConfirmButton: false,
                            timer: 1200,
                        });
            })
        },
        agregarProd(i){
            const pd = this.prods_venta.find(ele => ele.id_product == this.prods_filtro[i].id_product);
            if(pd){
                if(pd.cant_venta<pd.cantidad_lote){
                    pd.cant_venta++;
                }
            }else{
                let prod = Object.assign({cant_venta: 1}, this.prods_filtro[i]);
                this.prods_venta.push(prod);
            }
            this.calcularTotal();
            this.id_producto = "";
            this.filtrado = false;
        },
        sumCantidad(id){
            const pd = this.prods_venta.find(ele => ele.id_product == id);
            if(pd.cant_venta<pd.cantidad_lote){
                    pd.cant_venta++;
                    this.calcularTotal()
            }
        },
        resCantidad(id){
            const pd = this.prods_venta.find(ele => ele.id_product == id);
            if(pd.cant_venta>1){
                pd.cant_venta--;
                this.calcularTotal()
            }
        },
        eliminarProd(id){
            this.prods_venta.splice(id, 1);
            this.calcularTotal()
        },
        calcularTotal(){
            let total = 0;
            for (let index = 0; index < this.prods_venta.length; index++) {
                const element = this.prods_venta[index];
                total+=element.precio_venta*element.cant_venta
            }
            this.total = total;
        },
        registrarVenta(saldo){
            if(this.prods_venta.length>0){
                let productos = [];
                for (let index = 0; index < this.prods_venta.length; index++) {
                    const element = this.prods_venta[index];
                    productos.push([element.id_product, element.cant_venta, element.precio_venta]);
                }
                axios.post(config.server+"/venta", {productos})
                .then((result)=>{
                    if (result.data.success) {
                        if(saldo){
                            this.$router.push({ path: '/RegistrarSaldo', query: {id_venta: result.data.body.id_venta, total_venta: result.data.body.total_venta}});
                        }else{
                            Swal.fire({
                            icon: "success",
                            title: "Venta realizada exitosamente",
                            showConfirmButton: false,
                            timer: 1000,
                        });
                        }
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "No se ha podido realizar la venta",
                            showConfirmButton: false,
                            timer: 1200,
                        });
                    }
                }).catch((err) => {
                    Swal.fire({
                        icon: "error",
                        title: "No se ha podido realizar la venta",
                        showConfirmButton: false,
                        timer: 1200,
                    });
                })
                this.prods_venta = [];
                this.filtrado = false;
                this.id_producto = ""; 
                this.calcularTotal();
            }
        }
    },
}
</script>


<style>
.ctn-venta{
    height: 100vh;
}
.titulo h1{
    text-align: center;
    color: #FFEAD1;
    font-size: 70px;
    font-weight: 400;
}
.contenedores{
    display: flex;
    font-size: 40px;
}

.ctn-buscar{
    margin: auto;
    background-color: #92DAD4;
    color: black;
    width:  600px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    margin-top: 40px;
    padding: 20px; 
}

.lista-venta{
    margin: auto;
    background-color: #92DAD4;
    color: black;
    width:  600px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    margin-top: 40px;
    padding: 20px; 
}

.ctn-text{
    display: flex;
    justify-content: space-between;
}
.ctn-text img{
    cursor: pointer;
}
.product{
    background-color: #ffffff;
    margin: 10px;
    padding: 10px;
    border-radius: 20px;
}

.producto-select{
    background-color: #ffffff;
    margin: 10px;
    padding: 10px;
    border-radius: 20px;
}
.btn-b{
    font-size: 40px;
    font-weight: 400;
    width: 145px;
    height: 50px;
    color: #FFFF;
    background: #F58649;
    border: none;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 30px;
    cursor: pointer;
}

</style>