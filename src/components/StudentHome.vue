<template>
  <div class="bg-myBlack">
    <!-- Logo -->
    <div></div>
    <Logo name="logo" />

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

      <!-- Sidebar -->
      <div>
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
          <div>Logged in as a student</div>
          <button @click="logOutUser()" type="submit">Log Out</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "./modules/login/LoginSVG";

import firebase from "firebase/app";
import "firebase/auth";
import { mapActions, mapState } from "vuex";

export default {
  components: { Logo },
  emits: ["click"],
  computed: mapState({
    user: (state) => state.auth.user,
  }),
  data() {
    return { show: true };
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

<style></style>
