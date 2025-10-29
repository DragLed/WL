<script setup>
</script>

<template>
  <div id="app">
    <header class="app-header">
      <div class="nav-decoration">
        <nav class="main-nav">
          <div class="main">
            <router-link to="/" class="nav-link">На главную</router-link>
          </div>
          <div class="authentication">
            <router-link to="/login" class="nav-link">Войти</router-link>
            <router-link to="/registerUser" class="nav-link">Зарегестрироваться</router-link>
          </div>
        </nav>
      </div>
    </header>
    
    <main class="app-content">
      <router-view />
    </main>
    
    <footer class="app-footer">
      <p>© 2025 DragLed. Все права защищены.</p>
    </footer>
  </div>
</template>

<style scoped>
/* Фон приложения */
#app{
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #121212, #1e1e2f);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #fff;
  transition: background 0.5s ease;
}

/* Навигация */
.main-nav{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  background-color: rgba(18, 18, 18, 0.7);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  border-radius: 0 0 20px 20px;
}

/* Ссылки навигации */
.nav-link {
  display: inline-block;
  padding: 12px 30px;
  border-radius: 12px;
  background: linear-gradient(135deg, #00ffae, #00bfae);
  color: #121212;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 255, 174, 0.4);
  margin: 0 10px;
  position: relative;
  overflow: hidden;
}

/* Эффект свечения при наведении */
.nav-link::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(0,255,174,0.3) 0%, transparent 70%);
  transform: scale(0);
  transition: transform 0.5s ease;
  pointer-events: none;
}
.nav-link:hover::before {
  transform: scale(1);
}

/* Ховер эффект самой ссылки */
.nav-link:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 15px 30px rgba(0, 255, 174, 0.6);
}

/* Основной контент */
.app-content{
  flex: 1;
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  backdrop-filter: blur(5px);
}

/* Футер */
.app-footer{
  padding: 20px;
  text-align: center;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
