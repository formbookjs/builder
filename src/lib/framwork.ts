import config from '@/formBook/formbook.config';
import { FormBookConfig, ComponentFrameworks } from '@/formBook/formbook.config';
import frameworks from '@/frameworks';
import { Component } from 'vue';

interface FrameworkComponentList {
  grid: Record<string, Component>;
  input: Record<string, Component>;
}

type fbComponents = {
  [index in ComponentFrameworks]: FrameworkComponentList;
};

const fbConfig = (config as unknown) as FormBookConfig;
const fbFrameworks: fbComponents = frameworks;

export const components: FrameworkComponentList = fbFrameworks[fbConfig.componentFramework];
