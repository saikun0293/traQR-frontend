<template>
  <div class="font-body bg-myBlack text-white">
    <!-- Add subject title -->
    <div class="text-center text-3xl pt-5 pb-2 font-extralight">
      {{ subject?.courseName }}
    </div>
    <div class="text-center my-2 font-bold text-myBlue">
      <div>{{ subject?.facultyName }}</div>
      <div>{{ subject?.slot }}</div>
    </div>
    <!-- Add links here -->
    <div class="grid grid-cols-3 place-items-center py-5">
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
    <router-view
      :enabled="toggle"
      @enable="toggle = true"
      @disable="toggle = false"
    />
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import api from "@/api";

export default {
  computed: {
    blueLine() {
      const path = this.$route.path;
      if (path.indexOf("qrcode") !== -1) return 1;
      else if (path.indexOf("chatroom") !== -1) return 2;
      else return 0;
    },
  },
  setup() {
    const route = useRoute();
    const subject = ref({});
    const toggle = ref(false);

    const stopWatch = watchEffect(async () => {
      const res = await api.post("/courses/courseID", {
        courseID: route.params.id,
      });
      console.log(res);
      subject.value = res.data.info;
      stopWatch();
    });

    return { subject, toggle };
  },
};
</script>

<style></style>
