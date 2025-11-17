<template>
  <div>
    <div class="product-container">
      <!-- 상품 이미지 -->
      <div class="image-section">
        <img :src="selectedImage" class="main-image" alt="상품 이미지" />
        <div class="thumbnails">
          <img
            v-for="(img, index) in product.images"
            :key="index"
            :src="img"
            class="thumb"
            @click="selectedImage = img" />
        </div>
      </div>

      <!-- 상품 정보 -->
      <div class="info-section">
        <h1>{{ product.name }}</h1>
        <p class="price">{{ formatPrice(product.price) }}</p>
        <p class="description">{{ product.description }}</p>

        <!-- 수량 선택 -->
        <div class="quantity">
          <button @click="changeQuantity(-1)">-</button>
          <input type="number" v-model="quantity" min="1" />
          <button @click="changeQuantity(1)">+</button>
        </div>
        <!-- 총 금액 -->
        <p class="total-price">총 금액: {{ formatPrice(totalPrice) }}</p>

        <!-- 버튼 -->
        <div class="buttons">
          <button class="like" @click="toggleLike">
            {{ liked ? "❤️ 찜하기 취소" : "🤍 찜하기" }}
          </button>
          <button class="buy" @click="showModal = true">구매하기</button>
        </div>
      </div>

      <!-- 모달창 -->
      <div v-if="showModal" class="modal-overlay" @click="showModal = false">
        <div class="modal-content" @click.stop>
          <h2>구매 안내</h2>
          <p>{{ product.name }}을(를) {{ quantity }}개 구매하시겠습니까?</p>
          <p class="total-price">총 금액: {{ formatPrice(totalPrice) }}</p>
          <div class="buttons">
            <button class="like" @click="showModal = false">취소</button>
            <button class="buy" @click="confirmPurchase">확인</button>
          </div>
        </div>
      </div>
    </div>
    <Tab />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Tab from "./Tab.vue";
const product = ref({
  name: "프리미엄 블루투스 이어폰",
  price: 129000,
  description: "고음질 사운드를 제공하는 최신 블루투스 이어폰.",
  images: [
    "/public/images/img-1.png",
    "/public/images/img-2.png",
    "/public/images/img-3.png",
    "/public/images/img-4.png",
  ],
});
// 총 금액 계산
const totalPrice = computed(() => product.value.price * quantity.value);
const selectedImage = ref(product.value.images[0]);
const quantity = ref(1);
const liked = ref(false);
const showModal = ref(false);

const formatPrice = (price) => `₩${price.toLocaleString()}`;

const changeQuantity = (amount) => {
  if (quantity.value + amount > 0) {
    quantity.value += amount;
  }
};

const toggleLike = () => {
  liked.value = !liked.value;
};

const confirmPurchase = () => {
  alert(`${product.value.name}을(를) ${quantity.value}개 구매 완료!`);
  showModal.value = false;
};
</script>

<style lang="scss" scoped>
.product-container {
  display: flex;
  max-width: 800px;
  margin: auto;
  padding: 20px;
  gap: 20px;
}

.image-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  .main-image {
    width: 100%;
    max-width: 300px;
    border-radius: 10px;
    filter: brightness(1.2); /* 1보다 크면 밝아지고, 1보다 작으면 어두워짐 */
  }

  .thumbnails {
    display: flex;
    gap: 10px;
    margin-top: 10px;

    .thumb {
      width: 50px;
      cursor: pointer;
      border-radius: 5px;
      transition: transform 0.2s;

      &:hover {
        transform: scale(1.1);
      }
    }
  }
}

.info-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;

  h1 {
    font-size: 24px;
  }

  .price , .total-price {
    font-size: 20px;
    font-weight: bold;
    color: #e63946;
  }

  .description {
    color: gray;
  }

  .quantity {
    display: flex;
    align-items: center;
    gap: 10px;

    button {
      width: 30px;
      height: 30px;
      font-size: 20px;
      cursor: pointer;
    }

    input {
      width: 50px;
      text-align: center;
      font-size: 16px;
    }
    
  }

  .buttons {
    display: flex;
    gap: 10px;

    button {
      padding: 10px;
      border: none;
      cursor: pointer;
      border-radius: 5px;
    }

    .like {
      background: lightgray;
    }

    .buy {
      background: #ff6b6b;
      color: white;
    }
  }
}

/* 모달 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;

    .buttons {
      display: flex;
      gap: 10px;
      justify-content: center;

      button {
        padding: 10px;
        border: none;
        cursor: pointer;
        border-radius: 5px;
      }

      .like {
        background: lightgray;
      }

      .buy {
        background: #ff6b6b;
        color: white;
      }
    }
  }
}
</style>
