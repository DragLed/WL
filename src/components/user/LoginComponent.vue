<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import Cookies from "js-cookie";


const router = useRouter();

const login = ref("");
const password = ref("");
const errorMsg = ref("");



function getCookies () {
  const token = Cookies.get("my_access_token");
  console.log(token);
}




function authUser() {
    axios.get('http://127.0.0.1:8000/verify_password', {
        params: {
            login: login.value,
            password: password.value
        },
        withCredentials: true
    })
    .then(response => {
        console.log("Авторизация успешна" , response.data);
    })
      .catch(err => {
    console.error(err);
    errorMsg.value = "Неверный логин или пароль";
  });
}


function checkAuth() {
  axios.get('http://127.0.0.1:8000/test', {
    withCredentials: true
  })
  .then(() => console.log("Пользователь авторизован"))
  .catch(() => console.log("Пользователь не авторизован"));
}


</script>


<template>
  <div class="container">
  <div class="form">
    <h1> <span class="title" style="font-size: 25px;">Войти</span> 🎁</h1>
    <input type="text" v-model="login" placeholder="Логин/почта" class="input" />
    <input type="text" v-model="password" placeholder="Пароль" class="input" />
    <button @click="authUser" class="btn">Войти</button>
    <button @click="checkAuth" class="btn">Проверка</button>
  </div>
</div>
</template>


<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  min-height: 100vh;
  color: #e0e0e0;
}

.title {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  background: linear-gradient(90deg, #00ffae, #00bfae);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: glow 2s infinite alternate;
}

@keyframes glow {
  0% { text-shadow: 0 0 5px #00ffae, 0 0 10px #00bfae; }
  100% { text-shadow: 0 0 20px #00ffae, 0 0 30px #00bfae; }
}

.gift-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.gift-card {
  background: rgba(40, 40, 55, 0.85);
  border-radius: 15px;
  padding: 1.5rem;
  width: 250px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 5px 15px rgba(0,0,0,0.5);
}

.gift-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 25px rgba(0, 255, 174, 0.5);
}

.gift-name {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #00ffae;
}

.gift-price {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #ffd700;
}

.gift-desc {
  font-size: 1rem;
  color: #cfcfcf;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
}

.gift-list span{
  margin-right: 7px;
}

.gift-card a {
  color: #00bfae;
  text-decoration: underline;
}
.gift-card a:hover {
  color: #00ffae;
}

.loading {
  font-size: 1.5rem;
  color: #00ffae;
  margin-bottom: 2rem;
}

.form {
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 1rem;
  width: 300px;
  margin-top: 2rem;
}

.input {
  padding: 0.8rem 1rem;
  border-radius: 10px;
  border: none;
  font-size: 1rem;
  background: rgba(255,255,255,0.05);
  color: #e0e0e0;
  transition: all 0.3s ease;
}
.input:focus {
  outline: none;
  background: rgba(255,255,255,0.15);
  box-shadow: 0 0 10px #00ffae;
}

.btn {
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: bold;
  background: linear-gradient(90deg, #00ffae, #00bfae);
  color: #121212;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0,255,174,0.4);
  margin: 15px;
}
.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0,255,174,0.6);
}
</style>


