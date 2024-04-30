<template>
  
  <ion-menu content-id="main-content" >
    
    <ion-header class="mobile-header">
      <ion-grid style="background-color: #186049;" class="menu-header mobile-header">
      <ion-toolbar color="#186049" ><ion-title style="background-color: #186049;">Információk</ion-title></ion-toolbar>
      </ion-grid>
    </ion-header>
    <ion-content>
    <!--<ion-list style="background-color: white;">
        <ion-menu-toggle autoHide="false" color="#e4d5c7">
          <ion-item color="#e4d5c7" href="/tabs/calendar">
            <ion-icon slot="start" :icon="peopleOutline" color="#95877a"></ion-icon>
            <ion-label color="#95877a">
              Felhasználók
            </ion-label>
          </ion-item>
          <ion-item color="#e4d5c7" href="/tabs/feed">
            <ion-icon slot="start" :icon="trashBinOutline" color="#95877a"></ion-icon>
            <ion-label color="#95877a">
              Lerakók
            </ion-label>
          </ion-item>
         
      </ion-menu-toggle>
    </ion-list>-->
      
    </ion-content>
    
  </ion-menu>

  <ion-page id="main-content">
    <ion-header class="mobile-header">
      
      <ion-toolbar class="mobile-header">
        <ion-grid style="background-color: #186049;">
          <ion-row >
            <ion-col class="side-col">
              <ion-buttons>
                <ion-menu-toggle>
                  <ion-segment v-model="segment" v-if="useAuth.isLoggedIn.value = true" color="transparent">
                    <ion-segment-button value="info" style="margin-left: -25px;">
                      <ion-icon :icon="menuOutline" class="header-icon mobile-header-segment"/>
                      <!--<label style="font-size: 10px;">Info</label>-->
                    </ion-segment-button>
                  </ion-segment>
                </ion-menu-toggle>
                
              </ion-buttons>
            </ion-col>

            <ion-col></ion-col>
            <ion-col class="desktop-header">
              <ion-segment v-model="segment" v-if="useAuth.isLoggedIn.value = true" color="dark">
                <ion-segment-button value="info" @click="goTo('/tabs/info')">
                  <ion-icon :icon="bookOutline" class="header-icon"/>
                  <!--<label style="font-size: 10px;">Info</label>-->
                </ion-segment-button>
                <ion-segment-button value="events" @click="goTo('/tabs/events')">
                  <ion-icon :icon="megaphoneOutline" class="header-icon"/>
                  <!--<label style="font-size: 10px;">Események</label>-->
                </ion-segment-button>
                <ion-segment-button value="feed" @click="goTo('/tabs/feed')">
                  <ion-icon :icon="homeOutline" class="header-icon"/>
                  <!--<label style="font-size: 10px;">Főoldal</label>-->
                </ion-segment-button>
                <ion-segment-button value="map" @click="goTo('/tabs/map')">
                  <ion-icon :icon="mapOutline" class="header-icon"/>
                  <!--<label style="font-size: 10px;">Térkép</label>-->
                </ion-segment-button>
                <ion-segment-button value="calendar"  @click="goTo('/tabs/calendar')">
                  <ion-icon :icon="calendarOutline" class="header-icon "/>
                  <!--<label style="font-size: 10px;">Naptár</label>-->
                </ion-segment-button>
              </ion-segment>
            </ion-col>

            
           

            <ion-col ></ion-col>
            
            <ion-col class="side-col">
              <ion-buttons>
                <ion-segment v-model="segment" v-if="useAuth.isLoggedIn.value = true" color="transparent">
                    <ion-segment-button value="profile" @click="goTo('/tabs/profile')">
                      <ion-icon :icon="personOutline" class="header-icon mobile-header-segment"/>
                      <!--<label style="font-size: 10px;">Info</label>-->
                    </ion-segment-button>
                  </ion-segment>
              </ion-buttons>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-toolbar>
   
    </ion-header>

  


    <ion-tabs v-if="useAuth.isLoggedIn.value = true">
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom" class="mobile-tab-bar" style="background-color: #18604a;">
        <ion-tab-button tab="info" href="/tabs/info" >
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
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet} from '@ionic/vue';
import { bookOutline, calendarOutline, homeOutline, mapOutline, megaphoneOutline, personOutline, menuOutline} from 'ionicons/icons';
import { ref } from 'vue';
import  router  from '@/router';
import useAuth from "@/composables/useAuth";
import { defineComponent } from "vue";
import Cookies from "js-cookie";

const segment = ref<string>('feed');

const goTo = (path: string) => {
  router.push(path);
};

// This function can be used to switch between different segments
const switchSegment = (segmentValue: string) => {
  segment.value = segmentValue; // Update the segment value
};

const defa = defineComponent({
  setup() {
    return {
      useAuth,
      tab: null,
    };
  },
  methods: {
    logout() {
      useAuth.isLoggedIn.value = false;
      Cookies.remove("token", { path: "/" });
      Cookies.remove("user", { path: "/" });
      //this.user = null;
      this.$router.push("/landing");
    },
  },
  });
</script>

<style>

ion-grid{
  border: 1px solid transparent;
  ion-col{
    border: 1px solid transparent;
  }
}

ion-tab-button{
font-size: 9px;
background-color: #186049;
color: white;
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
  .mobile-header{
    max-height: 50px;
    
    
  }
  .mobile-header-segment{
      margin-top: -10px;
    }
}

.header-icon{
  color: white;
}

.menu-header{
  height: 80px;
}
ion-content {
    --ion-background-color: #ffffff;
}

ion-item {
    --ion-background:#ffffff ;
    --color: #95877a;



    --border-radius: 0px 20px 0px 20px;

    --ripple-color: #e4d5c7;

    --detail-icon-color: white;
    --detail-icon-opacity: 1;
    --detail-icon-font-size: 20px;
  }
</style>
