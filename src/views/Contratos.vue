<template>
    <div class="container">
      <h1 class="text-start">
        Listado de Contratos |
        <button @click="newContrato" class="btn btn-success mx-2">
          <font-awesome-icon icon="plus" />
        </button>
      </h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Propiedad</th>
            <th scope="col">Arrendatario</th>
            <th scope="col">Fecha Inicio</th>
            <th scope="col">Fecha Fin</th>
            <th scope="col">Renta Mensual</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(contrato, index) in contratos" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ contrato.propiedad_id }}</td>
            <td>{{ contrato.arrendatario_id }}</td>
            <td>{{ contrato.fecha_inicio }}</td>
            <td>{{ contrato.fecha_fin }}</td>
            <td>{{ contrato.renta_mensual }}</td>
            <td>
              <button @click="deleteContrato(contrato.id)" class="btn btn-danger mx-2">
                <font-awesome-icon icon="trash" />
              </button>
              <button @click="editContrato(contrato.id)" class="btn btn-warning mx-2">
                <font-awesome-icon icon="pencil" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  import Swal from 'sweetalert2'
  
  export default {
    name: 'Contratos',
    data() {
      return {
        contratos: []
      }
    },
    methods: {
      deleteContrato(id) {
        Swal.fire({
          title: `¿Quieres eliminar el Contrato con id ${id}?`,
          showCancelButton: true,
          confirmButtonText: 'Borrar',
        }).then((result) => {
          if (result.isConfirmed) {
            axios.delete(`http://127.0.0.1:8000/api/contratos/${id}`)
              .then(response => {
                if (response.data.success) {
                  Swal.fire('¡Eliminado!', '', 'success')
                  this.loadContratos() // Recargar los contratos después de eliminar
                }
              })
          }
        })
      },
      editContrato(id) {
        this.$router.push({ name: 'EditarContrato', params: { id: id } })
      },
      newContrato() {
        this.$router.push({ name: 'NuevoContrato' })
      },
      loadContratos() {
        axios.get('http://127.0.0.1:8000/api/contratos')
          .then(response => {
            this.contratos = response.data.contratos
          })
      }
    },
    mounted() {
      this.loadContratos()

    }
  }
  </script>
  