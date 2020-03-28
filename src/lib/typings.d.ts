declare module '@/formBook/formbook.config' {
  export enum ComponentFrameworks {
    vuetify = 'vuetify',
  }
  export interface FormBookConfig {
    componentFramework: ComponentFrameworks;
  }
}

declare module 'v-jsoneditor'
