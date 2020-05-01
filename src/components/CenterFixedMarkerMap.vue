<template>
  <div class="full-width full-height">
    <l-map ref="map" :zoom="zoom" :center="center" @move="mapMoving" @moveend="centerUpdated">
      <l-tile-layer :url="url" />
      <l-marker :lat-lng="marker" :icon="icon" :focus="true" :draggable="false"></l-marker>
      <q-btn
        class="positionIcon"
        round
        dense
        color="primary"
        size="md"
        icon="my_location"
        @click="getCurrentLocation()"
      />
    </l-map>
  </div>
</template>
<script>
import L, { latLng, Icon, map } from "leaflet";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  props: {
    lat: {
      type: Number
    },
    lng: {
      type: Number
    }
  },
  data() {
    return {
      zoom: 17,
      center: latLng(0, 0),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      marker: latLng(0, 0),
      icon: L.icon({
        iconUrl: require("../assets/pin.png"),
        iconSize: [50, 50]
      }),
      errorStr: "",
      flag: false
    };
  },
  methods: {
    mapMoving(e) {
      if (!this.flag) {
        this.center = latLng(
          e.target.getCenter().lat,
          e.target.getCenter().lng
        );
        this.marker = this.center;
      }
    },
    centerUpdated() {
      this.$emit("center-updated", this.center);
    },
    getCurrentLocation() {
      this.flag = true;
      this.$geolocation.getCurrentPosition(
        pos => {
          this.center = latLng(pos.coords.latitude, pos.coords.longitude);
          this.marker = this.center;
          setTimeout(() => {
            this.flag = false;
          }, 1000);
        },
        err => {
          this.errorStr = err.message;
          console.log(err);
        }
      );
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (!this.lat && this.lng) {
        this.$geolocation.getCurrentPosition(
          pos => {
            this.center = latLng(pos.coords.latitude, pos.coords.longitude);
            this.marker = this.center;
          },
          err => {
            this.errorStr = err.message;
          }
        );
      } else {
        this.center = latLng(this.lat, this.lng);
      }
    });
  }
};
</script>
<style scope>
.positionIcon {
  top: 80px;
  left: 10px;
  z-index: 1000;
}
</style>
