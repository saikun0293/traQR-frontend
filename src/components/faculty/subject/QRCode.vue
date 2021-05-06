<template>
  <div class="grid grid-cols-2 w-3/5 mx-auto mt-10">
    <!-- QR Code -->
    <div class="grid place-items-center">
      <div class="w-80 h-80 bg-myMildBlack rounded-lg"></div>
      <button
        @click="generateQR()"
        class="bg-myRed hover:bg-myBlue rounded-lg text-white px-4 py-2 my-4"
      >
        Generate QR Code
      </button>
    </div>
    <!-- QR Code details -->
    <div class="grid place-items-center">
      <div class="grid grid-cols-2 gap-y-10 place-items-center">
        <label for="from">From Time</label>
        <input type="time" name="from" id="from" />
        <label for="to">To Time</label>
        <input type="time" name="to" id="to" />
      </div>
    </div>
  </div>
</template>

<script>
// import { sha256 } from "js-sha256";
import { mapState } from "vuex";
export default {
  computed: mapState({
    user: (state) => state.auth.user,
  }),
  methods: {
    async generateQR() {
      //TODO: Creating courseID
      // const courseID = sha256(this.user.id + this.subjectName + this.slot);
    },
  },
};
</script>

<style scoped>
label {
  font-weight: 200;
  margin-right: 20px;
}

input[type="time"] {
  width: 200px;
  padding: 8px 20px;
  border-radius: 7px;
  color: rgb(49, 49, 49);
}
</style>
