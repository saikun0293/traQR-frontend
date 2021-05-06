<template>
  <div>
    <!-- top -->
    <div class="grid grid-cols-3 place-items-center">
      <div class="col-start-2 col-span-1">
        <input
          type="date"
          name="date"
          id="date"
          class="px-4 py-2 rounded-md text-gray-700"
        />
      </div>
      <div>
        <button
          type="submit"
          class="bg-myRed hover:bg-myBlue rounded-md text-white text-xs px-4 py-2 my-4"
        >
          Download CSV
        </button>
      </div>
    </div>
    <div class="w-2/3 bg-myMildBlack mx-auto mt-7 rounded-lg p-5">
      <div class="grid grid-cols-3 place-items-center text-myBlue">
        <div>Registration Number</div>
        <div>Student Name</div>
        <div>Status</div>
      </div>
      <div class="h-80 overflow-y-auto">
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {},
};
</script>

<style></style>
