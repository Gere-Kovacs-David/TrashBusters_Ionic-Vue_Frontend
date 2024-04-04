<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title></ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-grid >
        <ion-row>
          <ion-col ></ion-col>
          <ion-col >
            <ion-button expand="block" @click="openModal">Bejegyzés létrehozása</ion-button>
            <!--<p>{{ message }}</p>-->
          </ion-col>
          <ion-col ></ion-col>
          
      </ion-row>
      
    </ion-grid>
    
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import { IonButton, IonContent, IonPage, IonHeader, IonToolbar, IonTitle, modalController } from '@ionic/vue';
  import Modal from '@/components/PostModal.vue';

  export default {
    components: { IonButton, IonContent, IonPage, IonHeader, IonToolbar, IonTitle },
    data() { // Specify the return type of the data function
      return {
        message: '' as string, // Explicitly declare the message property
      };
    },
    methods: {
      async openModal() {
        const modal = await modalController.create({
          component: Modal,
        });
        modal.present();

        const { data, role } = await modal.onWillDismiss();

        if (role === 'confirm') {
          //this.message = `Hello, ${data}!`;
        }
      },
    },
  };
</script>
<style>
ion-content {
    --ion-background-color: #ffffff; /* Change the background color */
}
.ion-padding{
  background-color: #ffffff;
}
</style>