<template>
    <div class="container-Header">
    <div class="ctn-header">
        <div>
            <img src="../assets/Menu.png" @click="show_barra = true" alt="">
        </div>
        <div>
            <p>YALMECRIS</p>
        </div>
       <div>
        <img src="../assets/Logout.png" alt="" @click="logout">
       </div>
    </div>

    <div class="container-menu" v-show="show_barra">
            <div class="cont-menu">
                <div class="logo_user">
                    <img src="../assets/Hombre.png" alt="">
                    <p>DIMAR</p>
                </div>
                
                <nav>
                    <a @click="go_Menu">Menu</a>
                    <a @click="go_RegistrarProveedores">Registrar Proveedor</a>
                    <a @click="go_RegistrarCliente">Registrar Cliente</a>
                    <a @click="go_RegistrarProducto">Registrar Producto</a>
                    <a @click="go_RegistrarEntrada">Registrar Entrada</a>
                    <a @click="go_RegistrarVenta">Registrar Venta</a>
                    <a @click="go_Inventario">Ver Inventario</a>
                    <a @click="go_Clientes">Ver Clientes</a>
                    <a @click="go_Proveedores">Ver Proveedores</a>
                    <a @click="go_Ventas">Historial Ventas</a>
                    <a @click="go_Saldos">Historial Saldos</a>
                </nav>
            <label  @click="show_barra = false"><img src="../assets/icon_X.png" alt=""></label>
            </div>
        </div>
    
</div>
</template>

<script>
export default{
    name: 'HeaderOp',
    data(){
        return{
            show_barra: false
        }
}, methods: {
    logout(){
        sessionStorage.clear();
        this.$router.push({ path: '/' });
    },
  
        go_Menu(){
            this.show_barra=false;
            this.$router.push({ path: '/Menu' });
        },
        go_RegistrarProveedores(){
            this.show_barra=false;
            this.$router.push({ path: '/RegistrarProveedor' });
        },
        go_RegistrarCliente(){
            this.show_barra=false;
            this.$router.push({ path: '/RegistrarCliente' });
        },
        go_RegistrarOperador(){
            this.show_barra=false;
            this.$router.push({ path: '/RegistrarOperador' });
        },
        go_RegistrarProducto(){
            this.show_barra=false;
            this.$router.push({ path: '/RegistrarProducto' });
        },
        go_RegistrarEntrada(){
            this.show_barra=false;
            this.$router.push({ path: '/RegistrarIngreso' });
        },
        go_RegistrarVenta(){
            this.show_barra=false;
            this.$router.push({ path: '/RealizarVenta' });
        },
        go_Inventario(){
            this.show_barra=false;
            this.$router.push({ path: '/Inventario' });
        },
        go_Proveedores(){
            this.show_barra=false;
            this.$router.push({ path: '/RegistrarIngreso' });
        },
        go_Clientes(){
            this.show_barra=false;
            this.$router.push({ path: '/RegistrarIngreso' });
        },
        go_Ventas(){
            this.show_barra=false;
            this.$router.push({ path: '/Ventas' });
        },
        go_Saldos(){
            this.show_barra=false;
            this.$router.push({ path: '/Saldos' });
        },

        cerrarSesion(){
            sessionStorage.clear();
            this.$router.push({ path: '/' });
        }
    } 
}

</script>


