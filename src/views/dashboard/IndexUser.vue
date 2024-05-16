<template>
    <div class="container-fluid mt-5">
      <div class="row">
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              MAIN MENU
              <hr>
              <ul class="list-group">
                <router-link 
                  :to="{ name: 'dashboard' }" 
                  class="list-group-item text-dark text-decoration-none">
                  DASHBOARD
                </router-link>
                <li 
                  @click.prevent="logout" 
                  class="list-group-item text-dark text-decoration-none" 
                  style="cursor: pointer;">
                  LOGOUT
                </li>
                <router-link 
                  :to="{ name: 'vehicle'}"
                  class="list-group-item text-dark text-decoration-none">
                  VEHICLE
                </router-link>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <div class="card">
            <div class="card-body">
              DASHBOARD
              <hr>
              Selamat Datang <strong>{{ user.name }}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import axios from 'axios'
  
  export default {
    setup() {
      const token = localStorage.getItem('token')
      const router = useRouter()
      const user = ref('')
  
      onMounted(() => {
        if (!token) {
          router.push({ name: 'login' })
        } else {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          axios.get('http://localhost:8000/api/user')
            .then(response => {
              user.value = response.data
            })
            .catch(error => {
              console.error(error.response.data)
            })
        }
      })
  
      const logout = () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        axios.delete('http://localhost:8000/api/logout')
          .then(response => {
            if (response.data.success) {
              localStorage.removeItem('token')
              router.push({ name: 'login' })
            }
          })
          .catch(error => {
            console.error(error.response.data)
          })
      }
  
      return {
        token,
        user,
        logout
      }
    }
  }
  </script>
  
  <style scoped>
  .list-group-item {
    cursor: pointer;
  }
  </style>
  