<template>
  <div class="inquiries-page">
    <h2 class="text-3xl font-bold mb-6">문의 관리</h2>

    <!-- 필터 섹션 -->
    <div class="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div class="flex flex-wrap gap-2">
        <button
          v-for="filter in filters"
          :key="filter"
          @click="currentFilter = filter"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
            currentFilter === filter
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
          ]">
          {{ filter }}
        </button>
      </div>
    </div>

    <!-- 검색 및 통계 -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center">
          <div
            class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <i class="fas fa-inbox text-blue-600 text-xl"></i>
          </div>
          <div class="ml-4">
            <p class="text-gray-500 text-sm">전체 문의</p>
            <p class="text-2xl font-bold text-gray-800">
              {{ inquiries.length }}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center">
          <div
            class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
            <i class="fas fa-clock text-yellow-600 text-xl"></i>
          </div>
          <div class="ml-4">
            <p class="text-gray-500 text-sm">답변 대기</p>
            <p class="text-2xl font-bold text-gray-800">
              {{ inquiries.filter((i) => !i.answered).length }}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center">
          <div
            class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <i class="fas fa-check-circle text-green-600 text-xl"></i>
          </div>
          <div class="ml-4">
            <p class="text-gray-500 text-sm">답변 완료</p>
            <p class="text-2xl font-bold text-gray-800">
              {{ inquiries.filter((i) => i.answered).length }}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center">
          <div
            class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <i class="fas fa-comments text-purple-600 text-xl"></i>
          </div>
          <div class="ml-4">
            <p class="text-gray-500 text-sm">오늘 문의</p>
            <p class="text-2xl font-bold text-gray-800">
              {{ todayInquiries.length }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 검색 바 -->
    <div class="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div class="flex gap-4">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="고객명, 제목, 내용으로 검색..."
          class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        <button
          @click="showSearchModal = true"
          class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          <i class="fas fa-search mr-2"></i>
          검색
        </button>
      </div>
    </div>

    <!-- 문의 목록 -->
    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                번호
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                카테고리
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                제목
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                고객명
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                등록일
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                상태
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                관리
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="inquiry in filteredInquiries"
              :key="inquiry.id"
              class="hover:bg-gray-50 cursor-pointer transition-colors"
              @click="viewInquiry(inquiry)">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ inquiry.id }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'px-2 py-1 text-xs font-medium rounded-full',
                    getCategoryClass(inquiry.category),
                  ]">
                  {{ inquiry.category }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-900">
                <div class="flex items-center">
                  <span>{{ inquiry.title }}</span>
                  <i
                    v-if="inquiry.hasAttachment"
                    class="fas fa-paperclip ml-2 text-gray-400 text-xs"></i>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ inquiry.customerName }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(inquiry.date) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'px-2 py-1 text-xs font-medium rounded-full',
                    inquiry.answered
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800',
                  ]">
                  {{ inquiry.answered ? "답변완료" : "답변대기" }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  @click.stop="viewInquiry(inquiry)"
                  class="text-indigo-600 hover:text-indigo-900 mr-3">
                  <i class="fas fa-eye"></i>
                </button>
                <button
                  v-if="!inquiry.answered"
                  @click.stop="replyToInquiry(inquiry)"
                  class="text-green-600 hover:text-green-900">
                  <i class="fas fa-reply"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 페이지네이션 -->
      <div
        class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div class="flex-1 flex justify-between sm:hidden">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
            이전
          </button>
          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
            다음
          </button>
        </div>
        <div
          class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              전체
              <span class="font-medium">{{ totalItems }}</span
              >개 중
              <span class="font-medium">{{ startItem }}-{{ endItem }}</span
              >개 표시
            </p>
          </div>
          <div>
            <nav
              class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination">
              <button
                @click="currentPage--"
                :disabled="currentPage === 1"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                <i class="fas fa-chevron-left"></i>
              </button>
              <span
                v-for="page in visiblePages"
                :key="page"
                @click="currentPage = page"
                :class="[
                  'relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer',
                  currentPage === page
                    ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                ]">
                {{ page }}
              </span>
              <button
                @click="currentPage++"
                :disabled="currentPage === totalPages"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                <i class="fas fa-chevron-right"></i>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- 문의 상세 모달 -->
    <div
      v-if="selectedInquiry"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div
        class="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-2xl font-bold">문의 상세</h3>
            <button
              @click="selectedInquiry = null"
              class="text-gray-400 hover:text-gray-600">
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>

          <div class="space-y-4">
            <div class="border-b pb-4">
              <div class="flex items-center gap-2 mb-2">
                <span
                  :class="[
                    'px-2 py-1 text-xs font-medium rounded-full',
                    getCategoryClass(selectedInquiry.category),
                  ]">
                  {{ selectedInquiry.category }}
                </span>
                <span
                  :class="[
                    'px-2 py-1 text-xs font-medium rounded-full',
                    selectedInquiry.answered
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800',
                  ]">
                  {{ selectedInquiry.answered ? "답변완료" : "답변대기" }}
                </span>
              </div>
              <h4 class="text-xl font-semibold mb-2">
                {{ selectedInquiry.title }}
              </h4>
              <div class="text-sm text-gray-600">
                <span class="mr-4"
                  >고객명: {{ selectedInquiry.customerName }}</span
                >
                <span>등록일: {{ formatDate(selectedInquiry.date) }}</span>
              </div>
            </div>

            <div class="border-b pb-4">
              <h5 class="font-semibold mb-2">문의 내용</h5>
              <p class="text-gray-700 whitespace-pre-wrap">
                {{ selectedInquiry.content }}
              </p>
            </div>

            <div v-if="selectedInquiry.answer" class="border-b pb-4">
              <h5 class="font-semibold mb-2 text-green-700">답변 내용</h5>
              <p class="text-gray-700 whitespace-pre-wrap">
                {{ selectedInquiry.answer }}
              </p>
              <p class="text-xs text-gray-500 mt-2">
                답변일: {{ formatDate(selectedInquiry.answeredDate) }}
              </p>
            </div>

            <div
              v-if="!selectedInquiry.answered"
              class="flex justify-end gap-3">
              <button
                @click="selectedInquiry = null"
                class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                닫기
              </button>
              <button
                @click="replyToInquiry(selectedInquiry)"
                class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                <i class="fas fa-reply mr-2" ></i>
                답변 작성
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 답변 작성 모달 -->
    <div
      v-if="replyingToInquiry"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg max-w-2xl w-full">
        <div class="p-6">
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-2xl font-bold">답변 작성</h3>
            <button
              @click="replyingToInquiry = null"
              class="text-gray-400 hover:text-gray-600">
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>

          <div class="space-y-4">
            <div class="border-b pb-4">
              <p class="text-sm text-gray-600 mb-2">문의 제목</p>
              <p class="font-semibold">{{ replyingToInquiry.title }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >답변 내용</label
              >
              <textarea
                v-model="replyContent"
                rows="8"
                placeholder="답변 내용을 입력하세요..."
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
            </div>

            <div class="flex justify-end gap-3">
              <button
                @click="replyingToInquiry = null"
                class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                취소
              </button>
              <button
                @click="submitReply"
                class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                <i class="fas fa-check mr-2"></i>
                답변 등록
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const filters = ["전체", "답변대기", "답변완료"];
const currentFilter = ref("전체");
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = 10;
const selectedInquiry = ref(null);
const replyingToInquiry = ref(null);
const replyContent = ref("");

// 샘플 데이터
const inquiries = ref([
  {
    id: 1001,
    category: "서비스 문의",
    title: "청소 서비스 이용 방법이 궁금합니다",
    customerName: "김철수",
    date: new Date("2024-01-15"),
    answered: false,
    content: "청소 서비스를 처음 이용하는데 어떤 절차로 진행되나요?",
    hasAttachment: false,
  },
  {
    id: 1002,
    category: "결제 문의",
    title: "결제 방법 변경이 가능한가요?",
    customerName: "이영희",
    date: new Date("2024-01-14"),
    answered: true,
    content: "신용카드에서 계좌이체로 변경하고 싶습니다.",
    answer:
      "네, 가능합니다. 결제 방법은 마이페이지에서 변경 가능하며, 다음 결제부터 적용됩니다.",
    answeredDate: new Date("2024-01-14"),
    hasAttachment: true,
  },
  {
    id: 1003,
    category: "불만 접수",
    title: "작업 품질이 만족스럽지 않습니다",
    customerName: "박민수",
    date: new Date("2024-01-13"),
    answered: false,
    content: "지난번 청소가 제대로 안 된 것 같습니다. 재청소 가능한가요?",
    hasAttachment: false,
  },
  {
    id: 1004,
    category: "예약 변경",
    title: "예약 시간 변경하고 싶습니다",
    customerName: "정수진",
    date: new Date("2024-01-12"),
    answered: true,
    content: "1월 20일 오후 2시로 예약을 변경 가능한가요?",
    answer: "네, 가능합니다. 예약 시간이 변경되었습니다.",
    answeredDate: new Date("2024-01-12"),
    hasAttachment: false,
  },
  {
    id: 1005,
    category: "기타",
    title: "면세 청소 가능한가요?",
    customerName: "최지영",
    date: new Date("2024-01-11"),
    answered: false,
    content: "특수 청소가 필요한 상황입니다.",
    hasAttachment: true,
  },
]);

// 계산된 속성
const filteredInquiries = computed(() => {
  let result = inquiries.value;

  // 필터 적용
  if (currentFilter.value === "답변대기") {
    result = result.filter((i) => !i.answered);
  } else if (currentFilter.value === "답변완료") {
    result = result.filter((i) => i.answered);
  }

  // 검색 적용
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (i) =>
        i.title.toLowerCase().includes(query) ||
        i.content.toLowerCase().includes(query) ||
        i.customerName.toLowerCase().includes(query)
    );
  }

  // 페이지네이션
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return result.slice(start, end);
});

