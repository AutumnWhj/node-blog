<script setup>
import HelloWorld from './components/HelloWorld.vue'

const login= () => {
  fetch('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: 'zhangsan',
      password: '123'
    })
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error))
}

const getList = () => {
  fetch('/api/blog/list?isadmin=1', {
    method: 'GET',
    credentials: 'include',
    mode: "cors",
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error))
}
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <button type="button" @click="login">发起登录请求</button>
  <button type="button" @click="getList">发起获取列表请求</button>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
