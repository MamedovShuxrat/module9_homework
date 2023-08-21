let formInputFirst = document.querySelector('.input_first')
let formInputSecond = document.querySelector('.input_second')
let formBtn = document.querySelector('.btn')
let textInner = document.querySelector('.text')
let btnClear = document.querySelector('.btn-clear')


function formClear() {
    formInputFirst.value = ''
    formInputSecond.value = ''
    textInner.innerHTML = ''
    localStorage.removeItem('lastRequest')
}

function getResponse() {
    let inputPage = formInputFirst.value
    let inputLimit = formInputSecond.value
    btnClear.style.display = 'block'

    if (inputPage.trim() === '' || inputLimit.trim() === '') {
        textInner.innerHTML = 'Введите число!';
        return
    }

    if (isNaN(inputPage) && isNaN(inputLimit)) {
        textInner.innerHTML = 'Введите число!';
        return
    }

    if (inputPage < 1 || inputPage > 10) {
        textInner.innerHTML = 'Номер страницы вне диапазона от 1 до 10'
        return
    }

    if (inputLimit < 1 || inputLimit > 10) {
        textInner.innerHTML = 'Лимит вне диапазона от 1 до 10'
        return
    }

    const requestData = {
        page: inputPage,
        limit: inputLimit
    }
    console.log(requestData.page, requestData.limit);
    localStorage.setItem('lastRequest', JSON.stringify(requestData))

    let newUrl = `https://jsonplaceholder.typicode.com/photos?_page=${inputPage}&_limit=${inputLimit}/`

    console.log(newUrl)
    fetch(newUrl)
        .then(response => response.json())
        .then(data => {
            let imagesHTML = '';
            data.forEach(item => {
                const img = `<img src="${item.thumbnailUrl}" alt="${item.title}">`;
                imagesHTML += img;
            });
            textInner.innerHTML = imagesHTML;
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });

}

document.addEventListener('DOMContentLoaded', () => {
    const savedData = JSON.parse(localStorage.getItem('lastRequest'));
    console.log(savedData)
    if (savedData && savedData.page && savedData.limit) {
        formInputFirst.value = savedData.page
        formInputSecond.value = savedData.limit
        getResponse()
    }
})



formBtn.addEventListener('click', getResponse)
btnClear.addEventListener('click', formClear)
