<template>
  <v-app id="app">
    <v-navigation-drawer v-model="drawer" app clipped>
      <draggable
        class="dragArea list-group"
        :list="list1"
        :group="{ name: 'people', pull: 'clone', put: true }"
        chosen-class="chosen"
        :move="moving"
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
            <v-card style="min-height: 50px;">
              <nested-draggable :children="usedForm.structure" />
            </v-card>
          </v-col>
        </v-row>
        {{ usedForm.structure }}
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
import Form from '@/store/models/Form';

export default Vue.extend({
  components: {
    nestedDraggable,
  },
  setup() {
    const drawer = ref(false);
    const itemId = ref(0);

    const usedForm = computed(() => {
      return Form.query().first() || {structure: []};
    });
    const list1 = computed(() => {
      return [
        {
          id: itemId.value,
          name: 'VRow',
          dragAreaClasses: ['row'],
          props: [],
          children: [],
        },
        {
          id: itemId.value,
          name: 'VCol',
          props: [],
          children: [],
        },
      ];
    });
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
