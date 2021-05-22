<template>
  <div class="bg-myBlack font-body col-span-3">
    <div class="text-center text-3xl pt-10 pb-2 font-extralight text-white">
      Doubts
    </div>
    <div class="h-l3 w-2/3 m-auto overflow-y-auto mt-5">
      <div
        v-for="doubt in doubts"
        :key="doubt.courseID"
        class="bg-myMildBlack p-5 rounded-md my-4 relative"
      >
        <div class="absolute top-5 right-5" @click="deleteDoubt(doubt.doubtID)">
          <Icon name="bin" />
        </div>
        <div class="text-myBlue text-sm">{{ doubt.courseName }}</div>
        <div class="text-white font-light mt-2">{{ doubt.doubt }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, toRefs, watchEffect } from "vue";
import { useStore } from "vuex";
import api from "@/api";
import Icon from "./facIcons";

export default {
  components: { Icon },
  setup() {
    const { isLoggedIn, user } = toRefs(useStore().state.auth);
    const doubts = ref([]);

    const getDoubts = async () => {
      const res = await api.post("/doubts", {
        facID: user.value.uid,
      });
      doubts.value = res.data;
    };

    const deleteDoubt = async (doubtID) => {
      try {
        await api.post("/deleteDoubt", {
          facID: user.value.uid,
          doubtID: doubtID,
        });
      } catch (error) {
        console.log("Error while deleting doubt from backend");
      }
      doubts.value = doubts.value.filter((doubt) => doubt.doubtID !== doubtID);
    };

    watchEffect(() => {
      if (isLoggedIn.value) {
        getDoubts();
      }
    });

    return { doubts, deleteDoubt };
  },
};
</script>

<style></style>
