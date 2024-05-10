type Position = {
    x: number;
    y: number;
}

class NetworkAnimation {
    private readonly _canvas: HTMLCanvasElement | null;
    private readonly _ctx: CanvasRenderingContext2D | null;
    private readonly _max_nodes: number;

    private _nodes: Position[];

    constructor(id: string, max_nodes: number) {
        const canvas = document.getElementById(id) as HTMLCanvasElement;
        this._ctx = canvas.getContext("2d");
        this._canvas = canvas;

        this._max_nodes = max_nodes;
        this._nodes = [];
    }

    init() {
        const canvas = this._canvas;
        if (canvas === null) return;

        const ctx = this._ctx;
        if (ctx === null) return;

        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;

        ctx.scale(dpr, dpr);
    }

    spawn() {
        const canvas = this._canvas;
        if (canvas === null) return;
        this._nodes = this._nodes.filter(node => {
            return node.y >= 0 && node.y < canvas.height && node.x >= 0 && node.x < canvas.width;
        });


        const toAdd = this._max_nodes - this._nodes.length;

        for (let i = 0; i < toAdd; i++) {
            this._nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
            });
        }
    }

    update() {
        for (let i = 0; i < this._nodes.length; i++) {
            this._nodes[i].x += 0;
            this._nodes[i].y += 1;
        }
    }

    render() {
        const ctx = this._ctx;
        if (ctx === null) return;

        const canvas = this._canvas;
        if (canvas === null) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.reset();

        for (let i = 0; i < this._nodes.length; i++) {
            const pos = this._nodes[i];
            ctx.fillStyle = "rgba(234, 179, 8, 0.2)";
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, 10, 0, 360);
            ctx.fill();
        }
    }
}

const n = new NetworkAnimation("my-canvas", 50);
n.init();
window.addEventListener("resize", () => n.init());

function tick() {
    n.spawn();
    n.update();
    n.render();

    window.requestAnimationFrame(tick);
}


window.requestAnimationFrame(tick);

