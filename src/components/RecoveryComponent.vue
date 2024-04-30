<template> 
    <ion-content class="ion-padding">
      <ion-card square bordered class="ion-padding recovery-card">
        <ion-card-header>
                <ion-card-title class="title">Jelszó helyreállítása</ion-card-title>
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
            <ion-button expand="block" type="submit">Jelszó visszaállítása</ion-button>
          </form>
        </ion-card-content>
    </ion-card>

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
  .recovery-card{
    margin: auto;
    margin-top: 70px;
    max-width: 500px;
  }
  ion-card{
    background-color: white;
  }
  
    
      
  ion-input{
    --background: transparent;
    --color: #95877a;
    --placeholder-color: #e5d5c6;
  
    
    --padding-bottom: 10px;
    --padding-end: 10px;
    --padding-start: 10px;
    --padding-top: 10px;
      }

    ion-item {
    margin-top: 7px;
    margin-bottom: 15px;
    --background: #e5d5c6;
    --color: #95877a;

    --border-radius: 5px;

    --ripple-color: #37865b;

    --detail-icon-color: white;
    --detail-icon-opacity: 1;
    --detail-icon-font-size: 20px;
  }

  ion-button{
    --background: #186049; 
    --border-radius: 5px;
    margin-top: 15px;
    margin-bottom: 0px;
  }

  .title{
    color: #186049; 
    margin-left: 25%; 
    margin-bottom: 10px; 
    margin-top: 10px; 
    font-size: 22px; 
    font-weight: bold;
  }

  @media (max-width: 765px) {
    .title{
     margin-left: 5%;
    }
}
  </style>
  