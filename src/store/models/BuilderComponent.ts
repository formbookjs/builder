import { Model } from '@vuex-orm/core';
import ComponentProperty from "@/store/models/ComponentProperty";
import ComponentCategory from "@/store/models/ComponentCategory";
/* eslint-disable @typescript-eslint/camelcase */
export default class BuilderComponent extends Model {
  static entity = 'builder_components';

  static fields() {
    return {
      id: this.uid(),
      component_category_id: this.attr(null),
      name: this.attr(''),
      label: this.attr(''),
      icon: this.attr(''),
      iconClasses: this.attr([]),
      dragAreaClasses: this.attr([]),
      component_properties: this.morphMany(ComponentProperty, 'component_propertyable_id', 'component_propertyable_type'),
      component_category: this.belongsTo(ComponentCategory, 'component_category_id')
    };
  }
}
