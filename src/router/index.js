import { createRouter, createWebHashHistory } from 'vue-router'


//propiedades
import EditarPropiedad from '@/components/Propiedades/EditPropiedad.vue';
import NewPropiedad from '@/components/Propiedades/NewPropiedad.vue';
import Propiedades from '../views/Propiedades'
import HomeView from '../views/HomeView.vue'


//contratos
import EditarContrato from '@/components/Contratos/EditarContrato.vue';
import NewContrato from '@/components/Contratos/NewContrato.vue';
import Contratos from '../views/Contratos.vue';

//arrendatario importacion
import EditarArrendatario from '@/components/Arrendatarios/EditarArrendatario.vue';
import NewArrendatario from '@/components/Arrendatarios/NewArrendatario.vue';
import Arrendatarios from '../views/Arrendatarios.vue';

//Mantenimiento importacion
import Mantenimiento from '@/views/Mantenimiento.vue';
import EditarMantenimiento from '@/components/Mantenimientos/EditarMantenimiento.vue';
import NewMantenimiento from '@/components/Mantenimientos/NewMantenimiento.vue';

//Pagos importacion
import Pagos from '@/views/Pagos.vue';
import EditarPagos from '@/components/Pagos/EditarPagos.vue';
import NewPagos from '@/components/Pagos/NewPagos.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/propiedades',
    name: 'Propiedades',
    component: Propiedades

  },
  {
    path:'/editar-propiedad/:id',
    name: 'EditarPropiedad',
    component: EditarPropiedad
  },
  {
    path:'/add-propiedad/',
    name:'NewPropiedad',
    component: NewPropiedad
  },

  //Contratos
  {
    path: '/contratos',
    name: 'Contratos',
    component: Contratos
  },
  {
    path: '/editar-contrato/:id',
    name: 'EditarContrato',
    component: EditarContrato

  },
  {
    path: '/add-contrato/',
    name: 'NuevoContrato',
    component: NewContrato
  },

  //Arrendatarios Rutas
  {
    path: '/arrendatarios',
    name: 'Arrendatarios',
    component: Arrendatarios
  },
  {
    path: '/editar-arrendatario/:id',
    name: 'EditarArrendatario',
    component: EditarArrendatario
  },
  {
    path: '/add-arrendatario/',
    name: 'NuevoArrendatario',
    component: NewArrendatario
  },
  //Mantenimiento Rutas
  {
    path: '/mantenimientos',
    name: 'Mantenimiento',
    component: Mantenimiento
  },
  {
    path: '/editar-mantenimiento/:id',
    name: 'EditarMantenimiento',
    component: EditarMantenimiento
  },
  {
    path: '/add-mantenimiento/',
    name: 'NuevoMantenimiento',
    component: NewMantenimiento
  },
  //Pagos
  {
    path: '/pagos',
    name: 'Pagos',
    component: Pagos
  },
  {
    path: '/editar-pagos/',
    name: 'EditarPagos',
    component: EditarPagos
  },
  {
    path: '/add-pagos/',
    name: 'NewPago',
    component: NewPagos
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
