<template>
    <ion-page>
      
      <ion-content :fullscreen="true">
        
        <ion-grid style="margin-top: 75px;">
          
          <ion-row>
            <ion-col></ion-col>
            <ion-col>
              <SearchComponent/>
            </ion-col>
            <ion-col></ion-col>
            
      </ion-row>
      </ion-grid>
      </ion-content>
    </ion-page>
  </template>
  
 <script setup lang="ts">
  import { IonPage, IonContent, IonRow } from '@ionic/vue';
  import SearchComponent from "../components/SearchComponent.vue";
  
  </script>
  
  <style scoped>
  /* Target ion-col using class selector */
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
  