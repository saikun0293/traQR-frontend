<template>
  <div class="bg-myBlack font-body col-span-3">
    <div class="text-center text-3xl pt-10 pb-2 font-extralight text-white">
      Doubts
    </div>
    <div class="h-l3 overflow-y-auto">
      <div v-for="doubt in doubts" :key="doubt.courseID" class="bg-myMildBlack">
        <div>{{ doubt.courseName }}</div>
        <div>{{ doubt.doubt }}</div>
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
