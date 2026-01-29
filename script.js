document.addEventListener('DOMContentLoaded', () => {
    let hom = document.querySelector('#hom')
    let snake = document.querySelector('#snake')
    let about = document.querySelector('#about')
    let first = document.querySelector('#start-image')
    let end = document.querySelector('#end')

    function generateMon(){
        let mon = new Image()
        mon.src = "./assets/mon.svg"
        mon.style.position = "absolute"
        let homRect = hom.getBoundingClientRect()
        let offsetX = Math.random() * 80 - 80
        let offsetY = Math.random() * 50 - 175
        mon.style.left = `${homRect.left + homRect.width/2 + offsetX}px`
        mon.style.top = `${homRect.top + homRect.height/2 + offsetY}px`
        mon.style.height = "10%"
        mon.style.pointerEvents = "none"
        document.body.appendChild(mon)
        mon.className = "fall-mon"
        mon.addEventListener('animationend', () => mon.remove())
    }

    hom.addEventListener("click", (e) => {
        console.log('homhom')
        generateMon()
    })

    function renderSnake(){
        let rect = snake.getBoundingClientRect()
        let x = rect.left
        let y = rect.top
        let delX = 80
        let delY = 0
        let isMoving = false

        let canSpawn = true
        function spawnTail(x, y){
            if(!canSpawn) return
            canSpawn = false
            let tail = new Image()
            tail.src = "./assets/face.svg"
            tail.style.height = "18%"
            tail.style.left = `${x}px`
            tail.style.top = `${y}px`
            snake.style.opacity = 0
            document.body.appendChild(tail)
            setTimeout(() => { canSpawn = true }, 450)
            setTimeout(() => tail.remove(), 2500)
        }
        function render() {
            snake.style.left = `${x}px`
            snake.style.top = `${y}px`
        }
        function update(){
            if(isMoving){
                console.log('update');
                x += delX
                y += delY
                spawnTail(x, y)
            }
            render()
            requestAnimationFrame(update)
        }
        document.addEventListener('click', (e) => {
            let rect = snake.getBoundingClientRect()
            isMoving = true

            let diffX = e.clientX - (rect.left + rect.width / 2)
            let diffY = e.clientY - (rect.top + rect.height / 2)

            delX = 0
            delY = 0

            if (Math.abs(diffX) > Math.abs(diffY)) {
                delX = diffX > 0 ? 3 : -3
            } else {
                delY = diffY > 0 ? 3 : -3
            }
        })
        update() 
    }
    renderSnake()


    about.addEventListener('mouseover', () => {
        about.style.color = "#4581D4"
    })
    about.addEventListener('mouseout', () =>{
        about.style.color = "white"
    })

    about.addEventListener('click', () =>{
        console.log('yesyes')
        let aboutInterval = setInterval(() =>{
            let angle = Math.random() * 360
            about.style.transform = `rotateZ(${angle}deg)`
            let x = Math.random() * (window.innerWidth - about.offsetWidth);
            let y = Math.random() * (window.innerHeight - about.offsetHeight);
            about.style.left = `${x}px`;
            about.style.top = `${y}px`;
        }, 100)

        setTimeout(() =>{
            clearInterval(aboutInterval)
        }, 2000)
    })


    let stupid = new Image()
    stupid.src = './assets/stupid_face.svg'
    stupid.style.pointerEvents = 'none'

    first.addEventListener('mouseover', () =>{
        stupid.style.position = 'absolute'
        stupid.style.height = '20%'
        stupid.style.left = `${first.getBoundingClientRect().left + first.getBoundingClientRect().left / 4.8}px`
        stupid.style.top = `${first.getBoundingClientRect().top + first.getBoundingClientRect().top / 2.5}px`
        document.body.appendChild(stupid)
        stupid.className = "rotate-st"
    })

    first.addEventListener('mouseout', () =>{
        document.body.removeChild(stupid)
    })


    end.addEventListener('click', () =>{
        let sound = new Audio("./assets/end-sound.mp3")
        sound.play()
    })
})