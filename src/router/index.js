import { createRouter, createWebHashHistory } from 'vue-router'
import axios from "axios";
import config from '../utils/utils';
import Login from '../views/Login.vue';
import Menu from '../views/Menu.vue';
import MenuOp from '../views/MenuOp.vue';
import RegistrarCliente from '../views/RegistrarCliente.vue';
import RegistrarOperador from '../views/RegistrarOperador.vue';
import RegistrarProveedor from '../views/RegistrarProveedor.vue';
import RegistrarProducto from '../views/RegistrarProducto.vue';
import RegistrarIngreso from '../views/RegistrarIngreso.vue';
import Ventas from '../views/Ventas.vue';
import Clientes from '../views/Clientes.vue';
import Proveedores from '../views/Proveedores.vue';
import Saldos from '../views/Saldos.vue';
import Inventario from '../views/Inventario.vue';
import RealizarVenta from '../views/RealizarVenta.vue';
import RegistrarSaldo from '../views/RegistrarSaldo.vue';
import Abonar from '../views/Abonar.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  }, 

  {
    path: '/Menu',
    name: 'Menu',
    component: Menu
  },

  {
    path: '/MenuOp',
    name: 'MenuOp',
    component: MenuOp
  },

  {
    path: '/RegistrarOperador',
    name: 'RegistrarOperador',
    component: RegistrarOperador
  },

  {
    path: '/RegistrarCliente',
    name: 'RegistrarCliente',
    component: RegistrarCliente
  },

  {
    path: '/RegistrarProveedor',
    name: 'RegistrarProveedor',
    component: RegistrarProveedor
  },
  
  {
    path: '/RegistrarProducto',
    name: 'RegistrarProducto',
    component: RegistrarProducto
  },
  {
    path: '/RegistrarIngreso',
    name: 'RegistrarIngreso',
    component: RegistrarIngreso
  },  
  {
    path: '/Clientes',
    name: 'Clientes',
    component: Clientes
  },

  {
    path: '/Proveedores',
    name: 'Proveedores',
    component: Proveedores
  },
  {
    path: '/Ventas',
    name: 'Ventas',
    component: Ventas
  },
  {
    path: '/Saldos',
    name: 'Saldos',
    component: Saldos
  },
  {
    path: '/Inventario',
    name: 'Inventario',
    component: Inventario
  },
  {
    path: '/RealizarVenta',
    name: 'RealizarVenta',
    component: RealizarVenta
  },
  {
    path: '/RegistrarSaldo',
    name: 'RegistrarSaldo',
    component: RegistrarSaldo
  },

  {
    path: '/Abonar',
    name: 'Abonar',
    component: Abonar
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, from) => {
  if (
    !sessionStorage.getItem('jwt') &&
    to.name !== 'Login'
  ) {
    return { name: 'Login' }
  }else{
    let token = sessionStorage.getItem('jwt');
    let res = await axios.post(config.server+"/usuario/verifyToken", {token})
    .then((result)=>{
      sessionStorage.setItem("Nombre", result.data.body.decoded.user.nombre_usu);
      sessionStorage.setItem("Cedula", result.data.body.decoded.user.cedula_usu);
      sessionStorage.setItem("Rol", result.data.body.decoded.user.rol_usu);
      return result.data.success
    }).catch((err)=>{
      return false;
    });
    if(!res && to.name !== 'Login'){
      return { name: 'Login' }
    }
  }

})

router.beforeEach(async (to, from) => {
  if (
    sessionStorage.getItem('jwt') &&
    to.name == 'Login'
  ) {
   // return { name: 'Menu' }
    let token = sessionStorage.getItem('jwt');
    let res = await axios.post(config.server+"/usuario/verifyToken", {token})
    .then((result)=>{
      sessionStorage.setItem("Nombre", result.data.body.decoded.user.nombre_usu);
      sessionStorage.setItem("Cedula", result.data.body.decoded.user.cedula_usu);
      sessionStorage.setItem("Rol", result.data.body.decoded.user.rol_usu);
      return result.data.success
    }).catch((err)=>{
      return false;
    });
    if(res){
      if(sessionStorage.getItem("Rol")=="Administrador"){
        return { name: 'Menu' }
      }else{
        return { name: 'MenuOp' }
      }
      
    }
  }
})

export default router
