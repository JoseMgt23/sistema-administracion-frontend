<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">Editar Arrendatario</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Arrendatario
            </div>
            <div class="card-body">
                <form @submit.prevent="updateArrendatario">
                    <div class="row mb-3">
                        <label for="id" class="form-label">ID</label>
                        <div class="input-group">
                            <div class="input-group">
                                <div class="input-group-text"> <font-awesome-icon icon="tag" /></div>
                                <input type="text" class="form-control" id="id" placeholder="ID Arrendatario" disabled 
                                    v-model='arrendatario.id'>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="nombre" class="form-label">Nombre:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="user" /></div>
                            <input type="text" class="form-control" id="nombre" placeholder="Nombre Arrendatario"
                                v-model='arrendatario.nombre'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="apellido" class="form-label">Apellido:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="user" /></div>
                            <input type="text" class="form-control" id="apellido" placeholder="Apellido Arrendatario"
                                v-model='arrendatario.apellido'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="telefono" class="form-label">Teléfono:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="phone" /></div>
                            <input type="tel" class="form-control" id="telefono" placeholder="Teléfono Arrendatario"
                                v-model='arrendatario.telefono'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="email" class="form-label">Correo Electrónico:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="envelope" /></div>
                            <input type="email" class="form-control" id="email" placeholder="Correo Electrónico Arrendatario"
                                v-model='arrendatario.email'>
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
    name: 'EditarArrendatario',
    data(){
        return{
            arrendatario:{
                id: 0,
                nombre:'',
                apellido:'',
                telefono: '',
                email: ''
            }
        }
    },
    methods: {
        cancelar(){
            this.$router.push({name: 'Arrendatarios'})
        },

        async updateArrendatario(){
            const res = await axios.put(`http://127.0.0.1:8000/api/arrendatarios/${this.arrendatario.id}`, this.arrendatario)
            if (res.status == 200){
                this.$router.push({name:'Arrendatarios'})
                Swal.fire({
                    position: 'top-end',
                    icon:'success',
                    title: 'Arrendatario ha sido actualizado',
                    showConfirmButton: false,
                    timer:2000
                })
            }
        }
    },

    mounted(){
        this.arrendatario.id = this.$route.params.id;
        axios.get(`http://127.0.0.1:8000/api/arrendatarios/${this.arrendatario.id}`)
        .then(response => {
            this.arrendatario = response.data.arrendatario;
        })
    },
}
</script>
