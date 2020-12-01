<template>
  <div>
    <h1>这是登陆组件模板----{{msg}}</h1>
    <router-link to="/account">account</router-link>
    <router-link to="/goodlist">goodslist</router-link>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data () {
    //组件中的data必须是function
    return {
      msg: '123'
    }
  },
  methods: {
    show () {
      console.log('调用了login.vue的show方法')
    }
  }
}
</script>
<style></style>