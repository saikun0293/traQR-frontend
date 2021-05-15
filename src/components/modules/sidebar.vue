<template>
  <div
    :class="[
      isStudent ? 'bg-myRed' : 'bg-myBlue',
      'text-center h-screen overflow-auto text-white relative font-body',
    ]"
  >
    <!-- Profile -->
    <!-- absolute top-20 left-1/2 transform -translate-x-1/2 -->
    <div class="mt-10">
      <img
        :src="user.photoURL"
        alt="profile-pic"
        class="w-32 h-32 rounded-full m-auto"
      />
      <div class="my-2 font-extralight">Welcome</div>
      <div class="my-2 font-bold text-3xl">{{ user.displayName }}</div>
      <div>
        <div
          v-if="isStudent"
          class="bg-white text-myRed py-1 rounded-md w-28 m-auto"
        >
          19BCE0293
        </div>
      </div>
    </div>
    <!-- Links -->
    <div class="flex flex-col mt-8">
      <router-link
        v-for="(link, index) in links"
        :key="index"
        :to="link.link"
        class="my-5"
      >
        {{ link.name }}
      </router-link>
    </div>
    <!-- Logout -->
    <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2">
      <div class="mb-4">
        Logged in as {{ isStudent ? "Student" : "Professor" }}
      </div>
      <div
        to="/login"
        :class="[
          isStudent ? 'text-myRed' : 'text-myBlue',
          'bg-white px-8 py-2 rounded-lg cursor-pointer',
        ]"
        @click="signOutUser()"
      >
        Sign Out
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import firebase from "firebase/app";
import "firebase/auth";

export default {
  computed: mapState({
    user: (state) => state.auth.user,
  }),
  props: ["links", "isStudent"],
  methods: {
    ...mapActions({
      signOut: "signOutUser",
    }),
    signOutUser() {
      //sign out user
      firebase.auth().signOut();
      console.log("Signing Out User");

      this.signOut();
      this.$router.replace("/");
    },
  },
};
</script>

<style></style>
