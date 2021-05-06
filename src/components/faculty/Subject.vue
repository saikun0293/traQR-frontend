<template>
  <div class="font-body bg-myBlack text-white">
    <!-- Add subject title -->
    <div class="text-center text-3xl py-8 font-extralight">
      Java Programming
    </div>
    <!-- Add links here -->
    <div class="grid grid-cols-3 place-items-center py-10">
      <router-link
        :to="`/faculty/${this.$route.params.id}/`"
        :class="[
          blueLine === 0 ? 'border-b-4 border-myBlue' : '',
          'w-full text-center pb-3',
        ]"
        >General</router-link
      >
      <router-link
        :class="[
          blueLine === 1 ? 'border-b-4 border-myBlue' : '',
          'w-full text-center pb-3',
        ]"
        :to="`/faculty/${this.$route.params.id}/qrcode`"
        >QR Code</router-link
      >
      <router-link
        :class="[
          blueLine === 2 ? 'border-b-4 border-myBlue' : '',
          'w-full text-center pb-3',
        ]"
        :to="`/faculty/${this.$route.params.id}/chatroom`"
        >Chat Room</router-link
      >
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  computed: {
    blueLine() {
      const path = this.$route.path;
      if (path.indexOf("qrcode") !== -1) return 1;
      else if (path.indexOf("chatroom") !== -1) return 2;
      else return 0;
    },
  },
  mounted() {
    console.log(this.$route);
  },
};
</script>

<style></style>
