<template>
  <el-breadcrumb> 
    <transition-group name="breadcrumb">
     <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
      <span v-if="index === levelList.length-1">{{item.meta.title}} </span>
      <a v-else @click="handleLink(item)">{{item.meta.title}} </a>
    </el-breadcrumb-item>
    </transition-group>
   
  </el-breadcrumb>
</template>

<script>
export default {
  data() {
    return {
      levelList:null,
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item=> item.meta && item.meta.title)
      this.levelList =matched
      console.log(matched);
    },
    handleLink(route) {
      if(route.redirect) {
        this.$router.push(route.redirect)
      }
    }
  },
}
</script>

<style lang="stylus">
.breadcrumb-leave-active, .breadcrumb-enter-active
  transition all .5s
.breadcrumb-enter, .breadcrumb-leave
  opacity: 0;
  transform translateX(30px)
.breadcrumb-move
  transition all .5s


</style>