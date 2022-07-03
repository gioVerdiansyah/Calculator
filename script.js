const calculator = {
    displayNumber: '0',
    operator: null,
    firstNumber: null,
    waitingForSecondNumber: false,
};

function updateDisplay() {
    document.querySelector('#displayNumber').innerText = calculator.displayNumber;
}

function clearCalculator() {
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
}

function inputDigit(digit) {
    calculator.displayNumber += digit;
}

const buttons = document.querySelectorAll('.button');
for (const button of buttons) {
    button.addEventListener('click', function(event) {
        // mendapatkan objek elemen yang diklik
        const target = event.target;

        if (target.classList.contains('clear')) {
            clearCalculator();
            updateDisplay();
            return;
        }
        if (target.classList.contains('negative')) {
            inverseNumber();
            updateDisplay();
            return;
        }

        if (target.classList.contains('equals')) {
            performCalculation();
            updateDisplay();
            return;
        }

        if (target.classList.contains('operator')) {
            handleOperator(target.innerText);
            return;
        }
        inputDigit(target.innerText);
        updateDisplay();
    });
}

function inputDigit(digit) {
    if (calculator.displayNumber === '0') {
        calculator.displayNumber = digit;
    } else {
        calculator.displayNumber += digit;
    }
}

function inverseNumber() {
    if (calculator.displayNumber === '0') {
        return;
    }
    calculator.displayNumber = calculator.displayNumber * -1;
}

function handleOperator(operator) {
    if (!calculator.waitingForSecondNumber) {
        calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;

        // mengatur ulang nilai display number supaya tombol selanjutnya dimulai dari angka pertama lagi
        calculator.displayNumber = '0';
    } else {
        alert('Operator sudah ditetapkan');
    }
}

function performCalculation() {
    if (calculator.firstNumber == null || calculator.operator == null) {
        alert('Anda belum menetapkan operator');
        return;
    }

    let result = 0;
    if (calculator.operator === '+') {
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
    } else {
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
    }

    // objek yang akan dikirimkan sebagai argumen fungsi putHistory()
    const history = {
        firstNumber: calculator.firstNumber,
        secondNumber: calculator.displayNumber,
        operator: calculator.operator,
        result: result
    }
    putHistory(history);
    calculator.displayNumber = result;
    renderHistory();
}




function tombol() {
    let masukkinNama;

    function repeat() {
        masukkinNama = prompt("masukkin nama dulu dong")
        if (masukkinNama === null || masukkinNama == "") {
            alert("masukkin nama!")
            repeat()
            return
        }
        alert("Hallo " + masukkinNama)
    }
    repeat()

    let suitJawa = confirm('mau main suit jawa?')
    while (suitJawa) {
        // menangkap pilihan player
        let p = prompt("Pilih: gajah, semut , orang")


        // membangkitkan bilangan random
        let com = Math.random()

        if (com < 0.34) {
            com = "gajah"
        } else if (com >= 0.34 && com < 0.67) {
            com = "orang"
        } else {
            com = "semut"
        }

        let result = ""

        // menentukan rules

        if (p == com) {
            result = "SERI"
        } else if (p == "gajah") {
            result = (com == "orang") ? "MENANG!" : "KALAH"
        } else if (p == "orang") {
            result = (com == "gajah") ? "KALAH!" : "MENANG!"
        } else if (p == "semut") {
            result = (com == "orang") ? "KALAH!" : "MENANG!"
        } else {
            result = "Tidak Memasukkan Sesuai Input!"
        }

        // tampilkan hasil

        alert("Kamu Memilih " + p + " Dan Komputer Memilih " + com + " \n Hasilnya Adalah Kamu: " + result)

        suitJawa = confirm("Ulangi Lagi?")
    }
    alert("Terimakasih Sudah Menekan Button")
}



// web storange

if (typeof(Storage) !== 'undefined') {
    // Browser mendukung sessionStorage/localStorage.
} else {
    // Browser tidak mendukung sessionStorage/LocalStorage
}

const cacheKey = 'NUMBER';
if (typeof(Storage) !== 'undefined') {
    // pengecekkan apakah data localStorage dengan key NUMBER tersedia atau belum
    if (localStorage.getItem(cacheKey) === 'undefined') {
        // Jika belum maka akan atur dengan nilai awal yakni 0
        localStorage.setItem(cacheKey, 0);
    }

    const button = document.querySelector('#button');
    const clearButton = document.querySelector('#clear');
    const count = document.querySelector('#count');
    button.addEventListener('click', function(event) {
        let number = localStorage.getItem(cacheKey);
        number++;
        localStorage.setItem(cacheKey, number);
        count.innerText = localStorage.getItem(cacheKey);
    });

    clearButton.addEventListener('click', function(event) {
        localStorage.removeItem(cacheKey);
        localStorage.removeItem(CACHE_KEY);
    });
} else {
    alert('Browser tidak mendukung Web Storage');
}

// strorage riwayat perhitungan
const CACHE_KEY = "calculation_history";

function checkForStorage() {
    return typeof(Storage) !== "undefined"
}

function putHistory(data) {
    if (checkForStorage()) {
        let historyData = null;
        if (localStorage.getItem(CACHE_KEY) === null) {
            historyData = [];
        } else {
            historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
        }

        historyData.unshift(data);

        if (historyData.length > 5) {
            historyData.pop();
        }

        localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
    }
}

function showHistory() {
    if (checkForStorage()) {
        return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
    } else {
        return [];
    }
}

function renderHistory() {
    const historyData = showHistory();
    let historyList = document.querySelector("#historyList");


    // selalu hapus konten HTML pada elemen historyList agar tidak menampilkan data ganda
    historyList.innerHTML = "";


    for (let history of historyData) {
        let row = document.createElement('tr');
        row.innerHTML = "<td>" + history.firstNumber + "</td>";
        row.innerHTML += "<td>" + history.operator + "</td>";
        row.innerHTML += "<td>" + history.secondNumber + "</td>";
        row.innerHTML += "<td>" + history.result + "</td>";


        historyList.appendChild(row);
    }
}