<template>
    <ion-page>
      <ion-content :fullscreen="true" style="overflow: hidden;">
        <ion-card :class="{ 'ion-margin-large': screenWidth > 1024 }">
          <ion-card-content :style="{ width: screenWidth > 1024 ? '1000px' : '300px', margin: 'auto'}">
            <div class="ion-padding-horizontal ion-justify-content-center">
            <ion-grid class="ion-no-padding">
                <ion-row>
                <ion-col class="ion-margin-bottom " >
                    <ion-label position="floating" style="padding-left: 30%; font-size: large; font-weight: bold; color: black;">Események szűrése</ion-label>
                </ion-col>
            </ion-row>
              <ion-row>
                <ion-col class="ion-margin-bottom " >
              <ion-item class="ion-margin-bottom" color=" #e4d5c7">
                <ion-label position="floating">Esemény neve</ion-label>
                <ion-input v-model="searchTitle" clearInput></ion-input>
              </ion-item>
            </ion-col>
            <ion-col  class="ion-margin-bottom">
              <ion-item class="ion-margin-bottom " color=" #e4d5c7">
                <ion-label position="floating">Város</ion-label>
                <ion-input v-model="searchCity" clearInput></ion-input>
              </ion-item>
            </ion-col>
            </ion-row>
            <ion-row>
            <ion-col size="6" class="ion-margin-bottom">
              <ion-item class="ion-margin-bottom " color=" #e4d5c7">
                <ion-label position="floating">Utca, tér</ion-label>
                <ion-input v-model="searchAddress" clearInput></ion-input>
              </ion-item>
            </ion-col>
            <ion-col size="6" class="ion-margin-bottom">
              <ion-item class="ion-margin-bottom" color=" #e4d5c7">
                <ion-label position="floating">Min. résztvevők</ion-label>
                <ion-input v-model.number="model" type="number"></ion-input>
              </ion-item>
            </ion-col>
            </ion-row>
              <ion-item class="ion-margin-bottom" color=" #e4d5c7">
                <ion-label position="floating">Dátum</ion-label>
                <ion-input v-model="date" type="date" ></ion-input>
              </ion-item>
              
              <div class="ion-margin-large ion-gutter ">
                <ion-row>
                <ion-col size="6" class="ion-margin-bottom">
                    <ion-button expand="block" @click="filterReset" class="delete-filter-button" :disabled="checkInputFields">Szűrők törlése</ion-button>
                </ion-col>
                <ion-col size="6" class="ion-margin-bottom">
                    <ion-button expand="block" @click="searchData" class="search-button" :disabled="checkInputFields">Keresés</ion-button>
                </ion-col>
                </ion-row>
              </div>
                </ion-grid>
            </div>
          </ion-card-content>
        </ion-card>
        <div v-if="filteredData.length > 0" class="ion-padding-top ion-margin-vertical">
        <ion-grid :class="{ 'ion-margin-top': screenWidth > 1024 }">
          <ion-row>
            <ion-col :size="12 / columns.length" v-for="(column, index) in columns" :key="index">
              <ion-label>{{ column.label }}</ion-label>
            </ion-col>
          </ion-row>
          <ion-row v-for="row in filteredData" :key="row.id" @click="openCard(row)">
            <ion-col :size="12 / columns.length" v-for="(column, index) in columns" :key="index">
              <ion-label>{{ row[column.name] }}</ion-label>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
      <ion-modal v-model="cardVisible">
        <ion-content>
          <ion-card :class="{ 'ion-margin-large': screenWidth > 1024 }" :style="{ width: screenWidth > 1024 ? '500px' : '270px' }">
            <ion-card-header>
              <ion-card-title class="ion-text-center">{{ selectedRow.title }}</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <div v-if="selectedRow">
                <div v-if="selectedRow.eventPictureURL" class="ion-margin-bottom ion-text-center">
                  <ion-img :src="selectedRow.eventPictureURL"></ion-img>
                </div>
                <div v-if="selectedRow.description !== 'null'" class="ion-margin-bottom">
                  <p class="ion-text-center">{{ selectedRow.description }}</p>
                </div>
                <div class="ion-margin-bottom">
                  <strong>Helyszín:</strong> {{ selectedRow.location }}, {{ selectedRow.place }}
                </div>
                <div class="ion-margin-bottom">
                  <strong>Résztvevők:</strong> {{ selectedRow.participants }} fő
                </div>
                <div class="ion-margin-bottom">
                  <strong>Időpont:</strong> {{ selectedRow.date }}, {{ selectedRow.time }}
                </div>
                <div class="ion-margin-bottom">
                  <strong>Szervező:</strong> {{ creatorName }}
                </div>
                <div class="ion-margin-bottom">
                  <strong>Lerakó:</strong> {{ dumpName }}
                </div>
              </div>
            </ion-card-content>
            <ion-card-actions>
              <ion-button color="danger" @click="closeCard">Bezárás</ion-button>
              <ion-button color="warning" @click="openParticipantsCard" :disabled="selectedRow.participants === 0">Résztvevők</ion-button>
              <ion-button color="success" @click="joinEvent" :disabled="pairExists">Csatlakozás</ion-button>
            </ion-card-actions>
          </ion-card>
        </ion-content>
      </ion-modal>
      <ion-modal v-model="participantsCardVisible">
        <ion-content>
          <ion-card :class="{ 'ion-margin-large': screenWidth > 1024 }" :style="{ width: screenWidth > 1024 ? '500px' : '270px' }">
            <ion-card-header>
              <ion-card-title class="ion-text-center">{{ selectedRow.title }}</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <div v-if="participants.length > 0 && !loading">
                <ion-list>
                  <ion-item v-for="participant in participants" :key="participant.id" @click="openUserProfile(participant.id)">
                    <ion-avatar slot="start">
                      <ion-img :src="participant.profilePictureURL"></ion-img>
                    </ion-avatar>
                    <ion-label>
                      <ion-text class="ion-text-underline">{{ participant.username }}</ion-text>,
                      {{ participant.city }}
                    </ion-label>
                  </ion-item>
                </ion-list>
              </div>
              <div v-if="participants.length === 0 && loading" class="ion-text-center">
                <p>No participants for this event.</p>
              </div>
            </ion-card-content>
            <ion-card-actions>
              <ion-button color="danger" @click="closeParticipantsCard">Bezárás</ion-button>
            </ion-card-actions>
          </ion-card>
        </ion-content>
      </ion-modal>

      </ion-content>
      
    </ion-page>
  </template>
  
  <script>
