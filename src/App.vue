<template>
  <v-app id="app">
    <v-navigation-drawer v-model="drawer" app clipped><menu-left /></v-navigation-drawer>
    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid class="fill-height">
        <v-row class="fill-height">
          <v-col class="fill-height">
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-content>


    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { ref } from '@vue/composition-api';
import MenuLeft from '@/components/Menu/MenuLeft.vue';
import {initBuilderComponentsByFramework} from "@/lib/framwork";

export default Vue.extend({
  components: {
    MenuLeft,
  },
  setup() {
    initBuilderComponentsByFramework();
    const drawer = ref(false);
    return {
      drawer,
    };
  },
});
</script>

<style>
.chosen {
  color: #fff;
  background-color: #c00;
}
</style>
