<template>
  <div>
    <h1 class="titular">REGISTRO FACTURA INGRESO</h1>
    <div class="ctn-registrarf">
      <div>
        <div class="campos_registrarf">
          <p>Id de la factura:</p>
          <input type="text" required v-model="factura.id_fact"/>
        </div>
        <div class="campos_registrarf">
          <p>Empresa:</p>
          <input type="text" required v-model="factura.empresa"/>
        </div>
        <form class="campos_registrarf" v-on:submit.prevent="buscarProveedor">
          <p>Cedula del Proveedor:</p>
          <input type="number" min="100000" max="999999999999" v-model="id_prov"/>
        </form>
        <div class="campos_registrarf" v-show="prov_no_existe">
          <p>Proveedor no registrado</p>
          <button class="btn" @click="goProveedor">REGISTRAR</button>
        </div>
        <form class="campos_registrarf" v-on:submit.prevent="buscarProducto">
          <p>Codigo del producto:</p>
          <input type="number" required min="0" v-model="id_product" />
        </form>
        <div class="campos_registrarf" v-show="prod_no_existe">
          <p>Producto no registrado</p>
          <button class="btn" @click="goProducto">REGISTRAR</button>
        </div>
        <form v-if="add_prod" v-on:submit.prevent="añadirProd">
        <div class="campos_registrarf" >
          <p>Precio entrada:</p>
          <input type="number" required min="100" v-model="prod.precio_entrada" />
        </div>
        <div class="campos_registrarf">
          <p>Precio de venta:</p>
          <input type="number" required min="100" v-model="prod.precio_venta" />
        </div>
        <div class="boton">
          <button class="btn" type="submit">AÑADIR</button>
        </div>
      </form>
      </div>
      <div class="facturac">
        <div>
          <h2>FACTURA COMPRA</h2>
          <div class="cmp">
            <div>
              <label>Numero de factura: </label>
              <label>{{factura.id_fact}}</label>
            </div>
            <div>
              <label>Empresa: </label>
              <label>{{factura.empresa}}</label>
            </div>
            <div>
              <label>Fecha de la factura: </label>
              <label>{{ today.toLocaleDateString("en-US") }}</label>
            </div>
          </div>
        </div>
        <div>
          <h2>DATOS DEL NEGOCIO</h2>
          <div class="cmp">
            <div>
              <label>Nombre: </label>
              <label>Yalmecris</label>
            </div>
            <div>
              <label>Telefono: </label>
              <label>5782288</label>
            </div>
            <div>
              <label>Dirección: </label>
              <label>Av 12 entre 14 n an-08 villa nueva la isla</label>
            </div>
          </div>
        </div>
        <div>
          <h2>DATOS DEL PROVEEDOR</h2>
          <div class="cmp">
            <div>
              <label>CC: </label>
              <label>{{proveedor.cedula_pro}}</label>
            </div>
            <div>
              <label>Nombre: </label>
              <label>{{proveedor.nombre_pro}}</label>
            </div>
            <div>
              <label>Telefono: </label>
              <label>{{proveedor.telefono_pro}}</label>
            </div>
          </div>
        </div>
        <div>
          <h2>DATOS DEL USUARIO</h2>
          <div class="cmp">
            <div>
              <label>CC: </label>
              <label>{{ this.vendedor.cedula }}</label>
            </div>

            <div>
              <label>Nombre: </label>
              <label>{{ this.vendedor.nombre }}</label>
            </div>

            <div>
              <label>Cargo: </label>
              <label>{{ this.vendedor.cargo }}</label>
            </div>
          </div>
        </div>
        <table class="tabla_venta">
          <thead>
            <tr>
              <th>PRODUCTO</th>
              <th>CODIGO</th>
              <th>CAN</th>
              <th>PRECIO UN</th>
              <th>SUBTOTAL</th>
              <th>ACCIÓN</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(prod, index) in prods_compra"
              :key="prod.nombre_product"
            >
              <td>
                {{ prod.nombre_product }} {{ prod.marca_product }}
                {{ prod.cantidad_product }} {{ prod.unidad_product }}
              </td>
              <td>{{ prod.id_product }}</td>
              <td>
                <span class="cursor" @click="resCantidad(prod.id_product)"
                  >-</span
                >
                {{ prod.cantidad }}
                <span class="cursor" @click="sumCantidad(prod.id_product)"
                  >+</span
                >
              </td>
              <td>{{ prod.precio_entrada }}</td>
              <td>{{ prod.cantidad * prod.precio_entrada }}</td>
              <td>
                <span class="cursor" @click="eliminarProd(index)">X</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="labeltotal">
          <label>Total: {{formatoMoneda(this.total)}}</label>
        </div>
        <div class="boton">
          <button class="btn" @click="registrarFactura">REGISTRAR FACTURA</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import controlers from '../controllers/facturaCtrl';
