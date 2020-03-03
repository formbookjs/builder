<template>
  <draggable class="dragArea" tag="div" :list="children" :group="{ name: 'people' }">
    <component :is="getComponent(el.name)" v-for="el in children" :key="el.name + '-' + el.id">
      <span>{{ el.name }}</span>
      <nested-draggable v-if="el.children" :children="el.children" />
    </component>
  </draggable>
</template>
<script lang="ts">
import draggable from 'vuedraggable';
import Vue from 'vue';

export default Vue.extend({
  name: 'NestedDraggable',
  components: {
    draggable,
  },
  props: {
    children: Array,
  },
  setup() {
    const getComponent = (compName: string) => {
      return compName;
    };

    return {
      getComponent,
    };
  },
});
</script>
<style scoped>
.dragArea {
  min-height: 50px;
  outline: 1px dashed;
}
</style>
