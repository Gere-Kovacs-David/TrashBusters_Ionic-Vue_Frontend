<template>
  <ion-content >
    <ion-grid class="mobile-grid" style="margin-top: 55px;">
      <ion-row style="height: 670px; margin-top: 0;">
        <ion-col size="12" size-md="6" size-lg="3.5"
          style="overflow: hidden; margin-top: 20px; border-radius: 20px; background-color:#ebe2d9;"
          class="mobile-col">
          <ion-card>
            <div class="ion-padding">
              <div>
                <div class="ion-margin-bottom flex justify-center">
                  <ion-card class="search-card" style="margin: auto;  border: white; box-shadow: none;">
                    <ion-card-header>
                      <ion-card-title class="title"
                        style="border: 1px solid white; margin: auto; margin-bottom: 15px; text-align: center;">Események
                        szűrése</ion-card-title>
                    </ion-card-header>
                    <ion-card-content style="margin: -15px;">
                      <form @submit.prevent="searchData">
                        <ion-item>
                          <ion-label position="floating">Esemény neve</ion-label>
                          <ion-input v-model="searchTitle" @ionInput="searchTitle = $event.target.value;"
                            clearInput></ion-input>
                        </ion-item>
                        <ion-item>
                          <ion-label position="floating">Város</ion-label>
                          <ion-input v-model="searchCity" @ionInput="searchCity = $event.target.value;"
                            clearInput></ion-input>
                        </ion-item>
                        <ion-item>
                          <ion-label position="floating">Utca, tér</ion-label>
                          <ion-input v-model="searchAddress" @ionInput="searchAddress = $event.target.value;"
                            clearInput></ion-input>
                        </ion-item>
                        <ion-item>
                          <ion-label position="floating">Min. résztvevők</ion-label>
                          <ion-input v-model.number="model" @ionInput="model = $event.target.value;"
                            type="number"></ion-input>
                        </ion-item>
                        <ion-item>
                          <ion-label position="floating">Dátum</ion-label>
                          <ion-input v-model="date" @ionInput="date = $event.target.value;" type="date"></ion-input>
                        </ion-item>
                        <div>
                          <ion-button expand="fill" @click="filterReset" color="danger">Törlés</ion-button>
                          <ion-button expand="fill" type="submit" class="kuldes">Keresés</ion-button>
                        </div>
                      </form>
                    </ion-card-content>
                  </ion-card>
                </div>
              </div>
            </div>
          </ion-card>
          
          <ion-button expand="block" id="openCreate" style="color: #ffffff;" @click="openCreate">Új esemény
            létrehozása</ion-button>
        </ion-col>
        <ion-col size="12" size-md="6" size-lg="8.5" style="margin-top: -40px; border-radius: 50px;" class="mobile-col">
          <ion-card class="section" style="border-radius: 20px; margin-top: 55px; background-color:#ebe2d9; height: 650px; overflow-y: scroll;">
            <div v-if="filteredData.length > 0" style="margin-top: 50px; background-color:#ebe2d9;">
              <ion-row style=" margin-top: -50px;">
                <ion-col size="12" size-md="6" size-lg="3" v-for="row in filteredData" :key="row.id"
                  style="width: 250px; ">
                  <ion-card style="height: 320px; background-color: #f2eeeb; border-radius: 10px;"
                    @click="openCard(row); openParticipantsCard()" id="openEvent">
                    <img alt="Event image"
                      :src="row.eventPictureURL || 'https://ionicframework.com/docs/img/demos/card-media.png'"
                      style="width: 100%; max-height: 45%;" />
                    <ion-card-content>
                      <ion-card-title style="color: black; text-align: center; margin-bottom: 10px">{{ row.title
                        }}</ion-card-title>
                      <ion-card style="width: 100%; margin: auto">
                        <table class="smallcard" style="width: 105%;">
                          <tr>
                            <td >Helyszín:</td>
                            <td>{{ row.location }}</td>
                          </tr>
                          <tr>
                            <td>Résztvevők száma:</td>
                            <td>{{ row.participants }}</td>
                          </tr>
                          <tr>
                            <td>Dátum:</td>
                            <td style="width: 100px;">{{ row.date }}</td>
                          </tr>
                        </table>
                      </ion-card>
                    </ion-card-content>
                  </ion-card>
                </ion-col> 
              </ion-row>
            </div>
            <div v-else>
              <p>No data available.</p>
            </div>
          </ion-card>
        </ion-col>
      </ion-row>
    </ion-grid>
    <ion-backdrop v-if="selectedRow"></ion-backdrop>
    <ion-modal ref="modal" class="floating-modal" trigger="openEvent" v-if="selectedRow" :visible="modalVisible"
      :ionBackdropDismiss="true">
      <ion-header>
        <ion-toolbar>
          <ion-title style="text-align: center;"><strong>{{ selectedRow.title }}</strong></ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-card style="margin: 0px; box-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;">
          <ion-card-section>
            <div v-if="selectedRow">
              <div v-if="'eventPictureURL' in selectedRow">
                <img :src="selectedRow.eventPictureURL || 'https://ionicframework.com/docs/img/demos/card-media.png'"
                  alt="Esemény kép" class="modal-img" />
              </div>
              <ion-card style="border-radius: 10px;" class="border-td modal-card">
                <table style="width: 100%;">
                  <tr>
                    <td class="text-td border-td"><strong>Helyszín:</strong></td>
                    <td class="border-td">{{ selectedRow.location }} / {{ selectedRow.place }}</td>

                  </tr>
                  <tr>
                    <td class="text-td border-td"><strong>Résztvevők:</strong></td>
                    <td class="border-td">{{ selectedRow.participants }} fő</td>
                  </tr>
                  <tr>
                    <td class="text-td border-td"><strong>Időpont:</strong></td>
                    <td class="border-td">{{ selectedRow.date }} / {{ selectedRow.time }}</td>
                  </tr>
                  <tr>
                    <td class="text-td border-td"><strong>Szervező:</strong></td>
                    <td class="border-td">{{ creatorName }}</td>
                  </tr>
                  <tr>
                    <td class="text-td border-td"><strong>Lerakó:</strong></td>
                    <td class="border-td">{{ dumpName }}</td>
                  </tr>
                  <tr>
                    <td class="text-td border-td"><strong>Leírás:</strong></td>
                    <td class="border-td">{{ selectedRow.description }}</td>
                  </tr>

                </table>

              </ion-card>
            </div>
          </ion-card-section>

        </ion-card>
        <div v-if="selectedRow.participants !== 0">
          <ion-card v-model="getParticipantsByEventId"
            style="height: auto; border-radius: 10px; border: 2px solid #186049;" class="border-td modal-card">
            <ion-header>
              <ion-toolbar style="border-radius: 0; width: 101%;">
                <ion-title style="text-align: center; font-size: 15px;"><strong>Résztvevők</strong></ion-title>
              </ion-toolbar>
            </ion-header>
            <ion-card-section>
              <div style="max-height: 180px; overflow-y: auto; margin: 25px; text-align: center;">
                <ion-label style="color: #000; "><strong></strong></ion-label>
                <ul style="list-style-type: none; padding: 0; margin: 0">
                  <li v-for="participant in participants" :key="participant.id">
                    <div @click="openUserProfile(participant.id)">

                      <table>
                        <tr>
                          <td class="text-td border-td" style="border: transparent;">
                            <img :src="participant.profilePictureURL" onerror="this.onerror=null; this.src='https://ionicframework.com/docs/img/demos/avatar.svg'" alt="Participant Avatar"
                              style="width: 50px; height: 50px; border-radius: 50%" />
                          </td>
                          <td class="border-td" style="border: transparent;">
                            <p style="margin: 0">
                              <span class="clickable text-purple-10"
                                style="text-decoration: underline; cursor: pointer">
                                {{ participant.username }},
                              </span>
                            </p>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </li>
                </ul>
              </div>
            </ion-card-section>

          </ion-card>
        </div>
      </ion-content>
      <ion-footer>
        <ion-toolbar class="footer-toolbar">
          <ion-buttons slot="start">
            <ion-button expand="fill" fill="solid" color="danger" style="color:black;"
              @click="closeCard()">Bezárás</ion-button>
          </ion-buttons>
          <ion-buttons slot="end">
            <ion-button slot="end" expand="fill" fill="solid" color="success" @click="joinEvent()"
              :disabled="pairExists">Csatlakozás</ion-button>
          </ion-buttons>

        </ion-toolbar>
      </ion-footer>
    </ion-modal>
    <ion-backdrop v-if="createmodalVisible"></ion-backdrop>
    <ion-modal class="floating-modal" style="height: 600px; margin-top: 0px; background-color: white;"
      v-if="createmodalVisible">

      <div class="ion-justify-content-center ion-align-items-center">
        <ion-header>
          <ion-toolbar>
            <ion-title style="text-align: center;"><strong>Esemény létrehozása</strong></ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-card style="height: 510px; width: 100%; margin: auto;" class="search-card">
          <ion-content>
            <form @submit.prevent="createEvent">
              <ion-grid style="width: 100%; margin: auto">
                <!--<ion-row>
                  <ion-col>
                    <div class="file-upload">
                      <div class="file-upload__area">
                        <div v-if="!file.isUploaded">
                          <ion-item style="border: #000; margin: 70px;">
                            <ion-input v-model="eventPicture" @ionInput="eventPicture = $event.target.value;" type="file" name="" id="" @change="handleFileChange($event)" accept="image/*" />
                          </ion-item>
                          <div v-if="errors.length > 0">
                            <div class="file-upload__error" v-for="(error, index) in errors" :key="index">
                              <span>{{ error }}</span>
                            </div>
                          </div>
                        </div>
                        <div v-if="file.isUploaded" class="upload-preview">
                          <img :src="file.url" v-if="file.isImage" class="file-image" alt="" />
                          <div v-if="!file.isImage" class="file-extention">
                            {{ file.fileExtention }}
                          </div>
                          <span>
                            {{ file.name }}{{ file.isImage ? `.${file.fileExtention}` : "" }}
                          </span>
                          <div style="margin-top: -75px; opacity: 0.7;">
                            <ion-button @click="resetFileInput">Fájl módosítása</ion-button>
                          </div>
                          <div class="" style="margin-top: -50px">
                            <button @click="sendDataToParent">Select File</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ion-col>
                </ion-row>-->
                <ion-row>
                  <ion-col>
                    <ion-item>
                      <!--<ion-input v-model="eventPicture" @ionInput="eventPicture = $event.target.value;" type="file" name="" id="" accept="image/*"/>-->
                    </ion-item>
                  </ion-col>
                </ion-row>
                <ion-row>
                  <ion-col>
                    <ion-item>
                      <ion-label position="floating">Esemény neve</ion-label>
                      <ion-input :value="title" v-model="title" @ionInput="title = $event.target.value;" type="text"></ion-input>
                    </ion-item>
                  </ion-col>
                </ion-row>
                <ion-row>
                  <ion-col>
                    <ion-item>
                      <ion-label position="floating">Város</ion-label>
                      <ion-input :value="location" v-model="location" @ionInput="location = $event.target.value;" type="text"></ion-input>
                    </ion-item>
                  </ion-col>
                  <ion-col>
                    <ion-item>
                      <ion-label position="floating">Utca, tér</ion-label>
                      <ion-input :value="place" v-model="place" @ionInput="place = $event.target.value;" type="text"></ion-input>
                    </ion-item>
                  </ion-col>
                </ion-row>
                <ion-row>
                  <ion-col>
                    <ion-item>
                      <ion-label position="floating">Dátum</ion-label>
                      <ion-input :value="date" v-model="date" @ionInput="date = $event.target.value;" type="date"></ion-input>
                    </ion-item>
                  </ion-col>
                  <ion-col>
                    <ion-item>
                      <ion-label position="floating">Idő</ion-label>
                      <ion-input :value="time" v-model="time" @ionInput="time = $event.target.value;" type="time"></ion-input>
                    </ion-item>
                  </ion-col>
                </ion-row>
                <ion-row>
                  <ion-col>
                    <ion-item>
                      <ion-label position="floating">Lerakó</ion-label>
                      <ion-input :value="dumpId" v-model="dumpId" @ionInput="dumpId = $event.target.value;" type="text" :disabled="true"></ion-input>
                    </ion-item>
                  </ion-col>
                </ion-row>
                <ion-row>
                  <ion-col>
                    <ion-item>
                      <ion-label position="floating">Leírás</ion-label>
                      <ion-textarea :value="description" v-model="description" @ionInput="description = $event.target.value;" type="text"></ion-textarea>
                    </ion-item>
                  </ion-col>
                </ion-row>
              </ion-grid>
              <ion-button expand="block" type="submit">Create Event</ion-button>
            </form>

          </ion-content>
        </ion-card>
        <ion-footer style="margin: 0px;">
          <ion-toolbar class="footer-toolbar">
            <ion-grid>
              <ion-row>
                <ion-col>
                  <ion-button expand="block" color="danger" @click="closeCreate">Bezárás</ion-button>
                </ion-col>
                <ion-col>
                  
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-toolbar>
        </ion-footer>
      </div>
      
    </ion-modal>
  </ion-content>
