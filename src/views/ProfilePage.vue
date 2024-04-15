<template>
    <ion-page>
      
      <ion-content :fullscreen="true" >
        <ion-card class="mobile-card desktop-card" style="margin-left: 0%; margin-right: 0%; border-radius: 0px 0px 30px 30px; background-color: #186049" >
            <ion-grid>
            <ion-row>
                <ion-col class="desktop-profile"></ion-col>
                <ion-col style="max-width: 250px">
                
                    <img alt="Silhouette of a person's head" style=" margin:auto; border: solid #6ab29b ; border-radius: 50%; height: 250px; width: 250px" src="https://trashbusters.s3.eu-central-1.amazonaws.com/profile-pictures/1711479008_Képernyőkép 2024-02-09 101524.png" />
                <!--<ion-avatar >
                </ion-avatar>-->
                </ion-col >
                <ion-col class="desktop-profile"></ion-col>
                </ion-row>
                <ion-row>
                <ion-col class="desktop-profile"></ion-col>
                <ion-col style="max-width: 200px; padding-left: 50px;">
                <iom-label style="margin: auto; font-size: 20px; font-weight: bold; color: white;">Csokker01</iom-label>
                <!--<ion-avatar >
                </ion-avatar>-->
                </ion-col >
                <ion-col class="desktop-profile"></ion-col>
                </ion-row>
            </ion-grid>
        </ion-card>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { IonPage, IonContent, IonRow } from '@ionic/vue';
  
  
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