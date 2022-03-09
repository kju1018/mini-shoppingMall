// Fetch the items from the JSON file
function loadItems() {
  return fetch("data/data.json")
    .then((response) => response.json())
    .then((json) => json.items);
}

// 아이템들을 받아서 리스트로 업데이트
function displayItems(items) {
  const container = document.querySelector(".items");
  container.innerHTML = items.map((item) => createHTMLString(item)).join('');
}

// 받은 아이템들로 html 리스트 만들기
function createHTMLString(item) {
  return `
    <li class="item">
      <img src="${item.image}" alt="${item.type}" class="item__thumbnail" />
      <span class="item__description">${item.gender}, ${item.size}</span>
    </li>
  `;//string Template의 장점: 문자열과 변수를 중간중간에 섞어서 사용 가능
}

function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;
  
  if(key == null || value == null) {
    return;
  }

  displayItems(items.filter(item => item[key] === value))

}

function setEventListeners(items) {
  const logo = document.querySelector('.logo');
  const buttons = document.querySelector('.buttons');
  // event위임 하나하나의 이벤트 리스너를 반복해서 등록하는것보다 컨테이너에 등록해서
  // 한곳에서 핸들링함
  logo.addEventListener('click', () => displayItems(items));
  buttons.addEventListener('click', event => onButtonClick(event, items));
}

// main
loadItems()
  .then((items) => {
    displayItems(items);
    setEventListeners(items);
  })
  .catch(console.log());
