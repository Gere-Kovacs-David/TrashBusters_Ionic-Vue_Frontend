<template>
  <ion-page style="overflow: hidden;">
    
    <ion-content :fullscreen="true" style="background-color: #ffffff; " class="ion-padding">
      <EventFilterProba/>
      <!--<ion-grid style="margin-top: 55px;">
        <ion-row style="height: 670px; margin-top: 0;overflow: hidden;">
          
          <ion-col style="overflow: hidden; max-width: 350px; min-width: 350px; margin-top: 20px; height: 650px; border-radius: 20px; background-color:#ebe2d9;" class="mobile-col">
            <ion-card >
              <EventFilter/>
              <ion-button expand="block" @click="openModal" style="color: #ffffff;margin: 20px; margin-top: -90px"><ion-icon :icon="addOutline"></ion-icon>Új esemény létrehozása</ion-button>
            </ion-card>
          </ion-col>
          <ion-col style="margin-top: -40px; border-radius: 50px;">
            <EventFilterProba/>
            
          </ion-col>
        </ion-row>
        
      </ion-grid>-->
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonRow, IonButton } from '@ionic/vue';
import { addOutline } from 'ionicons/icons';
import EventFilterProba from "../components/EventFilterProba.vue";
//import EventFilter from "../components/EventFilter.vue";
import { modalController } from '@ionic/vue';

</script>

<style scoped>
ion-content {
  background-color: #ffffff; /* Change the background color */
}


</style>
