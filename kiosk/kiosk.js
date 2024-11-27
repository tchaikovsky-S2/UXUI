document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab");
  const menuSections = {
    beverage: document.getElementById("menu-section"),
    desert: document.getElementById("desert-section"),
  };

  const cartItems = {};
  const cartDisplay = document.getElementById("cartItems");
  const totalAmountDisplay = document.getElementById("totalAmount");

  // 탭 전환 로직
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // 모든 메뉴 섹션 숨기기
      Object.values(menuSections).forEach((section) => {
        section.style.display = "none";
      });

      // 클릭된 탭의 섹션만 표시
      const target = tab.dataset.tab;
      menuSections[target].style.display = "flex";

      // 모든 탭에서 active 클래스 제거 후 클릭된 탭에 추가
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
    });
  });

  // 메뉴 버튼 이벤트 설정
  document.querySelectorAll("section.menu > article").forEach((menuItem) => {
    menuItem.addEventListener("click", () => {
      const name = menuItem.getAttribute("data-name");
      const price = parseInt(menuItem.getAttribute("data-price"));

      // 장바구니에 아이템 추가 또는 갯수 증가
      if (cartItems[name]) {
        cartItems[name].count++;
      } else {
        cartItems[name] = { price, count: 1 };
      }

      // UI 업데이트
      updateCart();
    });
  });

  // 장바구니 업데이트 함수
  function updateCart() {
    cartDisplay.innerHTML = ""; // UI 초기화
    let total = 0; // 총액 계산 초기화

    for (const name in cartItems) {
      const { price, count } = cartItems[name];
      total += price * count;

      // 아이템 UI 요소 생성
      const itemElement = document.createElement("div");
      itemElement.classList.add("cartItem");

      // 이름 및 수량 표시
      const itemNameAndCount = document.createElement("span");
      itemNameAndCount.textContent = `${name} x ${count}`;

      // 개별 총액 표시
      const itemPrice = document.createElement("span");
      itemPrice.textContent = `${(price * count).toLocaleString()}원`;

      // 수량 감소 버튼
      const decreaseButton = document.createElement("button");
      decreaseButton.textContent = "-";
      decreaseButton.addEventListener("click", () => {
        if (cartItems[name].count > 1) {
          cartItems[name].count--; // 수량 감소
        } else {
          delete cartItems[name]; // 수량이 1이면 삭제
        }
        updateCart(); // UI 갱신
      });

      // 수량 증가 버튼
      const increaseButton = document.createElement("button");
      increaseButton.textContent = "+";
      increaseButton.addEventListener("click", () => {
        cartItems[name].count++; // 수량 증가
        updateCart(); // UI 갱신
      });

      // 제거 버튼
      const removeButton = document.createElement("button");
      removeButton.textContent = "삭제";
      removeButton.addEventListener("click", () => {
        delete cartItems[name]; // 아이템 삭제
        updateCart(); // UI 갱신
      });

      // 요소 구성
      itemElement.appendChild(itemNameAndCount);
      itemElement.appendChild(itemPrice);
      itemElement.appendChild(increaseButton);
      itemElement.appendChild(decreaseButton);
      itemElement.appendChild(removeButton);

      // 요소를 부모에 추가
      cartDisplay.appendChild(itemElement);
    }

    // 총액 업데이트
    totalAmountDisplay.textContent = total.toLocaleString();
  }
});
