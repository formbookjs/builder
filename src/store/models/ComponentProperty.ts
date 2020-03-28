import { Model } from '@vuex-orm/core';
/* eslint-disable @typescript-eslint/camelcase */
export default class ComponentProperty extends Model {
  static entity = 'component_properties';

  static fields() {
    return {
      id: this.uid(),
      name: this.attr(''),
      key: this.attr(''),
      value: this.attr(null),
      component_propertyable_id: this.attr(null),
      component_propertyable_type: this.attr(null),
    };
  }
}
