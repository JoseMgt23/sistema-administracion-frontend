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
                        <label for="id" class="form-label">Codigo:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                            <input type="text" class="form-control" id="descripcion" placeholder="Codigo de Contrato" disabled
                                v-model='contrato.id'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="propiedad_id" class="form-label">Propiedad:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="bank" /></div>
                            <select class="form-select" v-model="contrato.propiedad_id">
                                <option selected value="0">Seleccione la propiedad</option>
                                <option v-for="propiedad in propiedades" v-bind:value="propiedad.id"> {{ propiedad.direccion }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="arrendatario_id" class="form-label">Arrendatario:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="bank" /></div>
                            <select class="form-select" v-model="contrato.arrendatario_id">
                                <option selected value="0">Seleccione la propiedad</option>
                                <option v-for="arrendatario in arrendatarios" v-bind:value="arrendatario.id">{{ arrendatario.nombre }}</option>
                            </select>
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
                    <div class="row mb-3">
                        <label for="renta_mensual" class="form-label">Renta Mensual:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="dollar-sign" /></div>
                            <input type="number" class="form-control" id="renta_mensual" placeholder="Renta Mensual"
                                v-model='contrato.renta_mensual'>
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
                arrendatarios_id: 0,
                propiedad_id: 0,
                fecha_inicio: null,
                fecha_fin: null,
                renta_mensual: null
            },
            propiedades: [] ,
            arrendatarios: []
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
        },
        async loadPropiedades() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/propiedades');
                this.propiedades = response.data.propiedades;
            } catch (error) {
                console.error('Error al cargar las propiedades:', error);
            }
        },
        async loadArrendatarios(){
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/arrendatarios');
            this.arrendatarios = response.data.arrendatarios;
        }catch (error){
            console.error('Error al cargar las propiedades', error);
        }
        },
    },

    mounted() {
        this.loadPropiedades();
        this.loadArrendatarios();
    },

}
</script>