const totalItems = computed(() => inquiries.value.length);
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage));
const startItem = computed(() => (currentPage.value - 1) * itemsPerPage + 1);
const endItem = computed(() =>
  Math.min(currentPage.value * itemsPerPage, totalItems.value)
);
const todayInquiries = computed(() => {
  const today = new Date().toDateString();
  return inquiries.value.filter((i) => i.date.toDateString() === today);
});

const visiblePages = computed(() => {
  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages.value, start + maxVisible - 1);

  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

// 메서드
function getCategoryClass(category) {
  const classes = {
    "서비스 문의": "bg-blue-100 text-blue-800",
    "결제 문의": "bg-green-100 text-green-800",
    "불만 접수": "bg-red-100 text-red-800",
    "예약 변경": "bg-yellow-100 text-yellow-800",
    기타: "bg-gray-100 text-gray-800",
  };
  return classes[category] || "bg-gray-100 text-gray-800";
}

function formatDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

function viewInquiry(inquiry) {
  selectedInquiry.value = inquiry;
}

function replyToInquiry(inquiry) {
  replyingToInquiry.value = inquiry;
  replyContent.value = "";
}

function submitReply() {
  if (!replyContent.value.trim()) {
    alert("답변 내용을 입력해주세요.");
    return;
  }

  const inquiryIndex = inquiries.value.findIndex(
    (i) => i.id === replyingToInquiry.value.id
  );
  if (inquiryIndex !== -1) {
    inquiries.value[inquiryIndex].answered = true;
    inquiries.value[inquiryIndex].answer = replyContent.value;
    inquiries.value[inquiryIndex].answeredDate = new Date();
  }

  replyingToInquiry.value = null;
  replyContent.value = "";
  selectedInquiry.value = null;
  alert("답변이 등록되었습니다.");
}
</script>

<style scoped>
.inquiries-page {
  max-width: 100%;
}
</style>
