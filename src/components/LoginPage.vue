<template>
  <div class="top">
    <span class="logo">
      <LoginSVG name="logo" class="logo" />
    </span>
    <span class="title">traQR</span>
  </div>
  <div class="bottom">
    <div class="left">
      <LoginSVG name="loginContent" />
      <div class="login-btns">
        <button @click="authenticateUser()" type="submit">
          Log in with
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
import LoginSVG from "./modules/LoginSVG";
import firebase from "firebase/app";
import "firebase/auth";
export default {
  name: "login",
  components: {
    LoginSVG,
  },
  methods: {
    authenticateUser() {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({
        hd: "vitstudent.ac.in",
      });
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          console.log(result);
          this.$router.replace("/");
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
.title {
  letter-spacing: 3px;
  font-size: 30px;
  font-weight: 200;
  margin-left: 20px;
}

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

button {
  font-family: "Roboto", sans-serif;
  font-size: 25px;
  font-weight: 200;
  background: #f8f8f8;
  border: none;
  padding: 15px 10px;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  width: 250px;
}

button:hover {
  background: #e6e6e6;
  cursor: pointer;
}

@media screen and (max-width: 719px) {
  button {
    margin-left: 50%;
    transform: translate(-50%, 0);
  }
}
</style>
