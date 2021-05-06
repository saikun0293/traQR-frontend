<template>
  <div class="bg-myBlack h-screen text-white font-body">
    <div class="text-3xl font-extralight text-center mt-7">
      Create a new Class
    </div>
    <!-- form -->
    <div
      class="w-2/3 h-4/5 m-auto bg-myMildBlack rounded-lg mt-10 overflow-scroll"
    >
      <div class="w-5/6 mx-auto my-10">
        <label for="subjectName">Subject Name</label>
        <input
          v-model="subjectName"
          name="subjectName"
          type="text"
          class="w-3/4 text-lg"
        />
      </div>
      <div class="w-5/6 mx-auto my-10 flex justify-between">
        <div>
          <label for="slot">Slot</label>
          <input v-model="slot" name="slot" type="text" />
        </div>
        <div>
          <label for="credits" class="ml-10">Credits</label>
          <input v-model="credits" name="credits" type="text" class="w-40" />
        </div>
      </div>
      <div class="flex w-4/5 mx-auto my-10 justify-between">
        <!-- QR Code -->
        <div class="bg-white w-60 h-60 rounded-lg relative">
          <div class="ml-11 mt-7">
            <img v-if="qrlink !== null" :src="qrlink" alt="qr-code" />
          </div>
          <button
            class="text-xs bg-myBlue text-white px-3 py-1 rounded-md absolute bottom-4 left-1/2 transform -translate-x-1/2 focus:outline-none"
            @click="generateQR()"
          >
            Generate QR Code
          </button>
        </div>
        <!-- QR Code details -->
        <div class="bg-white rounded-lg w-80">
          <div class="text-2xl text-myBlue text-center my-6">
            QR Code Details
          </div>
          <div
            class="grid grid-cols-2 text-black w-64 m-auto place-items-center gap-y-6"
          >
            <label for="from" style="font-size:17px">From Time</label>
            <input
              class="bg-myGrey text-gray-600 px-4 py-2 rounded-md focus:outline-none"
              v-model="from"
              type="time"
              name="from"
              id="from"
            />
            <label for="to" style="font-size:17px">To Time</label>
            <input
              class="bg-myGrey text-gray-600 px-4 py-2 rounded-md focus:outline-none"
              v-model="to"
              type="time"
              name="to"
              id="to"
            />
          </div>
        </div>
      </div>
      <div class="text-center">
        <button
          type="submit"
          class="bg-myBlue px-6 py-2 rounded-md text-white focus:outline-none"
        >
          Generate New Class
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { sha256 } from "js-sha256";

export default {
  computed: mapState({
    id: (state) => state.auth.user.uid,
  }),
  data() {
    return {
      subjectName: "",
      slot: "",
      credits: "",
      from: "",
      to: "",
      qrlink: null,
    };
  },
  methods: {
    async generateQR() {
      // Creating courseID
      const courseID = sha256(this.id + this.subjectName + this.slot);
      // Generating the qr code link
      this.qrlink = `https://api.qrserver.com/v1/create-qr-code/?data="${courseID};${this.from};${this.to}"&size=150x150`;
    },
  },
};
</script>

<style scoped>
label {
  font-size: 20px;
  font-weight: 200;
  margin-right: 20px;
}

input[type="text"] {
  border-radius: 20px;
  padding: 5px 18px;
  outline: none;
  color: rgb(56, 56, 56);
}

input[type="time"]::-webkit-calendar-picker-indicator {
  color: white;
}
</style>
