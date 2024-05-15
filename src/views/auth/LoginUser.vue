<template>
  <div class="container-fluid mt-5">
      <div class="row justify-content-center">
          <div class="col-md-4">
              <div v-if="loginFailed" class="alert alert-danger">
                  Email atau Password Anda salah.
              </div>
              <div class="card border-0 rounded shadow">
                  <div class="card-body">
                      <h4>LOGIN</h4>
                      <hr>
                      <form @submit.prevent="login">
                          <div class="form-group">
                              <label>Email address</label>
                              <input type="email" v-model="user.email" class="form-control" placeholder="Email Address">
                          </div>
                          <div v-if="validation.email" class="mt-2 alert alert-danger">
                              {{ validation.email[0] }}
                          </div>

                          <div class="form-group">
                              <label>Password</label>
                              <input type="password" v-model="user.password" class="form-control" placeholder="Password">
                          </div>
                          <div v-if="validation.password" class="mt-2 alert alert-danger">
                              {{ validation.password[0] }}
                          </div>
                          <button type="submit" class="btn btn-primary btn-block">LOGIN</button>
                      </form>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';

  export default {
      setup() {
          const router = useRouter();

          const user = reactive({
              email: '',
              password: '',
          });

          const validation = ref([]);
          const loginFailed = ref(null);

          async function login() {
              try {
                  console.log('Sending data:', user.email, user.password);
                  const response = await axios.post('http://localhost:8000/api/login', {
                      email: user.email,
                      password: user.password,
                  });

                  console.log('Full response:', response); // Log lengkap respons
                  
                //   localStorage.setItem('token', response.data.token);
                //   return router.push({ name: 'dashboard' });
                  if (response.data.succes) {
                      console.log('Login successful, redirecting to dashboard...');
                      localStorage.setItem('token', response.data.token);
                      console.log('Token saved:', localStorage.getItem('token'));
                      return router.push({ name: 'dashboard' });
                  } else {
                      console.log('Login failed, setting loginFailed to true');
                      loginFailed.value = true;
                  }
              } catch (error) {
                  console.error('Login error:', error);
                  if (error.response && error.response.data) {
                      console.log('Validation errors:', error.response.data);
                      validation.value = error.response.data;
                  } else {
                      console.log('Unexpected error occurred');
                      validation.value = { general: ['Unexpected error occurred.'] };
                  }
              }
          }

          return {
              user,
              validation,
              loginFailed,
              login,
          };
      }
  };
</script>
