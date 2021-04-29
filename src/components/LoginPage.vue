<template>
  <div class="top font-body">
    <span class="logo">
      <LoginSVG name="logo" class="logo" />
    </span>
    <span class="logo-title ml-5 text-myBlack">traQR</span>
  </div>
  <div class="bottom">
    <div class="left">
      <LoginSVG name="loginContent" />
      <div class="flex my-10">
        <button
          class="btn mr-5 bg-myRed text-white"
          @click="authenticateUser('student')"
          type="submit"
        >
          <div>Student Login</div>
          <loginSVG name="googleLogo" />
        </button>
        <button
          class="btn bg-myBlue text-white"
          @click="authenticateUser()"
          type="submit"
        >
          <div class="btn-text">Faculty Login</div>
          <loginSVG name="googleLogo" />
        </button>
      </div>
    </div>
    <div class="right">
      <LoginSVG name="loginSVG" />
    </div>
  </div>
</template>

<script>
import LoginSVG from "./modules/login/LoginSVG";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "login",
  components: {
    LoginSVG,
  },
  methods: {
    authenticateUser(type) {
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

      firebase.auth().signInWithPopup(provider);
    },
  },
};
</script>

<style scoped>
.top {
  display: flex;
  align-items: center;
  position: absolute;
  top: 30px;
  left: 30px;
}

.left {
  margin-left: 18%;
}

.bottom {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  margin-top: 25vh;
  grid-row-gap: 30px;
}
</style>
