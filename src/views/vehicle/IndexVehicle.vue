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
                                <tr v-for="(vehicle, index) in vehicles" :key="index">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ vehicle.license_number }}</td>
                                    <td>{{ vehicle.type }}</td>
                                    <td>
                                        <div class="btn-group">
                                            <router-link 
                                            :to="{ name: 'edit.vehicle', params: { id: vehicle.id } }"
                                            class="btn btn-md btn-outline-info">EDIT</router-link>
                                            <button class="btn btn-md btn-outline-danger"
                                            @click.prevent="destroy(vehicle.id, index)">
                                                DELETE
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <!-- Pagination -->
                        <nav>
                            <ul class="pagination">
                                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                                    <a class="page-link" @click.prevent="fetchVehicles(currentPage - 1)" href="#">Previous</a>
                                </li>
                                <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }">
                                    <a class="page-link" @click.prevent="fetchVehicles(page)" href="#">{{ page }}</a>
                                </li>
                                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                                    <a class="page-link" @click.prevent="fetchVehicles(currentPage + 1)" href="#">Next</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';

export default {
    setup() {
        const vehicles = ref([]);
        const currentPage = ref(1);
        const totalPages = ref(1);

        const fetchVehicles = async (page = 1) => {
            try {
                const response = await axios.get(`http://localhost:8000/api/vehicles?page=${page}`);
                vehicles.value = response.data.data.data;  // Adjust according to your response structure
                currentPage.value = response.data.data.current_page;
                totalPages.value = response.data.data.last_page;
            } catch (error) {
                console.error(error.response);
            }
        };

        const destroy = async (id, index) => {
            try {
                await axios.delete(`http://localhost:8000/api/vehicles/${id}`);
                vehicles.value.splice(index, 1);
            } catch (error) {
                console.error(error.response.data);
            }
        };

        onMounted(() => {
            fetchVehicles();
        });

        return {
            vehicles,
            currentPage,
            totalPages,
            fetchVehicles,
            destroy
        };
    }
};
</script>
