<template>
  <v-card class="mx-auto" max-width="500">
    <v-sheet class="pa-4 primary lighten-2">
      <v-text-field
        v-model="search"
        label="Search Company Directory"
        dark
        flat
        solo-inverted
        hide-details
        clearable
        clear-icon="mdi-close-circle-outline"
      ></v-text-field>
      <v-checkbox
        v-model="caseSensitive"
        dark
        hide-details
        label="Case sensitive search"
      ></v-checkbox>
    </v-sheet>
    <v-card-text>
      <v-treeview :items="items" :search="search" :filter="filter" :open.sync="open">
        <template v-slot:prepend="{ item }">
          <v-icon
            v-if="item.children"
            v-text="`mdi-${item.id === 1 ? 'home-variant' : 'folder-network'}`"
          ></v-icon>
        </template>
      </v-treeview>
    </v-card-text>
  </v-card>
</template>

<script>
import Vue from 'vue';
import { computed, ref } from '@vue/composition-api';

export default Vue.extend({
  name: 'MenuLeft',
  setup() {
    const caseSensitive = ref(false);
    const search = ref(null);
    const items = ref([]);
    const open = ref([]);
    const filter = computed(() => {
      return caseSensitive.value
        ? (item, search, textKey) => item[textKey].indexOf(search) > -1
        : undefined;
    });

    return {
      caseSensitive,
      search,
      items,
      open,
      filter,
    };
  },
});
</script>

<style scoped></style>
