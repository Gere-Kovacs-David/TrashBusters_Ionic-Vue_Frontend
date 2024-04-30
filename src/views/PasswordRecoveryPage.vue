<template>
  

  <ion-content class="ion-padding">
    <PasswordRecoveryPage/>
  </ion-content>
</template>

<script>
import PasswordRecoveryPage from "@/components/RecoveryComponent.vue";
import { defineComponent } from "vue";

export default defineComponent({
    components: {
      PasswordRecoveryPage
    },
    
  });
</script>

<style scoped>
ion-grid{
    border: 5px white solid;
    border-radius: 15px;
    height: 707px;
    width: 750px;
    padding: 0px;
  }
</style>
