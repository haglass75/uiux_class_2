<template>
  <section>
    <!-- 상단 정산 요약 카드 -->
    <div class="mb-4">
      <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg p-4">
        <p class="text-sm opacity-90 mb-2">이번 달 정산 금액</p>
        <p class="text-4xl font-bold mb-4">₩1,850,000</p>
        <div class="flex items-center justify-between text-sm">
          <div class="bg-white/20 rounded-lg px-3 py-2">
            총 15건 완료
          </div>
          <div class="text-right">
            <p class="text-xs opacity-80">정산 완료</p>
            <p class="text-lg font-semibold">₩1,500,000</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 정산 기간 선택 -->
    <div class="mb-4">
      <div class="flex gap-2 overflow-auto no-scrollbar">
        <button
          v-for="period in periodOptions"
          :key="period.value"
          @click="selectedPeriod = period.value"
          class="px-4 py-2 rounded-full text-sm border shadow-sm whitespace-nowrap"
          :class="selectedPeriod === period.value 
            ? 'bg-blue-600 text-white border-blue-600' 
            : 'bg-white text-gray-700 border-gray-300'"
        >
          {{ period.label }}
        </button>
      </div>
    </div>

    <!-- 정산 내역 목록 -->
    <div class="space-y-3">
      <div
        v-for="payment in filteredPayments"
        :key="payment.id"
        class="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm"
      >
        <!-- 날짜와 상태 -->
        <div class="flex items-center justify-between mb-3">
          <p class="font-semibold text-gray-900">{{ payment.date }}</p>
          <span
            class="px-3 py-1 rounded-full text-xs font-medium"
            :class="payment.status === 'completed' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-yellow-100 text-yellow-700'"
          >
            {{ payment.status === 'completed' ? '정산 완료' : '정산 대기' }}
          </span>
        </div>

        <!-- 매장 정보 -->
        <div class="flex items-start gap-3 mb-3">
          <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
            <span class="text-2xl">🏪</span>
          </div>
          <div class="flex-1">
            <p class="font-medium text-gray-900">{{ payment.storeName }}</p>
            <p class="text-sm text-gray-600">{{ payment.address }}</p>
            <p class="text-xs text-gray-500 mt-1">{{ payment.time }}</p>
          </div>
        </div>

        <!-- 금액 정보 -->
        <div class="border-t border-gray-100 pt-3 flex items-center justify-between">
          <div>
            <p class="text-xs text-gray-500">청소 금액</p>
            <p class="text-lg font-bold text-gray-900">₩{{ payment.amount.toLocaleString() }}</p>
          </div>
          <div
            v-if="payment.status === 'completed'"
            class="text-right"
          >
            <p class="text-xs text-gray-500">정산일</p>
            <p class="text-sm font-medium text-green-600">{{ payment.paidDate }}</p>
          </div>
        </div>

        <!-- 상세 버튼 -->
        <button
          @click="viewDetail(payment)"
          class="mt-3 w-full py-2 rounded-lg bg-gray-100 text-gray-700 text-sm"
        >
          상세 보기
        </button>
      </div>
    </div>

    <!-- 빈 상태 -->
    <div
      v-if="filteredPayments.length === 0"
      class="text-center py-12 text-gray-500"
    >
      <span class="text-5xl mb-4 block">📋</span>
      <p>정산 내역이 없습니다</p>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const periodOptions = [
  { label: '전체', value: 'all' },
  { label: '이번 달', value: 'thisMonth' },
  { label: '지난 달', value: 'lastMonth' },
  { label: '3개월', value: 'threeMonths' }
]

const selectedPeriod = ref('thisMonth')

// 정산 내역 데이터
const payments = ref([
  {
    id: 1,
    date: '2025년 1월 15일',
    storeName: '스타벅스 강남점',
    address: '강남구 역삼동',
    time: '오후 2시',
    amount: 120000,
    status: 'completed',
    paidDate: '2025년 1월 20일'
  },
  {
    id: 2,
    date: '2025년 1월 14일',
    storeName: '이디야커피 홍대점',
    address: '마포구 연남동',
    time: '오전 10시',
    amount: 100000,
    status: 'completed',
    paidDate: '2025년 1월 20일'
  },
  {
    id: 3,
    date: '2025년 1월 13일',
    storeName: '메가커피 브라이트',
    address: '송파구 잠실동',
    time: '오후 4시',
    amount: 150000,
    status: 'waiting'
  },
  {
    id: 4,
    date: '2025년 1월 12일',
    storeName: '빙수카페',
    address: '용산구 이태원동',
    time: '오전 11시',
    amount: 130000,
    status: 'waiting'
  },
  {
    id: 4,
    date: '2025년 1월 12일',
    storeName: '빙수카페',
    address: '용산구 이태원동',
    time: '오전 11시',
    amount: 130000,
    status: 'waiting'
  },
  {
    id: 4,
    date: '2025년 1월 12일',
    storeName: '빙수카페',
    address: '용산구 이태원동',
    time: '오전 11시',
    amount: 130000,
    status: 'waiting'
  }
])

const filteredPayments = computed(() => {
  if (selectedPeriod.value === 'all') return payments.value
  
  // 실제로는 날짜 필터링 로직이 들어감
  return payments.value
})

function viewDetail(payment) {
  alert(`${payment.storeName} 정산 상세 정보\n금액: ₩${payment.amount.toLocaleString()}\n상태: ${payment.status === 'completed' ? '정산 완료' : '정산 대기'}`)
}
</script>

<style scoped>
/* .no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
} */
</style>

