<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title></ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" style="background-color: #ffffff;" class="ion-padding">
      <ion-grid>
        <ion-row>
          <ion-col style="height: 600px;">
            <EventFilterProba/>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-button expand="block" @click="openModal" style="color: #ffffff;"><ion-icon :icon="addOutline"></ion-icon>Új esemény létrehozása</ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonContent, IonRow, IonButton, IonTitle } from '@ionic/vue';
import { addOutline } from 'ionicons/icons';
import CreateEvent from '@/components/CreateEvent.vue';
import EventFilterProba from "../components/EventFilterProba.vue";

import { modalController } from '@ionic/vue';

const openModal = async () => {
  const modal = await modalController.create({
    component: CreateEvent,
  });
  return await modal.present();
};
</script>

<style scoped>
ion-content {
  --ion-background-color: #ffffff; /* Change the background color */
}
/* Target ion-col using class selector */
.custom-col {
  background-color: #e0e0e0;
  padding: 10px;
}

/* Target ion-col directly */
ion-col {
  border: 1px solid #ccc;
  margin: 5px;
}

/* Another example with a different class selector */
.another-custom-col {
  background-color: #f0f0f0;
  padding: 15px;
}

ion-modal{
  --overflow: hidden;
}
</style>
