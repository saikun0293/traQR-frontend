<template>
  <div>
    <!-- top -->
    <div class="grid grid-cols-3 place-items-center">
      <div class="col-start-2 col-span-1">
        <input
          type="date"
          name="date"
          id="date"
          v-model="date"
          class="px-4 py-2 rounded-md text-gray-700"
        />
      </div>
      <div>
        <button
          type="submit"
          class="bg-myRed hover:bg-myBlue rounded-md text-white text-xs px-4 py-2 my-4"
        >
          Download CSV
        </button>
      </div>
    </div>
    <div class="w-2/3 bg-myMildBlack mx-auto mt-7 rounded-lg p-5">
      <div class="grid grid-cols-3 place-items-center text-myBlue pb-3">
        <div>Registration Number</div>
        <div>Student Name</div>
        <div>Status</div>
      </div>
      <div class="h-80 overflow-y-auto border-t-2 border-myGrey">
        <div
          class="grid grid-cols-3 place-items-center my-6"
          v-for="student in attendance"
          :key="student.registrationNumber"
        >
          <div>{{ student?.registrationNumber }}</div>
          <div>{{ student.studentName ? student.studentName : "Student" }}</div>
          <div
            :class="[
              student.attendanceStatus === 'Present'
                ? 'text-green-500'
                : 'text-myRed',
            ]"
          >
            {{ student.attendanceStatus }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import api from "@/api";
import { useRoute } from "vue-router";
export default {
  setup() {
    // const store = useStore();
    const route = useRoute();
    const attendance = ref(null);

    const date = ref(null);

    watch(date, async () => {
      if (date.value) {
        // Attendance
        const courseId = route.params.id;
        const data = { courseID: courseId, date: date.value };
        console.log("date data", data);
        try {
          const res = await api.post("/faculty/attendance", data);
          const students = res.data.attendanceList;

          for (let i = 0; i < students.length; i++) {
            const res1 = await api.post("/getDetails", {
              regNo: students[i].registrationNumber,
              isStudent: true,
            });
            students[i].studentName = res1.data.studentName;
          }

          console.log("Final students", students);
          console.log("Attendance data", res);

          attendance.value = students;
        } catch (error) {
          console.log("Error while obtaining attendance on a date", error);
        }
      }
    });

    return { date, attendance };
  },
};
</script>

<style>
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
