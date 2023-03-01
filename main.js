const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

class Player {
    constructor() {
        this.position = {
            x: 250,
            y: 250
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 30
        this.height = 30
    }

    draw() {
        c.fillStyle = 'pink'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }

}

class Wall {
    constructor({x, y},height, width) {
        this.position = {
            x,
            y
        }
        this.height = height
        this.width = width
    }
    draw() {
        c.fillStyle = 'black'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    update() {
        maze.forEach((wall) => {
            wall.draw()
        })
            if (keys.right.pressed && keys.right.hitWall == false) {
                scrollOffsetX += 5
                maze.forEach((wall) => {
                    wall.position.x -= 3
                })
            } else if (keys.left.pressed && keys.left.hitWall == false) {
                scrollOffsetX -= 5
                maze.forEach((wall) => {
                    wall.position.x += 3
                })
            } else if (keys.down.pressed && keys.down.hitWall == false) {
                scrollOffsetY += 5
                maze.forEach((wall) => {
                    wall.position.y -= 3
                })
            } else if (keys.up.pressed && keys.up.hitWall == false) {
                scrollOffsetY -= 5
                maze.forEach((wall) => {
                    wall.position.y += 3
                })
            }
    }

}
const player = new Player()
const maze = [new Wall({x: 100, y: 100}, 20, 400), 
            new Wall({x: 100, y: 300}, 20, 400),
            new Wall({x: 500, y: 120}, 400, 20)]

const keys = {
    right: {
        pressed: false,
        hitWall: false
    },
    left: {
        pressed: false,
        hitWall: false
    },
    up: {
        pressed: false,
        hitWall: false
    },
    down: {
        pressed: false,
        hitWall: false
    }
}

let scrollOffsetX = 0
let scrollOffsetY = 0
function collisionDetection() {
    //platform collision detection
    for (let i = 0; i < maze.length; i++) {
        //top of player bottom of platform
        if (player.position.y <= maze[i].position.y + maze[i].height && player.position.y >= maze[i].position.y && player.position.x >= maze[i].position.x && player.position.x <= maze[i].position.x + maze[i].width) {
            keys.up.hitWall = true
            break;
        }
        else {
            keys.up.hitWall = false
        }

        //bottom of player top of platform
        if (player.position.y + player.height >= maze[i].position.y  && player.position.y + player.height <= maze[i].position.y + maze[i].height && player.position.x >= maze[i].position.x && player.position.x <= maze[i].position.x + maze[i].width) {
            keys.down.hitWall = true
            break;
        }
        else {
            keys.down.hitWall = false
        }

        //right of player left of platform
        if (player.position.x + player.width >= maze[i].position.x && player.position.x + player.width <= maze[i].position.x + maze[i].width && player.position.y >= maze[i].position.y && player.position.y <= maze[i].position.y + maze[i].height) {
            keys.right.hitWall = true
            console.log("right")
            break;
        }
        else {
            keys.right.hitWall = false
        }
        
        //left of player right of platform
        if (player.position.x <= maze[i].position.x + maze[i].width && player.position.x >= maze[i].position.x && player.position.y >= maze[i].position.y && player.position.y <= maze[i].position.y + maze[i].height) {
            keys.left.hitWall = true
            break;
        }
        else {
           keys.left.hitWall = false
        }
    }
}
function animate() {
    //clear the canvas
    c.clearRect(0, 0, canvas.width, canvas.height)

    //update functions
    player.update()
    maze.forEach((wall) => {
        wall.update()
    })

    //detect the collisions (left still doesn't work)
    collisionDetection()

    //loop the animation
    requestAnimationFrame(animate)
}

animate()

addEventListener("keydown", (KeyboardEvent) => 
{
    if(KeyboardEvent.key == "a") {
        keys.left.pressed = true;
    }
    else if (KeyboardEvent.key == "d") {
        keys.right.pressed = true;    
    }
    else if (KeyboardEvent.key == "w") {
        keys.up.pressed = true;   
     }
    else if (KeyboardEvent.key == "s") {
        keys.down.pressed = true;   
     }

})

addEventListener("keyup", (KeyboardEvent) => 
{
    if(KeyboardEvent.key == "a") {
        keys.left.pressed = false;
    }
    else if (KeyboardEvent.key == "d") {
        keys.right.pressed = false;    
    }
    else if (KeyboardEvent.key == "w") {
        keys.up.pressed = false;   
     }
    else if (KeyboardEvent.key == "s") {
        keys.down.pressed = false;   
     }

})