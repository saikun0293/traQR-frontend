<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isAuthenticated: false,
    };
  },
  mounted() {
    if (!this.isAuthenticated) this.$router.replace("/login");
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap");
#app {
  font-family: "Roboto", sans-serif;
}
</style>
