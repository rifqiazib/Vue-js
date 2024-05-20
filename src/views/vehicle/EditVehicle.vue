<template>
    <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-8">
                <router-link 
                :to="{ name: 'vehicle' }" 
                class="btn btn-primary btn-md rounded shadow mb-3">BACK</router-link>
                <div class="card rounded shadow">
                    <div class="card-header">
                        Create Vehicle Data
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="update()">
                            <div class="mb-3">
                                <label for="" class="form-label">License Number</label>
                                <input type="text" class="form-control" v-model="vehicles.license_number">
                                <div v-if="validation.license_number" class="text-danger">
                                    {{ validation.license_number[0] }}
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="" class="form-label">Type</label>
                                <input type="text" class="form-control" v-model="vehicles.type">
                                <div v-if="validation.type" class="text-danger">
                                    {{ validation.type[0] }}
                                </div>
                            </div>
                            <button class="btn btn-outline-primary">SUBMIT</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import { reactive, ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';

export default {
    setup () {
        const router = useRouter();
        const route = useRoute();

        let vehicles = reactive ({
            license_number : '',
            type : ''

        });

        const validation = ref ([]);

        onMounted(() => {
            axios.get(`http://localhost:8000/api/vehicles/${route.params.id}`)
            .then((result) => {
                vehicles.license_number = result.data.data.license_number,
                vehicles.type = result.data.data.type
            }). catch((err) =>{
                console.log(err.response.data)
            })
        })

        function update() {
            axios.put(`http://localhost:8000/api/vehicles/${route.params.id}`, 
            vehicles
        )
        .then(() => {
            router.push({
                name: 'vehicle'
            })
        }). catch((err) => {
            validation.value = err.response.data;
        });
        }

        return {
            vehicles,
            validation,
            router,
            update
        }
    }
}
</script>