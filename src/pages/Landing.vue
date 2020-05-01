<template>
  <div>
    <div class="window-height window-width row justify-center items-center bg-primary">
      <div class="column" style="height: 350px">
        <div class="col-8">
          <q-img src="~assets/logo.png" style="width: 150px"></q-img>
        </div>
        <div class="col-2 justify-center text-center">
          <q-btn
            class="text-black"
            v-show="ready"
            color="warning"
            icon="fas fa-cloud-download-alt"
            label="ติดตั้งแอพ"
            @click="instalApp"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ready: true
    };
  },
  methods: {
    instalApp() {
      console.log("👍", "butInstall-clicked");
      const promptEvent = window.deferredPrompt;
      if (!promptEvent) {
        // The deferred prompt isn't available.
        return;
      }
      // Show the install prompt.
      promptEvent.prompt();
      // Log the result
      promptEvent.userChoice.then(result => {
        console.log("👍", "userChoice", result);
        // Reset the deferred prompt variable, since
        // prompt() can only be called once.
        window.deferredPrompt = null;
        // Hide the install button.
        this.ready = false;
      });
    }
  },
  created() {
    window.addEventListener("beforeinstallprompt", event => {
      console.log("👍", "beforeinstallprompt", event);
      // Stash the event so it can be triggered later.
      window.deferredPrompt = event;
      // Remove the 'hidden' class from the install button container
      this.ready = true;
    });

    window.addEventListener("appinstalled", event => {
      console.log("👍", "appinstalled", event);
    });
  }
};
</script>

<style>
</style>