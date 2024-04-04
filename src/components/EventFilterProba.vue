<template>
    <ion-content>
      <div class="ion-padding" :class="{ 'ion-padding-lg': screenWidth > 1024 }">
        <div
          :style="{
            width: screenWidth > 1024 ? '1000px' : '300px',
            margin: 'auto',
          }"
        >
          <div class="ion-margin-bottom flex justify-center">
            <ion-input
              v-model="searchTitle"
              clearable
              placeholder="Esemény neve"
              class="ion-margin-bottom"
            />
            <ion-input
              v-model="searchCity"
              clearable
              placeholder="Város"
              class="ion-margin-bottom"
            />
            <ion-input
              v-model="searchAddress"
              clearable
              placeholder="Utca, tér"
              class="ion-margin-bottom"
            />
            <ion-input
              v-model.number="model"
              type="number"
              clearable
              placeholder="Min. résztvevők"
              class="ion-margin-bottom"
            />
            <ion-input
              v-model="date"
              type="date"
              clearable
              placeholder="Dátum"
              class="ion-margin-bottom"
            />
  
            <div class="ion-padding-lg ion-margin-bottom row flex justify-center">
              <ion-button
                @click="searchData"
                color="success"
                :disabled="checkInputFields"
              >
                Keresés
              </ion-button>
              <ion-button
                @click="filterReset"
                color="danger"
                :disabled="checkInputFields"
              >
                Szűrők törlése
              </ion-button>
            </div>
          </div>
        </div>
      </div>
  
      <div v-if="filteredData.length > 0" class="ion-padding" style="margin-top: 80px">
        <ion-list :style="{ width: screenWidth > 1024 ? '1700px' : '270px', margin: 'auto' }">
          <ion-item v-for="item in filteredData" :key="item.id" @click="openCard(item)">
            <ion-label>{{ item.title }}</ion-label>
            <ion-label>{{ item.location }}</ion-label>
            <ion-label>{{ item.participants }}</ion-label>
            <ion-label>{{ item.date }}</ion-label>
          </ion-item>
        </ion-list>
      </div>
  
      <ion-modal :is-open="cardVisible">
        <ion-content>
          <ion-card :class="{ 'ion-padding-lg': screenWidth > 1024 }" :style="{ width: screenWidth > 1024 ? '500px' : '270px' }">
            <ion-card-header>
              <ion-card-title v-if="selectedRow">{{ selectedRow.title }}</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <div v-if="selectedRow">
                <ion-img
                  v-if="selectedRow.eventPictureURL"
                  :src="selectedRow.eventPictureURL"
                  alt="Esemény kép"
                />
                <p v-if="selectedRow.description !== 'null'">{{ selectedRow.description }}</p>
                <p><strong>Helyszín:</strong> {{ selectedRow.location }}, {{ selectedRow.place }}</p>
                <p><strong>Résztvevők:</strong> {{ selectedRow.participants }} fő</p>
                <p><strong>Időpont:</strong> {{ selectedRow.date }}, {{ selectedRow.time }}</p>
                <p><strong>Szervező:</strong> {{ creatorName }}</p>
                <p><strong>Lerakó:</strong> {{ dumpName }}</p>
              </div>
            </ion-card-content>
            <ion-row class="ion-justify-content-between">
              <ion-col>
                <ion-button color="danger" @click="closeCard">Bezárás</ion-button>
              </ion-col>
              <ion-col>
                <ion-button color="warning" @click="openParticipantsCard">Résztvevők</ion-button>
              </ion-col>
              <ion-col>
                <ion-button color="success" @click="joinEvent">Csatlakozás</ion-button>
              </ion-col>
            </ion-row>
          </ion-card>
        </ion-content>
      </ion-modal>
  
      <ion-modal :is-open="participantsCardVsible">
        <ion-content>
          <ion-card :class="{ 'ion-padding-lg': screenWidth > 1024 }" :style="{ width: screenWidth > 1024 ? '500px' : '270px' }">
            <ion-card-header>
              <ion-card-title v-if="participants.length > 0 && !loading">{{ selectedRow.title }}</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <ion-list v-if="participants.length > 0 && !loading">
                <ion-item v-for="participant in participants" :key="participant.id" @click="openUserProfile(participant.id)">
                  <ion-avatar slot="start">
                    <ion-img :src="participant.profilePictureURL" />
                  </ion-avatar>
                  <ion-label>
                    <p class="ion-text-wrap">{{ participant.username }}, {{ participant.city }}</p>
                  </ion-label>
                </ion-item>
              </ion-list>
              <p v-if="participants.length === 0 && loading">No participants for this event.</p>
            </ion-card-content>
            <ion-row class="ion-justify-content-center">
              <ion-col>
                <ion-button color="danger" @click="closeParticipantsCard">Bezárás</ion-button>
              </ion-col>
            </ion-row>
          </ion-card>
        </ion-content>
      </ion-modal>
    </ion-content>
  </template>
  
  <script>
  import axios from "axios";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      searchTitle: "",
      searchCity: "",
      searchAddress: "",
      model: 0,
      date: "",
      filteredData: [],
      columns: [
        {
          name: "title",
          label: "Esemény neve",
          align: "left",
          field: "title",
          sortable: true,
          headerStyle: "font-weight: bold; font-size: 16px;",
        },
        {
          name: "location",
          label: "Város",
          align: "left",
          field: "location",
          sortable: true,
          headerStyle: "font-weight: bold; font-size: 16px;",
        },
        {
          name: "participants",
          label: "Résztvevők száma",
          align: "left",
          field: "participants",
          sortable: true,
          headerStyle: "font-weight: bold; font-size: 16px;",
        },
        {
          name: "date",
          label: "Dátum",
          align: "left",
          field: "date",
          sortable: true,
          headerStyle: "font-weight: bold; font-size: 16px;",
        },
      ],
      cardVisible: false,
      selectedRow: null,
      userId: "",
      creatorName: null,
      dumpName: null,
      minDate: "",
      pairExists: false,
      user: null,
      searchButtonDisabled: false,
      participantsCardVsible: false,
      participants: [],
      loading: true,
    };
  },
  mounted() {
    const storedUser = Cookies.get("user");
    this.user = storedUser ? JSON.parse(storedUser) : null;

    const today = new Date().toISOString().split("T")[0];
    this.minDate = today;
    this.searchData();
  },
  computed: {
    checkInputFields() {
      return (
        !this.searchTitle &&
        !this.searchCity &&
        !this.searchAddress &&
        !this.model &&
        !this.date
      );
    },
  },
  methods: {
    async searchData() {
      try {
        const response = await axios.get("/api/events", {
          params: {
            title: this.searchTitle,
            location: this.searchCity,
            place: this.searchAddress,
            participants: this.model,
            date: this.date,
          },
        });
        this.filteredData = response.data.filter((item) => {
          const lowerSearch = this.searchTitle.toLowerCase();
          const lowerCity = this.searchCity.toLowerCase();
          const lowerPlace = this.searchAddress.toLowerCase();

          return (
            item.title.toLowerCase().includes(lowerSearch) == true &&
            item.location.toLowerCase().includes(lowerCity) == true &&
            item.place.toLowerCase().includes(lowerPlace) == true &&
            item.participants >= parseInt(this.model) == true &&
            (this.date ? item.date.includes(this.date) : true)
          );
        });
      } catch (error) {
        console.error("Hiba a keresés során:", error);
      }
    },
    async filterReset() {
      this.searchTitle = "";
      this.searchCity = "";
      this.searchAddress = "";
      this.model = 0;
      this.date = "";
      this.filteredData = [];
      this.searchData();
    },
    async openCard(event, row, columnIndex) {
      this.selectedRow = row;
      await Promise.all([
        this.getCreatorName(),
        this.checkPairExists(),
        this.getDumpName(),
      ]);
      this.cardVisible = true;
    },
    closeCard() {
      this.selectedRow = null;
      this.cardVisible = false;
    },
    async joinEvent() {
      try {
        const user = JSON.parse(Cookies.get("user"));
        if (!user) {
          alert("Nem vagy bejelentkezve!");
          return;
        }

        this.userId = user.id;

        await axios.post("/api/participants", {
          eventId: this.selectedRow.id,
          userId: this.userId,
        });

        const response = await axios.get(
          `/api/participants/event/${this.selectedRow.id}`
        );

        const participantCount = response.data.count;
        await axios.patch(`/api/events/${this.selectedRow.id}`, {
          participants: participantCount,
        });

        this.participants = response.data.users;

        alert("Sikeresen csatlakozott az eseményhez!");
        window.location.reload();
        this.closeCard();
      } catch (error) {
        console.error("Error joining event:", error);
        alert("Hiba a csatlakozás során!");
        this.closeCard();
      }
    },
    async getCreatorName() {
      try {
        if (!this.selectedRow || !this.selectedRow.creatorId) {
          this.creatorName = null;
          return;
        }

        const response = await axios.get(
          `/api/users/${this.selectedRow.creatorId}`
        );

        const user = response.data;

        this.creatorName = user.username;
      } catch (error) {
        console.error("Error fetching creator name:", error);
      }
    },
    async getDumpName() {
      try {
        if (!this.selectedRow || !this.selectedRow.dumpId) {
          this.dumpName = "-";
          return;
        }

        const response = await axios.get(
          `/api/dump/name/${this.selectedRow.dumpId}`
        );

        this.dumpName = response.data;
      } catch (error) {
        console.error("Error fetching dump name:", error);
      }
    },
    async checkPairExists() {
      try {
        const response = await axios.get(
          `/api/participants/check/${this.selectedRow.id}/${this.user.id}`
        );
        this.pairExists = response.data.exists;
      } catch (error) {
        console.error("Error checking if user is already joined:", error);
      }
    },
    async openParticipantsCard() {
      this.participantsCardVsible = true;
      this.cardVisible = false;
      this.getParticipantsByEventId();
      const response = await axios.get(
        `/api/participants/event/${this.selectedRow.id}`
      );

      this.participants = response.data.users;
    },
    async getParticipantsByEventId() {
      try {
        const response = await axios.get(
          `/api/participants/event/${this.selectedRow.id}`
        );
        this.participants = response.data;
        this.loading = false;
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    },
    closeParticipantsCard() {
      this.participantsCardVsible = false;
      this.cardVisible = true;
    },
    openUserProfile(userId) {
      this.$router.push(`/user/${userId}`);
    },
  },
};
  </script>
  
  <style scoped>
  /* Add your scoped styles here */
  ion-input{
    border: solid 1px black;
    --background: green;
  }
  ion-page{
    --overflow-y: scroll;
  }
  </style>
  