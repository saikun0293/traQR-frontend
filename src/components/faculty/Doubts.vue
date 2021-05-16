<template>
  <div class="bg-myBlack font-body col-span-3">
    <div class="text-center text-3xl pt-10 pb-2 font-extralight text-white">
      Doubts
    </div>
    <div class="h-l3 w-2/3 m-auto overflow-y-auto mt-5">
      <div
        v-for="doubt in doubts"
        :key="doubt.courseID"
        class="bg-myMildBlack p-5 rounded-md my-4"
      >
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

export default {
  setup() {
    const { isLoggedIn, user } = toRefs(useStore().state.auth);
    const doubts = ref([]);

    const getDoubts = async () => {
      const res = await api.post("/doubts", {
        facID: user.value.uid,
      });
      doubts.value = res.data;
    };

    watchEffect(() => {
      if (isLoggedIn.value) {
        getDoubts();
      }
    });

    return { doubts };
  },
};
</script>

<style></style>
