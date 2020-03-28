<template>
  <v-card max-width="500">
    <v-toolbar color="primary" dark>
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
    </v-toolbar>
    <v-toolbar color="primary" dark>
      <v-toolbar-title>Formulare</v-toolbar-title>
      <v-fab-transition>
        <v-btn color="green" dark small absolute bottom right fab @click="addDirectory">
          <v-icon>fa-folder-plus</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-toolbar>
    <v-card-text>
      <v-treeview
        :items="items"
        :search="search"
        :filter="filter"
        item-children="forms"
        :open.sync="open"
        open-on-click
        dense
        activatable
        @update:active="openItem"
      >
        <template v-slot:label="{ item }">
          <div
            class="leftMenuItem"
            v-bind="treeViewNodeProps(item)"
            @contextmenu="event => show(event, item.id)"
          >
            <v-icon class="mr-3" small>{{ item.icon }}</v-icon>
            <span>{{ item.name }}</span>
          </div>
        </template>
      </v-treeview>
      <v-menu v-model="showMenu" :position-x="x" :position-y="y" absolute offset-y>
        <v-list dense>
          <v-list-item-group color="primary">
            <v-list-item
              v-for="(contextMenuItem, i) in contextMenuItems"
              :key="i"
              @click="contextMenuItem.action"
            >
              <v-list-item-icon class="mr-2">
                <v-icon v-text="contextMenuItem.icon" small></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="contextMenuItem.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { computed, ref } from '@vue/composition-api';
import Directory from '@/store/models/Directory';
import Form from '@/store/models/Form';

export default Vue.extend({
  name: 'MenuLeft',
  setup(_, { root }) {
    const caseSensitive = ref(false);
    const search = ref(null);
    const directoryId = ref(null);
    const x = ref(0);
    const y = ref(0);
    const showMenu = ref(false);
    const contextMenuItems = ref([
      {
        icon: 'fa-plus-circle',
        text: 'Add new form',
        action: () => {
          Form.insert({
            data: {
              /* eslint-disable @typescript-eslint/camelcase */
              directory_id: directoryId.value,
            },
          });
        },
      },
    ]);
    const items = computed(() => {
      return [
        ...Directory.query()
          .withAll()
          .all(),
        ...Form.query()
          .where('directory_id', null)
          .all(),
      ];
    });
    const open = ref([]);
    const filter = computed(() => {
      return caseSensitive.value
        ? (item: any, search: any, textKey: any) => item[textKey].indexOf(search) > -1
        : undefined;
    });

    const addDirectory = () => {
      Directory.new();
    };

    const addForm = () => {
      Form.new();
    };

    const treeViewNodeProps = (item: any) => {
      if (item.type !== 'form') return;
      return {
        to: { name: 'Form', params: { formId: item.id } },
      };
    };

    const openItem = (formIds: any) => {
      if (formIds && Form.find(formIds[0])) {
        root.$router.push({ name: 'Form', params: { formId: formIds[0] } });
      }
    };

    const show = (e: any, formId: any) => {
      e.preventDefault();
      showMenu.value = false;
      x.value = e.clientX;
      y.value = e.clientY;
      directoryId.value = formId;
      root.$nextTick(() => {
        showMenu.value = true;
      });
    };

    return {
      caseSensitive,
      search,
      items,
      open,
      filter,
      directoryId,
      x,
      y,
      showMenu,
      contextMenuItems,
      show,
      openItem,
      addDirectory,
      addForm,
      treeViewNodeProps,
    };
  },
});
</script>

<style lang="scss">
.leftMenuItem {
  text-decoration: none;

  &.v-btn {
    transition: none;
  }

  &.v-btn:hover::before,
  &.v-btn:focus::before {
    background-color: transparent;
  }
}
</style>
