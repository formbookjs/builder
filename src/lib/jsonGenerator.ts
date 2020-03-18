import Form from '@/store/models/Form';
import FormItem from '@/store/models/FormItem';
/* eslint-disable @typescript-eslint/camelcase */

const defaultMapper = {
  form_items: 'children',
  id: false,
  $id: false,
  form_id: false,
  form_item_id: false,
  form_item_ids: false,
  structure: false,
};

const mapProperties = (object: Record<string, any>, mapper: Record<string, any>) => {
  const keys: Record<any, any> = Object.keys(object);
  keys.forEach((key: string) => {
    if (mapper[key]) {
      object[mapper[key]] = object[key];
      delete object[key];
    }
    if (mapper[key] === false) delete object[key];
  });
  return object;
};

const resolveFormItemsToJson = (formItems: any, mapper = defaultMapper) => {
  return formItems.map((formitem: any) => {
    const formItemStructure: any = formitem.structure;
    const formItemQuery: any = FormItem.query()
      .withAll()
      .find(formitem.id);
    if (formitem.form_items) {
      formItemStructure.form_items = resolveFormItemsToJson(formItemQuery.form_items);
    }
    return mapProperties(formItemStructure, mapper);
  });
};

export const toMappedJson = (formId: string | number, mapper = defaultMapper) => {
  const form: any = Form.query()
    .withAll()
    .find(formId);

  if (!form) return [];
  form.form_items = resolveFormItemsToJson(form.form_items);

  return mapProperties(form, mapper);
};
