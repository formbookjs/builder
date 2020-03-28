import { Model } from '@vuex-orm/core';
import Form from "@/store/models/Form";
/* eslint-disable @typescript-eslint/camelcase */
export default class Directory extends Model {
  static entity = 'directories';

  static fields() {
    return {
      id: this.uid(),
      name: this.attr('Directory'),
      icon: this.attr('fa-folder'),
      type: this.attr('folder'),
      forms: this.hasMany(Form, 'directory_id'),
    };
  }
}
