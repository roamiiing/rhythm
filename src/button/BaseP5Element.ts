import p5 from 'p5'

export abstract class BaseP5Element {
    p: p5
    constructor(p: p5) {
        this.p = p;
    }

    abstract setup(): void
    abstract draw(delta?: number): void
}
