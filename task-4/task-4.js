let formInputFirst = document.querySelector('.input_first')
let formInputSecond = document.querySelector('.input_second')
let formBtn = document.querySelector('.btn')
let textInner = document.querySelector('.text')
let btnClear = document.querySelector('.btn-clear')


function formClear() {
    formInputFirst.value = ''
    formInputSecond.value = ''
    textInner.innerHTML = ''
}

function checkInputs() {
    let inputValFirst = formInputFirst.value
    let inputValSecond = formInputSecond.value
    btnClear.style.display = 'block'

    if (inputValFirst.trim() === '' && inputValSecond.trim() === '') {
        textInner.innerHTML = 'Введите число!';
    } else if (isNaN(inputValFirst) || isNaN(inputValSecond)) {
        textInner.innerHTML = 'Введите число!'
    } else if (inputValFirst < 100 || inputValFirst > 300 || inputValSecond < 100 || inputValSecond > 300) {
        textInner.innerHTML = 'одно из чисел вне диапазона от 100 до 300'
    } else {
        let newUrl = `https://picsum.photos/seed/picsum/${inputValFirst}/${inputValSecond}`

        console.log(newUrl)
        fetch(newUrl)
            .then((response) => {
                return textInner.innerHTML = `<img src="${newUrl}">`
            })
            .catch(() => { console.log('error') });
    }


}

formBtn.addEventListener('click', checkInputs)
btnClear.addEventListener('click', formClear)
