<template>
  <div class="bg-myBlack font-body col-span-3">
    <div class="pt-8">
      <div class="text-3xl text-center text-white">
        Courses Taken
      </div>
      <!-- Array of subjects -->
      <div class="mt-10 overflow-y-auto h-l4 w-4/5 m-auto">
        <div
          @click="$router.push(`/student/${subject?.courseID}`)"
          v-for="subject in subjects"
          :key="subject.courseID"
          class="grid grid-cols-6 bg-myMildBlack my-5 rounded-md overflow-hidden mr-6 cursor-pointer"
        >
          <img
            :src="subject.identicon"
            alt="subject-pic"
            class="w-24 h-24 m-auto rounded-md"
          />
          <div class="col-span-4 pl-4 grid items-center py-8">
            <div>
              <span class="text-2xl font-semibold text-myBlue mr-3">{{
                subject.courseName
              }}</span>
              <span class="bg-white text-myRed rounded-full px-2 py-1">{{
                subject.slot
              }}</span>
            </div>
            <div class="text-white mt-2 mb-5">{{ subject.facultyName }}</div>
            <div>
              <span class="bg-myBlue text-white px-3 mr-3 py-1 rounded-md"
                >Total Units : {{ subject.present + subject.absent }}</span
              >
              <span class="bg-myRed text-white px-3 py-1 rounded-md"
                >Present Units : {{ subject.present }}</span
              >
            </div>
          </div>
          <div
            class="font-bold bg-myRed text-white text-4xl grid place-items-center"
          >
            {{ subject.attendancePercent }}%
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { generateIdenticon } from "@/generate";
import { ref, toRefs, watchEffect } from "vue";
import { useStore } from "vuex";
import api from "@/api";

export default {
  setup() {
    const { isLoggedIn, user } = toRefs(useStore().state.auth);
    const subjects = ref([]);

    console.log(isLoggedIn.value);

    const getCourses = async () => {
      // console.log("Acquiring courses...", user.value.regNo);
      try {
        const res = await api.post("/courses", {
          regNo: user.value.regNo,
        });
        // console.log(res);
        const courseIds = res.data[0].coursesTaken.map(
          (course) => course.courseID
        );

        //list of courses without percentages
        let c = [];

        for (let i = 0; i < courseIds.length; i++) {
          const res2 = await api.post("/courses/courseID", {
            courseID: courseIds[i],
          });

          // console.log(res2);

          const course = {
            ...res2.data.info,
            isStudent: false,
            identicon: generateIdenticon(res2.data.info.courseName),
          };

          c = [...c, course];
        }

        const res3 = await api.post("/attendance", {
          regNo: user.value.regNo,
        });

        // console.log(res3);

        const percentages = res3.data.percentageList;

        for (let i = 0; i < c.length; i++) {
          for (let j = 0; j < percentages.length; j++) {
            if (c[i].courseID === percentages[j].courseID) {
              c[i] = { ...c[i], ...percentages[j] };
            }
          }
        }

        console.log("Final courses", c);

        subjects.value = c;
      } catch (error) {
        console.log("Error while obtaining courses from backend ", error);
      }
    };

    watchEffect(() => {
      if (isLoggedIn.value) {
        getCourses();
      }
    });

    return { subjects };
  },
};
</script>

<style></style>
