<template>
  <div
    class="w-1/2 m-auto mt-20 text-xl text-white bg-myMildBlack rounded-md p-8 leading-loose"
  >
    <div v-if="attended">
      Yay you have been marked present. QR code has been successfully scanned
    </div>
    <div v-else-if="!attended">
      <span class="text-myRed text-4xl">Oops...</span> seems you have not been
      marked present.
      <span class="text-green-400 text-4xl">Scan the QR code</span> to be marked
      present shown by the faculty.
    </div>
  </div>
</template>

<script>
import api from "@/api";
import { ref, toRefs, watchEffect } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
  setup() {
    const { isLoggedIn, user } = toRefs(useStore().state.auth);
    const route = useRoute();
    const attended = ref(false);

    const checkAttendance = async () => {
      const res = await api.post("/course/courseID/attendance", {
        regNo: user.value.regNo,
        courseID: route.params.id,
      });

      const list = res.historyOfAttendance;

      let found = false;
      list.forEach((date) => {
        if (date.attendanceDate.getTime() === new Date().getTime()) {
          found = true;
        }
      });

      attended.value = found;
    };

    watchEffect(() => {
      if (isLoggedIn.value) checkAttendance();
    });

    return { attended };
  },
};
</script>

<style></style>
