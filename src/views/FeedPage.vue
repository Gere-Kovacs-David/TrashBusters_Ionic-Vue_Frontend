<template>
  <ion-content>
    <ion-grid>
      <ion-row style="margin-top: 75px;">
        <ion-col></ion-col>
        <ion-col calss="mobile-info-card">
          <ion-card v-for="(card, index) in cards" :key="index" style=" border-radius: 10px;" class="info-card">
            <ion-header>
              <ion-toolbar>
                <h1>{{ card.category }}</h1>
              </ion-toolbar>
            </ion-header>
            <h2>{{ card.title }}</h2>
            <table style="width: 100%;">
              <tr>
                <td class="text-td border-td"><strong>Helyszín:</strong></td>
                <td class="border-td">{{ card.location }} / {{ card.place }}</td>
              </tr>
              <tr>
                <td class="text-td border-td"><strong>Résztvevők:</strong></td>
                <td class="border-td">{{ card.participants }} fő</td>
              </tr>
              <tr>
                <td class="text-td border-td"><strong>Időpont:</strong></td>
                <td class="border-td">{{ card.date }} / {{ card.time }}</td>
              </tr>
              <tr>
                <td class="text-td border-td"><strong>Szervező:</strong></td>
                <td class="border-td">{{ card.creatorName }}</td>
              </tr>
              <tr>
                <td class="text-td border-td"><strong>Lerakó:</strong></td>
                <td class="border-td">{{ card.dumpName }}</td>
              </tr>
              <tr>
                <td class="text-td border-td"><strong>Leírás:</strong></td>
                <td class="border-td">{{ card.description }}</td>
              </tr>
            </table>
          </ion-card>
        </ion-col>
        <ion-col></ion-col>
      </ion-row>
    </ion-grid>
  </ion-content>
</template>

<script lang="ts">
import axios from "axios";
import Cookies from "js-cookie";
import { defineComponent } from "vue";
import { client } from '../url';

export default defineComponent({
  name: "IndexPage",

  data() {
    return {
      mostParticipantsEvent: null as any,
      latestEvent: null as any,
      closestEvent: null as any,
      cards: [
        {
          category: "",
          title: "",
          description: "",
          location: "",
          place: "",
          participants: "",
          date: "",
          time: "",
          creatorName: "",
          dumpName: "",
        },
        {
          title: "",
          description: "",
          location: "",
          place: "",
          participants: "",
          date: "",
          time: "",
          creatorName: "",
          dumpName: "",
        },
        {
          category: "",
          title: "",
          description: "",
          location: "",
          place: "",
          participants: "",
          date: "",
          time: "",
          creatorName: "",
          dumpName: "",
        },
      ],
      loading: true,
      user: null as any,
    };
  },
  mounted() {
    this.fetchEventData();
    const storedUser = Cookies.get("user");
    this.user = storedUser ? JSON.parse(storedUser) : null;
  },
  methods: {
    async getEventWithMostParticipants() {
      try {
        const response = await client.get<{ data: any }>("/api/event/most-participants");
        if (response.data) {
          this.mostParticipantsEvent = response.data;

          this.cards[0].category = "Legnépszerűbb";
          this.cards[0].title = this.mostParticipantsEvent.title || "";
          this.cards[0].description =
            this.mostParticipantsEvent.description || "";
          this.cards[0].location = this.mostParticipantsEvent.location || "";
          this.cards[0].place = this.mostParticipantsEvent.place || "";
          this.cards[0].participants =
            this.mostParticipantsEvent.participants || "";
          this.cards[0].date = this.mostParticipantsEvent.date || "";
          this.cards[0].time = this.mostParticipantsEvent.time || "";

          if (this.mostParticipantsEvent.creatorId) {
            const creatorResponse = await client.get(
              `/api/users/${this.mostParticipantsEvent.creatorId}`
            );
            this.cards[0].creatorName = creatorResponse.data.username || "";
          } else {
            this.cards[0].creatorName = "";
          }

          if (this.mostParticipantsEvent.dumpId) {
            const dumpResponse = await client.get(
              `/api/dump/name/${this.mostParticipantsEvent.dumpId}`
            );
            this.cards[0].dumpName = dumpResponse.data || "";
          } else {
            this.cards[0].dumpName = "-";
          }
        }
      } catch (error) {
        console.error("Error fetching most participants event:", error);
      }
    },
    async getLatestEvent() {
      try {
        const response = await client.get("/api/event/latest");
        if (response.data) {
          this.latestEvent = response.data;

          this.cards[1].category = "Legfrissebb";
          this.cards[1].title = this.latestEvent.title || "";
          this.cards[1].description = this.latestEvent.description || "";
          this.cards[1].location = this.latestEvent.location || "";
          this.cards[1].place = this.latestEvent.place || "";
          this.cards[1].participants = this.latestEvent.participants || "";
          this.cards[1].date = this.latestEvent.date || "";
          this.cards[1].time = this.latestEvent.time || "";

          if (this.latestEvent.creatorId) {
            const creatorResponse = await client.get(
              `/api/users/${this.latestEvent.creatorId}`
            );
            this.cards[1].creatorName = creatorResponse.data.username || "";
          } else {
            this.cards[1].creatorName = "";
          }

          if (this.latestEvent.dumpId) {
            const dumpResponse = await client.get(
              `/api/dump/name/${this.latestEvent.dumpId}`
            );
            this.cards[1].dumpName = dumpResponse.data || "";
          } else {
            this.cards[1].dumpName = "-";
          }
        }
      } catch (error) {
        console.error("Error fetching latest event:", error);
      }
    },
    async getClosestEvent() {

      try {
        const response = await client.get("/api/event/closest");
        if (response.data) {
          this.closestEvent = response.data;

          this.cards[2].category = "Nemsokára kezdődik";
          this.cards[2].title = this.closestEvent.title || "";
          this.cards[2].description = this.closestEvent.description || "";
          this.cards[2].location = this.closestEvent.location || "";
          this.cards[2].place = this.closestEvent.place || "";
          this.cards[2].participants = this.closestEvent.participants || "";
          this.cards[2].date = this.closestEvent.date || "";
          this.cards[2].time = this.closestEvent.time || "";

          if (this.closestEvent.creatorId) {
            const creatorResponse = await client.get(
              `/api/users/${this.closestEvent.creatorId}`
            );
            this.cards[2].creatorName = creatorResponse.data.username || "";
          } else {
            this.cards[2].creatorName = "";
          }

          if (this.closestEvent.dumpId) {
            const dumpResponse = await client.get(
              `/api/dump/name/${this.closestEvent.dumpId}`
            );
            this.cards[2].dumpName = dumpResponse.data || "";
          } else {
            this.cards[2].dumpName = "-";
          }
        }
      } catch (error) {
        console.error("Error fetching closest event:", error);
      }
    },
    async fetchEventData() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 100));

        await Promise.all([
          this.getEventWithMostParticipants(),
          this.getLatestEvent(),
          this.getClosestEvent(),
        ]);

        this.loading = false;
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    },
  },
});
</script>

<style scoped>
.info-card{
  max-width: 250px; 
  border: 1px black solid;
  .text-td {
  width: 100px;
  }

  .border-td {
    border: 1px solid #186049;
    border-radius: 10px;
  }
  ion-toolbar{
    background-color: #186049;
    color: white;
  }
}

.mobile-info-col{
    ion-col{display: flex; justify-content: center; align-items: center;}
    
  }
@media (min-width: 765px) {
  
}

@media (max-width: 765px) {
  .mobile-info-card{
    ion-col{display: flex; justify-content: center; align-items: center;}
  }
}


</style>
