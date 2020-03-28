import { VCol, VRow, VInput, VTextField } from 'vuetify/lib';
/* eslint-disable @typescript-eslint/camelcase */

export default { VCol, VRow, VInput, VTextField};

const builderComponents = [
    {
        name: 'VCol',
        label: 'Column',
        icon: 'fa-columns',
        iconClasses: '',
        component_category: {
            id: '1',
            name: 'grid'
        },
    },
    {
        name: 'VRow',
        label: 'Row',
        icon: 'fa-columns',
        iconClasses: 'success',
        dragAreaClasses: ['row'],
        component_category: {
            id: '1',
        },
    },
    {
        name: 'VInput',
        label: 'Input Placeholder',
        icon: 'fa-edit',
        iconClasses: '',
        component_category: {
            id: '2',
            name: 'input'
        },
    },
    {
        name: 'VTextField',
        label: 'Text Field',
        icon: 'fa-edit',
        iconClasses: '',
        component_category: {
            id: '2'
        },
    }
];

export const setup = {
    name: 'Vuetify',
    builder_components: builderComponents
};