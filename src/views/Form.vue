<template>
  <v-card class="fill-height">
    <v-tabs v-model="tab" background-color="primary" dark>
      <v-tab v-for="item in items" :key="item.tab">
        {{ item.tab }}
      </v-tab>
      <v-tab>
        JSON
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" class="fill-height">
      <v-tab-item
        v-for="item in items"
        :key="item.tab"
        @contextmenu="event => show(event, item)"
        class="fill-height"
      >
        <v-card flat class="fill-height">
          <component :is="item.component" v-bind="item.attrs">{{ item.content }}</component>
        </v-card>
      </v-tab-item>
      <v-tab-item class="fill-height">
        <v-card flat class="fill-height">
          <json-editor height="90%" v-model="formData" :options="jsonEditorOptions"></json-editor>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    <v-menu
      v-model="showBuilderMenu"
      :position-x="x"
      :position-y="y"
      absolute
      offset-y
      :close-on-content-click="false"
    >
      <menu-right />
    </v-menu>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { computed, ref } from '@vue/composition-api';
import nestedDraggable from '@/components/NestedDraggable/NestedDraggable.vue';
import MenuRight from '@/components/Menu/MenuRight.vue';
import Form from '@/store/models/Form';
import JsonEditor from '@/components/JsonEditor/JsonEditor.vue';
import { JSONEditorOptions } from 'jsoneditor';

export default Vue.extend({
  name: 'Form',
  components: {
    nestedDraggable,
    MenuRight,
    JsonEditor,
  },
  setup(_, { root }) {
    const tab = ref(null);
    const showBuilderMenu = ref(false);
    const x = ref(0);
    const y = ref(0);
    const jsonEditorOptions = ref<JSONEditorOptions>({
      modes: ['code', 'tree'],
      mode: 'code',
      onEditable: (path: any, field: any, value: any) => {
        console.log(field)
      }
    });
    const formData = computed({
      get: () => {

        return Form.query()
          .with(
            'form_items.form_items.form_items.form_items.form_items'
          )
          .find(root.$route.params.formId);
      },
      set: value => {
        console.log(value);
      },
    });
    console.log(formData.value);
    const items = ref([
      {
        tab: 'Builder',
        component: 'nestedDraggable',
        content: '',
        attrs: {},
      },
      {
        tab: 'Preview',
        component: 'div',
        content: '',
        attrs: {},
      },
    ]);

    const show = (e: any, item: any) => {
      if (item.tab === 'Builder') e.preventDefault();
      showBuilderMenu.value = false;
      x.value = e.clientX;
      y.value = e.clientY;
      root.$nextTick(() => {
        showBuilderMenu.value = true;
      });
    };

    return {
      tab,
      items,
      x,
      y,
      formData,
      showBuilderMenu,
      jsonEditorOptions,
      show,
    };
  },
});
</script>
