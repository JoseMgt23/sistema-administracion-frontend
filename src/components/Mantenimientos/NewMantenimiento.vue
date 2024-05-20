<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">Nuevo Mantenimiento</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Mantenimiento
            </div>
            <div class="card-body">
                <form @submit.prevent="saveMantenimiento">
                    <div class="row mb-3">
                        <label for="id" class="form-label">ID:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                            <input type="text" class="form-control" id="id" placeholder="ID Mantenimiento" disabled
                                v-model='mantenimiento.id'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="propiedad_id" class="form-label">Propiedad:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="bank" /></div>
                            <select class="form-select" v-model="mantenimiento.propiedad_id">
                                <option selected value="0">Seleccione la propiedad</option>
                                <option v-for="propiedad in propiedades" v-bind:value="propiedad.id"> {{ propiedad.direccion }}</option>
                            </select>
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
                    <button class="btn btn-primary" type="submit">Guardar</button>
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
    name: 'NewMantenimiento',
    data(){
        return {
            mantenimiento: {
                id: 0,
                propiedad_id: 0,
                descripcion: '',
                fecha: null,
                costo: 0
            },
            propiedades: [] ,
        }
    },
    methods: {
        cancelar(){
            this.$router.push({name: 'Mantenimiento'})
        },

        async saveMantenimiento(){
            try {
                const res = await axios.post('http://127.0.0.1:8000/api/mantenimientos', this.mantenimiento)
                if (res.status === 200 || res.status === 201){
                    this.$router.push({name:'Mantenimiento'})
                    Swal.fire({
                        position: 'top-end',
                        icon:'success',
                        title: 'Mantenimiento ha sido guardado',
                        showConfirmButton: false,
                        timer:2000
                    })
                }
            } catch (error) {
                console.error('Error al guardar el mantenimiento:', error)
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Error al guardar el mantenimiento',
                    text: error.response ? error.response.data.message : error.message,
                    showConfirmButton: true,
                })
            }
        },
        async loadPropiedades() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/propiedades');
                this.propiedades = response.data.propiedades;
            } catch (error) {
                console.error('Error al cargar las propiedades:', error);
            }
        }
    },

    mounted() {
        this.loadPropiedades();
    }

}
</script>
