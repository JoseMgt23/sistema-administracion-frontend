<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">Nuevo Contrato</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Contrato
            </div>
            <div class="card-body">
                <form @submit.prevent="saveContrato">
                    <div class="row mb-3">
                        <label for="nombre" class="form-label">Nombre:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <input type="text" class="form-control" id="nombre" placeholder="Nombre Contrato"
                                v-model='contrato.nombre'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="descripcion" class="form-label">Descripción:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="bank" /></div>
                            <input type="text" class="form-control" id="descripcion" placeholder="Descripción Contrato"
                                v-model='contrato.descripcion'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="fecha_inicio" class="form-label">Fecha de Inicio:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="calendar-alt" /></div>
                            <input type="date" class="form-control" id="fecha_inicio" placeholder="Fecha de Inicio"
                                v-model='contrato.fecha_inicio'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="fecha_fin" class="form-label">Fecha de Fin:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="calendar-alt" /></div>
                            <input type="date" class="form-control" id="fecha_fin" placeholder="Fecha de Fin"
                                v-model='contrato.fecha_fin'>
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
    name: 'NuevoContrato',
    data(){
        return {
            contrato: {
                nombre:'',
                descripcion:'',
                fecha_inicio: null,
                fecha_fin: null
            }
        }
    },
    methods: {
        cancelar(){
            this.$router.push({name: 'Contratos'})
        },

        async saveContrato(){
            try {
                const res = await axios.post('http://127.0.0.1:8000/api/contratos', this.contrato)
                if (res.status === 200 || res.status === 201){
                    this.$router.push({name:'Contratos'})
                    Swal.fire({
                        position: 'top-end',
                        icon:'success',
                        title: 'Contrato ha sido guardado',
                        showConfirmButton: false,
                        timer:2000
                    })
                }
            } catch (error) {
                console.error('Error al guardar el contrato:', error)
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Error al guardar el contrato',
                    text: error.response ? error.response.data.message : error.message,
                    showConfirmButton: true,
                })
            }
        }
    }
}
</script>
