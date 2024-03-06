<template>
  <ion-page>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col class="desktop-col" size="3.5"></ion-col>
          <ion-col>
              <ion-col size="2" v-for="photo in photos" :key="photo">
                
                <ion-card @click="showActionSheet(photo)">
                  <ion-item>
                    <ion-avatar slot="start">
                      <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                    </ion-avatar>
                  
                    <ion-label slot="start">
                      <h3>John Doe</h3>
                      <p>Dec 10, 2019</p>
                    </ion-label>

                    <IonIcon :icon="ellipsisVertical" slot="end"></IonIcon>
                  </ion-item>
                  <ion-img :src="photo.webviewPath" class="cropped-image"></ion-img>
                  <ion-card-content>
                    <ion-row>
                      <ion-label><b>Leírás:</b></ion-label>
                      <ion-label>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</ion-label>
                    </ion-row>
                  </ion-card-content>
                </ion-card>
              </ion-col>
            </ion-col>
          <ion-col class="desktop-col" size="3.35"></ion-col>
          
        </ion-row>
      </ion-grid>

      <ion-fab vertical="bottom" horizontal="center" slot="fixed">
        <ion-fab-button @click="takePhoto()">
          <ion-icon :icon="addOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  actionSheetController,
  IonContent,
  IonCol,
  IonFab,
  IonFabButton,
  IonGrid,
  IonPage,
  IonHeader,
  IonIcon,
  IonImg,
  IonRow,
  IonTitle,
  IonToolbar,
  IonCard, 
  IonCardContent
} from '@ionic/vue';
import { camera, trash, close, radioButtonOffOutline, addOutline, ellipsisVertical } from 'ionicons/icons';
import { usePhotoGallery, UserPhoto } from '@/composables/usePhotoGallery';



const { photos, takePhoto, deletePhoto } = usePhotoGallery();

const showActionSheet = async (photo: UserPhoto) => {
  const actionSheet = await actionSheetController.create({
    header: 'Photos',
    buttons: [
      {
        text: 'Delete',
        role: 'destructive',
        icon: trash,
        handler: () => {
          deletePhoto(photo);
        },
      },
      {
        text: 'Cancel',
        icon: close,
        role: 'cancel',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
        },
      },
    ],
  });
  await actionSheet.present();
};
</script>

<style scoped>
.cropped-image {
  width: auto;
  height: 450px; 
  object-fit: cover;
}

ion-col {
  size: 1;
  padding: 1px;
  border: 1px solid;
}

.desktop-col{
  padding-right: 30%;
}

@media (max-width: 840px) {






ion-tab-button {
    ion-label {
      font-size: 9px;
    }
  }

}

@media (max-width: 640px) {
  
}

</style>