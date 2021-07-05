const slider =  document.querySelector('.slider-container'),
    slides = Array.from(document.querySelectorAll('.slide'))

let isDragging = false,
    startPos =  0,
    currentTranslate = 0,
    prevTranslate = 0,
    animationID = 0,
    currentIndex = 0

slides.forEach((slide, index) => {
    const slideImage = slide.querySelector('img')
    slideImage.addEventListener('dragstart', e => e.
    preventDefault())

    // touch events
    slide.addEventListener('touchstart', touchStart(index))
    slide.addEventListener('touchend', touchEnd)
    slide.addEventListener('touchmove', touchMove)

    // mouse event
    slide.addEventListener('mousedown', touchStart(index))
    slide.addEventListener('mouseup', touchEnd)
    slide.addEventListener('mouseleave', touchEnd)
    slide.addEventListener('mousemove', touchMove)
})

window.oncontextmenu = function(event){
    event.preventDefault()
    event.stopPropagation()
    return false
}


function touchStart(index){
    return function(event){
        currentIndex = index
        startPos = getPositionX(event)
        isDragging = true

        animationID = requestAnimationFrame(animation)
        slider.classList.add('grabbing')
    }
}

function touchEnd(){
    isDragging = false
    cancelAnimationFrame(animationID)

    const moveBy = currentTranslate - prevTranslate

    if(moveBy < -100 && currentIndex < slides.length - 1)
    currentIndex += 1

    if(moveBy > 100 && currentIndex > 0)
    currentIndex -= 1

    setPositionByIndex()

    slider.classList.remove('grabbing')
}

function touchMove(event){
    if (isDragging){
        const currentPosition = getPositionX(event)
        currentTranslate = prevTranslate + currentPosition - startPos
        console.log(`currentTranslate = ${currentTranslate}, prevTranslate = ${prevTranslate}, currentPosition =${currentPosition} startPos =${startPos}`);
    }
}

function getPositionX(event){
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
}

function animation(){
    setSliderPosition()
    if(isDragging) requestAnimationFrame(animation)
}

function setSliderPosition(){
    slider.style.transform = `translateX(${currentTranslate}px)`
}

function setPositionByIndex(){
    currentTranslate = currentIndex * -window.innerWidth
    console.log(window.innerHeight);
    prevTranslate = currentTranslate
    setSliderPosition()
}