<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
const router = useRouter();

const Gidts = ref([]);
const name = ref('');
const description = ref('');
const price = ref(0);
const photo = ref(null);

function GetGifts() {
  Gidts.value = [];
  axios.get('https://briefly-finish-infrared-interpreted.trycloudflare.com/all_gifts')
    .then(response => {
      Gidts.value = response.data;
    })
    .catch(error => {
      console.error('Ошибка:', error.message);
    });
}

function PostGift() {
  if (name.value !== '' && description.value !== '' && price.value > 0) {
    const newGift = {
      name: name.value,
      description: description.value,
      price: price.value,
      photo: photo.value
    };
    axios.post('https://briefly-finish-infrared-interpreted.trycloudflare.com/new_gift', null, { params: newGift })
      .then(response => {
        console.log(response.data);
        GetGifts();
        name.value = '';
        description.value = '';
        price.value = 0;
        photo.value = '';
      })
      .catch(error => {
        console.error("Ошибка при добавлении:", error.message);
      });
  } else {
    alert("Все поля должны быть заполнены");
  }
}

function DelGift(id) {
  axios.delete(`https://briefly-finish-infrared-interpreted.trycloudflare.com/delete_gift?gift_id=${id}`)
    .then(() => {
      GetGifts();
    })
    .catch(err => console.error(err));
}

function Go_to_gift(id) {
  router.push({ name: 'giftview', params: { id } });
}

onMounted(() => {
  GetGifts();
});
</script>

<template>
<div class="container">
  <div class="form">
    <input type="text" v-model="name" placeholder="Название подарка" class="input" />
    <input type="text" v-model="description" placeholder="Описание" class="input" />
    <input type="number" v-model="price" placeholder="Цена" class="input" />
    <input type="text" v-model="photo" placeholder="Ссылка/фото" class="input" />
    <button @click="PostGift" class="btn">Добавить подарок</button>
  </div>
  <h1>🎁 <span class="title">Список подарков</span></h1>

  <div v-if="Gidts.length" class="gift-list">
    <div v-for="(item, index) in Gidts" :key="index" class="gift-card">
      <h2 class="gift-name">📦 {{ item.name }}</h2>
      <p class="gift-price">💰 {{ item.price }} ₽</p>
      <p class="gift-desc">📝 {{ item.description }}</p>
      <p v-if="item.photo"><a :href="item.photo" target="_blank">Ссылочка</a></p>
      <button @click="DelGift(item.id)" class="btn">❌</button>
      <button @click="Go_to_gift(item.id)" class="btn">✏️</button>
    </div>
  </div>
  <p v-else class="loading">Загрузка подарков...</p>
</div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #121212, #1e1e2f);
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
