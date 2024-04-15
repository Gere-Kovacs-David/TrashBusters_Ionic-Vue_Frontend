<template>
    <ion-page style="overflow: hidden;">
      <!--<ion-content class="ion-padding" style="overflow-y: hidden; height: 650px;">
        <ion-card class="search-card" style="margin: auto; border: white; box-shadow: none;">
          <ion-card-header >
                <ion-card-title class="title" style="border: 1px solid white; margin: auto; margin-bottom: 15px; text-align: center;">Események szűrése</ion-card-title>
          </ion-card-header>
          <ion-card-content style="margin: -15px;">
            <form @submit.prevent="searchData">
              <ion-item>
                <ion-label position="floating">Esemény neve</ion-label>
                
            </ion-item>
            <ion-item>
              <ion-label position="floating">Város</ion-label>
              <ion-input v-model="searchCity" @ionInput="searchCity = $event.target.value;" clearInput></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Utca, tér</ion-label>
              <ion-input v-model="searchAddress" @ionInput="searchAddress = $event.target.value;" clearInput></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Min. résztvevők</ion-label>
              <ion-input v-model.number="model" @ionInput="model = $event.target.value;" type="number"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Dátum</ion-label>
              <ion-input v-model="date" @ionInput="date = $event.target.value;" type="date" ></ion-input>
            </ion-item>

          <div>
            <ion-button expand="fill" @click="filterReset" color="danger" >Törlés</ion-button>
            <ion-button expand="fill" type="submit" class="kuldes">Keresés</ion-button>
            </div>
          </form>
          </ion-card-content>
        </ion-card>

      </ion-content>-->
      
    </ion-page>
  </template>
  
  <script lang="ts">
import { defineComponent } from 'vue';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';


export interface EventData {
  id: string;
  title: string;
  location: string;
  participants: number;
  date: string;
  eventPictureURL: string;
  description: string;
  place: string;
  time: string;
}

const client = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

 /*export default defineComponent({
  name: 'EventFilter',
  data() {
    return {
      searchTitle: '',
      searchCity: '',
      searchAddress: '',
      model: 0,
      date: '',
      filteredData: [],
    };
  },
  methods: {
   async searchData() {
      const config: AxiosRequestConfig = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      };

      try {
        const response: AxiosResponse<EventData[]> = await client.get('/api/events', {
          params: {
            title: this.searchTitle,
            location: this.searchCity,
            place: this.searchAddress,
            participants: this.model.toString(),
            date: this.date || "",
          },
          ...config,
        });

        this.filteredData = response.data.filter((item: EventData) => {
          const lowerSearch = this.searchTitle.toLowerCase();
          const lowerCity = this.searchCity.toLowerCase();
          const lowerPlace = this.searchAddress.toLowerCase();

          return (
            item.title.toLowerCase().includes(lowerSearch) &&
            item.location.toLowerCase().includes(lowerCity) &&
            item.place.toLowerCase().includes(lowerPlace) &&
            item.participants >= parseInt(this.model.toString()) &&
            (this.date ? item.date.includes(this.date) : true)
          );
        });

        // Reset input fields
        this.searchTitle = "";
        this.searchCity = "";
        this.searchAddress = "";
        this.model = 0;
        this.date = "";
      } catch (error) {
        console.error("Error during search:", error);
      }
    },
  },
});*/
</script>

  
  <style scoped>
  ion-content {
    --ion-background-color: #ffffff; /* Change the background color */
  }
  ion-card{
    border: black 1px solid;
    background-color: #ffffff;
    margin-right: 40%;
    margin-left:10%;
  }
  ion-card-content{
    border: transparent 1px solid;
    background-color: #ffffff;
    
    
  }
  ion-grid{
    margin-right: 10%;
    margin-left: 8%;
    border: transparent 1px solid;
    width: 50%;
    
    ion-col{
        border: transparent 1px solid;
        
        ion-input{
            border: transparent 1px solid;
            max-width: 100px;
        }
    }
   
  }
  
  .search-input{
    background-color:  #e4d5c7;
    
  }

  .search-button {
    --background: #18604a;
    --color: white;
    --border-radius: 10px;
    --border-color: #247158;
    --border-style: solid;
    --border-width: 1px;
    --ripple-color: #6ab29c;
    --padding-top: 10px;
    --padding-bottom: 10px;
  }
  .delete-filter-button {
    --background: #e4d5c7;
    --color: #95877a;
    --border-radius: 10px;
    --border-color: #e4d5c7;
    --border-style: solid;
    --border-width: 1px;
    --ripple-color: #6ab29c;
    --padding-top: 10px;
    --padding-bottom: 10px;
  }

  .recovery-card{
    margin: auto;
    margin-top: 70px;
    max-width: 500px;
  }
  ion-card{
    background-color: white;
  }
  
    
      
  ion-input{
    --background: transparent;
    --color: #95877a;
    --placeholder-color: #e5d5c6;
  
    
    --padding-bottom: 10px;
    --padding-end: 10px;
    --padding-start: 10px;
    --padding-top: 10px;
      }

    ion-item {
    margin-top: 7px;
    margin-bottom: 15px;
    --background: #e5d5c6;
    --color: #95877a;

    --border-radius: 5px;

    --ripple-color: #37865b;

    --detail-icon-color: white;
    --detail-icon-opacity: 1;
    --detail-icon-font-size: 20px;
  }

  ion-button{
    --background: #186049; 
    --border-radius: 5px;
    margin-top: 15px;
    margin-bottom: 0px;
  }

  .title{
    color: #186049; 
    margin-left: 25%; 
    margin-bottom: 10px; 
    margin-top: 10px; 
    font-size: 22px; 
    font-weight: bold;
  }

  @media (max-width: 765px) {
    .title{
     margin-left: 5%;
    }
}

.megse{
    --background: #95877a; 
    --color: #ffffff;
  }
  .kuldes{
    --color: #ffffff;
    float: right;
  }
  </style>
 