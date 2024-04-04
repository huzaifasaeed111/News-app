<template>
  <div class="container">
    <h2 class="text-center my-2">List of Latest News</h2>
    <div v-if="!items.length && !resp" class="mt-4">
      <h4 class="text-danger text-center">No News Available</h4>
    </div>
    <b-table hover :items="transformedData" v-else-if="hideApiContent">
    </b-table>
    <div class="container-fluid" v-else>
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
  </div>
</template>

<script>
import { bus } from '../main';
import newsService from '../newsService'
import alternateImg from '../assets/alt-image.jpg';
export default {
  data() {
    return {
      altImg: alternateImg,
      items: [],
      keys: ["name", "description", "category"],
      headlines: [],
      error: null, 
      resp: false,
      hideApiContent: false
    };
  },
  created() {
    bus.$on('formDataSaved', (items) => {
      this.items = items;
    });
    bus.$on('clearList', () => {
      this.items = [];
    });
    bus.$on('ShowNewsApi', (dataApi) => {
      console.log('Show response Api', dataApi);
      this.resp = dataApi;
      this.fetchHeadlines();
      localStorage.clear();
    });
     bus.$on('HideApiData', (data) => {
      console.log(data);
       this.hideApiContent = data;
     }); 
  },
  beforeDestroy(){
     bus.$off('formDataSaved');
     bus.$off('clearList');
     bus.$off('ShowNews');
     bus.$off('HideApiData')
  },
  computed: {
    transformedData() {
      return this.items.map(innerArray => {
        const obj = {};
        innerArray.forEach((value, index) => {
          obj[this.keys[index]] = value;
        });
        return obj;
      });
    }
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
};
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
