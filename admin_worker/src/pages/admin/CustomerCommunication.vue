<template>
  <div class="communication-page">
    <h2 class="text-3xl font-bold mb-6">고객 소통 관리</h2>

    <!-- 대시보드 통계 -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div
        class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-blue-100 text-sm mb-1">전체 대화</p>
            <p class="text-3xl font-bold">{{ totalConversations }}</p>
          </div>
          <div
            class="w-14 h-14 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <i class="fas fa-comments text-2xl text-blue-500 "></i>
          </div>
        </div>
      </div>

      <div
        class="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-green-100 text-sm mb-1">활성 대화</p>
            <p class="text-3xl font-bold">{{ activeConversations }}</p>
          </div>
          <div
            class="w-14 h-14 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <i class="fas fa-comment-dots text-2xl text-green-500"></i>
          </div>
        </div>
      </div>

      <div
        class="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg shadow-lg p-6 text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-yellow-100 text-sm mb-1">평균 응답 시간</p>
            <p class="text-3xl font-bold">{{ avgResponseTime }}m</p>
          </div>
          <div
            class="w-14 h-14 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <i class="fas fa-clock text-2xl text-yellow-600"></i>
          </div>
        </div>
      </div>

      <div
        class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-purple-100 text-sm mb-1">만족도</p>
            <p class="text-3xl font-bold">{{ satisfactionRate }}%</p>
          </div>
          <div
            class="w-14 h-14 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <i class="fas fa-star text-2xl text-purple-500"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- 필터 및 검색 -->
    <div class="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex flex-wrap gap-2 flex-1">
          <button
            v-for="filter in filters"
            :key="filter.value"
            @click="currentFilter = filter.value"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              currentFilter === filter.value
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
            ]">
            <i :class="[filter.icon, 'mr-2']"></i>
            {{ filter.label }}
          </button>
        </div>
        <div class="flex gap-2">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="고객명으로 검색..."
            class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          <button
            @click="openQuickResponseModal"
            class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <i class="fas fa-bolt mr-2"></i>
            빠른 답변
          </button>
        </div>
      </div>
    </div>

    <!-- 대화 목록 -->
    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                대화 시작일
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                고객명
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                마지막 메시지
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                상태
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                응답 시간
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                만족도
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                관리
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="conversation in filteredConversations"
              :key="conversation.id"
              class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatDate(conversation.startDate) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div
                    :class="[
                      'w-10 h-10 rounded-full flex items-center justify-center text-white font-bold',
                      getCustomerAvatarBg(conversation.customerName),
                    ]">
                    {{ conversation.customerName[0] }}
                  </div>
                  <span class="ml-3 text-sm text-gray-900">
                    {{ conversation.customerName }}
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                <div class="flex items-center">
                  <span>{{ conversation.lastMessage }}</span>
                  <span
                    v-if="conversation.unreadCount > 0"
                    class="ml-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {{ conversation.unreadCount }}
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'px-2 py-1 text-xs font-medium rounded-full',
                    conversation.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : conversation.status === 'waiting'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800',
                  ]">
                  {{ getStatusText(conversation.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ conversation.responseTime }}분
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex">
                    <i
                      v-for="i in 5"
                      :key="i"
                      :class="[
                        'fas fa-star text-xs',
                        i <= conversation.rating
                          ? 'text-yellow-400'
                          : 'text-gray-300',
                      ]"></i>
                  </div>
                  <span
                    v-if="conversation.rating"
                    class="ml-2 text-xs text-gray-600">
                    ({{ conversation.rating }})
                  </span>
                  <span v-else class="ml-2 text-xs text-gray-400">미평가</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  @click="openConversation(conversation)"
                  class="text-indigo-600 hover:text-indigo-900">
                  <i class="fas fa-comment-dots mr-1"></i>
                  대화 보기
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 빈 상태 -->
      <div v-if="filteredConversations.length === 0" class="text-center py-12">
        <i class="fas fa-comments text-6xl text-gray-300 mb-4"></i>
        <p class="text-gray-500 text-lg">대화 내역이 없습니다.</p>
      </div>
    </div>

    <!-- 대화 상세 모달 -->
    <div
      v-if="selectedConversation"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div
        class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
        <div class="p-6 border-b flex justify-between items-center">
          <div class="flex items-center">
            <div
              :class="[
                'w-12 h-12 rounded-full flex items-center justify-center text-white font-bold',
                getCustomerAvatarBg(selectedConversation.customerName),
              ]">
              {{ selectedConversation.customerName[0] }}
            </div>
            <div class="ml-4">
              <h3 class="text-xl font-bold">
                {{ selectedConversation.customerName }}
              </h3>
              <p class="text-sm text-gray-500">
                {{ selectedConversation.email }}
              </p>
            </div>
          </div>
          <button
            @click="selectedConversation = null"
            class="text-gray-400 hover:text-gray-600">
            <i class="fas fa-times text-2xl"></i>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          <div
            v-for="message in conversationMessages"
            :key="message.id"
            :class="[
              'flex',
              message.sender === 'customer' ? 'justify-start' : 'justify-end',
            ]">
            <div
              :class="[
                'max-w-lg',
                message.sender === 'customer'
                  ? 'bg-white'
                  : 'bg-indigo-600 text-white',
                'rounded-lg p-4 shadow-sm',
              ]">
              <div class="text-xs mb-1 opacity-70">
                {{
                  message.sender === "customer"
                    ? selectedConversation.customerName
                    : "관리자"
                }}
              </div>
              <div class="text-sm">{{ message.content }}</div>
              <div class="text-xs mt-2 opacity-70">
                {{ formatDateTime(message.timestamp) }}
              </div>
            </div>
          </div>
        </div>

        <div class="p-6 border-t bg-white">
          <div class="flex gap-3">
            <input
              v-model="newMessage"
              type="text"
              placeholder="메시지를 입력하세요..."
              @keyup.enter="sendMessage"
              class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <button
              @click="sendMessage"
              class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              <i class="fas fa-paper-plane mr-2"></i>
              전송
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 빠른 답변 모달 -->
    <div
      v-if="showQuickResponse"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg max-w-2xl w-full">
        <div class="p-6">
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-2xl font-bold">빠른 답변 템플릿</h3>
            <button
              @click="showQuickResponse = false"
              class="text-gray-400 hover:text-gray-600">
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              v-for="template in quickTemplates"
              :key="template.id"
              @click="selectTemplate(template)"
              class="p-4 border border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors text-left">
              <h4 class="font-semibold mb-2">{{ template.title }}</h4>
              <p class="text-sm text-gray-600">{{ template.content }}</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const filters = [
  { label: "전체", value: "all", icon: "fas fa-list" },
  { label: "활성", value: "active", icon: "fas fa-comment-dots" },
  { label: "대기중", value: "waiting", icon: "fas fa-clock" },
  { label: "완료", value: "closed", icon: "fas fa-check-circle" },
];

