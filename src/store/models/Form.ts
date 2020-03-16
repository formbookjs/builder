import { Model } from '@vuex-orm/core';
/* eslint-disable @typescript-eslint/camelcase */
export default class Form extends Model {
  static entity = 'forms';

  static fields() {
    return {
      id: this.uid(),
      name: this.attr(''),
      structure: this.attr([]),
    };
  }
}
