type NetworkNode = {
    id: string;
    x: number;
    y: number;
}

class NetworkAnimation {
    readonly _canvas: HTMLCanvasElement | null;
    readonly _ctx: CanvasRenderingContext2D | null;
    readonly _nodes: NetworkNode[];

    constructor(id: string) {
        const canvas = document.getElementById(id) as HTMLCanvasElement;
        this._ctx = canvas.getContext("2d");
        this._canvas = canvas;
        this._nodes = [];
    }

    init() {
        if (this._canvas !== null) {
            this._canvas.width = window.innerWidth;
            this._canvas.height = window.innerHeight;
        }
    }

    render() {
        const ctx = this._ctx;
        if (ctx === null) {
            return;
        }

        // TODO: spawn and animate nodes?
    }
}

const n = new NetworkAnimation("my-canvas");
n.init();

window.addEventListener("resize", () => n.init());
window.requestAnimationFrame(() => n.render());
