<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">Editar Mantenimiento</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Mantenimiento
            </div>
            <div class="card-body">
                <form @submit.prevent="updateMantenimiento">
                    <div class="row mb-3">
                        <label for="codigo" class="form-label">Código</label>
                        <div class="input-group">
                            <div class="input-group">
                                <div class="input-group-text"> <font-awesome-icon icon="tag" /></div>
                                <input type="text" class="form-control" id="codigo" placeholder="Código Mantenimiento" disabled 
                                    v-model='mantenimiento.id'>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="propiedad_id" class="form-label">Propiedad:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="bank" /></div>
                            <input type="text" class="form-control" id="propiedad_id" placeholder="ID Propiedad"
                                v-model='mantenimiento.propiedad_id'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="descripcion" class="form-label">Descripción:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="bank" /></div>
                            <input type="text" class="form-control" id="descripcion" placeholder="Descripción Mantenimiento"
                                v-model='mantenimiento.descripcion'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="fecha" class="form-label">Fecha:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="calendar-alt" /></div>
                            <input type="date" class="form-control" id="fecha" placeholder="Fecha Mantenimiento"
                                v-model='mantenimiento.fecha'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="costo" class="form-label">Costo:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="dollar-sign" /></div>
                            <input type="number" class="form-control" id="costo" placeholder="Costo Mantenimiento"
                                v-model='mantenimiento.costo'>
                        </div>
                    </div>
                    <button class="btn btn-primary" type="submit">Actualizar</button>
                    <button class="btn btn-secondary mx-2" @click="cancelar">Cancelar</button>
                </form> 
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    name: 'EditarMantenimiento',
    data(){
        return{
            mantenimiento:{
                id: 0,
                propiedad_id: '',
                descripcion:'',
                fecha: null,
                costo: 0
            }
        }
    },
    methods: {
        cancelar(){
            this.$router.push({name: 'Mantenimiento'})
        },

        async updateMantenimiento(){
            try {
                const res = await axios.put(`http://127.0.0.1:8000/api/mantenimiento/${this.mantenimiento.id}`, this.mantenimiento)
                if (res.status == 200){
                    this.$router.push({name:'Mantenimiento'})
                    Swal.fire({
                        position: 'top-end',
                        icon:'success',
                        title: 'Mantenimiento ha sido actualizado',
                        showConfirmButton: false,
                        timer:2000
                    })
                }
            } catch (error) {
                console.error('Error al actualizar el mantenimiento:', error)
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Error al actualizar el mantenimiento',
                    text: error.response ? error.response.data.message : error.message,
                    showConfirmButton: true,
                })
            }
        }
    },

    mounted(){
        this.mantenimiento.id = this.$route.params.id;
        axios.get(`http://127.0.0.1:8000/api/mantenimiento/${this.mantenimiento.id}`)
        .then(response => {
            this.mantenimiento = response.data.mantenimiento;
        })
    },
}
</script>
