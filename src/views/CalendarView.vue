<template>
  <div>
    <vue-cal :events="events"></vue-cal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import axios from 'axios';


const events = ref([]);

const accessToken = localStorage.getItem('google_token');

onMounted(async () => {
  const calendarId = '7303341bd0d9389a9fa649552556a7eb639851446532e3ba475919079db398c9@group.calendar.google.com';
  const apiKey = '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';
  const url = `https://www.googleapis.com/calendar/v3/calendars/7303341bd0d9389a9fa649552556a7eb639851446532e3ba475919079db398c9%40group.calendar.google.com/events?key=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`;

  try {
    const response = await axios.get(url,{
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
    });
    events.value = response.data.items.map(item => {
      // 將Google Calendar事件轉換為vue-cal事件的格式
      return {
        start: item.start.dateTime || item.start.date, // 使用dateTime或date，取決於事件是全天事件還是具體時間事件
        end: item.end.dateTime || item.end.date,
        title: item.summary,
        // 其他您需要的欄位...
      };
    });
  } catch (error) {
    console.error("無法獲取日曆資料:", error);
  }
});

</script>
