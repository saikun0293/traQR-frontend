<template>
  <div class="w-4/5 bg-myMildBlack m-auto p-5 rounded-lg">
    <!-- display messages -->
    <div class="h-l2 px-10 overflow-y-auto">
      <div v-for="(message, index) in messages" :key="message.id">
        <div
          :class="[
            message.isStudent ? 'text-myRed' : 'text-myBlue',
            'text-xs my-2 flex items-center',
          ]"
        >
          <span>{{ message?.username }}</span>
        </div>
        <div class="bg-myLightBlack relative rounded-lg p-4 py-5">
          <div class="text-sm">{{ message?.message }}</div>
          <div
            @click="markDoubt(message.id, message.markedDoubt, index)"
            class="absolute -right-10 top-1/2"
          >
            <Icon :name="message.markedDoubt ? 'tickDark' : 'tickLight'" />
          </div>
          <div
            :class="[
              message.isStudent ? 'bg-myRed' : 'bg-myBlue',
              'absolute -top-3 -right-3  w-10 h-10 rounded-full grid place-items-center grid-cols-2 px-2',
            ]"
          >
            <span><Icon name="upvote"/></span>
            <span class="text-xs">{{ message?.upvotes }}</span>
          </div>
          <div class="absolute bottom-1 right-1 cursor-pointer">
            <div @click="toggleComments(message.id)">
              <Icon v-if="!message?.showComments" name="toggle-right" />
              <Icon v-if="message?.showComments" name="toggle-bottom" />
            </div>
          </div>
        </div>
        <!-- Comments -->
        <div
          v-if="message.showComments"
          class="ml-10 mt-1 pl-2 border-l-4 border-myRed"
        >
          <!-- Each comment -->
          <div v-for="(comment, index) in message?.comments" :key="index">
            <div
              :class="[
                comment.isStudent ? 'text-myRed' : 'text-myBlue',
                'text-xs my-2',
              ]"
            >
              {{ comment?.username }}
            </div>
            <div class="bg-myLightBlack relative rounded-lg p-4 py-5">
              <div class="text-sm">{{ comment?.comment }}</div>
              <div
                :class="[
                  message.isStudent ? 'bg-myRed' : 'bg-myBlue',
                  'absolute -top-3 -right-3  w-9 h-9 rounded-full grid place-items-center grid-cols-2 px-2',
                ]"
              >
                <span><Icon name="upvote"/></span>
                <span class="text-xs">{{
                  comment.upvotes === undefined ? 0 : comment.upvotes
                }}</span>
              </div>
            </div>
          </div>
          <div class="flex py-4">
            <input
              type="text"
              placeholder="Add a comment"
              v-model="newComment"
              class="px-3 rounded-lg text-sm focus:outline-none w-full text-gray-700"
            />
            <button
              type="submit"
              @click="submitComment(message.id)"
              class="grid place-items-center bg-myBlue w-8 h-8 rounded-full ml-5 hover:bg-myRed focus:outline-none"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Add messages -->
    <div class="flex mx-10 mt-3 rounded-lg overflow-hidden">
      <input
        type="text"
        class="px-8 py-2 w-full text-sm text-gray-800 focus:outline-none"
        v-model="newMessage"
        placeholder="Add a message"
      />
      <button
        class="bg-myBlue w-10 p-3"
        @click="onSubmitMessage()"
        :disabled="toggleButton"
        type="submit"
      >
        <Icon name="send" />
      </button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import Icon from "@/components/faculty/facIcons";
// import api from "@/api";

import { mapState } from "vuex";
import { random } from "pokemon";

export default {
  components: { Icon },
  mounted() {
    this.getPreviousChats();
  },
  props: ["enabled"],
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
    toggleButton() {
      let disableSendButton = false;
      if (this.newMessage !== "") {
        disableSendButton = false;
      } else {
        disableSendButton = true;
      }
      return disableSendButton;
    },
  },
  emits: ["click"],
  data() {
    return {
      newMessage: "",
      messages: [],
      placeholder: "Add a mess",
      newComment: "",
    };
  },
  methods: {
    async getPreviousChats() {
      try {
        const db = firebase
          .firestore()
          .collection("chatrooms")
          .doc(`${this.$route.params.id}`)
          .collection("messages")
          .orderBy("timestamp");

        db.onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "removed") {
              // delete the message
              const deleteId = change.doc.id;
              this.messages = this.messages.filter(
                (message) => message.id !== deleteId
              );
            }
            if (change.type === "added") {
              let message = change.doc.data();

              //display the message
              this.messages.push({
                id: change.doc.id,
                showComments: false,
                ...message,
              });
            }
          });
        });
      } catch (error) {
        console.log(
          "Error occured while obtaining prev chats from firestore",
          error
        );
      }
    },
    async onSubmitMessage() {
      try {
        const db = firebase
          .firestore()
          .collection("chatrooms")
          .doc(`${this.$route.params.id}`)
          .collection("messages");

        const res = await db.add({
          username: random(),
          upvotes: 0,
          message: this.newMessage,
          comments: [],
          isStudent: true,
          markedDoubt: false,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

        console.log(
          "Response from firebase on adding message to firestore",
          res
        );

        this.newMessage = "";
      } catch (error) {
        console.log("Error while adding message to the firestore", error);
      }
    },
    toggleComments(id) {
      console.log("Clicked and id is this", id);
      this.messages.forEach((message) => {
        if (message.id === id) {
          message.showComments = !message.showComments;
        }
      });
    },
    async submitComment(id) {
      console.log("Adding comment to message with ", id);
      try {
        const messageRef = firebase
          .firestore()
          .collection("chatrooms")
          .doc(`${this.$route.params.id}`)
          .collection("messages")
          .doc(id);
        messageRef.update({
          comments: firebase.firestore.FieldValue.arrayUnion({
            comment: this.newComment,
            username: random(),
            upvotes: 0,
            isStudent: true,
          }),
        });
        this.newComment = "";
      } catch (error) {
        console.log(
          "Error while trying to add comment to message in firestore",
          error
        );
      }
    },
    async markDoubt(id, marked, index) {
      if (!marked) {
        try {
          const messageRef = firebase
            .firestore()
            .collection("chatrooms")
            .doc(`${this.$route.params.id}`)
            .collection("messages")
            .doc(id);
          messageRef.update({
            markedDoubt: true,
          });

          this.messages[index].markedDoubt = true;

          //TODO: Add doubts later
          // const res = api.post("/doubts",{})
        } catch (error) {
          console.log(
            "Error while trying to add comment to message in firestore",
            error
          );
        }
      }
    },
  },
};
</script>

<style></style>
