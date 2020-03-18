import { Model } from '@vuex-orm/core';
import FormItem from '@/store/models/FormItem';
/* eslint-disable @typescript-eslint/camelcase */
export default class Form extends Model {
  static entity = 'forms';

  static fields() {
    return {
      id: this.uid(),
      name: this.attr(''),
      structure: this.attr([]),
      form_items: this.hasMany(FormItem, 'form_id'),
    };
  }
}
