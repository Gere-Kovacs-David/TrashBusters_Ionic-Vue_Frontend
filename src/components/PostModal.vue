<!-- ModalComponent.vue -->
<template>
  <ion-modal ref="modal" trigger="open-modal" @willDismiss="onWillDismiss">
    <ion-header>
      <ion-toolbar>
        <ion-title>Modal</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-grid>
      <ion-row style="height: 2em;"></ion-row>
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

              <IonIcon :icon="ellipsisVertical" slot="end"></IonIcon>
            </ion-item>
          <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" class="cropped-image"/>
          <ion-card-content>
            <ion-row>
              <ion-label><b>Leírás:</b></ion-label>
              <ion-label>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</ion-label>
            </ion-row>
          </ion-card-content>
        </ion-card>
        </ion-col>
        <!--<ion-col size="1"></ion-col>-->
      </ion-row>
      <ion-toolbar>
        <ion-row style="height: 90px;">
          
            <ion-col ><IonButton style="margin-left: 30%; margin-right: 25%;" >Mégse</IonButton></ion-col>
            <ion-col ><IonButton style="margin-left: 25%; margin-right: 30%;" >Jóváhagy</IonButton></ion-col>
          
        </ion-row>
      </ion-toolbar>
  </ion-grid>
  </ion-modal>
</template>

<script lang="ts" setup>
  import {
    IonModal,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonItem,
    IonInput
  } from '@ionic/vue';
  import { camera, trash, close, radioButtonOffOutline, addOutline, ellipsisVertical } from 'ionicons/icons';
  import { OverlayEventDetail } from '@ionic/core/components';
  import { ref } from 'vue';

  const modal = ref();
  const input = ref();

  const cancel = () => modal.value.$el.dismiss(null, 'cancel');

  const confirm = () => {
    const name = input.value.$el.value;
    modal.value.$el.dismiss(name, 'confirm');
  };

  const onWillDismiss = (ev: CustomEvent<OverlayEventDetail>) => {
    // Handle onWillDismiss logic if needed
  };
</script>

<style>

ion-col{
  border: 1px solid;
}

.cropped-image {
  width: auto;
  height: auto; 
  object-fit: cover;
}



</style>