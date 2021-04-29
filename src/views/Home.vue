<template>
  <router-view />
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import { mapState, mapActions } from "vuex";

export default {
  computed: mapState({
    isStudent: (state) => state.auth.user.isStudent,
  }),
  methods: mapActions({
    authUser: "authenticateUser",
    constraints: "setConstraints",
  }),
  mounted() {
    // for verifying user and automatically signing him in
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const { uid, displayName, email, photoURL } = user;

        const data = {
          uid,
          displayName,
          email,
          photoURL,
        };

        //is VIT student or not?
        const isStudent = email.search("vitstudent") !== -1 ? true : false;

        //registration number of the VIT student if he is a student
        let regNo = null;
        if (isStudent) {
          regNo = displayName.slice(-9);
          data.regNo = regNo;
        }

        //get IdToken from user
        const idToken = await user.getIdToken();

        const constraints = {
          isStudent,
          idToken,
        };

        //Store user details in vuex storage
        this.authUser(data);

        //set constraints
        this.constraints(constraints);

        console.log("Authenticated users data :: ", data);

        if (data?.isStudent) {
          this.$router.replace("/student");
        } else {
          this.$router.replace("/faculty");
        }
      } else {
        this.$router.replace("/login");
      }
    });
  },
};
</script>

<style></style>
