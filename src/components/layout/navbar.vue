<template>
  <div class="navbar">
    <hamburger @toggleClick="toggleClick" :isActive="!opened"/>
    <breadcrumb class=""> </breadcrumb>
    <div class="right-menu">
      <el-dropdown> 
        <div class="avatar-wrapper">
          <img :src="avatar +'?imageView2/1/w/40/h/40'" style="border-radius: 10px;    cursor: pointer" alt="">
        </div>
        <el-dropdown-menu slot="dropdown"> 
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a>
          <!-- divided 显示分割线 -->
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">注销</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import hamburger from './hamburger'
import breadcrumb from '@/components/breadcrumb'
import  {mapGetters} from 'vuex'
export default {
components: {
  breadcrumb,
  hamburger
},
computed:{
  ...mapGetters(['avatar','opened'])
},
methods: {
  toggleClick() {
    console.log(1);
    this.$store.dispatch('app/toggleSideBar')
    
  },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
}
}
</script>

<style lang="stylus">
.navbar
  height: 50px;
  box-shadow 0 1px 4px rgba(0,21,41,.08)
  display flex
  align-items center
  .right-menu
    margin-left auto
    margin-right: 20px;
</style>