const template=document.querySelector('.templateContainer')
function expand(e){
    if(e.innerText==''){
        return
    }
    template.style.display='flex'
    const expandContent=document.querySelector('.expandContent')
    expandContent.firstElementChild.innerText=e.innerText
    
}
template.addEventListener('click',(e)=>{
    template.style.display='none'
})
console.log(123);