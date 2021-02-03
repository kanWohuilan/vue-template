<template>
  <div class="app-wrapper" :class="{'hideSidebar': isCollopse}">
    <siderbar class="sidebar-container"/>
    <div class="main-container">
      <navbar/>
       <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
    
    </div>
  </div>
</template>

<script>
import Navbar from './navbar.vue'
import siderbar from './sidebar'
import  {mapGetters} from 'vuex'
export default {
  components: {
    siderbar,
    Navbar
  },
   computed: {
     ...mapGetters(['opened']),
    key() {
      return this.$route.path
    },
    isCollopse() {
      return this.opened
    }
  }
}
</script>

<style lang="stylus">
@import '~@/style/variables.styl';
@import '~@/style/sidebar.styl';
.app-wrapper
  height: 100%;
  width: 100%;
  position: relative;
  .sidebar-container
    transition: width 0.28s;
    width: $sideBarWidth 
    background-color: $menuBg;
    height: 100%;
    position: fixed;
    font-size: 0px;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
  .main-container
    margin-left 210px

    
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>