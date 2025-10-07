 const bird = document.getElementById('bird');
        const gameContainer = document.getElementById('game-container');
        const scoreDisplay = document.getElementById('score');
        const gameOverModal = document.getElementById('gameOver');
        const finalScoreDisplay = document.getElementById('finalScore');
        const retryBtn = document.getElementById('retryBtn');
        // Sound effects
        const jumpSound = new Audio('jump.mpeg');
        const scoreSound = new Audio('score.aac');
        const hitSound = new Audio('out.mpeg');

        // Optional: control volume
        jumpSound.volume = 0.5;
        scoreSound.volume = 0.5;
        hitSound.volume = 0.5;

        let birdTop = 250;
        let birdVelocity = 0;
        let gravity = 0.3;
        let isGameOver = false;
        let score = 0;
        let pipes = [];
        let gameLoop;
        let pipeInterval;

        function initializeGame() {
            birdTop = 250;
            birdVelocity = 0;
            isGameOver = false;
            score = 0;
            pipes = [];
            scoreDisplay.textContent = '0';
            gameOverModal.style.display = 'none';
            bird.style.top = birdTop + 'px';
            bird.style.left = '50px';
            
            document.querySelectorAll('.pipe').forEach(pipe => pipe.remove());
            
            document.addEventListener('keydown', jump);
            gameContainer.addEventListener('click', jump);
        }

        let pipeSpeed = 1;
        let speedIncrement = 0.01; // increase every frame or pipe

        function movePipes() {
            pipes.forEach(pipe => {
                let pipeLeft = parseInt(pipe.top.style.left);
        pipeLeft -= pipeSpeed;
        pipe.top.style.left = pipeLeft + 'px';
        pipe.bottom.style.left = pipeLeft + 'px';
    });

    // Gradually increase speed
    pipeSpeed += speedIncrement;
}
        


        function jump(e) {
    if (e.type === 'keydown' && e.code !== 'Space') return;
    if (!isGameOver) {
        birdVelocity = -6; // smaller jump
        jumpSound.currentTime = 0;
        jumpSound.play();
        bird.style.transform = 'rotate(-20deg)';
        setTimeout(() => {
            if (!isGameOver) bird.style.transform = 'rotate(0deg)';
        }, 100);
    }
}

        function createPipe() {
            if (isGameOver) return;

            const gap = 150;
            const minHeight = 50;
            const maxHeight = 350;
            const topHeight = Math.floor(Math.random() * (maxHeight - minHeight)) + minHeight;
            const bottomHeight = 600 - 150 - topHeight - gap;

            const pipeTop = document.createElement('div');
            pipeTop.className = 'pipe pipe-top';
            pipeTop.style.height = topHeight + 'px';
            pipeTop.style.top = '0';
            pipeTop.style.left = '400px';

            const pipeBottom = document.createElement('div');
            pipeBottom.className = 'pipe pipe-bottom';
            pipeBottom.style.height = bottomHeight + 'px';
            pipeBottom.style.bottom = '150px';
            pipeBottom.style.left = '400px';

            gameContainer.appendChild(pipeTop);
            gameContainer.appendChild(pipeBottom);

            pipes.push({ top: pipeTop, bottom: pipeBottom, passed: false });
        }

        function movePipes() {
            pipes.forEach((pipe, index) => {
                let pipeLeft = parseInt(pipe.top.style.left);
                pipeLeft -= 3;

                pipe.top.style.left = pipeLeft + 'px';
                pipe.bottom.style.left = pipeLeft + 'px';

                if (pipeLeft < -60) {
                    pipe.top.remove();
                    pipe.bottom.remove();
                    pipes.splice(index, 1);
                }

                if (pipeLeft < 50 && !pipe.passed) {
                    pipe.passed = true;
                    score++;
                    scoreDisplay.textContent = score;

                    scoreSound.currentTime = 0;
                    scoreSound.play();
                }

                checkCollision(pipe, pipeLeft);
            });
        }

        function checkCollision(pipe, pipeLeft) {
            const birdLeft = 50;
            const birdRight = birdLeft + 45;
            const birdBottom = birdTop + 45;

            const pipeRight = pipeLeft + 60;
            const topPipeBottom = parseInt(pipe.top.style.height);
            const bottomPipeTop = 600 - 150 - parseInt(pipe.bottom.style.height);

            if (birdRight > pipeLeft && birdLeft < pipeRight) {
                if (birdTop < topPipeBottom || birdBottom > bottomPipeTop) {
                    endGame();
                }
            }
        }

        function applyPhysics() {
            if (!isGameOver) {
                birdVelocity += gravity;
                birdTop += birdVelocity;
                bird.style.top = birdTop + 'px';

                if (birdVelocity > 0) {
                    let rotation = Math.min(birdVelocity * 3, 90);
                    bird.style.transform = `rotate(${rotation}deg)`;
                }

                if (birdTop <= 0 || birdTop >= 600 - 150 - 45) {
                    endGame();
                }
            }
        }

        function endGame() {
            if (isGameOver) return;
            isGameOver = true;
            clearInterval(pipeInterval);
            cancelAnimationFrame(gameLoop);

            hitSound.currentTime = 0;
            hitSound.play();

            finalScoreDisplay.textContent = score;
            gameOverModal.style.display = 'block';
            
            document.removeEventListener('keydown', jump);
            gameContainer.removeEventListener('click', jump);
        }

        function startGame() {
            initializeGame();
            
            pipeInterval = setInterval(createPipe, 2000);
            createPipe();

            function animate() {
                if (!isGameOver) {
                    applyPhysics();
                    movePipes();
                    gameLoop = requestAnimationFrame(animate);
                }
            }
            animate();
        }

        retryBtn.addEventListener('click', startGame);

        startGame();