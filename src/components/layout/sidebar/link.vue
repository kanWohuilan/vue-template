<!-- 判断是否为外链 外链用a标签 -->
<template>
  <component :is="type" v-bind="linkProps(to)"> <slot/></component>
</template>

<script>
import {isExternal} from '@/utils/validate'
export default {
  props:{
    to:String
  },
  computed: {
    type() {
      if(isExternal(this.to)) {
        return 'a'
      }else {
        return 'router-link'
      }
    }
  },
  methods :{
    linkProps(to) {
      if(isExternal(to)) {
        return{
          href: to,
          target: '_blank',
          rel:'noopener'
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