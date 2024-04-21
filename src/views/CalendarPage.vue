<template>
  <ion-page style="background-color: white;">
    <ion-card class="calendar">
      <div >
        <ScheduleXCalendar :calendar-app="calendarApp">
          <template #timeGridEvent="{ calendarEvent }" >
          <div class="event">
            {{ calendarEvent.title }}
          </div>
          </template>
        </ScheduleXCalendar>
      </div>
    </ion-card>
  </ion-page>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { IonPage } from '@ionic/vue';
import { ScheduleXCalendar } from '@schedule-x/vue';
import {
  createCalendar,
  viewDay,
  viewWeek,
  viewMonthGrid,
  viewMonthAgenda,
} from '@schedule-x/calendar';

import '@schedule-x/theme-default/dist/index.css';
/*import { createScrollControllerPlugin } from '@schedule-x/scroll-controller'

const scrollController = createScrollControllerPlugin({
  initialScroll: '07:50'
})*/

const calendarApp = createCalendar({
  selectedDate: '2024-04-15',
  views: [viewDay, viewWeek, viewMonthGrid, viewMonthAgenda],
  defaultView: viewMonthGrid.name,
  events: [
    {
      id: 1,
      title: 'Event 1',
      start: '2023-12-19',
      end: '2023-12-22',
    },
    {
      id: 2,
      title: 'Event 1',
      start: '2024-04-20 12:00',
      end: '2024-04-20 14:00',
    },
    {
      id: 3,
      title: 'Event 3',
      start: '2023-12-19',
      end: '2023-12-21',
    },
    {
      id: 4,
      title: 'Event 3',
      start: '2024-04-20 12:10',
      end: '2024-04-20 12:00',
    },
  ],
  //plugins: [scrollController]
});

</script>
<style>
.calendar{
  margin:90px 30px 30px 30px;
 overflow-x:hidden;
 overflow-y:scroll;
}

</style>

