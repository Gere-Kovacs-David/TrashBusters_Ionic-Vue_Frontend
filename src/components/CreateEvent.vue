<template>
    <ion-page>
      <ion-content class="ion-padding no-scroll">
        <div class="ion-justify-content-center ion-align-items-center">
          <ion-card :class="{ 'wider-card': screenWidth > 1024 }">
            <ion-card-content>
              <ion-card-title>Create Event</ion-card-title>
              <ion-item>
                <ion-label position="floating">Title</ion-label>
                <ion-input v-model="title" type="text"></ion-input>
                
              </ion-item>
              <ion-item>
                <ion-label position="floating">Description</ion-label>
                <ion-input v-model="description" type="text"></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="floating">Location</ion-label>
                <ion-input v-model="location" type="text"></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="floating">Date</ion-label>
                <ion-input v-model="date" type="date"></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="floating">Time</ion-label>
                <ion-input v-model="time" type="time"></ion-input>
              </ion-item>
              <ion-button expand="full">Create Event</ion-button>
            </ion-card-content>
          </ion-card>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { IonPage, IonContent, IonCard, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue';
  //import axios from 'axios';
  import { ref, onUnmounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const screenWidth = ref(window.innerWidth);
  const title = ref('');
  const description = ref('');
  const location = ref('');
  const date = ref('');
  const time = ref('');
  
  /*const createEvent = async () => {
    try {
      const response = await axios.post("/api/events", {
        title: title.value,
        description: description.value,
        location: location.value,
        date: date.value,
        time: time.value
      });
  
      // Handle the response as needed
  
      router.push("/events");
      console.log("Event creation successful");
      alert("Event created successfully!");
    } catch (error) {
      console.error("Event creation failed:", error);
      alert("Event creation failed. Please try again.");
    }
  };*/
  
  const updateScreenWidth = () => {
    screenWidth.value = window.innerWidth;
  };
  
  window.addEventListener('resize', updateScreenWidth);
  
  onUnmounted(() => {
    window.removeEventListener('resize', updateScreenWidth);
  });
  </script>
  
  <style scoped>
  .wider-card {
    width: 500px;
  }
  .ion-align-items-center {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
  }
  .no-scroll {
  --overflow-y: hidden;
  }
  </style>
  