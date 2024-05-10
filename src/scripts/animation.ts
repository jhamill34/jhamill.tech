type Entity = {
    position: Vector;
    velocity: Vector;
    acceleration: Vector;
}

type Bounds = {
    lower: Vector;
    upper: Vector;
}

function withinBounds(v: Vector, b: Bounds): boolean {
    return v.x >= b.lower.x && v.x < b.upper.x && v.y >= b.lower.y && v.y < b.upper.y;
}

function randomPosition(bounds: Bounds): Vector {
    return {
        x: Math.random() * (bounds.upper.x - bounds.lower.x) + bounds.lower.x,
        y: Math.random() * (bounds.upper.y - bounds.lower.y) + bounds.lower.y,
    };
}

function squaredDistance(a: Vector, b: Vector): number {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return dx * dx + dy * dy;
}

function newZeroVector(): Vector {
    return {
        x: 0,
        y: 0,
    };
}

function newEntity(bounds: Bounds): Entity {
    return {
        position: randomPosition(bounds),

        // New entities are not moving...
        velocity: newZeroVector(),
        acceleration: newZeroVector(),
    }
}

function cloneEntity(entity: Entity): Entity {
    return {
        position: { ...entity.position },
        velocity: { ...entity.velocity },
        acceleration: { ...entity.acceleration },
    }
}

type Vector = {
    x: number;
    y: number;
}

class NetworkAnimation {
    private readonly _canvas: HTMLCanvasElement | null;
    private readonly _ctx: CanvasRenderingContext2D | null;
    private readonly _max_nodes: number;
    private readonly _bounds: Bounds;

    private _nodes: Entity[];
    private _nodes_buffer: Entity[];

    constructor(id: string, max_nodes: number) {
        const canvas = document.getElementById(id) as HTMLCanvasElement;
        this._ctx = canvas.getContext("2d");
        this._canvas = canvas;

        this._max_nodes = max_nodes;
        this._nodes = new Array(max_nodes);
        this._nodes_buffer = new Array(max_nodes);
        this._bounds = { lower: { x: 0, y: 0 }, upper: { x: 0, y: 0 } };
    }

    init() {
        const canvas = this._canvas;
        if (canvas === null) return;

        const ctx = this._ctx;
        if (ctx === null) return;

        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;

        this._bounds.upper.x = window.innerWidth;
        this._bounds.upper.y = window.innerHeight;

        console.log(canvas.width, canvas.height);
        ctx.scale(dpr, dpr);
    }

    spawn() {
        const canvas = this._canvas;
        if (canvas === null) return;

        for (let i = 0; i < this._max_nodes; i++) {
            const node = this._nodes_buffer[i];
            if (node !== undefined) {
                if (!withinBounds(node.position, this._bounds)) {
                    this._nodes_buffer[i] = newEntity(this._bounds);
                }
            } else {
                this._nodes_buffer[i] = newEntity(this._bounds);
            }
        }
    }

    update() {
        for (let i = 0; i < this._max_nodes; i++) {
            const cur = this._nodes_buffer[i];
            if (this._nodes[i] === undefined) {
                this._nodes[i] = cloneEntity(cur);
            }


            this._nodes[i].velocity.x = cur.velocity.x + cur.acceleration.x;
            this._nodes[i].velocity.y = cur.velocity.y + cur.acceleration.y;

            this._nodes[i].position.x = cur.position.x + cur.velocity.x;
            this._nodes[i].position.y = cur.position.y + cur.velocity.y;
        }
    }

    render() {
        const ctx = this._ctx;
        if (ctx === null) return;

        const canvas = this._canvas;
        if (canvas === null) return;

        const tmp = this._nodes_buffer;
        this._nodes_buffer = this._nodes;
        this._nodes = tmp;

        ctx.clearRect(this._bounds.lower.x, this._bounds.lower.y, this._bounds.upper.x, this._bounds.upper.y);

        for (let i = 0; i < this._max_nodes; i++) {
            const pos = this._nodes[i];
            ctx.fillStyle = "rgba(234, 179, 8, 0.5)";
            ctx.beginPath();
            ctx.arc(pos.position.x, pos.position.y, 5, 0, 360);
            ctx.fill();
        }
    }
}

const n = new NetworkAnimation("my-canvas", 10);

n.init();
window.addEventListener("resize", () => n.init());

function tick() {
    n.spawn();
    n.update();
    n.render();

    window.requestAnimationFrame(tick);
}

window.requestAnimationFrame(tick);

