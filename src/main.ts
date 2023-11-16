import p5 from 'p5'

const sketchParent = document.querySelector('#app')!

// block context menu
sketchParent.addEventListener('contextmenu', (e) => e.preventDefault())

const PLAYER_SIZE = 128

new p5((p: p5) => {
    let walkGif!: p5.Image
    let idleGif!: p5.Image
    let attack1Gif!: p5.Image
    let attack2Gif!: p5.Image

    p.preload = () => {
        walkGif = p.loadImage('assets/thief2_Walk.gif')
        idleGif = p.loadImage('assets/thief2_Idle.gif')
        attack1Gif = p.loadImage('assets/thiefAttack2_attack-1.gif')
        attack2Gif = p.loadImage('assets/thiefAttack2_attack-2.gif')
    }

    p.setup = () => {
        p.createCanvas(sketchParent.clientWidth, window.innerHeight).parent(
            sketchParent,
        )
    }

    p.draw = () => {
        const currentGif = p.mouseIsPressed
            ? {
                  [p.LEFT]: attack1Gif,
                  [p.RIGHT]: attack2Gif,
              }[p.mouseButton as p5.LEFT | p5.RIGHT]
            : p.keyIsPressed
              ? walkGif
              : idleGif

        p.background('#fff')
        p.noSmooth()

        p.push()

        p.translate(p.width / 2, p.height * 0.8)

        p.push()
        if (p.mouseX < p.width / 2) {
            p.scale(-1, 1)
        }

        p.image(
            currentGif,
            -PLAYER_SIZE / 2,
            -PLAYER_SIZE / 2,
            PLAYER_SIZE,
            PLAYER_SIZE,
        )
        p.pop()

        p.pop()

        p.fill('#00000033')
        p.circle(p.mouseX, p.mouseY, 50)
    }
})
