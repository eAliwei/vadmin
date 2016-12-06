<template>
  <div class="jumbotron">
    <h1>Wellcome <small>{{ currentUser.name }}</small></h1>
  </div>
</template>

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
  }
}
</script>
