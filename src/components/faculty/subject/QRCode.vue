<template>
  <div class="grid grid-cols-2 w-3/5 mx-auto mt-10">
    <!-- QR Code -->
    <div class="grid place-items-center">
      <div
        class="w-80 h-80 bg-myMildBlack rounded-lg relative grid place-items-center"
      >
        <img :src="qrcode" />
        <button
          @click="generateQR()"
          class="bg-myRed py-1 px-2 text-xs rounded-md absolute bottom-3 left-1/2 transform -translate-x-1/2"
        >
          Generate QR Code
        </button>
      </div>
    </div>
    <!-- QR Code details -->
    <div class="grid place-items-center">
      <div class="text-myBlue">QR Code Validity</div>
      <div class="grid grid-cols-2 gap-y-10 place-items-center">
        <label for="from">From Time</label>
        <input v-model="from" type="time" name="from" id="from" />
        <label for="to">To Time</label>
        <input v-model="to" type="time" name="to" id="to" />
      </div>
      <button class="bg-myBlue text-white px-10 py-2 rounded-lg">
        Start Class
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { mapState } from "vuex";
import { useRoute } from "vue-router";

export default {
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
  setup() {
    const route = useRoute();

    const qrcode = ref(null);
    const from = ref(null);
    const to = ref(null);

    const generateQR = () => {
      if (from.value && to.value) {
        const cid = route.params.id;
        qrcode.value = `https://api.qrserver.com/v1/create-qr-code/?data="${cid};${from.value};${to.value}"&size=200x200`;
      }
    };

    return { generateQR, qrcode, from, to };
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
