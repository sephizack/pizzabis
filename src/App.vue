<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Pizza Logo"
          class="shrink mr-2"
          contain
          src="@/assets/logo.svg"
          transition="scale-transition"
          width="40"
        />

        <h2 class="">Gli Amici</h2>
      </div>

      <v-spacer></v-spacer>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
            
          <v-btn
            class="ma-1"
            small
            fab
            @click="$refs.main.openCart()"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-cart</v-icon>
          </v-btn>
        </template>
        <span>Ouvrir mon panier</span>
      </v-tooltip>
      <SwitchDarkMode />
    </v-app-bar>

    <v-main>
      <RecipesList ref="main" />
    </v-main>
    <ins class="adsbygoogle"
            style="display:block"
            data-ad-client="ca-pub-9091621516084639"
            data-ad-slot="3481553899"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
  </v-app>
</template>

<script>
import RecipesList from "./components/RecipesList";
import SwitchDarkMode from "./components/SwitchDarkMode";

export default {
  name: "App",

  components: {
    RecipesList,
    SwitchDarkMode,
  },

  data: () => ({}),
  created: function () {
      if (location.hostname.indexOf('onrender.com') !== -1) {
          location.href = 'https://www.gliamici.fr'
      }
  }
};
</script>