<template > 
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="end">
        <ion-button color="medium" @click="cancel">Cancel</ion-button>
      </ion-buttons>
      <ion-title>Bejegyzés létrehozása</ion-title>
      
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding" style="background-color: #ffffff;">
    <ion-grid>
      <ion-row>
      <ion-col>
        <ion-button expand="block" @click="confirm" :strong="true">Fotó hozzáadása</ion-button>
      </ion-col>
      </ion-row>
      <ion-row>
        <!--<ion-col size="1"></ion-col>-->
        <ion-col >
        <ion-card>
            <ion-item>
              <ion-avatar slot="start">
                <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
              </ion-avatar>
                      
              <ion-label slot="start">
                <h3>John Doe</h3>
                <p>Dec 10, 2019</p>
              </ion-label>
            </ion-item>
          <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" class="cropped-image"/>
          <ion-card-content>
            <ion-item>
              <ion-label position="stacked">Leírás:</ion-label>
              <ion-input v-model="name" placeholder=""></ion-input>
            </ion-item>
          </ion-card-content>
        </ion-card>
        </ion-col>
        
      </ion-row>
      <ion-row>
      <ion-col>
        <ion-button expand="block" @click="confirm" :strong="true">Közzététel</ion-button>
      </ion-col>
      </ion-row>
      </ion-grid>
      
        
      
  </ion-content>
</template>

<script lang="ts">
  import {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    modalController,
  } from '@ionic/vue';
  import { ellipsisVertical } from 'ionicons/icons';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'PostModal',
    components: { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonItem, IonLabel, IonInput },
    data() {
      return {
        name: '', // Declare the 'name' property
      };
    },
    methods: {
      async cancel() {
        return modalController.dismiss(null, 'cancel');
      },
      async confirm() {
        await modalController.dismiss(this.name, 'confirm');
        return true; // Add an explicit return type annotation
      },
    },
  });
</script>
