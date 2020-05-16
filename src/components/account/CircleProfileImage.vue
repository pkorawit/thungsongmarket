<template>
  <div class="full-height image-container" @click="openFileSelector">
    <q-img
      :src="preview ? preview : src"
      spinner-color="primary"
      class="circle-image shadow-5"
    />
    <q-file
      v-model="files"
      accept=".jpg, image/*"
      style="display: none"
      ref="fileInput"
      @input="imageSelected"
      class="shadow-5"
    />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      files: null,
      preview: null,
      fileReader: new FileReader()
    };
  },
  methods: {
    openFileSelector() {
      this.$refs.fileInput.pickFiles();
    },
    imageSelected(file) {
      this.fileReader.readAsDataURL(file);
      this.fileReader.onload = e => {
        const base64 = e.target.result;
        this.preview = base64;
        this.$emit("imageSelected", base64);
      };
    }
  }
};
</script>

<style>
.image-container {
  position: relative;
}
.circle-image {
  border-radius: 50%;
  width: 200px;
  height: 200px;
}
.icon {
  position: absolute;
  bottom: 0;
  right: 31vw;
  z-index: 1;
  width: 32px;
  height: 32px;
}
</style>
