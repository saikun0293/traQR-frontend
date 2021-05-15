<template>
  <div class="bg-myBlack font-body col-span-3">
    <div class="text-center text-3xl pt-10 pb-2 font-extralight text-white">
      Attendance Statistics
    </div>
    <div class="w-2/3 m-auto">
      <!-- Dropdown -->
      <div class="relative">
        <div class="grid place-items-center">
          <input
            type="text"
            v-model="subjectTyped"
            class="pl-4 w-1/2 border-b-2 py-2 focus:outline-none font-semibold rounded-md my-5"
            placeholder="Search"
          />
        </div>
        <ul
          class="absolute w-1/2 left-1/2 transform -translate-x-1/2 top-15 overflow-y-auto max-h-32 bg-gray-50 rounded-sm border border-gray-200 transition-transform"
        >
          <li
            class="pl-4 py-2 font-gregular text-sm cursor-pointer hover:bg-gray-200"
            v-for="(subject, index) in updatedSubjects"
            :key="index"
            @click="selectSubject(subject)"
          >
            {{ subject.courseName }}
          </li>
        </ul>
      </div>
      <!-- Display -->
      <div class="bg-white p-5 rounded-md">
        <div
          class="grid grid-cols-3 place-items-center text-myBlue border-b-2 pb-2 border-myMildBlack"
        >
          <div>Registration Number</div>
          <div>Student Name</div>
          <div>Percentage</div>
        </div>
        <div class="mt-5">
          <div
            v-for="(row, index) in attendance"
            :key="index"
            class="grid grid-cols-3 place-items-center my-4"
          >
            <div>{{ row.registrationNumber }}</div>
            <div>{{ row.studentName }}</div>
            <div>{{ row.attendancePercentage }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, toRefs, watch, watchEffect } from "vue";
import { useStore } from "vuex";
import api from "@/api";

export default {
  setup() {
    const subjects = ref([]);
    const subjectTyped = ref(null);
    const updatedSubjects = ref([]);
    const { isLoggedIn, user } = toRefs(useStore().state.auth);
    const attendance = ref([]);

    document.addEventListener("click", () => {
      updatedSubjects.value = [];
    });

    const getSubjects = async () => {
      try {
        const res = await api.post("/faculty", {
          facID: user.value.uid,
        });
        subjects.value = res.data.coursesHandled;
      } catch (error) {
        console.log("Error while getting subjects from backend");
      }
    };

    const selectSubject = async (subject) => {
      subjectTyped.value = subject.courseName;
      try {
        const res = await api.post("/attendance-stats", {
          courseID: subject.courseID,
        });
        attendance.value = res.data.map((r) => {
          r.attendancePercentage = Math.ceil(r.attendancePercentage);
          return r;
        });
        console.log(attendance.value);
      } catch (error) {
        console.log("Error while getting attendance subject wise from backend");
      }
    };

    watch(subjectTyped, () => {
      updatedSubjects.value = subjects.value.filter((subject) =>
        subject.courseName
          .toLowerCase()
          .includes(subjectTyped.value?.toLowerCase())
      );
    });

    watchEffect(() => {
      if (isLoggedIn.value) {
        getSubjects();
      }
    });

    return { subjectTyped, updatedSubjects, selectSubject, attendance };
  },
};
</script>

<style scoped>
::-webkit-scrollbar {
  background-color: white;
  border-radius: 20px;
  width: 7px;
}

::-webkit-scrollbar-thumb {
  background-color: #454851;
  border-radius: 20px;
}
</style>
