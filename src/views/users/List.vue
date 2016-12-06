<template>
    <div class="row">
      <div class="panel panel-default">
        <div class="panel-heading">用户信息</div>
        <div class="panel-body">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>名称</th>
                <th>邮箱</th>
                <th>创建于</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in users">
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.created_at }}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      users: []
    }
  }
}
</script>
