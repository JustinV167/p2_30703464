(function(){
    let buttonlatel=document.querySelector('.buttonlatel')
    let latelmenu=document.querySelector('.latelmenu')
    buttonlatel.addEventListener('click',()=>{
        if(buttonlatel.innerText=='+'){
            latelmenu.classList.add('flex')
            buttonlatel.innerText='-'
            return
        }
        if(buttonlatel.innerText=='-'){
            latelmenu.classList.remove('flex')
            buttonlatel.innerText='+'

        }

    })
})()