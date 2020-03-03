<template>
  <v-app id="app">
    <v-navigation-drawer v-model="drawer" app clipped>
      <draggable
        class="dragArea list-group"
        :list="list1"
        :group="{ name: 'people', pull: 'clone', put: false }"
        @end="itemId++"
      >
        <v-btn v-for="element in list1" :key="element.name" class="list-group-item">
          {{ element.name }}
        </v-btn>
      </draggable>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col>
            <v-card style="min-height: 50px">
              <nested-draggable :children="list2" />
            </v-card>
          </v-col>
        </v-row>
        {{ list2 }}
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { computed, ref } from '@vue/composition-api';
import nestedDraggable from '@/components/NestedDraggable/NestedDraggable.vue';

export default Vue.extend({
  components: {
    nestedDraggable,
  },
  setup() {
    const drawer = ref(false);
    const itemId = ref(0);
    const list2 = ref([]);
    const list1 = computed(() => {
      return [
        {
          id: itemId,
          name: 'v-row',
          props: [],
          children: [],
        },
        {
          id: itemId,
          name: 'v-col',
          props: [],
          children: [],
        },
      ];
    });

    return {
      drawer,
      itemId,
      list1,
      list2,
    };
  },
});
</script>
