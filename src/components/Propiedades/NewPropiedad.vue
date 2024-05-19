<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">Nuevo</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Propiedad
            </div>
            <div class="card-body">
                <form @submit.prevent="savePropiedad">
                    <div class="row mb-3">
                        <label for="id" class="form-label">Código</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                            <input type="text" class="form-control" id="id" placeholder="Código Propiedad" disabled
                                v-model='propiedad.id'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="direccion" class="form-label">Dirección:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <input type="text" class="form-control" id="direccion" placeholder="Dirección Propiedad"
                             v-model='propiedad.direccion'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="descripcion" class="form-label">Descripción:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="bank" /></div>
                            <input type="text" class="form-control" id="descripcion" placeholder="Descripción Propiedad"
                             v-model='propiedad.descripcion'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="tipo" class="form-label">Tipo:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <select class="form-select" v-model="propiedad.tipo">
                                <option selected value="0">Seleccione el tipo</option>
                                <option selected value="1">Residencial</option>
                                <option selected value="2">Comercial</option>
                                <option selected value="3">Industrial</option>
                                <option v-for="propiedad in propiedades" :key="propiedad.id" :value="propiedad.tipo">{{propiedad.tipo}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="disponibilidad" class="form-label">Disponibilidad:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <select class="form-select" v-model="propiedad.disponibilidad">
                                <option selected value="0">Seleccione la disponibilidad</option>
                                <option selected value="1">Disponible</option>
                                <option selected value="2">Ocupado</option>

                                <option v-for="propiedad in propiedades" :key="propiedad.id" :value="propiedad.disponibilidad">{{propiedad.disponibilidad}}</option>
                            </select>
                        </div> 
                    </div>
                    <button class="btn btn-primary" type="submit">Save</button>
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
    name: 'EditarPropiedad',
    data() {
        return {
            propiedad: {
                id: 0,
                direccion: '',
                descripcion: '',
                tipo: '',
                disponibilidad: '',
            },
            tipos: [ 
                {id: 1, nombre: 'Residencial'},
                {id: 2, nombre: 'Comercial' },
                {id: 3, nombre: 'Industrial'}
            ],
            disponibilidades: [ // Definimos las opciones de disponibilidad
            { id: 1, nombre: 'Disponible' },
            { id: 2, nombre: 'Ocupado' },
        ],
            propiedades: [],
            
        }
    },
    methods: {
        cancelar() {
            this.$router.push({ name: 'Propiedades' });
        },
        async savePropiedad() {
            try {
                const res = await axios.post('http://127.0.0.1:8000/api/propiedades', this.propiedad);
                console.log(res);
                if (res.status === 200 || res.status === 201) {
                    this.$router.push({ name: 'Propiedades' });
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Propiedad ha sido guardada',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            } catch (error) {
                console.error('Error al guardar la propiedad:', error);
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Error al guardar la propiedad',
                    text: error.response ? error.response.data.message : error.message,
                    showConfirmButton: true,
                });
            }
        }
    },
    mounted() {
    if (this.propiedad.id > 0) {
        axios.get(`http://127.0.0.1:8000/api/propiedades/${this.propiedad.id}`)
            .then(response => {
                this.propiedad = response.data.propiedad;
            })
            .catch(error => {
                console.error('Error al cargar la propiedad:', error);
            });
    }
},

}
</script>