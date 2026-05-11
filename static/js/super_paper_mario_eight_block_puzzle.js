const canvas = document.querySelector("#block-puzzle-canvas");
const ctx = canvas.getContext("2d");
const stateEl = document.querySelector("#block-puzzle-state");
const hitsEl = document.querySelector("#block-puzzle-hits");
const resetButton = document.querySelector("#block-puzzle-reset");

const BLOCK_TRANSITIONS = [
    0b10101101,
    0b11010110,
    0b10111010,
    0b01111001,
    0b11101010,
    0b00011111,
    0b01100111,
    0b11010101,
];

const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const BLOCK_COUNT = 8;
const BLOCK_SIZE = 32;
const BLOCK_GAP = 36;
const BLOCKS_TOTAL_WIDTH = BLOCK_COUNT * BLOCK_SIZE + (BLOCK_COUNT - 1) * BLOCK_GAP;
const BLOCKS_X = (WIDTH - BLOCKS_TOTAL_WIDTH) / 2;
const BLOCKS_Y = 96;
const GROUND_Y = 228;
const GROUND_TILE = 32;

const MARIO_WIDTH = 32;
const MARIO_HEIGHT = 32;
const MOVE_SPEED = 3.2;
const JUMP_VELOCITY = -11.5;
const GRAVITY = 0.48;

// Physics constants above are tuned against a ~16.67 ms step. Multiply dt by
// this factor to convert elapsed ms into step units so the sim runs at
// the same speed regardless of display refresh rate.
const TIME_SCALE = 60 / 1000;

const SPRITES_SRC = "/img/smbsprites/mario_smb.png";
const TILES_SRC = "/img/smbsprites/tiles_smb.png";

const MARIO_FRAMES = {
    idle: [0, 88, 16, 16],
    run1: [16, 88, 16, 16],
    run2: [32, 88, 16, 16],
    run3: [48, 88, 16, 16],
    jump: [80, 88, 16, 16],
};
const RUN_CYCLE = ["run1", "run2", "run3"];

const TILE_FRAMES = {
    dim: [32, 0, 16, 16],
    lit: [64, 0, 16, 16],
    ground: [0, 0, 16, 16],
};

const TRACKED_KEYS = new Set(["KeyA", "KeyD", "KeyW"]);

const game = {
    blocks: 0,
    mario: {
        x: WIDTH / 2 - MARIO_WIDTH / 2,
        y: GROUND_Y - MARIO_HEIGHT,
        vx: 0,
        vy: 0,
        grounded: true,
        facing: 1,
        runPhase: 0,
    },
    keys: new Set(),
    hitCount: 0,
    prevJumpHeld: false,
    blockAnim: new Array(BLOCK_COUNT).fill(0),
    loaded: false,
};

const assets = {
    sprites: null,
    tiles: null,
};

function reset() {
    game.blocks = 0;
    game.mario.x = WIDTH / 2 - MARIO_WIDTH / 2;
    game.mario.y = GROUND_Y - MARIO_HEIGHT;
    game.mario.vx = 0;
    game.mario.vy = 0;
    game.mario.grounded = true;
    game.mario.facing = 1;
    game.mario.runPhase = 0;
    game.hitCount = 0;
    game.blockAnim.fill(0);
    game.prevJumpHeld = false;
    updateHud();
}

function updateHud() {
    if (stateEl) stateEl.textContent = game.blocks.toString(2).padStart(8, "0");
    if (hitsEl) hitsEl.textContent = String(game.hitCount);
}

function blockRect(i) {
    return {
        x: BLOCKS_X + i * (BLOCK_SIZE + BLOCK_GAP),
        y: BLOCKS_Y,
        w: BLOCK_SIZE,
        h: BLOCK_SIZE,
    };
}

function hitBlock(i) {
    game.blocks ^= BLOCK_TRANSITIONS[i];
    game.hitCount += 1;
    game.blockAnim[i] = 1;
    updateHud();
}

function isCanvasVisible() {
    const rect = canvas.getBoundingClientRect();
    return rect.bottom > 0 && rect.top < window.innerHeight;
}

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

