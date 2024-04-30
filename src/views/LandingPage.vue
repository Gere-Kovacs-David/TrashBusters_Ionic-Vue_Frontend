<template>
    <ion-page>
      
      <ion-content class="ion-padding no-scroll nice-ion-content" fullscreen>
        <ion-card class="outside-card" style=" margin-top: 50px;">
        <ion-grid>
          <ion-row>
          <ion-col >
          <img alt="Silhouette of a person's head" style="border-radius: 15px 0px 0px 15px; height: 700px; margin: -8px; " src="/assets/images/LandingPictureWhite.png" />
        </ion-col>
        <ion-col>
          <!--<ion-label style="font-size: 25px; font-weight: bolder; text-align: center; color: white; margin: 50px;">TRASH BUSTERS</ion-label>-->
          <ion-card class="inside-ion-card">
                <ion-segment v-model="segment" value="login" class="segment-style">
                  <ion-segment-button value="registration" @click="goToRegistration">
                    <ion-label>Regisztráció</ion-label>
                  </ion-segment-button>
                  <ion-segment-button v-model="segment" value="login" @click="goToLogin">
                    <ion-label>Bejelentkezés</ion-label>
                  </ion-segment-button>
                </ion-segment>
              
            
         <!--Render LoginComponent.vue when the "Login" segment is active -->
        <ion-grid class="auth-grid">
        <template v-if="segment === 'registration'">
            <RegisterComponent />
        </template>
      
        <template v-if="segment === 'login'">
          <LoginComponent />
        </template>
      </ion-grid>
      </ion-card>
      </ion-col>
      </ion-row>
      </ion-grid>
    </ion-card>
    
    <ion-card class="mobile-inside-ion-card">
                <ion-segment v-model="segment" value="login" class="segment-style">
                  <ion-segment-button value="registration" @click="goToRegistration">
                    <ion-label>Regisztráció</ion-label>
                  </ion-segment-button>
                  <ion-segment-button v-model="segment" value="login" @click="goToLogin">
                    <ion-label>Bejelentkezés</ion-label>
                  </ion-segment-button>
                </ion-segment>
              
            
         <!--Render LoginComponent.vue when the "Login" segment is active-->
        <ion-grid class="mobile-auth-grid">
        <template v-if="segment === 'registration'">
            <RegisterComponent />
        </template>
      
        <template v-if="segment === 'login'">
          <LoginComponent />
        </template>
      </ion-grid>
      </ion-card>
      <!--<ion-grid>
        <PasswordRecoveryPage/>
      </ion-grid>-->
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
  import LoginComponent from "@/components/LoginComponent.vue";
  import RegisterComponent from "@/components/RegisterComponent.vue";
  
  
  import { defineComponent } from "vue";
  
  export default defineComponent({
    components: {
      RegisterComponent,
      LoginComponent
     
    },
    data() {
      return {
        segment: "login" // Initially set the "Login" segment as active
      };
    },
    methods: {
      goToRegistration() {
        this.segment = "registration"; // Change the segment to "registration"
      },
      goToLogin() {
        this.segment = "login"; // Change the segment to "login"
      }
    }
  });
  </script>
  
  <style scoped>
  .nice-ion-content{
    --overflow: hidden;
    --ion-background-color: linear-gradient(to bottom right,#74D680,#186049 );

  }
  .no-scroll {
    --overflow: hidden;
  
  }
  .auth-grid{
    border: 3px white solid;
    border-top: transparent;
    border-radius: 0px 0px 10px 10px;
    height: 552px;
    width: 300px;
}
.mobile-auth-grid{
    border: 3px white solid;
    border-top: transparent;
    border-radius: 0px 0px 10px 10px;
    height: 552px;
    width: 300px;
    margin: auto;
}
  ion-grid{
    border: 5px white solid;
    border-radius: 15px;
    height: 707px;
    width: 750px;
    padding: 0px;
    
  }

  .mobile-inside-ion-card{
    height: 600px;
    width: 300px;
    border-radius: 10px;
    margin: auto;
    margin-top: 40px;
    color:#186049 ;
  }

  .inside-ion-card{
    height: 600px;
    width: 300px;
    border-radius: 10px;
    margin-top: 40px;
    color:#186049 ;
    
  }
  .outside-card{
    border: 3px white solid;
    border-radius: 20px;
    height: 710px;
    width: 755px;
    padding: 0px;
    margin: auto;
    
    --background:linear-gradient(to bottom right,#186049,#74D680) ;
  }
  .template-design{
    --background:linear-gradient(to bottom right,#186049,#74D680) ;
  }
 .segment-style{
  --background: white;
 }
 ion-segment{

  ion-segment-button::part(indicator-background) {
    background: #186049 ;
  }

  /* Material Design styles */
  ion-segment-button.md::part(native) {
    color: #95877a;
  }

  .segment-button-checked.md::part(native) {
    background:transparent;
    color:#186049;
  }

  ion-segment-button.md::part(indicator-background) {
    height: 4px;
  }

  /* iOS styles */
  ion-segment-button.ios::part(native) {
    color: #08a391;
  }

  .segment-button-checked.ios::part(native) {
    color: #95877a;
  }

  ion-segment-button.ios::part(indicator-background) {
    border-radius: 20px;
  }
  }

  @media (min-width: 765px) {
  .mobile-inside-ion-card{
    display: none;
  }
}

@media (max-width: 765px) {
  .outside-card{
    display: none;
  }
}
  </style>