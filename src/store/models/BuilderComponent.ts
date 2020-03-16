import { Model } from '@vuex-orm/core';
/* eslint-disable @typescript-eslint/camelcase */
export default class BuilderComponent extends Model {
  static entity = 'builder_components';

  static fields() {
    return {
      id: this.uid(),
      name: this.attr(''),
      label: this.attr(''),
      config: this.attr([]),
    };
  }
}
