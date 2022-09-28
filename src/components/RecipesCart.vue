<template>
  <v-dialog v-model="isOpened" width="800px">
    <v-card class="mt-3">
      <v-card-title class="mt-4 ml-3">
        Panier actuel
        <v-spacer></v-spacer>
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <a v-if="!isCartEmpty" download="panier-gli-amici.txt" :href=panierDownloadableData v-bind="attrs" v-on="on" style="text-decoration:none;">
                    <v-btn color="primary darken-1" outlined icon style="margin-right:10px" title="Exporter le panier">
                        <v-icon dark>download</v-icon>
                    </v-btn>
                </a>
            </template>
            <span>Exporter le panier</span>
        </v-tooltip>
        <v-btn icon @click="isOpened = false">
          <v-icon>mdi-close</v-icon>
        </v-btn></v-card-title
      >
      <span v-if="isCartEmpty">
        <v-card-text class="text-center"> Votre panier est vide </v-card-text>
      </span>
      <span v-else>
        <v-list flat style="padding-left: 30px; padding-right: 30px" dense>
          <v-subheader>Recettes sélectionnées ({{ totalRecipes }})</v-subheader>
          <v-list-item-group color="primary">
            <v-list-item
              v-for="(quantity, recipename) in cartData"
              :key="recipename"
              @click.stop="displayRecipeInfo(recipename)"
            >
              <v-list-item-icon class="ml-0 mr-1">
                <v-icon
                  color=""
                  dense
                  @click.stop="displayRecipeInfo(recipename)"
                  >wysiwyg</v-icon
                >
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title
                  >{{ quantity }} {{ recipename }}</v-list-item-title
                >
              </v-list-item-content>

              <v-list-item-icon class="ml-1 mr-0">
                <v-icon
                  color="secondary"
                  dense
                  @click.stop="$emit('addRecipe', recipename)"
                  >add_circle_outline</v-icon
                >
              </v-list-item-icon>

              <v-list-item-icon class="ml-1">
                <v-icon
                  color="secondary"
                  dense
                  @click.stop="$emit('removeRecipe', recipename)"
                  >remove_circle_outline</v-icon
                >
              </v-list-item-icon>
            </v-list-item>
          </v-list-item-group>
        </v-list>

        <v-list flat style="padding-left: 30px; padding-right: 30px" dense>
          <v-subheader>Total des ingrédients nécesssaires</v-subheader>
          <v-list-item-group color="primary">
            <v-list-item
              v-for="ingredient in totalIngredients"
              :key="ingredient.name"
            >
              <v-list-item-content>
                <v-list-item-title
                  ><span v-if="ingredient.q > 0">{{ ingredient.q }} </span
                  >{{ ingredient.name }}</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>

        <PizzaReceipeDialog
          ref="receipeDialoag"
          :recipe-data="curRecipeData"
          width="700px"
          :is-complete="true"
        />
      </span>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          v-if="!isCartEmpty"
          color="green darken-1"
          text
          @click="$emit('emptyCart')"
        >
          Vider le panier
        </v-btn>
        <v-btn color="green darken-1" text @click="isOpened = false">
          Fermer
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import PizzaReceipeDialog from "./PizzaReceipeDialog";

export default {
  name: "RecipesCart",

  components: { PizzaReceipeDialog },
  props: ["cartData", "recipesData"],
  data: () => ({
    isOpened: false,
    curRecipeData: {},
  }),
  computed: {
    isCartEmpty: function () {
      return !this.cartData || Object.keys(this.cartData).length == 0;
    },
    totalRecipes: function () {
      let ret = 0;
      for (let recipe in this.cartData) {
        ret += this.cartData[recipe];
      }
      return ret;
    },
    totalIngredients: function () {
      let totalIngredientsMap = {};
      for (let recipe in this.cartData) {
        let rData = this.recipesData[recipe];
        let recipeQuantity = this.cartData[recipe];
        if (!rData) {
          continue;
        }
        for (let ingredient in rData.ingredients) {
          let ingredientQuantity = rData.ingredients[ingredient];
          if (!totalIngredientsMap[ingredient]) {
            totalIngredientsMap[ingredient] = 0;
          }
          totalIngredientsMap[ingredient] +=
            ingredientQuantity * recipeQuantity;
        }
      }
      let totalIngredientsList = Object.keys(totalIngredientsMap).map(function (
        key
      ) {
        return { name: key, q: totalIngredientsMap[key] };
      });
      console.log(totalIngredientsList);
      totalIngredientsList.sort(function (first, second) {
        return second.q - first.q;
      });
      return totalIngredientsList;
    },
    panierDownloadableData: function () {
        let data = "Recettes:\n"
        for (let receipe of Object.keys(this.cartData))
        {
            data += ` - ${receipe}: ${this.cartData[receipe]}\n`
        }
        data += `\nTotal des ingredients\n`
        for (let ingredient of this.totalIngredients)
        {
            data += ` - ${ingredient.name}: ${ingredient.q}\n`
        }
        return 'data:text/plain;charset=utf-8,' + encodeURIComponent(data)
    }
  },
  methods: {
    displayRecipeInfo: function (recipename) {
      this.curRecipeData = this.recipesData[recipename];
      this.$refs.receipeDialoag.open();
    },
    open: function () {
      this.isOpened = true;
    }
  },
};
</script>