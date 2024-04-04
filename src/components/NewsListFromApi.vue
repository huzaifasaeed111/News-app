<template>
  <div class="container-fluid mt-3">
    <div class="row">
      <div class="col-lg-3 col-md-6 col-sm-12" v-for="(headline, index) in headlines.articles" :key="index">
        <b-card
          :title="headline.title"
          :img-src="headline.urlToImage ? headline.urlToImage : altImg"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem"
          class="mb-2"
        >
          <b-card-text>
            {{ headline.description }}
          </b-card-text>
          
          <div class="text-center">
            <b-button :href="headline.url" variant="secondary">Read more</b-button>
          </div>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import newsService from '../newsService'
import alternateImg from '../assets/alt-image.jpg';
import {bus} from '../main';
  export default{
     data(){
      return{
        headlines: [],
        error: null,
        altImg: alternateImg
      }
     },
     created(){
      this.fetchHeadlines();
      console.log("______________")
     },
     methods:{
    async fetchHeadlines(){
      try {
        this.error = null;
        this.headlines = await newsService.fetchTopHeadlines();
      } catch(error) {
        this.error = "Failed to fetch headlines";
        this.headlines = null; 
        console.error("Error fetching headlines:", error);
      }
    }
  }
  }
</script>

<style scoped>
  .card-title {
    font-size: 16px;
  }
  .card-img-top {
    height: 138px;
  }
  .card-text {
    font-size: 12px;
  }
</style>