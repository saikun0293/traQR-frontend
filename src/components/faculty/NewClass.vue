<template>
  <div class="bg-myBlack h-screen text-white font-body">
    <div class="text-3xl font-extralight text-center mt-7">
      Create a new Class
    </div>
    <!-- form -->
    <div class="w-2/3 m-auto bg-myMildBlack rounded-lg mt-10 py-5">
      <div class="w-5/6 mx-auto my-10">
        <label for="subjectName">Subject Name</label>
        <input
          v-model="subjectName"
          name="subjectName"
          type="text"
          class="w-3/4"
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
      <div class="text-center">
        <button
          @click="createNewClass()"
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
import api from "@/api";

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
      classGenerated: false,
      courseDetails: {},
    };
  },
  methods: {
    async createNewClass() {
      const data = {
        facultyID: this.id,
        courseName: this.subjectName,
        slot: this.slot,
      };

      try {
        const res = await api.post("/newCourse", data);
        console.log("Response from backend on creating a new course", res);
        this.classGenerated = true;
        this.subjectName = "";
        this.slot = "";
        this.credits = "";
        this.courseDetails = res.data;
      } catch (error) {
        console.log(
          "Error occured while creating a new course in backend",
          error
        );
      }

      this.$router.push("/faculty");
    },
  },
};
</script>

<style scoped>
label {
  font-size: 17px;
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
