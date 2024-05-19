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
    name: 'NewContrato',
    component: NewContrato
  }


]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
