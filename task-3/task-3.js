let formInput = document.querySelector('.input')
let formBtn = document.querySelector('.btn')
let textInner = document.querySelector('.text')
let btnClear = document.querySelector('.btn-clear')


function formClear() {
    formInput.value = ''
    textInner.innerHTML = ''
}

function checkInput() {
    let inputVal = formInput.value
    btnClear.style.display = 'block'

    if (inputVal.trim() === '') {
        textInner.innerHTML = 'Введите число!';
    } else if (isNaN(inputVal)) {
        textInner.innerHTML = 'Введите число!'
    } else if (inputVal < 0 || inputVal > 10) {
        textInner.innerHTML = 'число вне диапазона от 1 до 10'
    } else {
        let limit = inputVal

        const xhr = new XMLHttpRequest()
        xhr.open('GET', `https://jsonplaceholder.typicode.com/photos?_limit=${limit}`, true)

        xhr.onload = function () {
            if (xhr.status != 200) {
                console.log('Статус:', xhr.status)
            } else {
                const response = JSON.parse(xhr.responseText)
                console.log('JSON-Ответ:', response)

                let responseLink = ''
                response.forEach(item => {
                    responseLink += `<img src="${item.thumbnailUrl}">`
                });
                textInner.innerHTML = responseLink
            }

        }
        xhr.send();
    }


}

formBtn.addEventListener('click', checkInput)
btnClear.addEventListener('click', formClear)
