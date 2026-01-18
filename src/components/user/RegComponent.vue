<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const API_URL = "http://127.0.0.1:8000"

const email = ref('');
const login = ref('');
const password = ref('');
const errorMsg = ref('');

function register_user(){
    if (!login.value || !email.value || !password.value) {
        errorMsg.value = 'Все поля должны быть заполнены';
        return;
    }  
    if (login.value.length <= 3) {
        errorMsg.value = 'Логин должен быть более 3 символов';
        return;
    }
    if (!validateEmail(email.value)) {
        errorMsg.value = 'Некорректный формат почты';
        return;
    }
    if (password.value.length < 8) {
        errorMsg.value = 'Пароль должен быть не менее 8 символов';
        return;
    }

    axios.post(`${API_URL}/users`, { 
        username: login.value,
        email: email.value,
        password: password.value
    })
    .then(response => {
        errorMsg.value = '';
        console.log(response.data);
        errorMsg.value = "Успешная регестрация теперь войдите в свой аккаунт";
        email.value = '';
        login.value = '';
        password.value = '';
        router.push("/")
    })
    .catch(error => {
        console.error("Ошибка при добавлении:", error.message);
        errorMsg.value = 'Данный логин или почта уже используються';
      });
    
}

function validateEmail(mail) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(mail);
}






</script>

<template>
<div class="container">
  <div  class="form">
    <h1> <span class="title" style="font-size: 25px;">Регистрация</span></h1>
    <input type="text" v-model="login" placeholder="Логин" class="input" />
    <transition name="fade">
    </transition>
    <input type="text" v-model="email" placeholder="Почта" class="input" />
    <input type="text" v-model="password" placeholder="Пароль" class="input" />
    <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>
    <button @click="register_user" class="btn">Зарегистрироваться</button>
  </div>
</div>
</template>

<style scoped>

.error-msg {
  color: #ff0000;
  font-weight: bold;
  text-shadow: 0 0 5px #ff0000, 0 0 10px #ff4d4d, 0 0 15px #ff4d4d;
  transition: opacity 0.5s ease;
}

/* Плавное появление/исчезновение через transition */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}

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