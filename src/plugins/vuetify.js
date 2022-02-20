import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark: false,
        themes: {
            light: {
              primary: colors.blue.darken1,
              secondary: colors.grey.darken1,
              accent: colors.grey,
              error: colors.red.accent3,
              background: colors.indigo.lighten5,
              info: colors.teal.darken1,
            },
            dark: {
              primary: colors.purple.darken2,
              background: colors.indigo.base,
              accent: colors.grey.darken1,
              info: colors.teal.lighten1,
            },
          },
      
      },
});