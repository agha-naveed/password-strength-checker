const password = document.getElementById('password-field')
const strengthDiv = document.getElementById('strength')
const strength = document.querySelector('#strength > span')
let btn = document.querySelector('#login-btn')

function* checkStrength(password) {
    const uppercase = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`
    const symbol = `~!@#$%^&*()_-+=|{[:;"'?/>.<,]}` + '`\\'
    const number = `0123456789`

    let uppercaseCount = 0, symbolCount = 0, numberCount = 0;

    let i=0;
    let passwordValue = password.value
    
    while(1) {
        if(passwordValue.includes(uppercase[i])) 
            uppercaseCount++;

        if(passwordValue.includes(symbol[i]))
            symbolCount++;
        
        if(passwordValue.includes(number[i]))
            numberCount++;


        if(i == symbol.length - 1)  break;

        i++;
    }
    

    if(passwordValue.length > 0) {
        strengthDiv.style.display = 'inline-block';
    

        if(uppercaseCount > 0 && symbolCount > 0 && numberCount > 0) {
            
            
            if(passwordValue.length >= 8)
                strength.innerHTML = 'strong'
            
            else if(passwordValue.length >= 6)
                strength.innerHTML = 'medium'
            
            else
                strength.innerHTML = 'weak'
            
        }

        else if(uppercaseCount > 0 || symbolCount > 0 || numberCount > 0) {

            if(passwordValue.length >= 6) {
                strength.innerHTML = 'medium'
            }
            
            else
                strength.innerHTML = 'weak'
        }
        
        else {
            strength.innerHTML = 'weak'
        }

        if(strength.innerHTML == 'weak') 
            strengthDiv.style.color = 'red'

        else if(strength.innerHTML == 'medium')
            strengthDiv.style.color = 'orange'
        
        else
            strengthDiv.style.color = 'rgb(26, 182, 86)'
        
    }

    else if(passwordValue.length == 0)
        strengthDiv.style.display = 'none'

    yield uppercaseCount;
    yield symbolCount;
    yield numberCount;
    return password.value.length
}

password.oninput = () => {

    let generate = checkStrength(password)
    generate.next()
}

btn.addEventListener('click', () => {
    let generate = checkStrength(password)
    let uppercaseCount = generate.next()
    let symbolCount = generate.next()
    let numberCount = generate.next()
    let passwordLength = generate.next()


    if(uppercaseCount.value > 0) {
        document.querySelector('#check-uppercase > span > .fa-xmark').style.display = 'none'
        document.querySelector('#check-uppercase > span > .fa-check').style.display = 'block'
        document.querySelector('#check-uppercase > span > .fa-circle').style.display = 'none'
    }
    else if(uppercaseCount.value == 0) {
        document.querySelector('#check-uppercase > span > .fa-xmark').style.display = 'block'
        document.querySelector('#check-uppercase > span > .fa-check').style.display = 'none'
        document.querySelector('#check-uppercase > span > .fa-circle').style.display = 'none'
    
        document.querySelector('#check-uppercase > span > i').style.color = 'red'
    }


    if(symbolCount.value > 0) {
        document.querySelector('#check-symbol > span > .fa-xmark').style.display = 'none'
        document.querySelector('#check-symbol > span > .fa-check').style.display = 'block'
        document.querySelector('#check-symbol > span > .fa-circle').style.display = 'none'
    }
    else if(symbolCount.value == 0) {
        document.querySelector('#check-symbol > span > .fa-xmark').style.display = 'block'
        document.querySelector('#check-symbol > span > .fa-check').style.display = 'none'
        document.querySelector('#check-symbol > span > .fa-circle').style.display = 'none'
        
        document.querySelector('#check-symbol > span > i').style.color = 'red'
    }


    if(numberCount.value > 0) {
        document.querySelector('#check-number > span > .fa-xmark').style.display = 'none'
        document.querySelector('#check-number > span > .fa-check').style.display = 'block'
        document.querySelector('#check-number > span > .fa-circle').style.display = 'none'
    }
    else if(numberCount.value == 0) {
        document.querySelector('#check-number > span > .fa-xmark').style.display = 'block'
        document.querySelector('#check-number > span > .fa-check').style.display = 'none'
        document.querySelector('#check-number > span > .fa-circle').style.display = 'none'
        
        document.querySelector('#check-number > span > i').style.color = 'red'
    }
    

    if(passwordLength.value >= 6) {
        document.querySelector('#password-length > span > .fa-xmark').style.display = 'none'
        document.querySelector('#password-length > span > .fa-check').style.display = 'block'
        document.querySelector('#password-length > span > .fa-circle').style.display = 'none'
        document.querySelector('#password-length > span > i').style.color = 'green !important'
    }
    else if(passwordLength.value < 6) {
        document.querySelector('#password-length > span > i').style.color = 'red'
        document.querySelector('#password-length > span > .fa-xmark').style.display = 'block'
        document.querySelector('#password-length > span > .fa-check').style.display = 'none'
        document.querySelector('#password-length > span > .fa-circle').style.display = 'none'
    }

})


const showBtn = document.querySelector('.show-hide-icon > .fa-eye')
const hideBtn = document.querySelector('.show-hide-icon > .fa-eye-slash')

hideBtn.addEventListener('click', () => {
    password.type = 'text'
    hideBtn.style.display = 'none'
    showBtn.style.display = 'block'
})
showBtn.addEventListener('click', () => {
    password.type = 'password'
    hideBtn.style.display = 'block'
    showBtn.style.display = 'none'
})
