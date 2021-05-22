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
      <div class="flex justify-around w-full text-sm">
        <button
          @click="startClass()"
          class="bg-myBlue text-white px-4 py-2 rounded-lg"
        >
          Start Class
        </button>
        <button
          @click="endClass()"
          class="bg-myRed text-white px-4 py-2 rounded-lg"
        >
          End Class
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { mapState } from "vuex";
import { useRoute } from "vue-router";
import firebase from "firebase/app";
import "firebase/firestore";

export default {
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
  emits: ["enable", "disable"],
  setup(props, { emit }) {
    const route = useRoute();

    const qrcode = ref(null);
    const from = ref(null);
    const to = ref(null);

    const started = ref(null);
    const remaining = ref(null);

    const classRef = firebase
      .firestore()
      .collection("classes")
      .doc(route.params.id);

    classRef.onSnapshot((doc) => {
      const data = doc.data();
      started.value = data.started;
      qrcode.value = data.qrlink;
      from.value = data.from;
      to.value = data.to;
    });

    const stopWatching = watch(started, () => {
      if (started.value) {
        emit("enable", null);
        stopWatching();
      }
    });

    const formatDate = (date) => {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    };

    const generateQR = async () => {
      if (from.value && to.value) {
        const today = formatDate(new Date());
        const f = today + " " + from.value + ":00";
        const t = today + " " + to.value + ":00";
        console.log(f, t);
        const cid = route.params.id;
        qrcode.value = `https://api.qrserver.com/v1/create-qr-code/?data="${cid};${f};${t}"&size=200x200`;

        try {
          // Storing the qrcode as long as class is running

          classRef.set(
            {
              qrlink: qrcode.value,
              from: from.value,
              to: to.value,
            },
            { merge: true }
          );
        } catch (error) {
          console.log("Error while storing the qrcode details in firebase");
        }
      }
    };

    const startClass = () => {
      // Is class already running?
      if (started.value) {
        window.alert("Class has already started!");
      } else {
        classRef.set(
          {
            started: true,
            startedTime: new Date(),
          },
          { merge: true }
        );
        emit("enable", null);
      }
    };

    const endClass = () => {
      //overwrite the document
      classRef.set({
        started: false,
      });
      emit("disable", null);
    };

    return { generateQR, qrcode, from, to, startClass, remaining, endClass };
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
