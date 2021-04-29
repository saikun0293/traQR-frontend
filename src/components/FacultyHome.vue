<template>
  <div class="bg-myBlack font-body">
    <!-- Logo -->
    <div class="absolute m-5 flex items-center">
      <Logo name="logo" />
      <div class="logo-title ml-4 text-myGrey">
        traQR
      </div>
    </div>

    <div>
      <!-- left -->
      <div>
        <div>Courses Taken</div>
        <div>
          <!-- Course Cards -->
          <div
            class="bg-blue-200"
            v-for="(course, index) in courses"
            :key="index"
          >
            <div class="w-32 h-20 bg-purple-400">Identicon</div>
            <div>
              <span>{{ course.courseName }}</span>
              <span>{{ course.slot }}</span>
            </div>
            <div>{{ course.facultyName }}</div>
          </div>
        </div>
      </div>

      <!-- Hamburger -->
      <Icon @show-sidebar="show = !show" name="newHamburger" :open="show" />

      <!-- Sidebar -->
      <div
        :class="[show ? 'w-0' : 'w-2/3 sm:w-1/2 md:w-1/3 lg:w-1/4', 'sidebar']"
      >
        <!-- Personal Details -->
        <div>
          <div>
            <img :src="currentUser?.photoURL" alt="profile-image" />
          </div>
          <div>Hello {{ currentUser?.username }}</div>
        </div>

        <!-- Features -->
        <div>
          <div>Attendance Statistics</div>
          <div>Join Chatroom</div>
        </div>

        <!-- Footer -->
        <div>
          <div>Logged in as a faculty</div>
          <button @click="logOutUser()" type="submit">Log Out</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "./modules/login/LoginSVG";
import Icon from "./modules/home/HomeSVG";

import firebase from "firebase/app";
import "firebase/auth";
import { mapActions, mapState } from "vuex";

export default {
  components: { Logo, Icon },
  emits: ["click"],
  computed: mapState({
    user: (state) => state.auth.user,
  }),
  data() {
    return {
      show: true,
      courses: [
        {
          courseName: "Java Programming",
          slot: "C1+TC1",
        },
        {
          courseName: "Java Programming",
          slot: "C1+TC1",
        },
        {
          courseName: "Java Programming",
          slot: "C1+TC1",
        },
        {
          courseName: "Java Programming",
          slot: "C1+TC1",
        },
        {
          courseName: "Java Programming",
          slot: "C1+TC1",
        },
        {
          courseName: "Java Programming",
          slot: "C1+TC1",
        },
        {
          courseName: "Java Programming",
          slot: "C1+TC1",
        },
        {
          courseName: "Java Programming",
          slot: "C1+TC1",
        },
        {
          courseName: "Java Programming",
          slot: "C1+TC1",
        },
        {
          courseName: "Java Programming",
          slot: "C1+TC1",
        },
      ],
    };
  },
  methods: {
    ...mapActions({
      signOutUser: "signOutUser",
    }),
    logOutUser() {
      //sign out user
      firebase.auth().signOut();
      console.log("Signing Out User");

      this.signOutUser();
      this.$router.replace("/login");
    },
  },
};
</script>

<style scoped></style>
