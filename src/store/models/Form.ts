import { Model } from '@vuex-orm/core';
import FormItem from '@/store/models/FormItem';
/* eslint-disable @typescript-eslint/camelcase */
export default class Form extends Model {
  static entity = 'forms';

  static fields() {
    return {
      id: this.uid(),
      directory_id: this.attr(null),
      name: this.attr('Formular'),
      type: this.attr('form'),
      icon: this.attr('fa-journal-whills'),
      structure: this.attr([]),
      form_items: this.hasMany(FormItem, 'form_id'),
    };
  }
}
