<template>
    <div class="container">
        <h1 class="text-start">Listado Propiedades |
            <button @click="newPropiedad()"
                    class="btn btn-success mx-2">
                    <font-awesome-icon icon="plus" />
            
                </button>
        </h1>
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
                <td>{{ $propiedad.id }}</td>
                <td>{{ $propiedad.direccion }}</td>
                <td>{{ $propiedad.descripcion }}</td>
                <td>{{ $propiedad.tipo }}</td>
                <td>{{ $propiedad.disponibilidad }}</td>
                <td>
                    <button @click="deletePropiedad(propiedad.id)"
                            class="btn btn-danger mx-2">
                            <font-awesome-icon icon="trash"/>
                    </button>
                    <button @click="editPropiedad(propiedad.id)"
                            class="btn btn-warning mx-2">
                            <font-awesome-icon icon="pencil"/>
                    </button>
                </td>
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
    methods: {
        deletePropiedad(codigo){
            Swal.fire({
                title:'Quieres eliminar la Propiedad con id ${codigo}?',
                showCancelButton: true,
                confirmButtonText: 'Borrar',
            }).then((result)=> {
                if (result.isConfirmed) {
                    axios.delete('http://127.0.0.1:8000/api/propiedades/${codigo}')
                    .then(response => {
                        if (response.data.success){
                            Swal.fire('Delete!!','','success')
                            this.propiedades = response.data.propiedades
                        }  
                })
            }
        })
    }
},

        editPropiedad(id){
            this.$router.push({name:'EditarPropiedad', params: {id: '${id}'}})
        },
        newPropiedad(){
            this.$router.push({name:'NewPropiedad'})

        },

    mounted() {
        axios
            .get('http://127.0.0.1:8000/api/propiedades')
            .then(response => (this.propiedades = response.data.propiedades.data))
    },
}

</script>