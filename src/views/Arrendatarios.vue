<template>
    <div class="container">
      <h1 class="text-start">
        Listado de Arrendatarios |
        <button @click="newArrendatario" class="btn btn-success mx-2">
          <font-awesome-icon icon="plus" />
        </button>
      </h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Teléfono</th>
            <th scope="col">Correo Electrónico</th>      
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(arrendatario, index) in arrendatarios" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ arrendatario.nombre }}</td>
            <td>{{ arrendatario.apellido }}</td>
            <td>{{ arrendatario.telefono }}</td>
            <td>{{ arrendatario.correo }}</td>
            
            <td>
              <button @click="deleteArrendatario(arrendatario.id)" class="btn btn-danger mx-2">
                <font-awesome-icon icon="trash" />
              </button>
              <button @click="editArrendatario(arrendatario.id)" class="btn btn-warning mx-2">
                <font-awesome-icon icon="pencil" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Swal from 'sweetalert2';
  
  export default {
    name: 'Arrendatarios',
    data() {
      return {
        arrendatarios: []
      };
    },
    methods: {
      deleteArrendatario(id) {
        Swal.fire({
          title: `¿Quieres eliminar el Arrendatario con id ${id}?`,
          showCancelButton: true,
          confirmButtonText: 'Borrar',
        }).then((result) => {
          if (result.isConfirmed) {
            axios.delete(`http://127.0.0.1:8000/api/arrendatarios/${id}`)
              .then(response => {
                if (response.data.success) {
                  Swal.fire('¡Eliminado!', '', 'success');
                  this.loadArrendatarios(); // Recargar los arrendatarios después de eliminar
                }
              });
          }
        });
      },
      editArrendatario(id) {
        this.$router.push({ name: 'EditarArrendatario', params: { id: id } });
      },
      newArrendatario() {
        this.$router.push({ name: 'NuevoArrendatario' });
      },
      loadArrendatarios() {
        axios.get('http://127.0.0.1:8000/api/arrendatarios')
          .then(response => {
            this.arrendatarios = response.data.arrendatarios;
          });
      }
    },
    mounted() {
      this.loadArrendatarios();
    }
  };
  </script>
  