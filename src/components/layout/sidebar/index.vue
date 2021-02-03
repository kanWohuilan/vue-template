<template>
  <el-scrollbar>
    <el-menu
     mode="vertical"
     :default-active="$route.path"
     :unique-opened="false"
     :collapse="isCollopse"
     :collapse-transition="false"
    >
      <siderbar-item v-for="route in permission_routes" :key="route.path" :item="route" :baseUrl ='route.path'> </siderbar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import  siderbarItem from './siderbarItem'
import {mapGetters} from 'vuex'
export default {
components: {
  siderbarItem
},
computed: {
  ...mapGetters(['opened','routes']),
  permission_routes() {
    console.log(this.routes);
    return this.routes[1].children
  },
  isCollopse() {
    console.log(this.opened);
    return this.opened
  }
}
}
</script>

<style>

</style>