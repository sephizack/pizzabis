<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="ma-1"
        small
        fab
        @click="switchMode"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
    </template>
    <span>{{tooltip}}</span>
  </v-tooltip>
</template>
<script>
export default {
  name: "SwitchDarkMode",

  data: () => ({}),
  computed: {
      tooltip: function () {
        return this.$vuetify.theme.dark ? "Desactiver mode nuit" : "Activer mode nuit";
      }
  },
  methods: {
    switchMode: function () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem('darkmode', this.$vuetify.theme.dark)
    },
  },
  created: function () {
    let darktheme = localStorage.getItem('darkmode')
    if (darktheme == 'true') {
        this.$vuetify.theme.dark = true;
    }
  }
};
</script>