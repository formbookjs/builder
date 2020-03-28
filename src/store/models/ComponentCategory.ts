import { Model } from '@vuex-orm/core';
import BuilderComponent from '@/store/models/BuilderComponent';
/* eslint-disable @typescript-eslint/camelcase */
export default class Framework extends Model {
  static entity = 'component_categories';

  static fields() {
    return {
      id: this.uid(),
      name: this.attr(''),
      builder_components: this.hasMany(BuilderComponent, 'component_category_id'),
    };
  }
}
