<template>
  <v-card class="mx-auto my-5" max-width="374">
    <v-carousel
      hide-delimiter-background
      delimiter-icon="mdi-minus"
      height="200"
      :show-arrows="recipeData.images.length > 1"
    >
      <v-carousel-item
        v-for="img in recipeData.images"
        :key="img"
        :src="assetImage(img)"
        reverse-transition="fade-transition"
        transition="fade-transition"
        @click="$refs.receipeDialoag.open()"
      ></v-carousel-item>
    </v-carousel>

    <v-card-title padding="3">
      <v-row class="mx-0 mt-0">
        <div>{{ recipeData.name }}</div>
        <v-rating
          class="ml-3"
          :value="recipeData.rating"
          color="amber"
          dense
          half-increments
          readonly
          size="16"
        ></v-rating>
      </v-row>
    </v-card-title>

    <v-card-text align="left" style="min-height:60px;">{{
      Object.keys(recipeData.ingredients).join(", ")
    }}</v-card-text>

    <v-spacer></v-spacer>

    <v-divider class="mx-4"></v-divider>
    <v-card-actions>
      <v-btn
        color="deep-purple lighten-2"
        text
        @click="$refs.receipeDialoag.open()"
      >
        Details
      </v-btn>
      <v-spacer></v-spacer>
      <div class="mr-4">{{ quantityInCart }}</div>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            title="Ajouter au panier"
            icon
            @click="$emit('addToCart', recipeData.name)"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>Ajouter au panier</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            title="Retirer du panier"
            icon
            @click="$emit('removeFromCart', recipeData.name)"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-minus</v-icon>
          </v-btn>
        </template>
        <span>Ajouter au panier</span>
      </v-tooltip>
    </v-card-actions>

    <PizzaReceipeDialog ref="receipeDialoag" :recipe-data="recipeData" :is-complete="true"/>
  </v-card>
</template>

<script>
import PizzaReceipeDialog from "./PizzaReceipeDialog";

export default {
  name: "PizzaCard",

  components: {
    PizzaReceipeDialog,
  },

  props: ["recipeData", "cart"],
  data: () => ({}),
  computed: {
    quantityInCart: function () {
      if (!this.cart || !this.cart[this.recipeData.name]) {
          return ''
      }
      return this.cart[this.recipeData.name];
    },
  },
  methods: {
    assetImage: function (imgPath) {
      return "./images/" + imgPath;
    },
    addToCart: function () {
      //alert(receipes)
    },
  },
};
</script>