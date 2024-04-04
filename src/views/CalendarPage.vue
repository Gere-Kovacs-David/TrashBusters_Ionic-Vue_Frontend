<template>
  <ion-page style="background-color: white;">
    
      <div class="calendar">
        <ScheduleXCalendar :calendar-app="calendarApp">
          <template #timeGridEvent="{ calendarEvent }">
      <div class="event">
        {{ calendarEvent.title }}
      </div>
    </template>
  </ScheduleXCalendar>
      </div>
    
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
  selectedDate: '2023-12-19',
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
      title: 'Event 2',
      start: '2023-12-20 12:00',
      end: '2023-12-20 13:00',
    },
    {
      id: 3,
      title: 'Event 3',
      start: '2023-12-19',
      end: '2023-12-21',
    },
    
  ],
  //plugins: [scrollController]
});
/*scrollController.scrollTo('04:00')
overflow-x:hidden;
 overflow-y:scroll;*/
</script>
<style>
.calendar{
  margin:90px 30px 30px 30px;
  
}

</style>

