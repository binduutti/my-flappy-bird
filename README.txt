# 🐦 Flappy Bird — Browser Game

A fun, browser-based Flappy Bird clone built with vanilla HTML, CSS, and JavaScript. No libraries, no frameworks — just pure web tech. Tap or press Space to keep the bird airborne and dodge the pipes!

---

## 📖 Description

This is a lightweight recreation of the classic Flappy Bird game that runs entirely in the browser. The bird falls due to gravity and jumps when you press Space or click the screen. Your goal is to fly through as many pipe gaps as possible without crashing. The game gets progressively harder as the pipes speed up over time.

---

## ✨ Features

- **Gravity & physics** — the bird accelerates downward naturally and tilts to reflect its velocity
- **Jump mechanic** — press `Space` or click anywhere on the game container to flap
- **Procedurally generated pipes** — pipe heights are randomized every 2 seconds
- **Progressive difficulty** — pipe speed gradually increases as you play longer
- **Score tracking** — your score increments each time you pass through a pair of pipes
- **Sound effects** — audio feedback for jumping, scoring, and hitting a pipe
- **Game Over screen** — shows your final score with a Retry button
- **Animated bird** — the bird rotates forward when falling and tilts up on jump
- **City skyline backdrop** — decorative buildings and animated clouds for visual depth

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Game structure and DOM layout |
| CSS3 | Styling, animations, and visual effects |
| Vanilla JavaScript | Game logic, physics, collision detection |
| Web Audio API (`Audio`) | Sound effects (jump, score, hit) |
| `requestAnimationFrame` | Smooth game loop |
| `setInterval` | Pipe spawning at fixed intervals |

---

## 📁 Project Structure

```
flappy-bird/
├── index.html        # Main HTML file — game container, bird, score display, and modals
├── style.css         # All visual styling — bird, pipes, ground, clouds, buildings, UI
├── script.js         # Game logic — physics, pipe movement, collision, score, sound
├── jump.mpeg         # Sound played when the bird jumps
├── score.aac         # Sound played when a pipe is passed
└── out.mpeg          # Sound played on collision / game over
```

---

## 🚀 How to Run

No build tools or installations needed. Just open the file in your browser.

**Option 1 — Direct open:**
1. Download or clone this repository
2. Open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari)

**Option 2 — Local dev server (recommended to avoid audio issues):**
```bash
# Using Python
python -m http.server 8000

# Then open:
http://localhost:8000
```

> **Note:** Some browsers block audio autoplay when opening files directly from the filesystem (`file://`). Running a local server ensures sound effects work correctly.

---

## 🎮 How to Play

1. Open the game — it starts automatically
2. **Press `Space`** or **click the game area** to make the bird flap upward
3. Navigate through the gaps between the green pipes
4. Each pair of pipes you pass through adds **+1** to your score
5. The game ends if the bird:
   - Hits a pipe
   - Touches the ground
   - Flies above the top of the screen
6. Click **Retry** on the Game Over screen to play again

---

## 🔮 Future Improvements

- Add a high score tracker using `localStorage` so your best score persists between sessions
- Introduce a start screen so the game doesn't begin immediately on load
- Add mobile touch support with on-screen tap zones
- Include sprite-based bird animations for a more polished look
- Add difficulty modes (Easy / Normal / Hard) with preset pipe speeds and gap sizes
- Implement a night mode / theme toggle

## 🚀 Live Project
👉 https://myflappy-bird.netlify.app/