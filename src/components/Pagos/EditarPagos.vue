<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">Editar Pago</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Pago
            </div>
            <div class="card-body">
                <form @submit.prevent="updatePago">
                    <div class="row mb-3">
                        <label for="id" class="form-label">Codigo</label>
                        <div class="input-group">
                            <div class="input-group">
                                <div class="input-group-text"> <font-awesome-icon icon="tag" /></div>
                                <input type="text" class="form-control" id="id" placeholder="ID Pago" disabled 
                                    v-model='pago.id'>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="contrato_id" class="form-label">Contratos:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="file-contract" /></div>
                            <select class="form-select" v-model="pago.contrato_id">
                                <option v-for="contrato in contratos" :key="contrato.id" :value="contrato.id">{{ contrato.id }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="fecha_pago" class="form-label">Fecha de Pago:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="calendar-alt" /></div>
                            <input type="date" class="form-control" id="fecha_pago" placeholder="Fecha de Pago"
                                v-model='pago.fecha_pago'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="monto" class="form-label">Monto:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="dollar-sign" /></div>
                            <input type="number" step="0.01" class="form-control" id="monto" placeholder="Monto Pago"
                                v-model='pago.monto'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="estado" class="form-label">Estado:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="info-circle" /></div>
                            <select class="form-select" v-model="pago.estado">
                                <option value="pendiente">Pendiente</option>
                                <option value="pagado">Pagado</option>
                                <option value="atrasado">Atrasado</option>
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
    name: 'EditarPago',
    data(){
        return{
            pago:{
                id: 0,
                contrato_id: 0,
                fecha_pago: null,
                monto: 0,
                estado: 'pendiente',
            },
            contratos: []
        }
    },
    methods: {
        cancelar(){
            this.$router.push({name: 'Pagos'})
        },

        async updatePago(){
            try {
                const res = await axios.put(`http://127.0.0.1:8000/api/pagos/${this.pago.id}`, this.pago)
                if (res.status == 200){
                    this.$router.push({name:'Pagos'})
                    Swal.fire({
                        position: 'top-end',
                        icon:'success',
                        title: 'Pago ha sido actualizado',
                        showConfirmButton: false,
                        timer:2000
                    })
                }
            } catch (error) {
                console.error('Error al actualizar el pago:', error)
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Error al actualizar el pago',
                    text: error.response ? error.response.data.message : error.message,
                    showConfirmButton: true,
                })
            }
        }
    },

    mounted(){
        this.pago.id = this.$route.params.id;
        axios.get(`http://127.0.0.1:8000/api/pagos/${this.pago.id}`)
        .then(response => {
            this.pago = response.data.pago;
        })
        axios.get('http://127.0.0.1:8000/api/contratos')
        .then(response => {
            this.contratos = response.data.contratos;
        })
    },
}
</script>
