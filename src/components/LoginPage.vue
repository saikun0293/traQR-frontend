<template>
  <div class="font-body text-myGrey bg-myBlack overflow-auto pb-14 h-screen">
    <div class="flex items-center mt-10 ml-10">
      <Icon name="logo" />
      <div class="text-4xl font-extralight tracking-widest ml-4">
        traQR
      </div>
    </div>
    <div
      class="grid grid-cols-1 mt-20 md:grid-cols-2 w-3/4 md:w-full md:px-10 m-auto xl:w-5/6"
    >
      <div class="left">
        <!-- Login content -->
        <div
          class="text-5xl xl:text-7xl font-semibold text-myGrey font-body leading-snug"
        >
          Online Classes made
          <span class="text-myRed">easy </span>
          <span class="text-myBlue">interactive</span>
          and
          <span class="text-gray-400">effortless</span>
        </div>
        <div class="flex my-10">
          <button
            class="btn mr-5 bg-myRed text-white"
            @click="authenticateUser('student')"
            type="submit"
          >
            <div>Student Login</div>
            <Icon name="googleLogo" />
          </button>
          <button
            class="btn bg-myBlue text-white"
            @click="authenticateUser('faculty')"
            type="submit"
          >
            <div class="btn-text">Faculty Login</div>
            <Icon name="googleLogo" />
          </button>
        </div>
      </div>
      <div class="right">
        <Icon name="LoginUtils" />
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "./modules/login/LoginUtils";
// import api from "@/api";

import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "login",
  components: {
    Icon,
  },
  methods: {
    async authenticateUser(type) {
      let provider = new firebase.auth.GoogleAuthProvider();

      if (type === "student") {
        provider.setCustomParameters({
          login_hint: "example@vitstudent.ac.in",
          hd: "vitstudent.ac.in",
        });
      } else if (type === "faculty") {
        provider.setCustomParameters({
          login_hint: "example@vit.ac.in",
        });
      }

      const res = await firebase.auth().signInWithPopup(provider);
      console.log("Login data received from firebase", res);

      const user = res.additionalUserInfo;
      const {
        given_name,
        family_name,
        name,
        id,
      } = res.additionalUserInfo.profile;

      if (user.isNewUser) {
        // Create a new account

        //is VIT student or not?
        const isStudent =
          user.profile.email.search("vitstudent") !== -1 ? true : false;

        let data = {};
        if (isStudent) {
          data = {
            regNo: family_name,
            studentName: given_name,
            isStudent: true,
          };
        } else {
          //Create a faculty account
          data = {
            isStudent: false,
            facID: id,
            facultyName: name,
          };
        }

        console.log("Data I want to send", data);
        //send data to backend
        // const res = await api.post("/newUser", data);
        // console.log("Response for creating new user from backend", res);
      }

      this.$router.push("/");
    },
  },
};
</script>

<style scoped></style>
