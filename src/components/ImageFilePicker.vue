<template>
  <div class="full-height image-container" @click="openFileSelector">
    <q-img :src="preview ? preview : src" spinner-color="primary" />
    <q-file
      v-model="files"
      accept=".jpg, image/*"
      style="display: none"
      ref="fileInput"
      @input="imageSelected"
    />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    index: {
      type: Number,
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
      this.$emit("imageSelected", file, this.index);

      this.fileReader.readAsDataURL(file);
      this.fileReader.onload = e => {
        const base64 = e.target.result;
        this.preview = base64;
        this.$emit("base64ImageSelected", base64, this.index);
      };
    }
  }
};
</script>

<style>
.image-container {
  position: relative;
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