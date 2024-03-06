<template>
  <ion-page>
    
    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row>
          <ion-col class="custom-col"></ion-col>
          <ion-col>
            
          </ion-col>
          <ion-col class="custom-col"></ion-col>
    </ion-row>
    </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonContent, IonRow } from '@ionic/vue';
import eventComponent from '@/components/eventComponent.vue';

</script>

<style scoped>
/* Target ion-col using class selector */
.custom-col {
  background-color: #e0e0e0;
  padding: 10px;
}

/* Target ion-col directly */
ion-col {
  border: 1px solid #ccc;
  margin: 5px;
}

/* Another example with a different class selector */
.another-custom-col {
  background-color: #f0f0f0;
  padding: 15px;
}
</style>