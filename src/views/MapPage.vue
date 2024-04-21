<template>
    <ion-page>
      
      <ion-content :fullscreen="true">
        <ion-card style=" width: 90%; height: 80%; margin: auto; margin-top: 85px">
          <ion-grid style="margin: auto; border: 1px black solid; width: 100%; height: 100%;" >
            <ion-row>
              <ion-col>
                <iframe
                  width=100%
                  height=300%
                  frameborder="0" style="border:0"
                  src="https://www.google.com/maps/embed/v1/place?q=place_id&key=AIzaSyDp0Aa2C_3ujfr0RlclP52t7jxhqcCZhes" allowfullscreen>
                </iframe>
              </ion-col>
              </ion-row>
          </ion-grid>
        </ion-card>
      <!--<PasswordRecoveryPage/>-->
      
              

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