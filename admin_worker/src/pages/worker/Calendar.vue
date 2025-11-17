<template>
  <section>
    <!-- 상단: 월 이동 -->
    <div class="flex items-center justify-between mb-3">
      <button @click="prevMonth" class="px-3 py-2 rounded-lg bg-gray-100">
        이전
      </button>
      <div class="text-base font-semibold">{{ year }}년 {{ month + 1 }}월</div>
      <button @click="nextMonth" class="px-3 py-2 rounded-lg bg-gray-100">
        다음
      </button>
    </div>

    <!-- 요일 헤더 -->
    <div class="grid grid-cols-7 text-center text-xs text-gray-500 mb-1">
      <div>일</div>
      <div>월</div>
      <div>화</div>
      <div>수</div>
      <div>목</div>
      <div>금</div>
      <div>토</div>
    </div>

    <!-- 달력 그리드 -->
    <div class="grid grid-cols-7 gap-1">
      <div
        v-for="d in calendarDays"
        :key="d.key"
        @click="selectDate(d)"
        class="aspect-square rounded-xl flex flex-col items-center justify-center text-sm cursor-pointer select-none"
        :class="dayClass(d)">
        <span>{{ d.date.getDate() }}</span>
        <span
          v-if="countByDateKey[d.key]"
          class="mt-1 text-[10px] px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-700">
          {{ countByDateKey[d.key] }}건
        </span>
      </div>
    </div>

    <!-- 선택 날짜 일정 리스트 -->
    <div class="mt-4">
      <div class="flex items-center justify-between mb-2">
        <p class="text-sm text-gray-600">{{ selectedDateLabel }} 일정</p>
        <select
          v-model="statusFilter"
          class="text-sm border rounded-lg px-2 py-1">
          <option value="all">전체</option>
          <option value="scheduled">예약</option>
          <option value="onroute">이동중</option>
          <option value="working">작업중</option>
          <option value="done">완료</option>
        </select>
      </div>

      <div
        v-if="filteredJobsOfSelected.length === 0"
        class="text-center text-gray-500 text-sm py-6">
        일정이 없습니다.
      </div>

      <ul class="space-y-2">
        <li
          v-for="job in filteredJobsOfSelected"
          :key="job.id"
          class="rounded-xl border p-3 bg-white">
          <div class="flex items-start gap-3">
            <div
              class="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold"
              :class="
                job.type === 'luggage'
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-teal-100 text-teal-700'
              ">
              {{ job.type === "luggage" ? "수" : "제" }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold truncate">
                {{ job.customerName }} ·
                <span class="text-gray-400">{{ job.time }}</span>
              </p>
              <p class="text-xs text-gray-600 truncate">{{ job.address }}</p>
              <div class="mt-2 flex items-center gap-1.5">
                <span
                  class="text-[10px] px-1.5 py-0.5 rounded-full"
                  :class="statusBadgeClass(job.status)"
                  >{{ statusText(job.status) }}</span
                >
                <span
                  v-if="job.memo"
                  class="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-600"
                  >메모</span
                >
              </div>
            </div>
          </div>
          <div class="mt-3 grid grid-cols-3 gap-2 text-xs">
            <a
              :href="'tel:' + job.phone"
              class="py-2 rounded-lg bg-blue-600 text-white text-center"
              >전화</a
            >
            <a
              :href="mapLink(job.address)"
              target="_blank"
              class="py-2 rounded-lg bg-gray-100 text-gray-700 text-center"
              >길찾기</a
            >
            <button
              @click="advance(job)"
              class="py-2 rounded-lg bg-yellow-500 text-white">
              상태변경
            </button>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";

// 더미 일정 데이터 (날짜별)
const jobs = ref([
  {
    id: 1,
    date: "2025-11-10",
    type: "luggage",
    customerName: "김민수",
    phone: "01012345678",
    address: "강남구 테헤란로 12",
    time: "09:30",
    status: "scheduled",
    memo: "엘리베이터 점검",
  },
  {
    id: 2,
    date: "2025-11-11",
    type: "ice",
    customerName: "이서연",
    phone: "01098765432",
    address: "마포구 연남동 23",
    time: "11:00",
    status: "onroute",
    memo: "주차 협소",
  },
  {
    id: 3,
    date: "2025-11-11",
    type: "luggage",
    customerName: "박지호",
    phone: "01055553333",
    address: "송파구 올림픽로 88",
    time: "14:00",
    status: "working",
    memo: "",
  },
  {
    id: 4,
    date: "2025-11-12",
    type: "ice",
    customerName: "장하늘",
    phone: "01022221111",
    address: "용산구 한강대로 5",
    time: "16:00",
    status: "done",
    memo: "사진 필수",
  },
]);

const today = new Date();
const viewDate = ref(new Date(today.getFullYear(), today.getMonth(), 1));
const selectedDate = ref(new Date(today));
const statusFilter = ref("all");

const year = computed(() => viewDate.value.getFullYear());
const month = computed(() => viewDate.value.getMonth());

function fmtKey(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const countByDateKey = computed(() => {
  const acc = {};
  for (const j of jobs.value) {
    acc[j.date] = (acc[j.date] || 0) + 1;
  }
  return acc;
});

const calendarDays = computed(() => {
  const start = new Date(year.value, month.value, 1);
  const end = new Date(year.value, month.value + 1, 0);
  const startWeekday = start.getDay();
  const days = [];
  // 이전 달 채우기
  for (let i = 0; i < startWeekday; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() - (startWeekday - i));
    days.push({ date: d, key: fmtKey(d), outside: true });
  }
  // 이번 달
  for (let d = 1; d <= end.getDate(); d++) {
    const cur = new Date(year.value, month.value, d);
    days.push({ date: cur, key: fmtKey(cur), outside: false });
  }
  // 다음 달 채우기 (42칸)
  while (days.length < 42) {
    const last = days[days.length - 1].date;
    const next = new Date(last);
    next.setDate(next.getDate() + 1);
    days.push({ date: next, key: fmtKey(next), outside: true });
  }
  return days;
});

function dayClass(d) {
  const isToday = fmtKey(d.date) === fmtKey(today);
  const isSelected = fmtKey(d.date) === fmtKey(selectedDate.value);
  return [
    d.outside ? "text-gray-400" : "text-gray-900",
    isToday ? "ring-1 ring-blue-500" : "",
    isSelected ? "bg-blue-600 text-white" : "bg-white",
  ];
}

function selectDate(d) {
  selectedDate.value = new Date(d.date);
}
function prevMonth() {
  viewDate.value = new Date(year.value, month.value - 1, 1);
}
function nextMonth() {
  viewDate.value = new Date(year.value, month.value + 1, 1);
}

const selectedDateLabel = computed(() => {
  const d = selectedDate.value;
  return `${d.getMonth() + 1}월 ${d.getDate()}일`;
});

const jobsOfSelected = computed(() => {
  const key = fmtKey(selectedDate.value);
  return jobs.value.filter((j) => j.date === key);
});

const filteredJobsOfSelected = computed(() => {
  if (statusFilter.value === "all") return jobsOfSelected.value;
  return jobsOfSelected.value.filter((j) => j.status === statusFilter.value);
});

function mapLink(address) {
  const q = encodeURIComponent(address);
  return `https://map.kakao.com/?q=${q}`;
}
function advance(job) {
  const order = ["scheduled", "onroute", "working", "done"];
  const idx = order.indexOf(job.status);
  job.status = order[(idx + 1) % order.length];
}
function statusText(status) {
  switch (status) {
    case "scheduled":
      return "예약";
    case "onroute":
      return "이동중";
    case "working":
      return "작업중";
    case "done":
      return "완료";
    default:
      return status;
  }
}
function statusBadgeClass(status) {
  switch (status) {
    case "scheduled":
      return "bg-blue-50 text-blue-700";
    case "onroute":
      return "bg-yellow-50 text-yellow-700";
    case "working":
      return "bg-orange-50 text-orange-700";
    case "done":
      return "bg-green-50 text-green-700";
    default:
      return "bg-gray-50 text-gray-700";
  }
}
</script>

<style scoped></style>
