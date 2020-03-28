<template>
  <v-card elevation="12" width="256" class="mx-auto">
    <v-toolbar color="light-blue" dark>
      <v-btn icon>
        <v-icon>mdi-view-module</v-icon>
      </v-btn>
    </v-toolbar>
    <v-expansion-panels tile>
      <v-expansion-panel v-for="(componetCategory, i) in componentCategories" :key="i">
        <v-expansion-panel-header>{{ componetCategory.name }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list>
            <draggable
              class=""
              :group="{ name: 'people', pull: 'clone', put: false }"
              :list="componetCategory.builder_components"
              chosen-class="chosen"
              :clone="cloning"
              @move="moving"
            >
              <v-list-item v-for="item in componetCategory.builder_components" :key="item.id">
                <v-list-item-avatar>
                  <v-icon :class="item.iconClasses">
                    {{ item.icon }}
                  </v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-text="item.label"></v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn icon>
                    <v-icon color="grey lighten-1">mdi-information</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </draggable>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { computed, reactive, ref } from '@vue/composition-api';
import ComponentCategory from '@/store/models/ComponentCategory';

export default Vue.extend({
  name: 'MenuRight',
  setup() {
    const items = ref([]);
    const componentCategories = computed(() => {
      return ComponentCategory.query()
        .with('builder_components')
        .all();
    });
    const moving = (evt: any) => {
      // const items = document.querySelectorAll('.drag-hover');
      // items.forEach(item => {
      //   item.classList.remove('drag-hover');
      // });
      // evt.to.classList.add('drag-hover');
    };
    const cloning = (item: any) => {
      delete item.id;
      delete item.$id;
      console.log('cloning', item);
      return item;
    };

    return {
      items,
      componentCategories,
      cloning,
      moving,
    };
  },
});
</script>
