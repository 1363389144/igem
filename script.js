// 游戏变量
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let gameStartTime = null;
let gameTimer = null;

// 游戏初始化
function initGame() {
    const board = document.getElementById('board');
    const timeDisplay = document.getElementById('time');
    const messageDisplay = document.getElementById('message');
    
    // 重置游戏状态
    matchedPairs = 0;
    flippedCards = [];
    board.innerHTML = '';
    messageDisplay.textContent = '开始游戏';
    clearInterval(gameTimer);

    // 创建卡片
    let cardValues = [];
    for (let i = 1; i <= 8; i++) {
        cardValues.push(i, i); // 创建8对卡片
    }
    cardValues = shuffle(cardValues); // 打乱卡片顺序

    // 创建并添加卡片到棋盘
    cardValues.forEach((value, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-value', value);
        cardElement.setAttribute('data-index', index);
        cardElement.addEventListener('click', handleCardClick);
        board.appendChild(cardElement);
        cards.push(cardElement);
    });

    // 启动计时器
    gameStartTime = Date.now();
    gameTimer = setInterval(() => {
        const elapsedTime = Math.floor((Date.now() - gameStartTime) / 1000);
        timeDisplay.textContent = `游戏时间：${elapsedTime}秒`;
    }, 1000);
}

// 打乱数组顺序的函数
function shuffle(array) {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

// 处理卡片点击事件
function handleCardClick(event) {
    const clickedCard = event.target;

    // 如果卡片已经翻开或已匹配，则不做处理
    if (clickedCard.classList.contains('flipped') || clickedCard.classList.contains('matched')) {
        return;
    }

    // 翻开卡片
    clickedCard.classList.add('flipped');

    flippedCards.push(clickedCard);

    // 如果翻开了两张卡片，检查是否匹配
    if (flippedCards.length === 2) {
        const [firstCard, secondCard] = flippedCards;
        if (firstCard.getAttribute('data-value') === secondCard.getAttribute('data-value')) {
            // 匹配成功
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
            matchedPairs++;

            if (matchedPairs === 8) {
                clearInterval(gameTimer);
                document.getElementById('message').textContent = '游戏完成！';
            }
        } else {
            // 匹配失败，翻回去
            setTimeout(() => {
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
            }, 1000);
        }
        flippedCards = [];
    }
}

// 启动游戏
initGame();
