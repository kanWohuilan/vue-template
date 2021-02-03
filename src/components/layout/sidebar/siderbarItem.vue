<template>
  <div>
    <template v-if="!item.children">
      <appLink :to="resolvePath(item.path)">
         <el-menu-item :index="resolvePath(item.path)">
        <item :title="item.meta.title" :icon="item.meta.icon"/>
      </el-menu-item>
      </appLink>
   
    </template>
    <el-submenu v-else :index="resolvePath(item.path)"> 
      <template slot="title">
        <item :title="item.meta.title" :icon="item.meta.icon"/>
      </template>
      <sidebar-item  v-for="child in item.children" :key="child.path" :item="child" :baseUrl="baseUrl"/>
    </el-submenu>
  </div>
</template>

<script>
import appLink from './link'
import path from 'path'
import Item from './item.vue';
import {isExternal} from '@/utils/validate'
export default {
  components: {
    Item,
    appLink
  },
   name: 'SidebarItem',
  props: {
    baseUrl: {
      type: String
    },
    item: {
      type: Object
    }
  },
  methods: {
    hasOneShowingChild(children=[],parent) {
      console.log(children);
      if(children.length === 0 || 1) {
        return true
      }else {
        return false
      }
    },
    resolvePath(routePath) {
      if(isExternal(routePath)) {
        return routePath
      }
      if(this.baseUrl === routePath) {
        return this.baseUrl
      }
      return path.resolve(this.baseUrl,routePath)
    },
    linkProps(to) {
      console.log(this.baseUrl);
      if(isExternal(to)) {
        return{
          herf: to,
          target:'_blank',
          //防止针对window.opener API 的恶意行为
          rel: 'noopener'
        }
      }
      return {
        to
      }
    }
  }
  
}
</script>

<style>

</style>