function update(dt) {
    const m = game.mario;
    const keys = game.keys;
    const step = dt * TIME_SCALE;

    let ax = 0;
    if (keys.has("KeyA")) ax -= 1;
    if (keys.has("KeyD")) ax += 1;
    m.vx = ax * MOVE_SPEED;
    if (ax !== 0) m.facing = ax;

    const jumpHeld = keys.has("KeyW");
    if (jumpHeld && !game.prevJumpHeld && m.grounded) {
        m.vy = JUMP_VELOCITY;
        m.grounded = false;
    }
    game.prevJumpHeld = jumpHeld;

    m.vy += GRAVITY * step;

    m.x += m.vx * step;
    if (m.x < 0) m.x = 0;
    if (m.x + MARIO_WIDTH > WIDTH) m.x = WIDTH - MARIO_WIDTH;
    for (let i = 0; i < BLOCK_COUNT; i++) {
        const r = blockRect(i);
        if (
            m.x < r.x + r.w &&
            m.x + MARIO_WIDTH > r.x &&
            m.y < r.y + r.h &&
            m.y + MARIO_HEIGHT > r.y
        ) {
            if (m.vx > 0) {
                m.x = r.x - MARIO_WIDTH;
            } else if (m.vx < 0) {
                m.x = r.x + r.w;
            }
            break;
        }
    }

    m.y += m.vy * step;
    m.grounded = false;

    if (m.y + MARIO_HEIGHT >= GROUND_Y) {
        m.y = GROUND_Y - MARIO_HEIGHT;
        m.vy = 0;
        m.grounded = true;
    }

    for (let i = 0; i < BLOCK_COUNT; i++) {
        const r = blockRect(i);
        if (
            m.x >= r.x + r.w ||
            m.x + MARIO_WIDTH <= r.x ||
            m.y >= r.y + r.h ||
            m.y + MARIO_HEIGHT <= r.y
        ) {
            continue;
        }
        if (m.vy > 0) {
            m.y = r.y - MARIO_HEIGHT;
            m.vy = 0;
            m.grounded = true;
            break;
        } else if (m.vy < 0) {
            m.y = r.y + r.h;
            m.vy = 1.5;
            hitBlock(i);
            break;
        }
    }

    if (m.grounded && Math.abs(m.vx) > 0.01) {
        m.runPhase += dt / 120;
    } else if (m.grounded) {
        m.runPhase = 0;
    }

    for (let i = 0; i < BLOCK_COUNT; i++) {
        if (game.blockAnim[i] > 0) {
            game.blockAnim[i] = Math.max(0, game.blockAnim[i] - dt / 200);
        }
    }
}

function drawSprite(sheet, src, dx, dy, dw, dh, flipX = false) {
    const [sx, sy, sw, sh] = src;
    if (flipX) {
        ctx.save();
        ctx.translate(dx + dw, dy);
        ctx.scale(-1, 1);
        ctx.drawImage(sheet, sx, sy, sw, sh, 0, 0, dw, dh);
        ctx.restore();
    } else {
        ctx.drawImage(sheet, sx, sy, sw, sh, dx, dy, dw, dh);
    }
}

function drawRoom() {
    ctx.fillStyle = "#5c94fc";
    ctx.fillRect(0, 0, WIDTH, GROUND_Y);

    if (assets.tiles) {
        for (let x = 0; x < WIDTH; x += GROUND_TILE) {
            drawSprite(assets.tiles, TILE_FRAMES.ground, x, GROUND_Y, GROUND_TILE, GROUND_TILE);
        }
        if (GROUND_Y + GROUND_TILE < HEIGHT) {
            ctx.fillStyle = "#a45a18";
            ctx.fillRect(0, GROUND_Y + GROUND_TILE, WIDTH, HEIGHT - (GROUND_Y + GROUND_TILE));
        }
    } else {
        ctx.fillStyle = "#a45a18";
        ctx.fillRect(0, GROUND_Y, WIDTH, HEIGHT - GROUND_Y);
    }
}

