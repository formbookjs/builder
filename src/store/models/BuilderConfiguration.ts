import { Model } from '@vuex-orm/core';
import Framework from '@/store/models/Framework';
/* eslint-disable @typescript-eslint/camelcase */
export default class BuilderConfiguration extends Model {
  static entity = 'builder_configurations';

  static fields() {
    return {
      id: this.uid(),
      framework_id: this.attr(''),
      name: this.attr(''),
      framework: this.belongsTo(Framework, 'framework_id'),
    };
  }
}
