import { Database } from '@vuex-orm/core';
import BuilderComponent from '@/store/models/BuilderComponent';
import Form from '@/store/models/Form';
import Framework from '@/store/models/Framework';
import BuilderConfiguration from '@/store/models/BuilderConfiguration';
import FormItem from '@/store/models/FormItem';

const database = new Database();

database.register(BuilderComponent);
database.register(BuilderConfiguration);
database.register(Form);
database.register(FormItem);
database.register(Framework);

export default database;
