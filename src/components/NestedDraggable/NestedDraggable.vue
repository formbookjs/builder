<template>
  <draggable
    :class="['fill-height', 'dragArea', ...dragAreaClasses]"
    tag="div"
    v-model="items"
    :group="{ name: 'people' }"
    handle=".drag-handle"
    :invert-swap="true"
    ghost-class="ghost"
    chosen-class="chosen"
    @mouseleave="leaving"
    @change="changing"
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
        <nested-draggable :parent-id="el.id" :drag-area-classes="el.dragAreaClasses" />
      </v-sheet>
    </component>
  </draggable>
</template>
<script lang="ts">
import draggable from 'vuedraggable';
import Vue from 'vue';
import { components } from '@/lib/framwork';
import { computed, inject, onMounted, reactive, ref } from '@vue/composition-api';
import FormItem from '@/store/models/FormItem';

export default Vue.extend({
  name: 'NestedDraggable',
  components: {
    draggable,
  },
  props: {
    parentId: {
      type: [Number, String],
      default: () => null,
    },
    dragAreaClasses: {
      type: Array,
      default: () => [],
    },
  },
  setup({ parentId }, { root }) {
    const formId = parentId ? null : root.$route.params.formId;
    const items: any = computed({
      get: (): Array<string> => {
        return FormItem.query()
          .where('form_item_id', parentId)
          .where('form_id', formId)
          .get()
          .map((formItem: any) => {
            formItem.structure.id = formItem.id;
            return formItem.structure;
          });
      },
      set: (formItems: any) => {
        const items = formItems.map((item: any) => {
          console.log('setting', item)
          const formItem: any = {};
          formItem.structure = item;
          /* eslint-disable-next-line @typescript-eslint/camelcase */
          formItem.form_item_id = parentId;
          /* eslint-disable-next-line @typescript-eslint/camelcase */
          formItem.form_id = formId;
          if (item.id) {
            formItem.id = item.id;
          }
          return formItem;
        });
        FormItem.insertOrUpdate({
          data: items,
        });
        // console.log('setting', formItem);
      },
    });
    const getComponent = (compName: string) => {
      return components[compName];
    };
    const leaving = (data: any) => {
      console.log(data);
    };
    const changing = (data: any) => {
      console.log('change', data);
    };
    const removeItem = (idx: string | number) => {
      FormItem.delete(idx);
    };

    return {
      getComponent,
      leaving,
      removeItem,
      changing,
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
