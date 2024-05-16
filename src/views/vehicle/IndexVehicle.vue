<template>
    <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-8">
                <router-link 
                :to="{ name: 'create.vehicle' }" 
                class="btn btn-primary btn-md rounded shadow mb-3">ADD</router-link>
                <div class="card rounded shadow">
                    <div class="card-header">
                        Vehicle Data
                    </div>
                    <div class="card-body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>License Number</th>
                                    <th>Type</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(vehicle, index) in vehicles.data" :key="index">
                                    <td>{{ index + 1 }}</td>
                                    <td v-if="vehicle.license_number">{{ vehicle.license_number }}</td>
                                    <td v-else>N/A</td>
                                    <td>{{ vehicle.type }}</td>
                                    <td>
                                        <div class="btn-group">
                                            <router-link 
                                            :to="{ name:'edit.vehicle', params:{id: 1}}"
                                            class="btn btn-md btn-outline-info">EDIT</router-link>
                                            <button class="btn btn-md btn-outline-danger">
                                                DELETE
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
import {onMounted, ref} from 'vue'

export default {
    setup() {
        let vehicles = ref([]);

        onMounted(() => {
            axios.get('http://localhost:8000/api/vehicles')
            .then((result) => {
                vehicles.value = result.data.data;
            }). catch ((err) => {
                console.log(err.response);
            })
        });

        return {
            vehicles
        }
    }
}
</script>