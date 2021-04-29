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

<style></style>
