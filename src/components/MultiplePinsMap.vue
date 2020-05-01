<template>
  <div class="full-width full-height">
    <l-map ref="map" :zoom="zoom" :center="center">
      <l-tile-layer :url="url" />
      <l-marker :lat-lng="humanMarker" :icon="humanIcon" :draggable="false"></l-marker>
      <l-marker
        v-for="shop in shops"
        :lat-lng="{lat: shop.location.coordinates[1], lng: shop.location.coordinates[0]}"
        :key="shop.id"
        :icon="icon"
        :draggable="false"
        @click="toShop(shop._id)"
        style="color: #2759AE"
      >
        <l-tooltip
          :options="{ permanent: true, interactive: true }"
          class="tooltipcss"
        >{{shop.name}}</l-tooltip>
      </l-marker>
    </l-map>
  </div>
</template>
<script>
import L, { latLng, Icon, map } from "leaflet";
import { LMap, LTileLayer, LMarker, LTooltip } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";

export default {
  name: "MultiplePins",
  props: {
    shops: {
      type: Array,
      required: true
    }
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip
  },
  data() {
    return {
      zoom: 14,
      center: latLng(0, 0),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      marker: latLng(0, 0),
      icon: L.icon({
        iconUrl: require("../assets/store-solid.svg"),
        iconSize: [32, 32],
        tooltipAnchor: [20, 0],
        className: "icon"
      }),
      humanMarker: latLng(0, 0),
      humanIcon: L.icon({
        iconUrl: require("../assets/human.png"),
        iconSize: [35, 40]
      })
    };
  },
  methods: {
    toShop(id) {
      this.$router.push({ name: "shopinfo", params: { id } });
    }
  },
  mounted() {
    this.$geolocation.getCurrentPosition(
      pos => {
        this.center = latLng(pos.coords.latitude, pos.coords.longitude);
        this.humanMarker = this.center;
      },
      err => {
        this.errorStr = err.message;
      }
    );
  }
};
</script>
<style scope>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@300&display=swap");
.positionIcon {
  top: 80px;
  left: 10px;
  z-index: 1000;
}
.tooltipcss {
  font-size: 16px;
  width: auto;
  height: auto;
  font-family: "Kanit", sans-serif;
}
</style>
