<template>
  <div class="bg-white w-72 h-96 rounded-lg overflow-hidden">
    <!-- top identicon -->
    <div class="h-52 grid place-items-center bg-gray-100">
      <img :src="course?.identicon" alt="identicon" class="w-20 h-20" />
    </div>
    <!-- bottom subject -->
    <div class="py-5 grid justify-items-center">
      <div class="text-sm text-gray-500">{{ course?.facultyName }}</div>
      <div class="my-3 font-bold text-xl">{{ course?.courseName }}</div>
      <div
        :class="[
          course.isStudent ? 'bg-myRed' : 'bg-myBlue',
          'px-4 py-1 text-white rounded-md',
        ]"
      >
        {{ course?.slot }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["course"],
};
</script>

<style></style>
