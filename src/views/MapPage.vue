<template>
    <ion-page>
      
      <ion-content :fullscreen="true">

      <PasswordRecoveryPage/>
              

      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { IonPage, IonContent } from '@ionic/vue';
  import PasswordRecoveryPage from "@/components/RecoveryComponent.vue";
 

  
  const MyComponent = {
  data() {
    return {
      component: PasswordRecoveryPage
    };
  }
};

  </script>
  
  <style scoped>
  ion-content {
    --ion-background-color: #ffffff; /* Change the background color */
  }

  ion-grid{
    border: 5px white solid;
    border-radius: 15px;
    height: 707px;
    width: 750px;
    padding: 0px;
  }
  ion-button{
    --background: #186049; 
    --border-radius: 5px;
    margin-top: 10px;
    margin-bottom: 0px;
  }
  </style>