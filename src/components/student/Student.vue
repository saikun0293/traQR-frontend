<template>
  <div class="grid grid-cols-4">
    <Logo name="logo" class="absolute top-5 left-6" />
    <router-view class="col-span-3" />

    <!-- Sidebar -->
    <Sidebar :links="filtered" :isStudent="isStudent" />
  </div>
</template>

<script>
import Sidebar from "@/components/modules/sidebar";
import Logo from "@/components/modules/login/LoginUtils";

export default {
  components: { Sidebar, Logo },
  computed: {
    filtered() {
      const path = this.$route.path;
      let filtered = this.links.filter((link) => link.link !== path);

      return filtered;
    },
  },
  data() {
    return {
      isStudent: true,
      showSideBar: true,
      links: [
        {
          name: "Home",
          link: "/student",
        },
      ],
    };
  },
};
</script>

<style></style>
