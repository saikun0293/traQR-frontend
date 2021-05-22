<template>
  <div class="w-1/2 m-auto mt-10 text-white">
    <div class="text-center grid place-items-center">
      <!-- Show QR code -->
      <div class="w-64 h-64 bg-myMildBlack rounded-lg grid place-items-center">
        <img v-if="qrcode.qrlink" :src="qrcode?.qrlink" alt="qrcode.link" />
      </div>

      <!-- Show time validity -->
      <div class="flex justify-between my-5 w-60 text-myRed items-center">
        <div class="w-20 bg-gray-100 p-2 rounded-md">
          {{ qrcode.from === null ? "00:00" : qrcode.from }}
        </div>
        <div>to</div>
        <div class="w-20 bg-gray-100 p-2 rounded-md">
          {{ qrcode.to === null ? "00:00" : qrcode.to }}
        </div>
      </div>
      <!-- Show whether qrcode is scanned or not -->
      <div class="text-base">
        <!-- If scanned -->
        <div v-if="attended" class="bg-green-400 px-2 rounded-md w-60">
          QR Code scanned
        </div>
        <div v-else class="bg-myRed p-2 rounded-md w-60">
          QR Code Not Scanned
        </div>
      </div>
      <!-- Note to refresh the page -->
      <div class="text-xs w-56 mt-4">
        * Refresh the page once you have scanned the qrcode
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import { reactive, ref, toRefs, watchEffect } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import firebase from "firebase/app";
import "firebase/firestore";

export default {
  setup() {
    const { isLoggedIn, user } = toRefs(useStore().state.auth);
    const route = useRoute();
    const attended = ref(false);
    const qrcode = reactive({
      qrlink: null,
      from: null,
      to: null,
      date: null,
    });

    const classRef = firebase
      .firestore()
      .collection("classes")
      .doc(route.params.id);

    classRef.onSnapshot((doc) => {
      const data = doc.data();
      qrcode.qrlink = data.qrlink;
      qrcode.from = data.from;
      qrcode.to = data.to;
      qrcode.date = data.date;
    });

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
      if (isLoggedIn.value) {
        checkAttendance();
      }
    });

    return { attended, qrcode };
  },
};
</script>

<style></style>