export default {
  data() {
    return {
      screenWidth: window.innerWidth,
      searchTitle: '',
      searchCity: '',
      searchAddress: '',
      model: 0,
      date: '',
      filteredData: [
        { id: 1, title: 'Event 1', location: 'Location 1', place: 'Place 1', participants: 10, date: '2024-03-23', time: '12:00', description: 'Description 1', eventPictureURL: 'https://via.placeholder.com/150', },
        { id: 2, title: 'Event 2', location: 'Location 2', place: 'Place 2', participants: 5, date: '2024-03-24', time: '14:00', description: 'Description 2', eventPictureURL: 'https://via.placeholder.com/150', },
      ],
      user: null,
      cardVisible: false,
      selectedRow: {},
      creatorName: 'Creator',
      dumpName: 'Dumper',
      pairExists: false,
      participantsCardVisible: false, // Fixed typo here
      participants: [],
      loading: false,
      minDate: new Date().toISOString().split('T')[0],
    };
  },
  methods: {
    checkInputFields() {
      return !this.searchTitle && !this.searchCity && !this.searchAddress && !this.model && !this.date;
    },
    searchData() {
      // Simulate search functionality
      this.filteredData = this.filteredData.filter(item => {
        const lowerSearch = this.searchTitle.toLowerCase();
        const lowerCity = this.searchCity.toLowerCase();
        const lowerPlace = this.searchAddress.toLowerCase();

        return (
          item.title.toLowerCase().includes(lowerSearch) &&
          item.location.toLowerCase().includes(lowerCity) &&
          item.place.toLowerCase().includes(lowerPlace) &&
          item.participants >= parseInt(this.model) &&
          (this.date ? item.date.includes(this.date) : true)
        );
      });
    },
    filterReset() {
      // Simulate filter reset
      this.searchTitle = '';
      this.searchCity = '';
      this.searchAddress = '';
      this.model = 0;
      this.date = '';
      this.filteredData = [
        { id: 1, title: 'Event 1', location: 'Location 1', place: 'Place 1', participants: 10, date: '2024-03-23', time: '12:00', description: 'Description 1', eventPictureURL: 'https://via.placeholder.com/150', },
        { id: 2, title: 'Event 2', location: 'Location 2', place: 'Place 2', participants: 5, date: '2024-03-24', time: '14:00', description: 'Description 2', eventPictureURL: 'https://via.placeholder.com/150', },
      ];
    },
    openCard(row) {
      this.selectedRow = row;
      this.cardVisible = true;
    },
    closeCard() {
      this.cardVisible = false;
    },
    openParticipantsCard() {
      // Simulate fetching participants data
      this.participants = [{ id: 1, username: 'Participant 1', city: 'City 1', profilePictureURL: 'https://via.placeholder.com/150' }, { id: 2, username: 'Participant 2', city: 'City 2', profilePictureURL: 'https://via.placeholder.com/150' }];
      this.participantsCardVisible = true; // Fixed typo here
    },
    closeParticipantsCard() {
      this.participantsCardVisible = false; // Fixed typo here
    },
    joinEvent() {
      // Simulate joining event
      this.pairExists = true;
    },
    openUserProfile(userId) {
      // Simulate opening user profile
      console.log('Open user profile:', userId);
    },
    updateScreenWidth() {
      this.screenWidth = window.innerWidth;
    }
  },
  mounted() {
    window.addEventListener('resize', this.updateScreenWidth);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateScreenWidth);
  },
  computed: {
    selectedRowTitle() {
      return this.selectedRow.title;
    }
  }
};
</script>

  
  <style scoped>
  ion-content {
    --ion-background-color: #ffffff; /* Change the background color */
  }
  ion-card{
    border: black 1px solid;
    background-color: #ffffff;
    margin-right: 40%;
    margin-left:10%;
  }
  ion-card-content{
    border: transparent 1px solid;
    background-color: #ffffff;
    
    
  }
  ion-grid{
    margin-right: 10%;
    margin-left: 8%;
    border: transparent 1px solid;
    width: 50%;
    
    ion-col{
        border: transparent 1px solid;
        
        ion-input{
            border: transparent 1px solid;
            max-width: 100px;
        }
    }
   
  }
  
  .search-input{
    background-color:  #e4d5c7;
    
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
  </style>
 