<template>
    <div class="container">
      <h1 class="text-start">
        | Listado Pagos |
        <button @click="newPago" class="btn btn-success mx-2">
          <font-awesome-icon icon="plus" />
        </button>
      </h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Contrato ID</th>
            <th scope="col">Fecha de Pago</th>
            <th scope="col">Monto</th>
            <th scope="col">Estado</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(pago, index) in pagos" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ pago.contrato_id }}</td>
            <td>{{ pago.fecha_pago }}</td>
            <td>{{ pago.monto }}</td>
            <td>{{ pago.estado }}</td>
            <td>
              <button @click="deletePago(pago.id)" class="btn btn-danger mx-2">
                <font-awesome-icon icon="trash" />
              </button>
              <button @click="editPago(pago.id)" class="btn btn-warning mx-2">
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
    name: 'Pagos',
    data() {
      return {
        pagos: []
      }
    },
    methods: {
      deletePago(id) {
        Swal.fire({
          title: `¿Quieres eliminar el Pago con id ${id}?`,
          showCancelButton: true,
          confirmButtonText: 'Borrar',
        }).then((result) => {
          if (result.isConfirmed) {
            axios.delete(`http://127.0.0.1:8000/api/pagos/${id}`)
              .then(response => {
                if (response.data.success) {
                  Swal.fire('¡Eliminado!', '', 'success')
                  this.loadPagos() // Recargar los pagos después de eliminar
                }
              })
          }
        })
      },
      editPago(id) {
        this.$router.push({ name: 'EditarPago', params: { id: id } })
      },
      newPago() {
        this.$router.push({ name: 'NewPago' })
      },
      loadPagos() {
        axios.get('http://127.0.0.1:8000/api/pagos')
          .then(response => {
            this.pagos = response.data.pagos
          })
      }
    },
    mounted() {
      this.loadPagos()
    }
  }
  </script>
  