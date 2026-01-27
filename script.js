document.addEventListener('DOMContentLoaded', () => {
    let hom = document.querySelector('#hom')
    let snake = document.querySelector('#snake')
    

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
        generateMon()
    })

    function renderSnake(){
        let rect = snake.getBoundingClientRect()
        let x = rect.left
        let y = rect.top
        let delX = 2
        let delY = 0
        let isMoving = false

        let trail = []
        let maxLengthTrail = 15
        let tailDots = []

        

        function render() {
            for (let i = 0; i < maxLengthTrail; i++) {
            console.log('yes')
            let dot = document.createElement('div')
            dot.style.position = 'absolute'
            let size = snake.getBoundingClientRect().width
            dot.style.width = `${size}px`
            dot.style.height = `${size}px`
            dot.style.backgroundImage = 'url(assets/face.svg)'
            dot.style.backgroundSize = 'contain'
            dot.style.backgroundRepeat = 'no-repeat'
            dot.style.pointerEvents = 'none'
            dot.style.opacity = 1 - i / maxLengthTrail
            dot.style.zIndex = '-1'
            dot.style.display = 'none'
            document.body.appendChild(dot)
            tailDots.push(dot)
        }
            snake.style.left = `${x}px`
            snake.style.top = `${y}px`

            /*tailDots.forEach(dot => dot.style.display = 'none')*/

            trail.forEach((pos, i) => {
                let dot = tailDots[i]
                if (!dot) return
                dot.style.display = 'block'
                dot.style.left = `${pos.x - segmentDistance / 2}px`
                dot.style.top = `${pos.y - segmentDistance / 2}px`

            })
        }


        let segmentDistance = 40

        function update(){
            if(isMoving){
                console.log('update');
                
                x += delX
                y += delY
                if(trail.length === 0){
                    trail.push({ x, y })
                }
                if (Math.hypot(x - trail[trail.length - 1].x, y - trail[trail.length - 1].y) >= segmentDistance) 
                {
                    trail.push({ x, y })
                }
                if (trail.length > maxLengthTrail)
                {
                    trail.shift()
                }
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
})