import config from '@/formBook/formbook.config';
import { FormBookConfig, ComponentFrameworks } from '@/formBook/formbook.config';
import frameworks, {configuration} from '@/frameworks';
import { Component } from 'vue';
import Framework from "@/store/models/Framework";

type fbComponents = {
  [index in ComponentFrameworks]: Record<string, Component>;
};

const fbConfig = (config as unknown) as FormBookConfig;
// const componentsByFramework = (async () => await import('@/frameworks/' + fbConfig.componentFramework))();
// console.log(componentsByFramework);
const fbFrameworks: fbComponents = frameworks;

export const components: Record<string, Component> = fbFrameworks[fbConfig.componentFramework];

export const initBuilderComponentsByFramework = () => {
  const builderComponents = configuration[fbConfig.componentFramework];
  Framework.create({
    data: builderComponents,
    insertOrUpdate: ['component_category']
  });
}
