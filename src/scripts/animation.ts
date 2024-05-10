type Entity = {
    position: Vector;
    velocity: Vector;
    acceleration: Vector;

    mass: number;
    charge: number;
}

type Bounds = {
    lower: Vector;
    upper: Vector;
}

function clip(val: number, max: number): number {
    if (val >= max) {
        return max;
    }

    if (val <= -max) {
        return -max;
    }

    return val;
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

function dot(a: Vector, b: Vector): number {
    return a.x * b.x + a.y * b.y;
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

        charge: 0.8,
        mass: 5,
    }
}

function cloneEntity(entity: Entity): Entity {
    return {
        position: { ...entity.position },
        velocity: { ...entity.velocity },
        acceleration: { ...entity.acceleration },
        charge: entity.charge,
        mass: entity.mass,
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
    private readonly _center: Vector;

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
        this._center = { x: 0, y: 0 };
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

        this._center.x = (this._bounds.upper.x - this._bounds.lower.x) / 2;
        this._center.y = (this._bounds.upper.y - this._bounds.lower.y) / 2;

        console.log(canvas.width, canvas.height);
        ctx.scale(dpr, dpr);
    }

    updateCenter(c: Vector) {
        this._center.x = c.x;
        this._center.y = c.y;
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
        const distance: Vector = { x: 0, y: 0 };

        for (let i = 0; i < this._max_nodes; i++) {
            const cur = this._nodes_buffer[i];
            if (this._nodes[i] === undefined) {
                this._nodes[i] = cloneEntity(cur);
            }

            let coef: number = 0;
            const force: Vector = { x: 0, y: 0 };

            for (let j = 0; j < this._max_nodes; j++) {
                if (i === j) continue;

                const other = this._nodes_buffer[j];

                distance.x = cur.position.x - other.position.x;
                distance.y = cur.position.y - other.position.y;

                const dSquare = dot(distance, distance);

                coef = (cur.charge * other.charge) / dSquare;

                force.x += coef * distance.x;
                force.y += coef * distance.y;
            }

            force.x += cur.mass * 0.01 * -cur.velocity.x;
            force.y += cur.mass * 0.01 * -cur.velocity.y;

            this._nodes[i].acceleration.x = cur.acceleration.x + 0.1 * (force.x / cur.mass);
            this._nodes[i].acceleration.y = cur.acceleration.y + 0.1 * (force.y / cur.mass);

            this._nodes[i].velocity.x = cur.velocity.x + 0.1 * this._nodes[i].acceleration.x;
            this._nodes[i].velocity.y = cur.velocity.y + 0.1 * this._nodes[i].acceleration.y;

            this._nodes[i].position.x = cur.position.x + 0.1 * this._nodes[i].velocity.x;
            this._nodes[i].position.y = cur.position.y + 0.1 * this._nodes[i].velocity.y;
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

        const distance: Vector = { x: 0, y: 0 };
        for (let i = 0; i < this._max_nodes; i++) {
            const cur = this._nodes[i];
            for (let j = 0; j < this._max_nodes; j++) {
                if (i === j) continue;
                const other = this._nodes[j];

                distance.x = cur.position.x - other.position.x;
                distance.y = cur.position.y - other.position.y;

                const dSquared = dot(distance, distance);
                if (dSquared < 10000) {
                    ctx.strokeStyle = "#1e293b";
                    ctx.beginPath();
                    ctx.moveTo(cur.position.x, cur.position.y);
                    ctx.lineTo(other.position.x, other.position.y);
                    ctx.stroke();
                }
            }
        }


        for (let i = 0; i < this._max_nodes; i++) {
            const pos = this._nodes[i];
            ctx.fillStyle = "rgba(234, 179, 8, 0.1)";
            ctx.beginPath();
            ctx.arc(pos.position.x, pos.position.y, 10, 0, 360);
            ctx.fill();
        }
    }
}

const n = new NetworkAnimation("my-canvas", 50);

window.addEventListener("mousemove", (e) => {
    n.updateCenter(e);
});

window.addEventListener("mouseenter", (e) => {
    n.updateCenter(e);
});

window.addEventListener("mouseleave", () => {
    n.updateCenter({ x: 0, y: 0 });
});

n.init();
window.addEventListener("resize", () => n.init());

function tick() {
    n.spawn();
    n.update();
    n.render();

    window.requestAnimationFrame(tick);
}

window.requestAnimationFrame(tick);

