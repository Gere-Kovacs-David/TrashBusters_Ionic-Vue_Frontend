<template>
    <ion-page>
      
      <ion-grid>
        
        <ion-row>
          <ion-col size="auto"></ion-col>
          <ion-col>
            <ion-datetime color="rose" max-width="300"></ion-datetime>
          </ion-col>
          <ion-col size="auto"></ion-col>
        </ion-row>
      </ion-grid>
      
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonDatetime  } from '@ionic/vue';
  
  </script>
  
  <style>
  :root {
    --ion-color-rose: green;
    --ion-color-rose-rgb: 255, 255, 255;
    --ion-color-rose-contrast: #ffffff;
    --ion-color-rose-contrast-rgb: 255, 255, 255;
    --ion-color-rose-shade: #34951e;
    --ion-color-rose-tint: #2a9515;

    --ion-text-color: #881337;
    --ion-text-color-rgb: 136, 19, 55;

    
  }

  .ion-color-rose {
    --ion-color-base: var(--ion-color-rose);
    --ion-color-base-rgb: var(--ion-color-rose-rgb);
    --ion-color-contrast: var(--ion-color-rose-contrast);
    --ion-color-contrast-rgb: var(--ion-color-rose-contrast-rgb);
    --ion-color-shade: var(--ion-color-rose-shade);
    --ion-color-tint: var(--ion-color-rose-tint);
  }

  ion-datetime {
    --background: black;
    --background-rgb: 255, 241, 242;

    border-radius: 16px;
    box-shadow: rgba(var(--ion-color-rose-rgb), 0.3) 0px 10px 15px -3px;
    margin-top: 15px;
  }

  

</style>