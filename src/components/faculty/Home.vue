<template>
  <div class="grid grid-cols-4">
    <!-- courses taken -->
    <div class="bg-myBlack font-body col-span-3">
      <!-- Logo -->
      <div class="absolute m-5 flex items-center">
        <Logo name="logo" />
        <div class="logo-title ml-4 text-myGrey">
          traQR
        </div>
      </div>

      <div>
        <!-- left -->
        <div class="pt-8">
          <div class="text-3xl text-center text-white">
            Courses Taken
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
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Sidebar -->
    <Sidebar :links="links" :isStudent="isStudent" />
  </div>
</template>

<script>
import Logo from "./modules/login/LoginUtils";
import Sidebar from "@/components/modules/sidebar";
import Card from "@/components/modules/card";

import { generateIdenticon } from "@/generate";

import { mapActions, mapState } from "vuex";

export default {
  components: { Logo, Sidebar, Card },
  emits: ["click"],
  computed: mapState({
    user: (state) => state.auth.user,
    isStudent: (state) => state.auth.constraints.isStudent,
  }),
  data() {
    return {
      show: false,
      courses: [],
      links: [
        {
          name: "Attendance Statistics",
          link: "/faculty/stats",
        },
        {
          name: "New Class",
          link: "/faculty/new-class",
        },
        {
          name: "Doubts",
          link: "/faculty/doubts",
        },
      ],
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
          courseName: "Java Programming",
          slot: "C1+TC1",
          facultyName: "Satish CJ",
        };

        obj.identicon = generateIdenticon(obj.courseName);
        obj.isStudent = false; //for color rendering

        courses.push(obj);
      }
      this.courses = courses;
    },
  },
};
</script>

<style scoped></style>
