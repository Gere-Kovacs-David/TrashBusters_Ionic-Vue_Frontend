<template>
    <ion-page>
      <ion-content class="ion-padding no-scroll" >
        <div class="ion-justify-content-center ion-align-items-center">
          <ion-card class="login-card" v-if="!forgotPassword">
            <ion-card-content >
              <form @submit.prevent="login">
                <ion-list>
                    <ion-item style="margin-top: 0px;">
                        <ion-label position="floating">Email cím</ion-label>
                        <ion-input
                        clearInput
                        fill="outline"
                        :value="email"
                        @ionInput="email = $event.target.value;"
                        type="email"
                        counter="true"
                        helper-text="Enter an email"
                        error-text="Please enter a valid email"
                        ></ion-input>
                      </ion-item>
                    <ion-item>
                        <ion-label position="floating">Jelszó</ion-label>
                        <ion-input 
                        :value="password"
                        @ionInput="password = $event.target.value;" 
                        type="password" 
                        clearInput
                        fill="outline"
                        counter="true"
                        helper-text="Enter a password"
                        error-text="Please enter a valid password"
                        ></ion-input>
                      </ion-item>
                </ion-list>
                <ion-button expand="block" type="submit">Bejelentkezés</ion-button>
            </form>
                <p v-if="error">{{ error }}</p>
            </ion-card-content>
          </ion-card>
          <ion-card class="password-reset" v-if="forgotPassword">
            <ion-card-content >
              <ion-card-title style="color: #186049; margin-left: 7px; margin-bottom: 10px; margin-top: 10px; font-size: 17px;">Jelszó helyreállítási email</ion-card-title>
              <form @submit.prevent="sendPasswordResetEmail">
                <ion-list>
                    <ion-item style="margin-top: 0px;">
                        <ion-label position="floating">Email cím</ion-label>
                        <ion-input
                        clearInput
                        fill="outline"
                        :value="email"
                        @ionInput="email = $event.target.value;"
                        type="email"
                        counter="true"
                        helper-text="Enter an email"
                        error-text="Please enter a valid email" 
                        ></ion-input>
                    </ion-item> 
                </ion-list>
                <ion-button expand="fill" class="megse" v-if="forgotPassword" @click="forgotPassword = false">Mégse</ion-button>
                <ion-button expand="fill" type="submit" class="kuldes">Küldés</ion-button>
            </form>

                <p v-if="error">{{ error }}</p>
            </ion-card-content>
          </ion-card>
          <p class="ion-margin-top" style="color:white;" v-if="!forgotPassword">Nincs még fiókod? <router-link to="/register" style="color: #fce702;">Regisztrálj itt!</router-link></p>
          <div class="login-card" v-if="!forgotPassword">
            <ion-button expand="block" class="password-recovery"  @click="forgotPassword = true">Elfelejtett jelszó</ion-button>
          </div>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
    import { defineComponent, ref} from 'vue';
    import axios, { AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders} from 'axios';
    import useAuth from "@/composables/useAuth";
    import { client } from '../url';

     

    export default defineComponent({
    name: 'LoginComponent',
    data() {
        return {
        email: '',
        password: '',
        error: '',
        forgotPassword: false,
        };
    },


    methods:{
        async login() {
        const config: AxiosRequestConfig = {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            
        };

        try {
            const data = {
            email: this.email,
            password: this.password,
            };
            //console.log('Request Data:', data);
            const response: AxiosResponse = await client.post('/api/auth/login', data, config);

            if(response.data.user.isVerified){
              //console.log(response.status);
              //console.log(response.data);
              //console.log(`${response.data.user}`);
              document.cookie = `token=${response.data.accessToken}; path=/;`;
              const userJson = JSON.stringify(response.data.user);
              document.cookie = `user=${userJson}; path=/;`;
              useAuth.isLoggedIn = ref(true);
              this.$router.push('/tabs/feed');
              //console.log("Sikeres bejelentkezés");
            }
            else{
              alert("Még nem erősítette meg a felhasználóját!");
            }

            
            
        } catch (error) {
            //console.error(error);
            this.error = 'Téves email vagy jelszó';
            alert(this.error);
        }
        },

      async sendPasswordResetEmail() {
        const config: AxiosRequestConfig = {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
        };
      try {
            const data = {
            email: this.email,
            };
            //console.log('Request Data:', data);
            const response: AxiosResponse = await client.post("/api/reset-password", data, config);
            //console.log(response.status);
            //console.log(response.data);

        if (response.status === 200) {
          this.email = "";
          alert("Email küldve!");
        } else {
          alert("Hiba történt!");
        }
      } catch (error: any) {
        alert(error.response.data.error);
        this.email = "";
      }
    },
    },
    });
    


  </script>
  
  <style scoped>
  .wider-card {
    width: 500px;
  }
  
  .ion-align-items-center {
    height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 60px;
  }
  
  .no-scroll {
    --overflow: hidden;
    --ion-background-color: linear-gradient(to bottom right,#37865b, #6ccb7b );
    height: 549px;
    border: 2px solid white;
    border-top: transparent;
    border-radius: 0px 0px 5px 5px;
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
    margin-top: 15px;
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
    margin-top: 10px;
    margin-bottom: 0px;
  }
  .password-recovery{
    --background: white;
    color:#186049; 
    --border-radius: 5px;
    margin-top: 10px;
    width: 235px;
  }

  /*.password-reset{
    display:inline
  }
  .login-card{
    display:none
  }*/
  .megse{
    --background: #95877a; 
    --color: #ffffff;
  }
  .kuldes{
    --color: #ffffff;
    float: right;
  }
  </style>