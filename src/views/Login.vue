<template>
  <div class="container login">
    <div class="row">
      <div class="col-xs-6 col-xs-offset-3">
        <form class="form-horizontal" role="form" @submit.prevent="login">
          <div class="panel panel-default">
            <div class="panel-heading">
              <div class="text-center"><h4>VAdmin用户登录</h4></div>
            </div>
            <div class="panel-body">
              <div class="form-group" :class="{ 'has-error': errors.email }">
                <label for="email" class="col-xs-2 control-label">用户名</label>
                <div class="col-xs-10">
                  <input type="text" id="email" class="form-control" v-model="auth.email" placeholder="用户名或邮箱" autofocus>
                  <p class="help-block" v-for="(message, index) in errors.email">{{ message }}</p>
                </div>
              </div>
              <div class="form-group" :class="{ 'has-error': errors.password }">
                <label for="password" class="col-xs-2 control-label">密码</label>
                <div class="col-xs-10">
                  <input type="password" id="password" class="form-control" v-model="auth.password" placeholder="登录密码">
                  <p class="help-block" v-for="(message, index) in errors.password">{{ message }}</p>
                </div>
              </div>
              <div class="form-group">
                <div class="col-xs-offset-2 col-xs-4">
                  <div class="checkbox">
                    <label><input type="checkbox" v-model="auth.remember">记住我</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="panel-footer">
              <div class="row">
                <div class="col-xs-12">
                  <div class="pull-right">
                    <button class="btn btn-default" type="button" @click="reset">重置</button>
                    <button class="btn btn-primary" type="submit">登录</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style>
  .login {
    padding-top: 100px;
  }
</style>

<script>
export default {
  data () {
    return {
      auth: {
        email: '',
        password: '',
        remember: false
      },
      errors: {}
    }
  },
  methods: {
    login () {
      this.$store.dispatch('login', this.auth).then(() => {
        this.$router.replace({ name: 'admin.dashboard' })
      }, (error) => {
        this.errors = error.response.data
      })
    },
    reset () {
      this.auth = {
        username: '',
        password: '',
        remember: false
      }
    }
  }
}
</script>