export default {
  name: "FacturaCompra",
  data() {
    return {
      today: new Date(),
      prod_no_existe: false,
      prov_no_existe: false,
      add_prod: false,
      id_product: "",
      prod: {
        precio_entrada: "",
        precio_venta: "",
      },
      prods_compra: [],
      vendedor: {
        cedula: localStorage.getItem("Cedula"),
        nombre: localStorage.getItem("Nombre"),
        cargo: localStorage.getItem("Rol"),
      },
      factura: {
        id_fact: "",
        empresa: "",
        cedula_pro: "", 
        cedula_usu: Number(localStorage.getItem("Cedula")),
      },
      total: 0,
      id_prov: "",
      proveedor:{
        cedula_pro: "",
        nombre_pro: "",
        telefono_pro: ""
      }
    };
  },
  methods: {
    goProducto(){
      this.$router.push({ path: '/RegistrarProducto', query: {id: this.id_product}});
    },
    goProveedor(){
      this.$router.push({ path: '/RegistrarProveedor', query: {id: this.factura.cedula_pro}});
    },
    async buscarProducto() {
      const response = await controlers.buscarProducto(this.id_product);
      if(response.success){
        this.prod_no_existe = response.prod_no_existe;
        this.add_prod = response.add_prod;
        this.prod = response.prod;
      }else{
        this.prod_no_existe = response.prod_no_existe;
        this.add_prod = response.add_prod;
      }
    },
    async buscarProveedor() {
      const response = await controlers.buscarProveedor(this.id_prov);
      if(response.success){
        this.proveedor = response.proveedor;
        this.factura.cedula_pro = this.proveedor.cedula_pro;
        this.prov_no_existe = response.prov_no_existe;
      } else {
        this.prov_no_existe = response.prov_no_existe;
      }
    },
    async buscarFactura() {
      return await controlers.buscarFactura(this.factura.id_fact);
    },
    añadirProd() {
      const pd = this.prods_compra.find(
        (ele) => ele.id_product == this.prod.id_product
      );
      if (pd) {
        pd.cantidad++;
      } else {
        let prod = Object.assign({ cantidad: 1 }, this.prod);
        this.prods_compra.push(prod);
      }
      this.calcularTotal();
      this.add_prod = false;
      this.prod_no_existe = false;
      this.id_product = "";
    },
    sumCantidad(id) {
      const pd = this.prods_compra.find((ele) => ele.id_product == id);
      pd.cantidad++;
      this.calcularTotal();
    },
    resCantidad(id) {
      const pd = this.prods_compra.find((ele) => ele.id_product == id);
      if (pd.cantidad > 1) {
        pd.cantidad--;
        this.calcularTotal();
      }
    },
    eliminarProd(id) {
      this.prods_compra.splice(id, 1);
      this.calcularTotal();
    },
    calcularTotal() {
      let total = 0;
      for (let index = 0; index < this.prods_compra.length; index++) {
        const element = this.prods_compra[index];
        total += element.precio_entrada * element.cantidad;
      }
      this.total = total;
    },
    registrarFactura(){
        controlers.registrarFactura(this);
    },
    formatoMoneda(valor) {
      return controlers.formatoMoneda(valor);
    }  
  },
};
</script>

<style>
.titular {
  padding-top: 30px;
  text-align: center;
  color: #ffead1;
  font-size: 70px;
  font-weight: 400;
}

.ctn-registrarf {
  margin: auto;
  display: flex;
  background-color: #92dad4;
  width: 1550px;
  color: black;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 25px;
  margin-top: 40px;
  margin-bottom: 40px;
  padding: 20px;
}

.ctn-registrarf h1 {
  font-size: 55px;
  padding-top: 30px;
  padding-bottom: 30px;
}

.ctn-registrarf p {
  font-size: 48px;
}

.ctn-registrarf input {
  width: 300px;
  height: 46px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 25px;
  border: none;
  font-size: 30px;
  padding-left: 20px;
  margin-left: 20px;
}

.campos_registrarf {
  display: flex;
  text-align: center;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0 20px 20px;
}

.facturac {
  margin: auto;
  background-color: #ffffff;
  color: black;
  border-radius: 25px;

  padding: 20px;
  font-size: 25px;
  width: 800px;
}

.facturac h2 {
  text-align: center;
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
