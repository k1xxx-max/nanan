let tg = window.Telegram.WebApp;
tg.expand();

// Получаем данные из URL
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('user_id');
let balance = parseInt(urlParams.get('balance')) || 1000;

// Показываем баланс
document.getElementById('balance').textContent = balance;

function placeBet(amount) {
    if (balance < amount) {
        alert('Недостаточно средств!');
        return;
    }
    balance -= amount;
    document.getElementById('balance').textContent = balance;
    alert(`Ставка ${amount}₽ принята!`);
}

function checkWin() {
    // Случайный результат
    const isWin = Math.random() > 0.5;
    const winAmount = isWin ? 200 : -100;
    
    balance += winAmount;
    document.getElementById('balance').textContent = balance;
    
    // ОТПРАВЛЯЕМ РЕЗУЛЬТАТ ОБРАТНО БОТУ!
    const gameData = {
        user_id: userId,
        amount: winAmount,
        game_type: 'mines'
    };
    
    tg.sendData(JSON.stringify(gameData));
    tg.close();
}