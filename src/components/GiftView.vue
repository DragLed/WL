<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const giftId = parseInt(route.params.id);

const Gifts = ref(null);
const loading = ref(true);
const id = ref(0);
const name = ref('');
const description = ref('');
const price = ref(0);
const photo = ref('');

function GetGifts(id) {
  axios.get(`http://127.0.0.1:8000/gift_by_id?gift_id=${id}`)
    .then(response => {
      Gifts.value = response.data;
      loading.value = false;
      post();
    })
    .catch(() => {
      loading.value = false;
    });
}

function post() {
  id.value = Gifts.value.id;
  name.value = Gifts.value.name;
  description.value = Gifts.value.description;
  price.value = Gifts.value.price;
  photo.value = Gifts.value.photo;
}

function edit_gift(idVal, nameVal, descVal, priceVal, photoVal) {
  axios.put(`http://127.0.0.1:8000/edit_gift_by_id?id=${idVal}&name=${nameVal}&description=${descVal}&price=${priceVal}&photo=${photoVal}`)
    .then(() => {
      GetGifts(giftId);
    })
    .catch(() => {});
}

onMounted(() => {
  GetGifts(giftId);
});
</script>

<template>
  <div class="container">
    <nav class="main-nav">
      <router-link to="/" class="nav-link">На главную</router-link>
    </nav>

    <div v-if="loading" class="centered-message">
      <div class="loader"></div>
      <p>Загрузка подарка...</p>
    </div>

    <div v-else-if="Gifts" class="gift-list">
      <div class="gift-card">
        <h2 class="gift-name">📦 {{ Gifts.name }}</h2>
        <p class="gift-price">💰 {{ Gifts.price }} ₽</p>
        <p class="gift-desc">📝 {{ Gifts.description }}</p>
        <p class="gift-id">🆔 {{ Gifts.id }}</p>
      </div>

      <div class="gift-card">
        <p class="gift-name">Изменение: "{{Gifts.name}}"</p>
        <div class="input-group">
          <span>Название:</span>
          <input placeholder="Название подарка" v-model="name" type="text" class="input" />
        </div>
        <div class="input-group">
          <span>Цена:</span>
          <input placeholder="Цена" v-model="price" type="number" class="input" />
        </div>
        <div class="input-group">
          <span>Описание:</span>
          <input placeholder="Описание" v-model="description" type="text" class="input" />
        </div>
        <div class="input-group">
          <span>Ссылка:</span>
          <input placeholder="Ссылка" v-model="photo" type="text" class="input" />
        </div>
        <button @click="edit_gift(Gifts.id, name, description, price, photo)" class="btn">
          Редактировать подарок
        </button>
      </div>
    </div>

    <div v-else class="centered-message">
      <p>🎁 Подарок не найден</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(135deg, #1e1e2f, #121212);
  min-height: 100vh;
  color: #fff;
}

.gift-list {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.gift-card {
  background: rgba(30, 30, 50, 0.85);
  border-radius: 20px;
  padding: 25px 30px;
  width: 100%;
  max-width: 400px;
  text-align: center;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.5);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.gift-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 255, 174, 0.5);
}

.gift-name {
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: #00ffae;
}

.gift-price {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 10px;
  color: #ffd700;
}

.gift-desc {
  font-size: 1rem;
  color: #ccc;
  margin-bottom: 15px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
}

.centered-message {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: #ccc;
  font-size: 1.3rem;
  gap: 15px;
  text-align: center;
}

.loader {
  width: 40px;
  height: 40px;
  border: 5px solid #555;
  border-top-color: #00ffae;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Кнопка "На главную" */
.nav-link {
  display: inline-block;
  padding: 10px 25px;
  border-radius: 12px;
  background: linear-gradient(135deg, #00ffae, #00bfae);
  color: #121212;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 5px 15px rgba(0, 255, 174, 0.4);
  margin-bottom: 20px;
}

.nav-link:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0, 255, 174, 0.5);
}

/* Группы input с span слева */
.input-group {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  gap: 10px;
}

.input-group span {
  min-width: 80px;
  text-align: left;
  font-weight: 500;
  color: #fff;
}

.input {
  flex: 1;
  padding: 10px 12px;
  border-radius: 10px;
  border: none;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

.input:focus {
  background: rgba(255, 255, 255, 0.2);
  outline: none;
  box-shadow: 0 0 10px #00ffae;
}

.btn {
  padding: 12px 20px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  background: linear-gradient(135deg, #00ffae, #00bfae);
  color: #121212;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  margin-top: 10px;
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 255, 174, 0.5);
}
</style>
