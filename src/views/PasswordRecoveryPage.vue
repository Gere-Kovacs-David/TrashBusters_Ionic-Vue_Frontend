<template>
    <div class="loading-container" v-if="loading">
      <div class="loading-spinner"></div>
    </div>
  
    <ion-content class="ion-padding" v-else>
      <ion-card square bordered class="ion-padding" :class="{ 'q-ma-lg': $q.screen.width > 1024 }">
        <ion-card-header>
          <ion-card-title>Új jelszó beállítása</ion-card-title>
        </ion-card-header>
  
        <ion-card-content>
          <form @submit.prevent="resetPassword">
            <ion-item>
              <ion-label position="floating">Új jelszó</ion-label>
              <ion-input v-model="newPassword" type="password"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Új jelszó mégegyszer</ion-label>
              <ion-input v-model="newPasswordAgain" type="password"></ion-input>
            </ion-item>
            <ion-button expand="full" type="submit">Jelszó visszaállítása</ion-button>
          </form>
        </ion-card-content>
      </ion-card>
  
      <div v-if="!loading && !userId" class="ion-margin-top ion-text-center">
        Helytelen kérés.
      </div>
    </ion-content>
  </template>
  
  <script>
  import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue';
  import { defineComponent } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  export default defineComponent({
    name: 'PasswordRecoveryPage',
  
    components: {
      IonContent,
      IonCard,
      IonCardHeader,
      IonCardTitle,
      IonCardContent,
      IonItem,
      IonLabel,
      IonInput,
      IonButton
    },
  
    data() {
      return {
        userToken: this.$route.params.token,
        userId: null,
        newPassword: '',
        newPasswordAgain: '',
        loading: true
      };
    },
  
    mounted() {
      this.getUserByToken();
    },
  
    methods: {
      async getUserByToken() {
        try {
          const response = await axios.get(`/api/user/password-reset-token/${this.userToken}`);
          this.userId = response.data.id;
          this.loading = false;
        } catch (error) {
          console.log(error);
          this.loading = false;
        }
      },
  
      async resetPassword() {
        try {
          if (this.newPassword === this.newPasswordAgain) {
            const response = await axios.patch(`/api/users/${this.userId}`, {
              password: this.newPassword,
              passwordResetToken: null
            });
            alert('A jelszó sikeresen helyreállítva!');
            useRouter().push('/login');
          } else {
            alert('A jelszavak nem egyeznek meg!');
            this.newPassword = '';
            this.newPasswordAgain = '';
          }
        } catch (error) {
          alert(error.response.data.error.password);
          this.newPassword = '';
          this.newPasswordAgain = '';
        }
      }
    }
  });
  </script>
  
  <style scoped>
  .loading-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }
  
  .loading-spinner {
    border: 8px solid #f3f3f3;
    border-top: 8px solid #8bc34a;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  </style>
  