function drawBlocks() {
    for (let i = 0; i < BLOCK_COUNT; i++) {
        const r = blockRect(i);
        const lit = ((game.blocks >> i) & 1) === 1;
        const lift = Math.sin(game.blockAnim[i] * Math.PI) * 8;

        const x = r.x;
        const y = r.y - lift;

        if (assets.tiles) {
            const src = lit ? TILE_FRAMES.lit : TILE_FRAMES.dim;
            drawSprite(assets.tiles, src, x, y, r.w, r.h);
        } else {
            ctx.fillStyle = lit ? "#ffd24a" : "#3a3f5c";
            ctx.fillRect(x, y, r.w, r.h);
        }

        ctx.fillStyle = "rgba(20, 20, 40, 0.9)";
        ctx.font = "bold 13px system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText(String(i), x + r.w / 2, y + r.h + 3);
    }
}

function currentMarioFrame() {
    const m = game.mario;
    if (!m.grounded) return MARIO_FRAMES.jump;
    if (Math.abs(m.vx) > 0.01) {
        const idx = Math.floor(m.runPhase) % RUN_CYCLE.length;
        return MARIO_FRAMES[RUN_CYCLE[idx]];
    }
    return MARIO_FRAMES.idle;
}

function drawMario() {
    const m = game.mario;
    const x = Math.round(m.x);
    const y = Math.round(m.y);
    if (assets.sprites) {
        const frame = currentMarioFrame();
        drawSprite(assets.sprites, frame, x, y, MARIO_WIDTH, MARIO_HEIGHT, m.facing < 0);
    } else {
        ctx.fillStyle = "#d9381e";
        ctx.fillRect(x, y, MARIO_WIDTH, MARIO_HEIGHT / 2);
        ctx.fillStyle = "#2b59c3";
        ctx.fillRect(x, y + MARIO_HEIGHT / 2, MARIO_WIDTH, MARIO_HEIGHT / 2);
    }
}

function drawLoading() {
    ctx.fillStyle = "#1b1f3a";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = "#cbd0e6";
    ctx.font = "16px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Loading sprites…", WIDTH / 2, HEIGHT / 2);
}

function draw() {
    if (!game.loaded) {
        drawLoading();
        return;
    }
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    drawRoom();
    drawBlocks();
    drawMario();
}

let lastTime = performance.now();
function loop(now) {
    const dt = Math.min(50, now - lastTime);
    lastTime = now;
    if (game.loaded) update(dt);
    draw();
    requestAnimationFrame(loop);
}

window.addEventListener("keydown", (e) => {
    if (!TRACKED_KEYS.has(e.code)) return;
    if (!isCanvasVisible()) return;
    game.keys.add(e.code);
});
window.addEventListener("keyup", (e) => {
    if (!TRACKED_KEYS.has(e.code)) return;
    game.keys.delete(e.code);
});
window.addEventListener("blur", () => game.keys.clear());

const touchButtons = document.querySelectorAll(".block-puzzle-touch button[data-key]");
for (const btn of touchButtons) {
    const key = btn.dataset.key;
    const press = (e) => {
        e.preventDefault();
        game.keys.add(key);
    };
    const release = (e) => {
        e.preventDefault();
        game.keys.delete(key);
    };
    btn.addEventListener("pointerdown", press);
    btn.addEventListener("pointerup", release);
    btn.addEventListener("pointerleave", release);
    btn.addEventListener("pointercancel", release);
}

if (resetButton) {
    resetButton.addEventListener("click", reset);
}

ctx.imageSmoothingEnabled = false;
updateHud();
requestAnimationFrame(loop);

Promise.all([loadImage(SPRITES_SRC), loadImage(TILES_SRC)])
    .then(([sprites, tiles]) => {
        assets.sprites = sprites;
        assets.tiles = tiles;
        game.loaded = true;
    })
    .catch((err) => {
        console.error("Failed to load block puzzle sprites:", err);
        // Fall back to shape renderer so the mini-game still runs.
        game.loaded = true;
    });
