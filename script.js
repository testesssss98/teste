let userName = '';
let userBalance = 1000000;  // Saldo inicial do usuário (em dinheiro fictício)
let shoppingCart = [];
let pendingOrders = [];
let userLoggedIn = false;

const cars = {
    koenigsegg: [
        { name: 'Agera RS', engine: '5.0L V8', price: 2500000, colors: ['Preto', 'Branco', 'Vermelho'], images: { 'Preto': 'koenigsegg-agera-preto.jpg', 'Branco': 'koenigsegg-agera-branco.jpg', 'Vermelho': 'koenigsegg-agera-vermelho.jpg' } },
        { name: 'Jesko', engine: '5.0L V8', price: 3000000, colors: ['Azul', 'Preto', 'Prata'], images: { 'Azul': 'koenigsegg-jesko-azul.jpg', 'Preto': 'koenigsegg-jesko-preto.jpg', 'Prata': 'koenigsegg-jesko-prata.jpg' } },
        // Adicione mais carros aqui...
    ],
    ferrari: [
        { name: 'Ferrari SF90', engine: '4.0L V8', price: 1100000, colors: ['Vermelho', 'Amarelo', 'Azul'], images: { 'Vermelho': 'ferrari-sf90-vermelho.jpg', 'Amarelo': 'ferrari-sf90-amarelo.jpg', 'Azul': 'ferrari-sf90-azul.jpg' } },
        { name: 'Ferrari 488 Pista', engine: '3.9L V8', price: 1100000, colors: ['Branco', 'Preto', 'Vermelho'], images: { 'Branco': 'ferrari-488-branco.jpg', 'Preto': 'ferrari-488-preto.jpg', 'Vermelho': 'ferrari-488-vermelho.jpg' } },
        // Adicione mais carros aqui...
    ],
    // Continue com mais marcas...
};

function toggleMenu() {
    const menu = document.getElementById('userMenu');
    menu.classList.toggle('hidden');
}

function createAccount() {
    userName = document.getElementById('userName').value;
    if (userName) {
        userLoggedIn = true;
        document.getElementById('loginForm').classList.add('hidden');
        document.getElementById('store').classList.remove('hidden');
        document.getElementById('carCategories').classList.remove('hidden');
        document.getElementById('saldoSection').classList.remove('hidden');
    } else {
        alert('Por favor, insira um nome.');
    }
}

function showSection(section) {
    if (section === 'saldo') {
        document.getElementById('saldoSection').classList.remove('hidden');
    }
}

function depositMoney() {
    document.getElementById('depositForm').classList.remove('hidden');
    generateSecurityQuestion();
}

function generateSecurityQuestion() {
    const questionElement = document.getElementById('securityQuestion');
    const questions = [
        { question: "Quanto é 2 + 2?", answer: "4", reward: 500000 },
        { question: "Quanto é 10 x 5?", answer: "50", reward: 1000000 },
        { question: "Qual é a capital da França?", answer: "Paris", reward: 1500000 }
    ];
    
    // Selecione uma pergunta aleatória
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    
    questionElement.textContent = randomQuestion.question;
    document.getElementById('depositForm').setAttribute('data-answer', randomQuestion.answer);
    document.getElementById('depositForm').setAttribute('data-reward', randomQuestion.reward);
}

function checkAnswer() {
    const userAnswer = document.getElementById('userAnswer').value;
    const correctAnswer = document.getElementById('depositForm').getAttribute('data-answer');
    const reward = parseInt(document.getElementById('depositForm').getAttribute('data-reward'));
    
    if (userAnswer.trim() === correctAnswer) {
        userBalance += reward;
        document.getElementById('userBalance').textContent = userBalance;
        alert(`Você acertou! Você recebeu R$${reward}.`);
    } else {
        alert('Resposta incorreta. Tente novamente.');
    }

    document.getElementById('depositForm').classList.add('hidden');
}

function showCategories() {
    const categories = document.getElementById('carCategories');
    categories.classList.toggle('hidden');
}

function showCars(brand) {
    const carList = document.getElementById('carList');
    carList.innerHTML = '';
    cars[brand].forEach(car => {
        const carItem = document.createElement('div');
        carItem.classList.add('carItem');
        carItem.innerHTML = `
            <h3>${car.name}</h3>
            <p>Motor: ${car.engine}</p>
            <button onclick="selectCar('${brand}', '${car.name}')">Selecionar Carro</button>
        `;
        carList.appendChild(carItem);
    });
}

function selectCar(brand, carName) {
    const car = cars[brand].find(c => c.name === carName);
    document.getElementById('carDetails').classList.add('hidden');
    document.getElementById('carSelectionDetails').classList.remove('hidden');
    
    document.getElementById('carModel').textContent = `${car.name} - ${car.engine}`;
    
    const colorOptions = document.getElementById('colorOptions');
    colorOptions.innerHTML = '';
    
    car.colors.forEach(color => {
        const colorOption = document.createElement('div');
        colorOption.style.backgroundColor = color.toLowerCase();
        colorOption.onclick = () => updateCarImage(color, car);
        colorOptions.appendChild(colorOption);
    });
}

function updateCarImage(color, car) {
    document.getElementById('selectedCarImage').src = car.images[color];
}

function addToCart() {
    const selectedCar = document.getElementById('carModel').textContent;
    const carName = selectedCar.split(' - ')[0];
    const car = Object.values(cars).flat().find(c => c.name === carName);
    
    if (userBalance >= car.price) {
        shoppingCart.push(car);
        userBalance -= car.price;
        document.getElementById('userBalance').textContent = userBalance;
        alert(`${car.name} foi adicionado ao seu carrinho!`);
    } else {
        alert('Você não tem saldo suficiente para comprar este carro.');
    }
}
