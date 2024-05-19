<template>
    <div class="container">
      <h1 class="text-start">
        | Listado Propiedades |
        <button @click="newPropiedad" class="btn btn-success mx-2">
          <font-awesome-icon icon="plus" />
        </button>
      </h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Dirección</th>
            <th scope="col">Descripción</th>
            <th scope="col">Tipo</th>
            <th scope="col">Disponibilidad</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(propiedad, index) in propiedades" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ propiedad.direccion }}</td>
            <td>{{ propiedad.descripcion }}</td>
            <td>{{ propiedad.tipo }}</td>
            <td>{{ propiedad.disponibilidad }}</td>
            <td>
              <button @click="deletePropiedad(propiedad.id)" class="btn btn-danger mx-2">
                <font-awesome-icon icon="trash" />
              </button>
              <button @click="editPropiedad(propiedad.id)" class="btn btn-warning mx-2">
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
    name: 'Propiedades',
    data() {
      return {
        propiedades: []
      }
    },
    methods: {
      deletePropiedad(codigo) {
        Swal.fire({
          title: `¿Quieres eliminar la Propiedad con id ${codigo}?`,
          showCancelButton: true,
          confirmButtonText: 'Borrar',
        }).then((result) => {
          if (result.isConfirmed) {
            axios.delete(`http://127.0.0.1:8000/api/propiedades/${codigo}`)
              .then(response => {
                if (response.data.success) {
                  Swal.fire('¡Eliminado!', '', 'success')
                  this.loadPropiedades() // Recargar las propiedades después de eliminar
                }
              })
          }
        })
      },
      editPropiedad(id) {
        this.$router.push({ name: 'EditarPropiedad', params: { id: id } })
      },
      newPropiedad() {
        this.$router.push({ name: 'NewPropiedad' })
      },
      loadPropiedades() {
        axios.get('http://127.0.0.1:8000/api/propiedades')
          .then(response => {
            this.propiedades = response.data.propiedades
          })
      }
    },
    mounted() {
      this.loadPropiedades()
    }
  }
  </script>