module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      scss: {
        additionalData : `@import "@/assets/scss/variables.scss";`,
      },
    },
  },
};
