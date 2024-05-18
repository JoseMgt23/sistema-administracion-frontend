<template>
    <div class="container">
        <h1>Listado Propiedades</h1>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Dirección</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Disponibilidad</th>
                </tr>
            </thead>
        </table>
        <tbody>
            <tr v-for="(propiedad,index) in propiedades" :key="index">
                <th scope="row">{{ index+1 }}</th>
                <td>{{ $propiedad.direccion }}</td>
                <td>{{ $propiedad.descripcion }}</td>
                <td>{{ $propiedad.tipo }}</td>
                <td>{{ $propiedad.disponibilidad }}</td>
            </tr>
        </tbody>
    </div>
</template>
<script>
import axios from 'axios'

export default {

    name: 'propiedad',
    data(){
        return{
            propiedades: []
        }
    },
    mounted() {
        axios
            .get('http://127.0.0.1:8000/api/propiedades')
            .then(response => (this.propiedades = response.data.propiedades))
    },
}

</script>