const currentFilter = ref("all");
const searchQuery = ref("");
const selectedConversation = ref(null);
const newMessage = ref("");
const showQuickResponse = ref(false);
const messageIdCounter = ref(10);

// 샘플 데이터
const conversations = ref([
  {
    id: 1,
    customerName: "김철수",
    email: "kim@example.com",
    startDate: new Date("2024-01-15"),
    lastMessage: "감사합니다. 다음에도 이용하겠습니다!",
    status: "closed",
    responseTime: 15,
    rating: 5,
    unreadCount: 0,
  },
  {
    id: 2,
    customerName: "이영희",
    email: "lee@example.com",
    startDate: new Date("2024-01-16"),
    lastMessage: "청소 후 확인을 받아볼 수 있나요?",
    status: "active",
    responseTime: 8,
    rating: 4,
    unreadCount: 2,
  },
  {
    id: 3,
    customerName: "박민수",
    email: "park@example.com",
    startDate: new Date("2024-01-17"),
    lastMessage: "혹시 시간 변경이 가능한가요?",
    status: "waiting",
    responseTime: null,
    rating: null,
    unreadCount: 1,
  },
]);

// 샘플 메시지 데이터
const allMessages = ref([
  {
    id: 1,
    conversationId: 1,
    sender: "customer",
    content: "청소 잘 해주셔서 감사합니다!",
    timestamp: new Date("2024-01-15T10:30:00"),
  },
  {
    id: 2,
    conversationId: 1,
    sender: "admin",
    content: "감사합니다! 다음에도 이용해주세요.",
    timestamp: new Date("2024-01-15T10:45:00"),
  },
  {
    id: 3,
    conversationId: 2,
    sender: "customer",
    content: "청소는 언제 시작되나요?",
    timestamp: new Date("2024-01-16T09:00:00"),
  },
  {
    id: 4,
    conversationId: 2,
    sender: "admin",
    content: "예약하신 시간인 오후 2시에 시작됩니다.",
    timestamp: new Date("2024-01-16T09:15:00"),
  },
  {
    id: 5,
    conversationId: 2,
    sender: "customer",
    content: "청소 후 확인을 받아볼 수 있나요?",
    timestamp: new Date("2024-01-16T14:30:00"),
  },
  {
    id: 6,
    conversationId: 3,
    sender: "customer",
    content: "혹시 시간 변경이 가능한가요?",
    timestamp: new Date("2024-01-17T08:00:00"),
  },
]);

