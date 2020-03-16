module.exports = {
  transpileDependencies: ['vuetify'],

  pluginOptions: {
    lintStyleOnBuild: true,
    stylelint: {},
  },
  chainWebpack: config => {
    //this path is specific to my project
    config.resolve.alias.set('formBookConfig', 'formbook.config.js');
    config.externals({
      ...config.get('externals'),
      fs: 'fs',
    });
  },
};
