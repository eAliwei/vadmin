<template>
  <div id="app">
    <transition name="bounce" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<style>
  @import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
  @import "../node_modules/font-awesome/css/font-awesome.min.css";
  @import "../node_modules/animate.css/animate.min.css";

  .bounce-enter-active {
    animation: bounceInRight .5s;
  }
  .bounce-leave-active {
    animation: bounceOutLeft .2s;
  }
</style>
