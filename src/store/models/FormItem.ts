import { Model } from '@vuex-orm/core';
import ComponentProperty from "@/store/models/ComponentProperty";
/* eslint-disable @typescript-eslint/camelcase */
export default class FormItem extends Model {
  static entity = 'form_items';

  static fields() {
    return {
      id: this.uid(),
      form_id: this.attr(null),
      form_item_id: this.attr(null),
      name: this.attr(''),
      structure: this.attr([]),
      is_nestable: this.attr(false),
      form_items: this.hasMany(FormItem, 'form_item_id'),
      component_properties: this.morphMany(ComponentProperty, 'component_propertyable_id', 'component_propertyable_type')
    };
  }
}
