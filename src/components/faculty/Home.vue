<template>
  <!-- courses taken -->
  <div class="bg-myBlack font-body col-span-3">
    <div
      class="absolute text-white top-7 left-28 text-3xl font-extralight tracking-widest"
    >
      traQR
    </div>

    <div>
      <!-- left -->
      <div class="pt-8">
        <div class="text-3xl text-center text-white">
          Your Subjects
        </div>
        <!-- Course Cards -->
        <div
          v-if="subjects"
          class="grid overflow-y-auto h-l3dot5 w-11/12 m-auto mt-20 gap-y-8 lg:grid-cols-2 xl:grid-cols-3"
        >
          <!-- Card -->
          <Card
            v-for="subject in subjects"
            :key="subject?.courseID"
            :course="subject"
            @click="$router.push(`/faculty/${subject?.courseID}`)"
            class="cursor-pointer"
          />
        </div>
      </div>
    </div>
    <div
      class="absolute bottom-1 left-1/3 bg-myBlue w-10 h-10 grid place-items-center rounded-full text-white cursor-pointer"
      @click="$router.push('/faculty/newclass')"
    >
      <span class="text-xl">+</span>
    </div>
  </div>
</template>

<script>
import Card from "@/components/modules/card";
import { useStore } from "vuex";
import { ref, toRefs, watchEffect } from "vue";
import api from "@/api";
import { generateIdenticon } from "@/generate";

export default {
  components: { Card },
  emits: ["click"],
  setup() {
    const { isLoggedIn, user } = toRefs(useStore().state.auth);
    const subjects = ref([]);

    console.log(isLoggedIn.value);

    const getCourses = async () => {
      console.log("Acquiring courses...", user.value.uid);
      try {
        const res = await api.post("/faculty", {
          facID: user.value.uid,
        });
        const courseIds = res.data.coursesHandled.map(
          (course) => course.courseID
        );
        for (let i = 0; i < courseIds.length; i++) {
          const res2 = await api.post("/courses/courseID", {
            courseID: courseIds[i],
          });
          const course = {
            ...res2.data.info,
            isStudent: false,
            identicon: generateIdenticon(res2.data.info.courseName),
          };
          subjects.value = [...subjects.value, course];
        }
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

<style scoped></style>
