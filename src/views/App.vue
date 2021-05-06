<template>
  <router-view />
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
  mounted() {
    if (!this.user) {
      this.router.replace("/login");
    }
  },
};
</script>

<style>
::-webkit-scrollbar {
  background-color: #454851;
  border-radius: 20px;
  width: 7px;
}

::-webkit-scrollbar-thumb {
  background-color: white;
  border-radius: 20px;
}

input,
button {
  outline: none;
}
</style>
