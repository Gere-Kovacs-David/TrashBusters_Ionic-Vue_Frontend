<template>
    <ion-page>
      
      <ion-content :fullscreen="true" >
        
        <ProfileProba/>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { IonPage, IonContent, IonRow } from '@ionic/vue';
  import ProfileProba from "@/components/ProfileProba.vue";
  
  
  </script>
  
  <style scoped>
  /* Target ion-col using class selector */
    ion-content {
    --ion-background-color: #ffffff; /* Change the background color */
    }

    /*ion-col{
        border: #ffffff solid 1px;
    }*/
    .desktop-card{
        margin-top: 75px;
    }

    @media (max-width: 765px) {
    .desktop-profile{
        display: none;
    }
    .mobile-card{
        margin-top: 50px;
    }
    
    }
    

  </style>