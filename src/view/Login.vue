<template>
  <div class="login">
    <el-form class="login-form" size="normal" :model="form" ref="loginForm" :rules="rules">
      <h3 class="title">登录</h3>
      <el-form-item prop="username"><el-input v-model="form.username" placeholder="请输入用户名"> </el-input> </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password" placeholder="请输入用户密码" show-password></el-input>
         </el-form-item>
      <el-button type="primary" class="form-btn" @click="handleClick" >登 录 </el-button>
      <div class="tip">
        <span>用户:admin</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import {validUsername,validPassword} from '@/utils/validate'
export default {
  data() {
    const Username = (rule,value,callback) =>{
      if(!validUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      }else {
        callback()
      }
    }
    const Password = (rule,value,callback) =>{
      if(!validPassword(value)) {
        callback(new Error('请输入正确的密码'))
      }else {
        callback()
      }
    }
    return {
      form:{
        username: 'admin',
        password:'123456'
      },
      rules: {
        username:[{required: true,trigger:'blur',validator:Username}],
        password:[{required: true,trigger:'blur',validator:Password}]
      },
      loading: false
    }
  },
  methods:{
    handleClick() {
      //存储登录信息
      this.$refs.loginForm.validate(valid =>{
        console.log(process.env);
        this.loading =true
        if(!valid) {
          this.loading =false
          console.log('提交错误'); return
        }else {
          this.$store.dispatch('user/login',this.form).then(() =>{
            //permission.js里添加动态路由后,next({ ...to, replace: true })会被认为是一个失败的navigation（虽然能导航成功，但不再是原来的to），
            //所以login里的push()返回一个rejected Promise,需要添加catch。
            this.$router.push({path: '/'}).catch(()=>{})
            this.loading=false
           
          }).catch(() => {
              this.loading=false
          })
        }
      })
     
    
    }
  }
}
</script>

<style lang="stylus" scope>

.login
  display flex
  width 100%
  height 100%
  justify-content center
  align-items center
  background url('~@/assets/404_images/404_cloud.png');
  
  .login-form
    width 450px
    padding 30px 70px 80px 70px
    margin 0 auto
    margin-bottom: 100px;
    .form-btn
      padding 0 15px
      font-size 16px
      height 40px
      width 100%
      background-color #098cc6
      box-shadow 0px 6px 8px 0px rgba(42, 83, 236, 0.38)
      text-align center
    .title
      text-align center
      margin 15px 0
      font-size: 2em;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      text-align: center;
      color: #098cc8;
      line-height: 65px;
      letter-spacing: 1px;
</style>