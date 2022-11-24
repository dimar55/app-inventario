import { createRouter, createWebHashHistory } from 'vue-router'

import Login from '../views/Login.vue';
import Menu from '../views/Menu.vue';
import RegistrarCliente from '../views/RegistrarCliente.vue';
import RegistrarProveedor from '../views/RegistrarProveedor.vue';
import RegistrarProducto from '../views/RegistrarProducto.vue';
import RegistrarIngreso from '../views/RegistrarIngreso.vue';
import Ventas from '../views/Ventas.vue';
import Saldos from '../views/Saldos.vue';
import Inventario from '../views/Inventario.vue';
import RealizarVenta from '../views/RealizarVenta.vue';
import Anadir from '../views/Anadir.vue';

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
    path: '/Anadir',
    name: 'Anadir',
    component: Anadir
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
