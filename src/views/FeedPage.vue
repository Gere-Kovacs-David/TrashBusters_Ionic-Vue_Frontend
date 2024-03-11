<template>
  <ion-page>
    <ion-content>
      <ion-grid style="background-color: #ffffff;">
        <ion-row>
          <ion-col class="desktop-col" size="3.5"></ion-col>
          <ion-col>
            
            <p>{{ message }}</p>
            
            <ion-button id="open-modal" expand="block" @click="openModal" style="margin-top: 15%;">Open Modal</ion-button>
            
            <PostModal/>
             <ion-col size="2" v-for="photo in photos" :key="photo">
                
                <ion-card @click="showActionSheet(photo)" style="background-color: #18604a; border: 1px solid #257157;">
                  <ion-item style="margin: 5px; --background: #18604a; border: 1px solid #18604a;">
                    <ion-avatar slot="start">
                      <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                    </ion-avatar>
                  
                    <ion-label slot="start">
                      <h3>John Doe</h3>
                      <p>Dec 10, 2019</p>
                    </ion-label>

                    <IonIcon :icon="ellipsisVertical" slot="end"></IonIcon>
                  </ion-item>
                  <ion-img :src="photo.webviewPath" class="cropped-image" style="border: 2px solid #257157; border-radius: 5px;"> </ion-img>
                  <ion-card-content>
                    <ion-row>
                      <ion-label style="color: #ffffff;"><b>Leírás:</b></ion-label>
                      <ion-label style="color: #ffffff;">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</ion-label>
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
  IonCardContent,
  IonModal,
  IonButton
} from '@ionic/vue';
import { camera, trash, close, radioButtonOffOutline, addOutline, ellipsisVertical } from 'ionicons/icons';
import { usePhotoGallery, UserPhoto } from '@/composables/usePhotoGallery';
import PostModal from '@/components/PostModal.vue';
import { ref } from 'vue';

const { photos, takePhoto, deletePhoto } = usePhotoGallery();

const message = ref('');

const openModal = () => {
    // Access the modal component and trigger it
    PostModal.proxy.$refs.modal.present();
  };

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

@media (max-width: 765px) {


.desktop-col{
  display: none;
}



ion-tab-button {
    ion-label {
      font-size: 9px;
    }
  }

}

@media (max-width: 765px) {
  
}



</style>