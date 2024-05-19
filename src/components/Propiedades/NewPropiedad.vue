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
                        <label for="id" class="form-label">Codigo</label>
                        <div class="input-group">
                            <div class="input-group-"><font-awesome-icon icon="tag" /></div>
                            <input type="text" class="form-control" id="id" placeholder="Codigo Propiedad" disabled
                                v-model='propiedad.id'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="direccion" class="form-label">Direccion:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <input type="text" class="form-control" id="direccion" placeholder="Direccion Propiedad"
                             v-model='propiedad.direccion'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="descripcion" class="form-label">Descripcion:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="bank" /></div>
                            <input type="text" class="form-control" id="direccion" placeholder="Descripcion Propiedad"
                             v-model='propiedad.descripcion'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="tipo" class="form-label">Tipo:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>

                            <select class="form-select" v-model="propiedad.tipo">
                                <option selected value="0">Seleccione el tipo</option>
                                <option v-for="propiedad in propiedades" v-bind:value="propiedad.tipo">{{propiedad.tipo}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="disponibilidad" class="form-label">Disponibilidad:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>

                            <select class="form-select" v-model="propiedad.disponibilidad">
                                <option selected value="0">Seleccione la disponibilidad</option>
                                <option v-for="propiedad in propiedades" v-bind:value="propiedad.disponibilidad">{{propiedad.disponibilidad}}</option>
                            </select>
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
    name: 'EditarPropiedad',
    data(){
        return{
            propiedad:{
                id: 0,
                direccion: '',
                descripcion: '',
                tipo: 0,
                disponibilidad: 0,
            },
            propiedades:[],
            tipo : "0" ,
            disponibilidad: "0"
        }
    },
    methods: {
        cancelar(){
            this.$router.push({name: 'Propiedades'})
        },

        async savePropiedad(){
            this.propiedad.tipo = this.propiedad
            this.propiedad.disponibilidad = this.propiedad
            const res = await axios.post('http://127.0.0.1:8000/apu/propiedades/', this.propiedad)
            console.log(res);
            if (res.status == 200){
                this.$router.push({name:'Propiedades'})
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Propiedad ha sido guradado',
                    showCancelButton: false,
                    timer:2000
                })
            }
        }
    },

    mounted(){
        axios.get('http://127.0.0.1:8000/apu/propiedades/${this.propiedad.id}')
        .then(response => {
            this.propiedad = response.data.propiedad;
        })
    },
}
</script>