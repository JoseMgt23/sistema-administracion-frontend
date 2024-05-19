<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">Editar</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Propiedad
            </div>
            <div class="card-body">
                <form @submit.prevent="updatePropiedad">
                    <div class="row mb-3">
                        <label for="codigo" class="form-label">Codigo</label>
                        <div class="input-group">
                            <div class="input-group">
                                <div class="input-group-text"> <font-awesome-icon icon="tag" /></div>
                                <input type="text" class="form-control" id="codigo" placeholder="Codigo Propiedad" disabled 
                                    v-model='propiedad.id'>
                            </div>
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
                            <input type="text" class="form-control" id="descripcion" placeholder="Descripcion Propiedad"
                                v-model='propiedad.descripcion'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="tipo" class="form-label">Tipo:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <select class="form-select" v-model="propiedad.tipo">
                                <option v-for="prop in propiedades" :key="prop.id" :value="prop.tipo">{{ prop.tipo }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="disponibilidad" class="form-label">Disponibilidad:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <select class="form-select" v-model="propiedad.disponibilidad">
                                <option v-for="prop in propiedades" :key="prop.id" :value="prop.disponibilidad">{{ prop.disponibilidad }}</option>
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
                direccion:'',
                descripcion:'',
                tipo: 0,
                disponibilidad: 0,
            },
            propiedades: []
        }
    },
    methods: {
        cancelar(){
            this.$router.push({name: 'Propiedades'})
        },

        async updatePropiedad(){
            const res = await axios.put(`http://127.0.0.1:8000/api/propiedades/${this.propiedad.id}`, this.propiedad)
            if (res.status == 200){
                this.$router.push({name:'Propiedades'})
                Swal.fire({
                    position: 'top-end',
                    icon:'success',
                    title: 'Propiedad ha sido actualizado',
                    showConfirmButton: false,
                    timer:2000
                })
            }
        }
    },

    mounted(){
        this.propiedad.id = this.$route.params.id;
        axios.get(`http://127.0.0.1:8000/api/propiedades/${this.propiedad.id}`)
        .then(response => {
            this.propiedad = response.data.propiedad;
        })
    },
}
</script>
