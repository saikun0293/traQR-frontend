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
          class="grid overflow-y-auto h-l3dot5 w-11/12 m-auto mt-20 gap-y-8 lg:grid-cols-2 xl:grid-cols-3"
        >
          <!-- Card -->
          <Card
            v-for="(course, index) in courses"
            :key="index"
            :course="course"
            @click="$router.push(`/faculty/${course.cid}`)"
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

import { generateIdenticon } from "@/generate";
import { sha224 } from "js-sha256";

import { mapActions, mapState } from "vuex";

import api from "@/api";

export default {
  components: { Card },
  emits: ["click"],
  computed: mapState({
    user: (state) => state.auth.user,
    isStudent: (state) => state.auth.constraints.isStudent,
  }),
  data() {
    return {
      show: false,
      courses: [],
    };
  },
  mounted() {
    this.getCourses();
  },
  methods: {
    ...mapActions({
      signOutUser: "signOutUser",
    }),
    async getCourses() {
      let courses = [];

      for (let i = 0; i < 10; i++) {
        const obj = {
          cid: sha224(this.user.uid + "Java Programming" + "C1+TC1"),
          courseName: "Java Programming",
          slot: "C1+TC1",
        };

        obj.identicon = generateIdenticon(obj.courseName);
        obj.isStudent = false; //for color rendering

        courses.push(obj);
      }

      this.courses = courses;

      const res = await api.post("/faculty", { facID: this.user.uid });
      console.log(res);
    },
  },
};
</script>

<style scoped></style>
