import {BaseP5Element} from "./BaseP5Element.ts";
import p5 from "p5";

type Key = 'a' | 's' | 'd' | 'f'
type Side = 'left' | 'right'

export type KeyRequestButtonProps = {
    key: Key
    timeToPressMs: number
    side: Side
}

export class KeyRequestButton extends BaseP5Element {
    key: Key
    timeToPressMs: number
    pressed: boolean = false
    velocity: number = 0
    position: number = 0
    side: Side
    sideModifier: number = 1

    constructor(p5instance: p5, options: KeyRequestButtonProps) {
        super(p5instance)
        this.key = options.key
        this.timeToPressMs = options.timeToPressMs
        this.side = options.side
        this.sideModifier = this.side === 'left' ? 1 : -1
    }

    setup() {
        this.velocity = (this.sideModifier * (this.p.width / 4)) / this.timeToPressMs
        this.position = this.p.width / 2 - this.sideModifier * this.p.width / 4


        document.addEventListener('keydown', (e) => {
            if (e.key === this.key) {
                this.pressed = true
            }
        })

        document.addEventListener('keyup', (e) => {
            if (e.key === this.key) {
                this.pressed = false
            }
        })
    }

    draw(delta: number) {
        this.timeToPressMs -= delta
        if (this.timeToPressMs > 0) {
            this.position += this.velocity * delta
            this.p.circle(this.position, this.p.height / 2, 100)
            this.p.fill(this.pressed ? '#fff' : '#000')
            this.p.textSize(32)
            this.p.text(this.key.toUpperCase(), this.position - 10, this.p.height / 2 + 10)
        }
    }
}
