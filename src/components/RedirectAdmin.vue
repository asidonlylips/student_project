<template>
  <div class="d-flex justify-content-around" style="padding:20px" v-if="redirect()">
    <div>
      <h3>This Vue Component Does a Basic Redirect</h3>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    redirect() {
      var url = "http://127.0.0.1:8000/admin/";
      this.$router.push({ path: "/subjects" });
      window.open(url, "_target");
    }
  }
};
</script>

<style>
</style>