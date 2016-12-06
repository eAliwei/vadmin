<template>
  <div class="app-main">
    <!-- Fixed navbar -->
    <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <span class="navbar-brand">VAdmin</span>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <router-link tag="li" :to="{ name: 'admin.dashboard' }"> <a> 管理面板</a></router-link>
            <router-link tag="li" :to="{ name: 'admin.users' }"> <a> 用户管理</a></router-link>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li><a><i class="fa fa-user"></i> {{ currentUser.name }}</a></li>
            <li><a href="#" @click.prevent="logout"><i class="fa fa-sign-out"></i> 退出</a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>
    <div class="container">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
   </div>
</template>

<style scoped>
  .app-main {
    padding-top: 70px;
  }
  .fade-enter-active {
    animation: fadeIn .5s;
  }
  .fade-leave-active {
    animation: fadeOut .2s;
  }
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'currentUser'
    ])
  },
  data () {
    return {}
  },
  created () {
    this.$store.dispatch('fetchCurrentUser')
  },
  methods: {
    logout () {
      if (window.confirm('确认退出？')) {
        this.$store.dispatch('logout').then(() => {
          this.$router.replace({ name: 'home' })
        })
      }
    }
  }
}
</script>
