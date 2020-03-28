import { Database } from '@vuex-orm/core';
import BuilderComponent from '@/store/models/BuilderComponent';
import Form from '@/store/models/Form';
import Framework from '@/store/models/Framework';
import BuilderConfiguration from '@/store/models/BuilderConfiguration';
import FormItem from '@/store/models/FormItem';
import Directory from "@/store/models/Directory";
import ComponentCategory from "@/store/models/ComponentCategory";
import ComponentProperty from "@/store/models/ComponentProperty";

const database = new Database();

database.register(BuilderComponent);
database.register(BuilderConfiguration);
database.register(Form);
database.register(FormItem);
database.register(Framework);
database.register(Directory);
database.register(ComponentCategory);
database.register(ComponentProperty);

export default database;
