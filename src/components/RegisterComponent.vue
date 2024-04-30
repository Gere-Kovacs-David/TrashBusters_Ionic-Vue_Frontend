<template>
  <ion-page>
    <ion-content class="ion-padding no-scroll">
      <div class="ion-justify-content-center ion-align-items-center">
        <ion-card class="register-card">
          <ion-card-content >
            <!--<ion-card-title>Regisztráció</ion-card-title>-->

            <form @submit.prevent="register">
             
              <ion-list>
                  <ion-item style="margin-top: 0px;">
                      <ion-label position="floating">Email cím</ion-label>
                      <ion-input
                      clearInput
                      :value="email"
                      @ionInput="email = $event.target.value;"
                      type="email"
                      counter="true"
                      maxlength="20"
                      helper-text="Enter an email"
                      error-text="Please enter a valid email"
                      ></ion-input>
                  </ion-item>
                  <ion-item >
                      <ion-label position="floating">Felhasználónév</ion-label>
                      <ion-input
                      clearInput
                      :value="username"
                      @ionInput="username = $event.target.value;"
                      type="text"
                      counter="true"
                      maxlength="20"
                      helper-text="Enter an email"
                      error-text="Please enter a valid email"
                      ></ion-input>
                  </ion-item>
                  <ion-item >
                      <ion-label position="floating">Település</ion-label>
                      <ion-input
                      clearInput
                      :value="city"
                      @ionInput="city = $event.target.value;"
                      type="text"
                      counter="true"
                      maxlength="20"
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
                      counter="true"
                      maxlength="20"
                      helper-text="Enter a password"
                      error-text="Please enter a valid password"
                      ></ion-input>
                  </ion-item>
                  <ion-item>
                      <ion-label position="floating">Jelszó újra</ion-label>
                      <ion-input 
                      :value="passwordAgain"
                      @ionInput="passwordAgain = $event.target.value;" 
                      type="password" 
                      clearInput
                      counter="true"
                      maxlength="20"
                      helper-text="Enter a password"
                      error-text="Please enter a valid password"
                      ></ion-input>
                  </ion-item>
              </ion-list>
              
              <ion-button expand="block" type="submit">Regisztráció</ion-button>
          </form>
            <!--<p >{{ email }}</p>
            <p >{{ password }}</p>-->
              <p v-if="error">{{ error }}</p>
          </ion-card-content>
        </ion-card>
      

      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
  //import useAuth from "src/composables/useAuth";
  import { client } from '../url';
 

  export default defineComponent({
  data() {
      return {
      email: '',
      username: '',
      city: '',
      password: '',
      passwordAgain: '',
      error: ''
      };
  },


  methods:{
      async register() {
        if (this.password == this.passwordAgain) {
          
      
        const config: AxiosRequestConfig = {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
        };

        try {
            const data = {
            email: this.email,
            username: this.username,
            city: this.city,
            password: this.password,
            };
            //console.log('Request Data:', data);
            const response: AxiosResponse = await client.post('/api/auth/register', data, config);

            //useAuth.isLoggedIn.value == true;

            //console.log(response.status);
            //console.log(response.data);
            // Handle successful login here, e.g., redirect to another page
            this.$router.push('/landing');
        } catch (err) {
            //console.error(err);
            this.error = 'Invalid email address or password!';
            // Handle login error here
        }
      }
    },
    clearInputFields() {
      // Reset input field values
      this.email = '';
      this.username = '';
      this.city = '';
      this.password = '';
      this.passwordAgain = '';
    }
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
.register-card {
 
  min-height: 480px;
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
    margin-bottom: 10px;
  }
</style>