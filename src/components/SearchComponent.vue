<template>
    <div class="absolute-center">
      
      <ion-card square bordered class="ion-padding recovery-card" style="border-radius: 20px; margin-top: 35px; background-color:#186049; height: auto; overflow: hidden;">
        <ion-card-header style="display: flex; justify-content: center; align-items: center;">
            <ion-card-title class="title" style="color: white;" ><strong> Felhasználó keresése </strong></ion-card-title>
        </ion-card-header>
            
            <form @submit.prevent="searchUser">
                <ion-item style="border-radius: 5px 5px 5px 5px">
                    <ion-label position="floating">#Azonosító</ion-label>
                    <ion-input  type="text" v-model="searchInput" @ionInput="searchInput = $event.target.value;" clearInput></ion-input>
                </ion-item>

                <ion-button expand="block" type="submit"  style="min-width: 200px; margin-top: 15px;">Keresés</ion-button>
            </form>

    </ion-card>
    <ion-card v-if="foundUser" style="background-color: transparent; box-shadow: none;">
        <ion-card class="mobile-card desktop-card"
            style="margin-left: 0%; margin-right: 0%; border-radius: 30px 30px 30px 30px; background-color: #186049">
            <ion-grid>
                <ion-row>
                    <ion-col class="desktop-profile"></ion-col>
                    <ion-col style="max-width: 250px; display: flex; justify-content: center; align-items: center;">
                        <img alt="Silhouette of a person's head"
                            style=" margin:auto; border: solid #6ab29b ; border-radius: 50%; height: 200px; width: 200px; min-width: 200px;"
                            :src="foundUser?.profilePictureURL" onerror="this.onerror=null; this.src='https://ionicframework.com/docs/img/demos/avatar.svg'"/>
                    </ion-col>
                    <ion-col class="desktop-profile"></ion-col>
                </ion-row>
                <ion-row>
                    <ion-col class="desktop-profile"></ion-col>
                    <ion-col style="max-width: 250px; display: flex; justify-content: center; align-items: center;">
                        <iom-label
                            style="margin: auto; font-size: 20px; font-weight: bold; color: white;">{{foundUser?.username}}</iom-label>
                        <iom-label
                            style="margin: auto; font-size: 20px; font-weight: bold; color: white;">#{{ foundUser?.id }}</iom-label>
                    </ion-col>
                    <ion-col class="desktop-profile"></ion-col>
                </ion-row>
                
            </ion-grid>
        </ion-card>
    </ion-card>
    </div>
  </template>
  
  <script lang="ts">
  import axios, { AxiosRequestConfig, AxiosResponse} from 'axios';
  import { defineComponent } from "vue";

interface User {
  id: number;
  username: string;
  profilePictureURL: string;
  // Add other properties as needed
}

export default defineComponent({
  name: "UsersPage",

  data() {
    return {
      searchInput: "",
      foundUser: null as User | null,
    };
  },
  methods: {
    async searchUser() {
      try {
        const client = axios.create({
        baseURL: 'http://127.0.0.1:8000',
        });
        const config: AxiosRequestConfig = {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            
        };
        if (this.searchInput.startsWith("#")) {
          const cleanedInput = this.searchInput
            ? this.searchInput.substring(1)
            : this.searchInput;
          const response: AxiosResponse = await client.get<User>(`/api/users/${cleanedInput}`, config);
          this.foundUser = response.data;
        } else {
          alert("A megadott azonosító nem megfelelő formátumú!");
          this.searchInput = "";
        }
      } catch (error) {
        alert("Nincs felhasználó ilyen azonosítóval!");
        console.error("Error fetching user by id:", error);
        this.searchInput = "";
        this.foundUser = null;
      }
    },
  },
});
  </script>
  <style scoped>
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
    --background: #6ab29c; 
    color: #000;
    --border-radius: 5px;
    margin-top: 15px;
    margin-bottom: 0px;
  }
</style>
  