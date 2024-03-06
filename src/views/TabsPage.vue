<template>
  <ion-page>
    <ion-header>
      
      <ion-toolbar>
        <ion-grid>
          <ion-row>
            <ion-col class="side-col">
              <ion-buttons>
                <ion-button>
                  <ion-icon :icon="cogOutline"/>
                </ion-button>
              </ion-buttons>
            </ion-col>

            <ion-col></ion-col>
            

            <ion-col  size="0.9" class="desktop-header">
              <ion-buttons class="ion-horizontal-padding" >
                <ion-button href="/tabs/info">
                  <ion-icon :icon="bookOutline"/>
                </ion-button>
              </ion-buttons>
            </ion-col>
            <ion-col  size="0.9" class="desktop-header">
              <ion-buttons class="ion-horizontal-padding">
                <ion-button href="/tabs/events">
                  <ion-icon :icon="megaphoneOutline" size="1"/>
                </ion-button>
              </ion-buttons>
            </ion-col>
            <ion-col size="1" class="desktop-header">
              <ion-buttons class="ion-horizontal-padding">
                <ion-button href="/tabs/feed">
                  <ion-icon :icon="homeOutline"/>
                </ion-button>
              </ion-buttons>
            </ion-col>
            <ion-col  size="0.9" class="desktop-header">
              <ion-buttons class="ion-horizontal-padding">
                <ion-button href="/tabs/map">
                  <ion-icon :icon="mapOutline"/>
                </ion-button>
              </ion-buttons>
            </ion-col>
            <ion-col  size="0.9" class="desktop-header">
              <ion-buttons class="ion-horizontal-padding" >
                <ion-button href="/tabs/calendar">
                  <ion-icon :icon="calendarOutline"/>
                </ion-button>
              </ion-buttons>
            </ion-col>

            <ion-col></ion-col>
            
            <ion-col class="side-col">
              <ion-buttons>
                <ion-button>
                  <!--<ion-item>
                    <ion-avatar width="auto">
                      <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                    </ion-avatar>
                </ion-item>-->
                <ion-icon :icon="personOutline"/>
                </ion-button>
              </ion-buttons>
            </ion-col>
          </ion-row>
        </ion-grid>

        

      </ion-toolbar>
   
    </ion-header>


    <ion-tabs >
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom" class="mobile-tab-bar">
        <ion-tab-button tab="info" href="/tabs/info">
          <ion-icon :icon="bookOutline" />
          <ion-label>Info</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="events" href="/tabs/events">
          <ion-icon :icon="megaphoneOutline" />
          <ion-label>Események</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="feed" href="/tabs/feed">
          <ion-icon :icon="homeOutline" />
          <ion-label>Kezdőlap</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="map" href="/tabs/map">
          <ion-icon :icon="mapOutline" />
          <ion-label>Térkép</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="calendar" href="/tabs/calendar">
          <ion-icon :icon="calendarOutline" />
          <ion-label>Naptár</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { bookOutline, calendarOutline, homeOutline, mapOutline, megaphoneOutline, cogOutline, personOutline } from 'ionicons/icons';
import { ref } from 'vue';



</script>

<style>

ion-grid{
  border: 1px solid;
  ion-col{
    border: 1px solid;
  }

  
}

ion-tab-button{
font-size: 9px;
}



.ion-horizontal-padding{
  padding-right: 30%;
  padding-left: 30%;
}

.side-col{
  max-width: 50px;
}


@media (min-width: 765px) {
  .mobile-tab-bar{
    display: none;
  }
}

@media (max-width: 765px) {
  .desktop-header{
    display: none;
  }
}


</style>
