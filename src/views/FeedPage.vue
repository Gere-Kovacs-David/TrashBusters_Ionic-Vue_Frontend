<template>
  <ion-page>
    
    <ion-content class="ion-padding" >
      <ion-grid style="margin-top: 50px;">
        <ion-row>
          <ion-col ></ion-col>
          <ion-col >
            
      
          </ion-col>
          <ion-col ></ion-col>
          
      </ion-row>
      
    </ion-grid>
    
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import { IonButton, IonContent, IonPage, modalController } from '@ionic/vue';
  import { defineComponent } from "vue";
  import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
  import Cookies from "js-cookie";

  const client = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  });

  export interface EventData {
  id: string;
  title: string;
  location: string;
  participants: number;
  date: string;
  eventPictureURL: string;
  description: string;
  place: string;
  time: string;
  dumpId: string;
}

export interface MostParticipantsEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  place: string;
  participants: number;
  creatorId: number;
  dumpId?: string | null;
  eventPictureURL: string;
}

export default defineComponent({
name: "FeedPage",

data() {
return {
mostParticipantsEvent: [] as MostParticipantsEvent[],
latestEvent: [] as Event[],
closestEvent: [] as Event[],
cards: [
{
category: "",
title: "",
description: "",
location: "",
place: "",
participants: "",
date: "",
time: "",
creatorName: "",
dumpName: "",
},
{
title: "",
description: "",
location: "",
place: "",
participants: "",
date: "",
time: "",
creatorName: "",
dumpName: "",
},
{
category: "",
title: "",
description: "",
location: "",
place: "",
participants: "",
date: "",
time: "",
creatorName: "",
dumpName: "",
},
],
loading: true,
user: null,
};
},
/*mounted() {
this.fetchEventData();
const storedUser = Cookies.get("user");
this.user = storedUser ? JSON.parse(storedUser) : null;
},
methods: {
async getEventWithMostParticipants() {
try {
const response = await client.get("/api/event/most-participants");
if (response.data && response.data.length > 0) {
this.mostParticipantsEvent = response.data[0];

this.cards[0].category = "Legnépszerűbb";
this.cards[0].title = this.mostParticipantsEvent.title || "";
this.cards[0].description = this.mostParticipantsEvent.description || "";
this.cards[0].location = this.mostParticipantsEvent.location || "";
this.cards[0].place = this.mostParticipantsEvent.place || "";
this.cards[0].participants = this.mostParticipantsEvent.participants.toString() || "";
this.cards[0].date = this.mostParticipantsEvent.date || "";
this.cards[0].time = this.mostParticipantsEvent.time || "";

if (this.mostParticipantsEvent.creatorId) {
const creatorResponse = await axios.get(`/api/users/${this.mostParticipantsEvent.creatorId}`);
this.cards[0].creatorName = creatorResponse.data.username || "";
} else {
this.cards[0].creatorName = "";
}

if (this.mostParticipantsEvent.dumpId) {
const dumpResponse = await axios.get(`/api/dump/name/${this.mostParticipantsEvent.dumpId}`);
this.cards[0].dumpName = dumpResponse.data || "";
} else {
this.cards[0].dumpName = "-";
}
}
} catch (error) {
console.error("Error fetching most participants event:", error);
}
},
async getLatestEvent() {
try {
const response = await axios.get("/api/event/latest");
if (response.data && response.data.length > 0) {
this.latestEvent = response.data[0];

this.cards[1].category = "Legfrissebb";
this.cards[1].title = this.latestEvent.title || "";
this.cards[1].description = this.latestEvent.description || "";
this.cards[1].location = this.latestEvent.location || "";
this.cards[1].place = this.latestEvent.place || "";
this.cards[1].participants = this.latestEvent.participants.toString() || "";
this.cards[1].date = this.latestEvent.date || "";
this.cards[1].time = this.latestEvent.time || "";

if (this.latestEvent.creatorId) {
const creatorResponse = await axios.get(`/api/users/${this.latestEvent.creatorId}`);
this.cards[1].creatorName = creatorResponse.data.username || "";
} else {
this.cards[1].creatorName = "";
}

if (this.latestEvent.dumpId) {
const dumpResponse = await axios.get(`/api/dump/name/${this.latestEvent.dumpId}`);
this.cards[1].dumpName = dumpResponse.data || "";
} else {
this.cards[1].dumpName = "-";
}
}
} catch (error) {
console.error("Error fetching latest event:", error);
}
},
async getClosestEvent() {
try {
const response = await axios.get("/api/event/closest");
if (response.data && response.data.length > 0) {
this.closestEvent = response.data[0];

this.cards[2].category = "Nemsokára kezdődik";
this.cards[2].title = this.closestEvent.title || "";
this.cards[2].description = this.closestEvent.description || "";
this.cards[2].location = this.closestEvent.location || "";
this.cards[2].place = this.closestEvent.place || "";
this.cards[2].participants = this.closestEvent.participants.toString() || "";
this.cards[2].date = this.closestEvent.date || "";
this.cards[2].time = this.closestEvent.time || "";

if (this.closestEvent.creatorId) {
const creatorResponse = await axios.get(`/api/users/${this.closestEvent.creatorId}`);
this.cards[2].creatorName = creatorResponse.data.username || "";
} else {
this.cards[2].creatorName = "";
}

if (this.closestEvent.dumpId) {
const dumpResponse = await axios.get(`/api/dump/name/${this.closestEvent.dumpId}`);
this.cards[2].dumpName = dumpResponse.data || "";
} else {
this.cards[2].dumpName = "-";
}
}
} catch (error) {
console.error("Error fetching closest event:", error);
}
},
async fetchEventData() {
try {
await new Promise((resolve) => setTimeout(resolve, 100));

await Promise.all([
this.getEventWithMostParticipants(),
this.getLatestEvent(),
this.getClosestEvent(),
]);

this.loading = false;
} catch (error) {
console.error("Error fetching event data:", error);
}
},
},*/
});
</script>
<style>
ion-content {
    --ion-background-color: #ffffff; /* Change the background color */
}
.ion-padding{
  background-color: #ffffff;
}
</style>