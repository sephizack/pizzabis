<template>
  <v-dialog v-model="isOpened" :width="dialogWidth">
    <v-card>
      <v-card-title>
        <span class="text-h4 mb-2 mt-1 mr-3">{{ recipeData.name }}</span>
        <v-rating
        v-if="recipeData.rating>0"
          class="mb-1"
          :value="recipeData.rating"
          color="amber"
          dense
          half-increments
          readonly
          size="24"
        ></v-rating>
        <v-spacer></v-spacer>
        <v-btn icon @click="isOpened = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-carousel
        v-if="isComplete"
        class="mb-5"
        hide-delimiter-background
        delimiter-icon="mdi-minus"
        ref="carousel"
        height="400"
        :show-arrows="recipeData.images && recipeData.images.length > 1"
      >
        <v-carousel-item
          v-for="img in recipeData.images"
          :key="img"
          :src="assetImage(img)"
          reverse-transition="scroll-x-reverse-transition"
          transition="scroll-x-transition"
          @click.stop="$refs.carousel.next()"
        ></v-carousel-item>
      </v-carousel>


      <div class='row' v-for="(stepPair,pairidx) of recipeStepsPairArray" :key="pairidx">
        <div class='column' v-for="(value) of stepPair" :key="value.title">
          <v-card-title v-if="isComplete" class="ml-4" padding="1">
            {{ value.title }}
          </v-card-title>
          <v-card-text v-if="value.type == 'ingredients'">
            <ul>{{
              value.content
            }}</ul>
          </v-card-text>
          <v-card-text v-else>
            <ul v-for="action of value.content" :key="value.title + action">
              {{
                action
              }}
            </ul>
          </v-card-text>
        </div>
      </div>

      <amp-ad width="100vw" height="320"
        type="adsense"
        data-ad-client="ca-pub-9091621516084639"
        data-ad-slot="3481553899"
        data-auto-format="rspv"
        data-full-width="">
        <div overflow=""></div>
      </amp-ad>
        
      <v-card-actions>
        <v-spacer></v-spacer>

        <!-- <v-btn color="green darken-1" text @click="isOpened = false">
          Fermer
        </v-btn> -->
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
export default {
  name: "PizzaReceipeDialog",

  components: {},
  props: ["recipeData", "width", "isComplete"],
  data: () => ({
    isOpened: false,
  }),
  computed: {
    dialogWidth: function () {
      return this.width ? this.width : "800px";
    },
    recipeStepsPairArray: function () {
      this.recipeData.recipe
      let ret = [];
      if (this.isComplete)
      {
        ret.push({
          type: "ingredients",
          content: Object.keys(this.recipeData.ingredients).join(", "),
          title: "Ingredients",
        });
      }
      for (let step in this.recipeData.recipe) {
        ret.push({
          type: "step",
          content: this.recipeData.recipe[step],
          title: step,
        });
      }
      
      // Make it a array of pairs
      let retPairByPair = [];
      for (let i = 0; i < ret.length; i += 2) {
        retPairByPair.push(ret.slice(i, i + 2));
      }
      return retPairByPair;
    }
  },
  methods: {
    assetImage: function (imgPath) {
      return "./images/" + imgPath;
    },
    open: function () {
      this.isOpened = true;
    },
  },
};
</script>
