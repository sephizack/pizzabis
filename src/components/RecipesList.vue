<template>
  <v-container>
    <v-row class="mt-2 text-left">
      <v-text-field
        outlined
        label="Search for ingredients"
        prepend-inner-icon="search"
        v-model="curFreeSearch"
      ></v-text-field>
    </v-row>
    <v-row class="mt-0 text-left">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-chip
            v-for="category in categories"
            :key="category"
            class="ma-2"
            :color="filteredCategory == category ? 'green' : 'darkgrey'"
            outlined
            v-bind="attrs"
            v-on="on"
            @click="toogleCategory(category)"
          >
            {{ category }}
            <v-icon v-if="filteredCategory == category" color="lightgreen" right
              >filter_alt</v-icon
            >
            <v-icon v-else color="grey" right>filter_alt_off</v-icon>
          </v-chip>
        </template>
        <span>Cliquez pour filter</span>
      </v-tooltip>
    </v-row>
    <v-row class="text-center">
      <PizzaCard
        v-for="recipe in filteredRecipes"
        :key="recipe.name"
        :recipe-data="recipe"
        :cart="cart"
        @addToCart="addToCart($event)"
        @removeFromCart="removeRecipeFromCart($event)"
      />
    </v-row>
    <RecipesCart
      ref="recipesCart"
      :cart-data="cart"
      :recipes-data="recipesMap"
      @addRecipe="addToCart($event)"
      @removeRecipe="removeRecipeFromCart($event)"
      @emptyCart="emptyCart"
    />
  </v-container>
</template>

<script>
import PizzaCard from "./PizzaCard";
import RecipesCart from "./RecipesCart";
import recipesRawData from "../assets/recipes.json";

export default {
  name: "RecipesList",
  components: {
    PizzaCard,
    RecipesCart,
  },
  data: () => ({
    filteredCategory: "",
    curFreeSearch: "",
    recipesMap: [],
    recipes: [],
    categories: [],
    cart: {},
  }),
  computed: {
    filteredRecipes: function () {
      let rep = [];
      let search = this.curFreeSearch.toLowerCase();
      for (let recipe of this.recipes) {
        if (
          this.filteredCategory != "" &&
          recipe.path.indexOf(this.filteredCategory) == -1
        ) {
          continue;
        }
        if (this.curFreeSearch != "") {
          if (
            Object.keys(recipe.ingredients)
              .join(", ")
              .toLowerCase()
              .indexOf(search) == -1
          ) {
            continue;
          }
        }
        rep.push(recipe);
      }
      return rep;
    },
  },
  methods: {
    toogleCategory: function (category) {
      this.filteredCategory = this.filteredCategory == category ? "" : category;
    },
    addNewRecipe: function (curTypePath, recipeName, recipeData) {
      recipeData["name"] = recipeName;
      recipeData["path"] = curTypePath.join(" > ");
      this.recipes.push(recipeData);
      this.recipesMap[recipeName] = recipeData;
    },
    computeRecipeData: function (curTypePath, data) {
      for (let key in data) {
        let value = data[key];
        if (typeof value == "object") {
          if ("recipe" in value) {
            this.addNewRecipe(curTypePath, key, value);
          } else {
            this.categories.push(key);
            this.computeRecipeData(curTypePath.concat(key), value);
          }
        }
      }
    },
    addToCart: function (recipename) {
      if (!this.cart[recipename]) {
        this.$root.$set(this.cart, recipename, 1)
      } else {
        this.$root.$set(this.cart, recipename, this.cart[recipename]+1)
      }
        localStorage.setItem('cart', JSON.stringify(this.cart))
    },
    openCart: function () {
      this.$refs.recipesCart.open();
    },
    removeRecipeFromCart: function (recipeName) {
      console.log("removing", recipeName);
      if (!this.cart[recipeName]) {
        return;
      } else {
        this.$root.$set(this.cart, recipeName, this.cart[recipeName]-1)
      }
      if (this.cart[recipeName] == 0) {
        this.$root.$delete(this.cart, recipeName)
      }
    },
    emptyCart: function () {
        for (let recipe in this.cart) {
            this.$root.$delete(this.cart, recipe)
        }
    }
  },
  created: function () {
    this.computeRecipeData([], recipesRawData);
    try
    {
        let parsedStorage = JSON.parse(localStorage.getItem('cart'));
        if (parsedStorage) {
            this.cart = parsedStorage
        }
    } catch (e){console.log('bite');}
  },
};
</script>
