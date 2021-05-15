<template>
  <div class="grid grid-cols-2 place-items-center px-32 mt-10">
    <div class="grid place-items-center">
      <div class="text-white px-2 py-1 rounded-md text-2xl">
        Attendance Percentage
      </div>
      <div
        class="w-40 h-40 mt-10 text-5xl font-bold rounded-full text-white bg-myRed grid place-items-center"
      >
        {{ per }}%
      </div>
    </div>
    <div class="bg-white rounded-md w-full p-5 text-black">
      <div class="grid grid-cols-2 place-items-center my-2 text-myRed">
        <div>Attendance Date</div>
        <div>Status</div>
      </div>
      <div class="border-t-2 border-gray-400 h-l1 overflow-y-auto">
        <div
          v-for="row in list"
          :key="row._id"
          class="grid grid-cols-2 place-items-center my-6"
        >
          <div>{{ row?.attendanceDate }}</div>
          <div
            :class="[
              row.status === 'Present' ? 'text-green-500' : 'text-myRed',
            ]"
          >
            {{ row?.status }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import { computed, ref, toRefs, watchEffect } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const { isLoggedIn, user } = toRefs(useStore().state.auth);
    const attendanceList = ref([]);
    const per = ref(0);

    Date.prototype.yyyymmdd = function() {
      var mm = this.getMonth() + 1; // getMonth() is zero-based
      var dd = this.getDate();

      return [
        this.getFullYear(),
        (mm > 9 ? "" : "0") + mm,
        (dd > 9 ? "" : "0") + dd,
      ].join("-");
    };

    const list = computed(() => {
      return attendanceList.value.map((l) => {
        l.attendanceDate = new Date(l.attendanceDate).yyyymmdd();
        return l;
      });
    });

    const getAttendanceList = async () => {
      try {
        const data = {
          courseID: route.params.id,
          regNo: user.value.regNo,
        };
        const res = await api.post("/courses/courseID/attendance", data);

        console.log("Attendance of subject", res);
        console.log("Attendance of subject", data);

        per.value = Math.ceil(res.data?.attendancePercentage);
        attendanceList.value = res.data?.historyOfAttendance;
      } catch (error) {
        console.log(
          "Error while obtaining attendance of subject from backend",
          error
        );
      }
    };

    watchEffect(() => {
      if (isLoggedIn.value) {
        getAttendanceList();
      }
    });

    return { list, per };
  },
};
</script>

<style></style>
