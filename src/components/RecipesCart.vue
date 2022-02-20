<template>
  <v-dialog v-model="isOpened" width="800px">
    <v-card class="mt-3">
      <v-card-title class="mt-4 ml-3">Panier actuel</v-card-title>

      <v-list
        flat
        style="padding-left: 30px; padding-right: 30px"
        :key="recipelistid"
        dense
      >
        <v-subheader>Recettes sélectionnées ({{totalRecipes}})</v-subheader>
        <v-list-item-group color="primary">
          <v-list-item
            v-for="(quantity, recipename) in cartData"
            :key="recipename"
            @click.stop="displayRecipeInfo(recipename)"
          >
            <v-list-item-content>
              <v-list-item-title
                >{{ quantity }} {{ recipename }}</v-list-item-title
              >
            </v-list-item-content>

            <v-list-item-icon class="">
              <v-icon color="primary" dense @click.stop="displayRecipeInfo(recipename)">info</v-icon>
            </v-list-item-icon>

            <v-list-item-icon class="ml-1 mr-0">
              <v-icon color="secondary" dense @click.stop="$emit('addRecipe', recipename)"
                >add_circle_outline</v-icon
              >
            </v-list-item-icon>

            <v-list-item-icon class="ml-1">
              <v-icon color="secondary" dense @click.stop="$emit('removeRecipe', recipename)"
                >remove_circle_outline</v-icon
              >
            </v-list-item-icon>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <v-list
        flat
        style="padding-left: 30px; padding-right: 30px"
        :key="ingredientlistid"
        dense
      >
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
        width="600px"
        :is-complete="false"
      />

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="$emit('emptyCart')">
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
    listid: 0,
    ingredientlistid: 0,
    curRecipeData: {},
  }),
  computed: {
    totalRecipes: function () {
        let ret = 0;
        for (let recipe in this.cartData){
            ret += this.cartData[recipe]
        }
        return ret
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