// 빠른 답변 템플릿
const quickTemplates = ref([
  {
    id: 1,
    title: "안녕하세요",
    content: "안녕하세요. 고객님의 문의에 답변드리겠습니다.",
  },
  {
    id: 2,
    title: "예약 확인",
    content: "예약이 정상적으로 접수되었습니다. 담당 기사가 연락드리겠습니다.",
  },
  {
    id: 3,
    title: "감사 인사",
    content:
      "이용해 주셔서 감사합니다. 만족스러운 서비스 제공을 위해 노력하겠습니다.",
  },
  {
    id: 4,
    title: "대기 요청",
    content: "잠시만 기다려 주세요. 담당자가 확인 중입니다.",
  },
]);

// 계산된 속성
const filteredConversations = computed(() => {
  let result = conversations.value;

  if (currentFilter.value !== "all") {
    result = result.filter((c) => c.status === currentFilter.value);
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter((c) => c.customerName.toLowerCase().includes(query));
  }

  return result.sort((a, b) => b.startDate - a.startDate);
});

const conversationMessages = computed(() => {
  if (!selectedConversation.value) return [];
  return allMessages.value
    .filter((m) => m.conversationId === selectedConversation.value.id)
    .sort((a, b) => a.timestamp - b.timestamp);
});

const totalConversations = computed(() => conversations.value.length);
const activeConversations = computed(
  () => conversations.value.filter((c) => c.status === "active").length
);
const avgResponseTime = computed(() => {
  const times = conversations.value
    .map((c) => c.responseTime)
    .filter((t) => t !== null);
  if (times.length === 0) return 0;
  return Math.round(times.reduce((a, b) => a + b, 0) / times.length);
});
const satisfactionRate = computed(() => {
  const rated = conversations.value
    .map((c) => c.rating)
    .filter((r) => r !== null);
  if (rated.length === 0) return 0;
  return Math.round((rated.reduce((a, b) => a + b, 0) / rated.length) * 20);
});

// 메서드
function getStatusText(status) {
  const statusMap = {
    active: "진행중",
    waiting: "대기중",
    closed: "완료",
  };
  return statusMap[status] || status;
}

function getCustomerAvatarBg(name) {
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

function formatDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

function formatDateTime(date) {
  if (!date) return "";
  return new Date(date).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function openConversation(conversation) {
  selectedConversation.value = conversation;
  // 읽음 처리
  const idx = conversations.value.findIndex((c) => c.id === conversation.id);
  if (idx !== -1) {
    conversations.value[idx].unreadCount = 0;
  }
}

function sendMessage() {
  if (!newMessage.value.trim() || !selectedConversation.value) return;

  const message = {
    id: messageIdCounter.value++,
    conversationId: selectedConversation.value.id,
    sender: "admin",
    content: newMessage.value,
    timestamp: new Date(),
  };

  allMessages.value.push(message);
  newMessage.value = "";

  // 대화 상태 업데이트
  const idx = conversations.value.findIndex(
    (c) => c.id === selectedConversation.value.id
  );
  if (idx !== -1 && conversations.value[idx].status === "waiting") {
    conversations.value[idx].status = "active";
  }
}

function openQuickResponseModal() {
  showQuickResponse.value = true;
}

function selectTemplate(template) {
  if (selectedConversation.value) {
    newMessage.value = template.content;
    showQuickResponse.value = false;
    document.querySelector('input[v-model="newMessage"]')?.focus();
  }
}
</script>

<style scoped>
.communication-page {
  max-width: 100%;
}

/* 스크롤바 스타일링 */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
