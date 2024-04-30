<template>
  <ion-page style="overflow: hidden;">
    
    <ion-content :fullscreen="true" style="background-color: #ffffff; " class="ion-padding">
      <EventFilterProba/>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonRow, IonButton } from '@ionic/vue';
import EventFilterProba from "../components/EventFilterProba.vue";


</script>

<style scoped>
ion-content {
  background-color: #ffffff; /* Change the background color */
}


</style>