</template>

<script lang="ts">
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { defineComponent, ref, defineProps } from 'vue';


const props = defineProps<{
  user: UserData | null;
  filteredData: EventData[];
  selectedRow: EventData | null;
  // Add other props as needed
}>()

// Define a ref for controlling modal visibility

const modalVisible = ref(false);

// Function to open the modal
const openModal = () => {
  modalVisible.value = true;
};

// Function to close the modal
const closeModal = () => {
  modalVisible.value = false;
};

const client = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

interface UserData {
  id: string;
  name: string;
  // Add other user properties if needed
}

interface Participant {
  id: string;
  eventId: string;
  profilePictureURL: string;
  username: string;
  city: string;
}

export interface EventData {
  id: string;
  title: string;
  location: string;
  participants: number;
  date: string;
  eventPictureURL: string;
  description: string;
  place: string;
  time: string;
}

export default defineComponent({
  name: 'EvenFilterProba',
  props: {
    maxSize: {
      type: Number,
      default: 10,
      required: true,
    },
    accept: {
      type: String,
      default: "image/*",
    },
  },
  data() {
    return {
      modalVisible: false,
      createmodalVisible: false,
      user: null as UserData | null,
      filteredData: [] as EventData[],
      selectedRow: null as EventData | null,
      participants: [] as Participant[],
      title: '',
      description: '',
      location: '',
      place: '',
      date: '',
      time: '',
      searchTitle: '',
      searchCity: '',
      searchAddress: '',
      model: 0,
      cardVisible: false,
      userId: '',
      creatorId: '',
      creatorName: null,
      dumpId: '',
      dumpName: null,
      minDate: '',
      eventPicture: null,
      pairExists: false,
      searchButtonDisabled: false,
      participantsCardVisible: false,
      loading: true,
      isLoading: false,
      uploadReady: true,
      file: {
        name: "",
        size: 0,
        type: "",
        fileExtention: "",
        url: "",
        isImage: false,
        isUploaded: false,
      },
      errors: [],
    };
  },
  mounted() {
    const storedUser = Cookies.get("user");
    this.user = storedUser ? JSON.parse(storedUser) : null;
    this.fetchEventData();
    const today = new Date().toISOString().split("T")[0];
    this.minDate = today;
    this.searchData();
  },
  computed: {
    checkInputFields(): boolean {
      return !this.searchTitle && !this.searchCity && !this.searchAddress && !this.model && !this.date;
    },
    
  },
  methods: {
    async fetchEventData() {
      const config: AxiosRequestConfig = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      };
      try {
        const data = {
          params: {
            title: this.searchTitle,
            location: this.searchCity,
            place: this.searchAddress,
            participants: this.model.toString(),
            date: this.date || "",
          },
        }
        const response: AxiosResponse<EventData[]> = await client.get('/api/events', data);
        this.filteredData = response.data;
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    },
    async searchData() {
      const config: AxiosRequestConfig = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }
      try {
        const response: AxiosResponse<EventData[]> = await client.get('/api/events', {
          params: {
            title: this.searchTitle,
            location: this.searchCity,
            place: this.searchAddress,
            participants: this.model.toString(),
            date: this.date || "",
          },
          ...config,
        });

        this.filteredData = response.data.filter((item: EventData) => { //{ title: string, location: string, place: string, participants: number, date: string }
          const lowerSearch = this.searchTitle.toLowerCase();
          const lowerCity = this.searchCity.toLowerCase();
          const lowerPlace = this.searchAddress.toLowerCase();

          return (
            item.title.toLowerCase().includes(lowerSearch) &&
            item.location.toLowerCase().includes(lowerCity) &&
            item.place.toLowerCase().includes(lowerPlace) &&
            item.participants >= parseInt(this.model.toString()) &&
            (this.date ? item.date.includes(this.date) : true)
          );
        });

      } catch (error) {
        console.error("Hiba a keresés során:", error);
      }
    },
    async filterReset() {
      try {
        // Clear input fields
        this.searchTitle = "";
        this.searchCity = "";
        this.searchAddress = "";
        this.model = 0;
        this.date = "";

        // Call searchData method to update filteredData
        await this.searchData();
      } catch (error) {
        console.error("Error resetting filters:", error);
      }
    },

    async openModal(row: EventData) {
      this.selectedRow = row;
      this.modalVisible = true;
    },
    closeModal() {
      this.selectedRow = null;
      this.modalVisible = false;
    },

    async openCard(row: any) {
      this.selectedRow = row;
      this.getCreatorName(),
        this.checkPairExists(),
        this.getDumpName(),
        openModal();

    },
    closeCard() {
      this.selectedRow = null;
      closeModal();
    },

    openCreate() {
      this.createmodalVisible = true;
    },
    closeCreate() {
      this.createmodalVisible = false;
    },

    async joinEvent() {
      const config: AxiosRequestConfig = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      };
      try {
        const user = JSON.parse(Cookies.get("user") || "");
        if (!user) {
          alert("Nem vagy bejelentkezve!");
          return;
        }

        if (this.selectedRow !== null && this.selectedRow !== undefined) {
          // Ensure that this.selectedRow is not null or undefined
          const eventId = (this.selectedRow as any).id; // Explicitly specify the type as 'any'
          this.userId = user.id;

          const joindata = {
            eventId: eventId, 
            userId: this.userId,
            };

          const request: AxiosResponse = await client.post("/api/participants", joindata);

          const response = await client.get(`/api/participants/event/${eventId}`, config); // Use eventId here

          const participantCount = response.data.count;
          await client.patch(`/api/events/${eventId}`, { // Use eventId here
            participants: participantCount,
          });

          this.participants = response.data.users; // Moved inside the try block
        } else {
          console.log("this.selectedRow is null or undefined");
        }

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
        if (this.selectedRow !== null && this.selectedRow !== undefined) {
          const creatorId = (this.selectedRow as any).creatorId; // Explicitly specify the type as 'any'

          const response = await client.get(`/api/users/${creatorId}`);

          const user = response.data;

          this.creatorName = user.username;

        }
      } catch (error) {
        console.error("Error fetching creator name:", error);
      }
    },

    async getDumpName() {
      try {
        // Ensure that this.selectedRow is not null or undefined
        if (this.selectedRow && 'dumpId' in this.selectedRow) {
          const response = await axios.get(`/api/dump/name/${'dumpId' in this.selectedRow}`);
          this.dumpName = response.data || null; // Handle the case when response.data is falsy
        } else {
          // Handle the case when selectedRow is null, undefined, or dumpId is missing
          this.dumpName = null;
        }
      } catch (error) {
        console.error("Error fetching dump name:", error);
        this.dumpName = null; // Set dumpName to null in case of error
      }
    },

    async checkPairExists() {
  try {
    // Check if selectedRow and user are not null before accessing their 'id' properties
    if (this.selectedRow && 'id' in this.selectedRow && this.user && 'id' in this.user) {
      const response = await client.get(`/api/participants/check/${this.selectedRow.id}/${this.user.id}`);
      this.pairExists = response.data.exists;
    } else {
      console.error("Either selectedRow or user is null or their 'id' properties are missing.");
      this.pairExists = false;
    }
  } catch (error) {
    console.error("Error checking if user is already joined:", error);
  }
},

    async openParticipantsCard() {
      this.participantsCardVisible = true;
      if (!this.selectedRow) {
        console.error("selectedRow is null");
        return;
      }

      try {

        this.cardVisible = false;
        this.getParticipantsByEventId();

        if (this.selectedRow && 'id' in this.selectedRow) {
          const response = await client.get(`/api/participants/event/${this.selectedRow.id}`);
          this.participants = response.data.users;
        } else {
          console.error("selectedRow is null or does not have an 'id' property");
        }
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    },

    async getParticipantsByEventId() {
      if (!this.selectedRow) {
        console.error("selectedRow is null");
        return;
      }

      try {
        this.participantsCardVisible = true;

        const eventId = this.selectedRow.id; // Access the id property of selectedRow
        const response = await client.get(`/api/participants/event/${eventId}`);
        this.participants = response.data;
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    },

    closeParticipantsCard() {
      this.participantsCardVisible = false;
      this.cardVisible = true;
    },

    openUserProfile(userId: string) {
      this.$router.push(`/user/${userId}`);
    },

    async createEvent() {
      try {
        const user = JSON.parse(Cookies.get("user") || "");
        if (!user) {
          alert("Nem vagy bejelentkezve!");
          return;
        }

        const config: AxiosRequestConfig = {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            },
        };


        this.creatorId = user.id;

        const formData = new FormData();
        formData.append("title", this.title);
        formData.append("description", this.description);
        formData.append("location", this.location);
        formData.append("place", this.place);
        formData.append("date", this.date);
        formData.append("time", this.time);
        formData.append("creatorId", this.creatorId);
        formData.append("dumpId", this.dumpId);

        alert(`${this.eventPicture}`)


        if (this.eventPicture) {
          formData.append("eventPicture", this.eventPicture[0]);
        }

        const response: AxiosResponse = await client.post("/api/events", formData, config);
        console.log("Event creation successful");
        alert("Event created successfully!");
      } catch (error) {
        console.error("Event creation failed:", error);
        alert("Event creation failed. Please try again.");
      }
    },

    handleFileChange(e: any) {
      this.errors = [];
      // Check if file is selected
      if (e.target.files && e.target.files[0]) {
        // Check if file is valid
        if (this.isFileValid(e.target.files[0])) {
          // Get uploaded file
          const file = e.target.files[0];
          // Get file size
          const fileSize: number = Math.round((file.size / 1024 / 1024) * 100) / 100;
          // Get file extension
          const fileExtention: string = file.name.split(".").pop() || '';
          // Get file name
          const fileName: string = file.name.split(".").shift() || '';
          // Check if file is an image
          const isImage: boolean = ["jpg", "jpeg", "png"].includes(fileExtention);
          // Print to console
          console.log(fileSize, fileExtention, fileName, isImage);
          // Load the FileReader API
          const reader = new FileReader();
          reader.addEventListener(
            "load",
            () => {
              if (typeof reader.result === 'string') {
                const url: string = reader.result;
                // Set file data
                this.file = {
                  name: fileName,
                  size: fileSize,
                  type: file.type,
                  fileExtention: fileExtention,
                  isImage: isImage,
                  url: url,
                  isUploaded: true,
                };
              }
            },
            false
          );
          reader.readAsDataURL(file);
        } else {
          console.log("Invalid file");
        }
      }
    },
    isFileSizeValid(fileSize: number) {
      if (fileSize <= this.maxSize) {
        console.log("File size is valid");
      } else {
        console.log("File size should be less than MB");
      }
    },
    isFileTypeValid(fileExtention: string) {
      if (this.accept.split(",").includes(fileExtention)) {
        console.log("File type is valid");
      } else {
        console.log("File type should be");
      }
    },
    isFileValid(file: File) {
      this.isFileSizeValid(Math.round((file.size / 1024 / 1024) * 100) / 100);
      this.isFileTypeValid(file.name.split(".").pop() || '');
      if (this.errors.length === 0) {
        return true;
      } else {
        return false;
      }
    },
    resetFileInput() {
      this.uploadReady = false;
      this.$nextTick(() => {
        this.uploadReady = true;
        this.file = {
          name: "",
          size: 0,
          type: "",
          fileExtention: "",
          url: "",
          isImage: false,
          isUploaded: false,
        };
      });
    },
    sendDataToParent() {
      this.resetFileInput();
      this.$emit("file-uploaded", this.file);
    },
  },
});

