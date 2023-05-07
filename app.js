let s_num1 = '';            // Число1 (string)
let s_num2 = '';            // Число2 (string)
let s_operationSign = '';   // Оператор (string)
let isFinished = false;     // Проверка окончания расчетов (boolean)
let memory = '';            // Число в памяти (string)

const operations = ['-', '+', 'X', '/'];

const screen = document.querySelector('.calc-screen p');

document.querySelector('.ac').addEventListener('click', ClearAll);

document.querySelector('.calc-buttons').addEventListener('click', (event) => {
    if (!event.target.classList.contains('button')) return;
    
    const key = event.target.textContent;

    // Проверка и обработка нажатой кнопки, соответствующей числу
    if (!isNaN(key) || key === '.') {
        if (s_num2 === '' && s_operationSign === '') {
            if ((key === '.' && s_num1.indexOf('.') !== -1) || ((key === '.') && s_num1 === '' )) return;
            s_num1 += key;
            s_num1 = CheckLength(s_num1);
            screen.textContent = s_num1;
        }
        else if (s_num1 !== '' && s_num2 !== '' && isFinished) {
            s_num2 = key;
            isFinished = false;
            screen.textContent = s_num2;
        }
        else {
            if ((key === '.' && s_num2.indexOf('.') !== -1) && s_num2 === '') return;
            s_num2 += key;
            s_num2 = CheckLength(s_num2);
            screen.textContent = s_num2;
        }
        //console.log(s_num1, s_num2, s_operationSign);
        return;
    }
    // Проверка и обработка кнопки, соответствующей оператору
    if (operations.includes(key)) {
        if (s_num1 !== '' && s_num2 !== '' && s_operationSign !== '' && !isFinished) {
            s_num1 = GetResult(s_num1, s_num2, s_operationSign);
            screen.textContent = s_num1;
            isFinished = true;
        }
        s_operationSign = key;
        return;
    }
    // Вычисление результата при нажатии кнопки "="
    if (key === '=') {
        if (s_num2 === '') s_num2 = s_num1;
        s_num1 = GetResult(s_num1, s_num2, s_operationSign);
        screen.textContent = s_num1;
        isFinished = true;
        return;
    }
    // Вычисление процентов, отображение результата без нажатия кнопки "="
    if (key === '%') {
        s_num2 = s_num1 * (s_num2 / 100);
        s_num1 = GetResult(s_num1, s_num2, s_operationSign);
        screen.textContent = s_num1;
        isFinished = true;
        return;
    }
    // Установка в память числа 
    if (key === 'M') {                                      
        if (memory === '') {
            memory = s_num1;
            document.querySelector('.mem').classList.remove('hidden');
            document.querySelector('.mem').textContent = 'M ' + memory.toString();
        }
        // Удаление числа из памяти
        else {                                              
            document.querySelector('.mem').classList.add('hidden');
            memory = '';
        }
        return;
    }
    // Чтение сохраненного в память числа
    if (key === 'MR') {                                     
        if (memory !== '') {
            if (s_num1 === '') {
                s_num1 = memory;
                screen.textContent = s_num1;
            }
            else {
                s_num2 = memory;
                screen.textContent = s_num2;
            }
        }
        return;
    }
})
// Вычисляет и возвращает результат (число1(string), число2(string), оператор(string))
const GetResult = (n1, n2, operation) => {                     
    switch (operation) {
        case '+':
            n1 = (+n1) + (+n2);
            break;
        case '-':
            n1 = n1 - n2;
            break;
        case 'X':
            n1 = n1 * n2;
            break;
        case '/':
            n1 = n1 / n2;
            break;
    }
    return CheckLength(n1.toString());
}
// Ограничение длины строки
const CheckLength = (string) => {
    return string.length > 9 ? string.substring(0, 9) : string;
}
// Общий сброс
function ClearAll() {                                       
    s_num1 = '';
    s_num2 = '';
    s_operationSign = '';
    isFinished = false;
    screen.textContent = 0;
    //console.log('ac');
}


