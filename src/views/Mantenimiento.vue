<template>
    <div class="container">
      <h1 class="text-start">
        Listado de Mantenimientos |
        <button @click="newMantenimiento" class="btn btn-success mx-2">
          <font-awesome-icon icon="plus" />
        </button>
      </h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Propiedad</th>
            <th scope="col">Descripción</th>
            <th scope="col">Fecha</th>
            <th scope="col">Costo</th>
            <th scope="col">Acciones</th> 
          </tr>
        </thead>
        <tbody>
          <tr v-for="(mantenimiento, index) in mantenimientos" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ mantenimiento.propiedad }}</td>
            <td>{{ mantenimiento.descripcion }}</td>
            <td>{{ mantenimiento.fecha }}</td>
            <td>{{ mantenimiento.costo }}</td>
            <td>
              <button @click="deleteMantenimiento(mantenimiento.id)" class="btn btn-danger mx-2">
                <font-awesome-icon icon="trash" />
              </button>
              <button @click="editMantenimiento(mantenimiento.id)" class="btn btn-warning mx-2">
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
    name: 'Mantenimientos',
    data() {
      return {
        mantenimientos: []
      }
    },
    methods: {
      deleteMantenimiento(id) {
        Swal.fire({
          title: `¿Quieres eliminar el Mantenimiento con id ${id}?`,
          showCancelButton: true,
          confirmButtonText: 'Borrar',
        }).then((result) => {
          if (result.isConfirmed) {
            axios.delete(`http://127.0.0.1:8000/api/mantenimientos/${id}`)
              .then(response => {
                if (response.data.success) {
                  Swal.fire('¡Eliminado!', '', 'success')
                  this.loadMantenimientos() // Recargar los mantenimientos después de eliminar
                }
              })
          }
        })
      },
      editMantenimiento(id) {
        this.$router.push({ name: 'EditarMantenimiento', params: { id: id } })
      },
      newMantenimiento() {
        this.$router.push({ name: 'NuevoMantenimiento' })
      },
      loadMantenimientos() {
        axios.get('http://127.0.0.1:8000/api/mantenimientos')
          .then(response => {
            this.mantenimientos = response.data.mantenimientos
          })
      }
    },
    mounted() {
      this.loadMantenimientos()
    }
  }
  </script>
  