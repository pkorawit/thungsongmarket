<template>
  <q-page style="height: 20px">
    <MultiplePins :shops="shops"></MultiplePins>
  </q-page>
</template>

<script>
import MultiplePins from "../components/MultiplePinsMap";
import { getShops } from "../api/api";
export default {
  name: "PageIndex",
  components: {
    MultiplePins
  },
  data() {
    return {
      shops: []
    };
  },
  async mounted() {
    this.$nextTick(async () => {
      this.shops = await getShops();
    });
  }
};
</script>
