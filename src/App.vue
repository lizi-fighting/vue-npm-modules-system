<template>
  <div id="app">
    <!--<img alt="Vue logo" src="./assets/logo.png">-->
    <user></user>
    <!--<dept></dept>-->
    <!--<el-button type="primary" round>主要按钮</el-button>-->
    <!--<HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>-->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { User, Dept } from './packages/index'

@Component({
  components: {
    User,
    Dept
  }
})
export default class App extends Vue {}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
