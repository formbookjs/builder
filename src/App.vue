<template>
  <v-app id="app">
    <v-navigation-drawer v-model="drawer" app clipped>
      <draggable
        class="dragArea list-group"
        :list="list1"
        :group="{ name: 'people', pull: 'clone', put: false }"
        chosen-class="chosen"
        :move="moving"
        @clone="cloning"
        @end="ending"
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
            <v-card style="min-height: 50px;">
              <nested-draggable />
            </v-card>
          </v-col>
        </v-row>
        {{ usedForm }}
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
import { toMappedJson } from '@/lib/jsonGenerator';

export default Vue.extend({
  components: {
    nestedDraggable,
  },
  setup(props, { root: { $store } }) {
    const drawer = ref(false);
    const itemId = ref(0);

    const usedForm = computed(() => {
      return toMappedJson('$uid1');
    });
    const list1 = computed(() => {
      return [
        {
          name: 'VRow',
          dragAreaClasses: ['row'],
          props: [],
        },
        {
          name: 'VCol',
          props: [],
        },
      ];
    });
    const cloning = (item: any) => {
      return item;
    };
    const ending = (evt: any) => {
      itemId.value++;
      console.log('ending', evt);
    };
    const moving = (evt: any) => {
      // const items = document.querySelectorAll('.drag-hover');
      // items.forEach(item => {
      //   item.classList.remove('drag-hover');
      // });
      // evt.to.classList.add('drag-hover');
    };

    return {
      drawer,
      itemId,
      list1,
      usedForm,
      moving,
      cloning,
      ending,
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