</script>

<style scoped>
ion-page {
  --overflow-y: scroll;
}

table {
  font-family: arial, sans-serif;
  color: #000;
  width: 100%;

}

td,
th {
  border: 1px solid #000;
  border-radius: 10px;
  text-align: center;
  padding: 8px;
}

.floating-modal {
  position: fixed;
  top: 50%;
  /* Position at the vertical center */
  left: 50%;
  /* Position at the horizontal center */
  transform: translate(-50%, -50%);
  /* Center the modal */
  width: 80%;
  /* Set the width as desired */
  max-width: 600px;
  /* Set a maximum width if needed */
  background-color: white;
  /* Set background color */
  border-radius: 10px;
  /* Add rounded corners */
  z-index: 9999;
  /* Ensure modal appears above other elements */
  height: 60%;
  border-radius: 16px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

ion-backdrop {
  background: var(--ion-color-dark);
  opacity: 0.3;
}

ion-toolbar {
  --background: #186049;
  --color: white;
  border-radius: 16px 16px 0px 0px;
  padding-left: 10px;
  padding-right: 10px;
}

.footer-toolbar {
  border-radius: 0px 0px 16px 16px;
}

p {
  margin: 5px;
  color: #186049;
}


.text-td {
  width: 100px;

}

.border-td {
  border: 1px solid #186049;
  border-radius: 10px;
}

.smallcard {
  td {
    border: transparent;
    border-radius: 10px;
  }
}

.modal-img {
  max-width: 70%;
  height: auto;
  margin-left: 80px;
  margin-bottom: 10px;
  border-radius: 10px;
}

.modal-card {
  margin-left: 15%;
  width: 70%;
}


@media (max-width: 765px) {
  .modal-img {
    max-width: 100%;
    margin-left: 0px;
  }

  .floating-modal {
    width: 100%;
  }

  .modal-card {
    width: 100%;
    margin-left: 0px;
  }
}

.search-card {
  ion-card {
    border: black 1px solid;
    background-color: #ffffff;
    margin-right: 40%;
    margin-left: 10%;
  }

  ion-card-content {
    border: transparent 1px solid;
    background-color: #ffffff;


  }

  ion-grid {
    margin-right: 10%;
    margin-left: 8%;
    width: 50%;

    /*border: #000 1px solid;*/
    ion-row {

      /*border: #000 1px solid;*/
      ion-col {

        /*border: #000 1px solid;*/
        ion-item {
          margin: 0px;

          ion-input {
            max-width: 100px;
            /*border: #000 1px solid;*/
          }
        }
      }
    }
  }

  .search-input {
    background-color: #e4d5c7;
  }

  .search-button {
    --background: #18604a;
    --color: white;
    --border-radius: 10px;
    --border-color: #247158;
    --border-style: solid;
    --border-width: 1px;
    --ripple-color: #6ab29c;
    --padding-top: 10px;
    --padding-bottom: 10px;
  }

  .delete-filter-button {
    --background: #e4d5c7;
    --color: #95877a;
    --border-radius: 10px;
    --border-color: #e4d5c7;
    --border-style: solid;
    --border-width: 1px;
    --ripple-color: #6ab29c;
    --padding-top: 10px;
    --padding-bottom: 10px;
  }

  .recovery-card {
    margin: auto;
    margin-top: 70px;
    max-width: 500px;
  }

  ion-card {
    background-color: white;
  }



  ion-input {
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

  ion-button {
    --background: #186049;
    --border-radius: 5px;
    margin-top: 15px;
    margin-bottom: 0px;
  }

  .title {
    color: #186049;
    margin-left: 25%;
    margin-bottom: 10px;
    margin-top: 10px;
    font-size: 22px;
    font-weight: bold;
  }

  @media (max-width: 765px) {
    .title {
      margin-left: 5%;
    }
  }

  .megse {
    --background: #95877a;
    --color: #ffffff;
  }

  .kuldes {
    --color: #ffffff;
    float: right;
  }


}

.file-upload {
  border: 2px dashed #ccc;
  border-radius: 5px;
  height: 200px;
}

.file-upload .file-upload__error {
  margin-top: 10px;
  color: #f00;
  font-size: 12px;
}

.file-upload .upload-preview {
  text-align: center;
}

.file-upload .upload-preview .file-image {
  width: 100%;
  height: 200px;
  object-fit: contain;
}

.file-upload .upload-preview .file-extension {
  height: 100px;
  width: 100px;
  border-radius: 8px;
  border: 2px dashed #ccc;
  background: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5em auto;
  font-size: 1.2em;
  padding: 1em;
  text-transform: uppercase;
  font-weight: 500;
}

.file-upload .upload-preview .file-name {
  font-size: 1.2em;
  font-weight: 500;
  color: #000;
  opacity: 0.5;
}

/* Works on Chrome, Edge, and Safari */
.section::-webkit-scrollbar {
  width: 7px;
}

.section::-webkit-scrollbar-track {
  background-color: #ebe2d9;
  border-radius: 15px;

}

.section::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 6px #186049;
  border: #186049 1px solid;
  border-radius: 15px;
}
/* Works on Firefox 
* {
  scrollbar-width:inherit;
  scrollbar-color: #186049 #ebe2d9;
  border-radius: 10px;
}*/
@media (max-width: 768px) {
 .mobile-col {
    max-width: 100%;
    margin-top: 10px;
  }
 .section {
    height: 500px;
    overflow-y: scroll;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
 .mobile-col {
    max-width: 50%;
    margin-top: 20px;
  }
  .mobile-grid{
    overflow: hidden;
  }
 .section {
    height: 600px;
    overflow-y: scroll;
  }
}

@media (min-width: 1025px) {
 .mobile-col {
    max-width: 30%;
    margin-top: 30px;
    overflow: hidden;
  }
 .section {
    height: 700px;
    overflow-y: scroll;
  }
}

</style>
