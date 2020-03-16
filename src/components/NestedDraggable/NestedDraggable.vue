<template>
  <draggable
    :class="['dragArea', ...dragAreaClasses]"
    tag="div"
    :list="children"
    :group="{ name: 'people' }"
    :move="moving"
    handle=".drag-handle"
    :invert-swap="true"
    ghost-class="ghost"
    chosen-class="chosen"
    @mouseleave="leaving"
  >
    <component
      :is="getComponent(el.name)"
      v-for="el in items"
      :key="el.name + '-' + el.id"
      class="mr-0 mt-0 ml-0 mb-5 pr-3 pl-3"
    >
      <v-sheet elevation="6" width="100%">
        <v-system-bar window dark color="primary" class="drag-handle">
          <v-icon>mdi-message</v-icon>
          <span>{{ el.name }}</span>
          <v-spacer></v-spacer>
          <v-icon>mdi-minus</v-icon>
          <v-icon>mdi-checkbox-blank-outline</v-icon>
          <v-btn icon @click="removeItem(el.id)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-system-bar>
        <nested-draggable
          v-if="el.children"
          :children="el.children"
          :drag-area-classes="el.dragAreaClasses"
        />
      </v-sheet>
    </component>
  </draggable>
</template>
<script lang="ts">
import draggable from 'vuedraggable';
import Vue from 'vue';
import { components } from '@/lib/framwork';
import {inject, onMounted, reactive, ref} from "@vue/composition-api";

export default Vue.extend({
  name: 'NestedDraggable',
  components: {
    draggable,
  },
  props: {
    children: Array,
    dragAreaClasses: {
      type: Array,
      default: () => ['d-inline-block'],
    },
  },
  setup({ children }) {
    const items: any = ref([]);
    const getComponent = (compName: string) => {
      return components['grid'][compName];
    };
    const moving = (data: any) => {
      console.log(data);
    };

    const leaving = (data: any) => {
      console.log(data);
    };
    const removeItem = (idx: any) => {
      console.log(idx);
      // items.value.splice(idx, 1);
    };

    onMounted(() => {
      items.value = children;
    });

    return {
      getComponent,
      moving,
      leaving,
      removeItem,
      items,
      // nestedDraggableClasses,
    };
  },
});
</script>
<style lang="scss">
.dragArea {
  margin: 0;
  width: 100%;
  min-height: 50px;
  outline: 1px dashed;
}

.drag-hover {
  background-color: yellow;
}

.chosen {
  color: #fff;
  background-color: #c00;
}

.ghost {
  opacity: 0.4;
}
</style>
