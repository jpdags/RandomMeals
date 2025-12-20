<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Random Meals - Discover Your Next Meal</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    {{-- Vite + Tailwind --}}
    @vite(['resources/css/app.css'])

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html, body {
            width: 100%;
            height: 100%;
            overflow: hidden;
        }

        body {
            background: linear-gradient(180deg, #F5E6D3 0%, #E8D5C4 100%);
            background-attachment: fixed;
            font-family: 'Lora', Georgia, serif;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .particle {
            position: fixed;
            pointer-events: auto;
            cursor: pointer;
            opacity: 0.8;
            user-select: none;
            animation-name: floatUp;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
        }

        @keyframes floatUp {
            from {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% { opacity: 0.8; }
            to {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }

        @keyframes pop {
            0% {
                transform: scale(1) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: scale(2) rotate(180deg);
                opacity: 0;
            }
        }

        .popped {
            animation: pop 0.5s ease-out forwards !important;
        }

        .container {
            position: relative;
            z-index: 10;
            text-align: center;
            padding: 2rem;
        }

        .emojis-header {
            display: flex;
            justify-content: center;
            gap: 1rem;
            text-4xl;
            margin-bottom: 2rem;
            animation: bounce 1s infinite;
        }

        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }

        h1 {
            font-family: 'Playfair Display', Georgia, serif;
            font-size: clamp(2.5rem, 8vw, 4rem);
            font-weight: 700;
            color: #3d2817;
            margin-bottom: 1rem;
            letter-spacing: -0.02em;
        }

        .subtitle {
            font-size: clamp(1rem, 3vw, 1.3rem);
            color: #6b5344;
            margin-bottom: 2.5rem;
            line-height: 1.6;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }

        .button-container {
            position: relative;
            display: inline-block;
            margin-bottom: 1.5rem;
        }

        .pulse-ring {
            position: absolute;
            inset: -20px;
            border-radius: 9999px;
            border: 2px solid rgba(184, 114, 37, 0.3);
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0% { 
                transform: scale(0.9);
                opacity: 1;
            }
            100% { 
                transform: scale(1.3);
                opacity: 0;
            }
        }

        .cta-button {
            position: relative;
            padding: 1.2rem 3rem;
            background: linear-gradient(135deg, #b87225 0%, #a05f1f 100%);
            color: #fff;
            border: 2px solid #8b4513;
            border-radius: 0.75rem;
            font-family: 'Playfair Display', Georgia, serif;
            font-size: 1.25rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            box-shadow: 0 8px 20px rgba(139, 69, 19, 0.3);
            overflow: hidden;
        }

        .cta-button::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: width 0.6s, height 0.6s;
        }

        .cta-button:hover::before {
            width: 300px;
            height: 300px;
        }

        .cta-button:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 30px rgba(139, 69, 19, 0.5);
        }

        .cta-button:active {
            transform: translateY(-1px);
        }

        .footer-text {
            font-size: 0.95rem;
            color: #6b5344;
            font-style: italic;
            margin-top: 1.5rem;
        }

        .music-toggle {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, #b87225 0%, #a05f1f 100%);
            color: white;
            border: none;
            cursor: pointer;
            font-size: 1.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(139, 69, 19, 0.3);
            transition: all 0.3s ease;
            z-index: 20;
        }

        .music-toggle:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 16px rgba(139, 69, 19, 0.4);
        }

        .music-toggle:active {
            transform: scale(0.95);
        }

        #particles-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        }

        @media (max-width: 768px) {
            .emojis-header {
                font-size: 2rem;
                gap: 0.5rem;
            }

            .cta-button {
                padding: 1rem 2.5rem;
                font-size: 1.1rem;
            }

            .music-toggle {
                width: 45px;
                height: 45px;
                font-size: 1.2rem;
                bottom: 1rem;
                right: 1rem;
            }
        }
    </style>
</head>

<body>
    <div id="particles-container"></div>

    <!-- Music Toggle Button -->
    <button class="music-toggle" id="musicToggle" title="Toggle Background Music">
        🔊
    </button>

    <!-- Background Audio -->
    <audio id="bgMusic" loop>
        <!-- Using a simple sine wave generated audio -->
        <source src="data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==" type="audio/wav">
    </audio>

    <div class="container">
        <div class="emojis-header">
            <span>🍕</span>
            <span>🍔</span>
            <span>🍜</span>
            <span>🥗</span>
            <span>🍣</span>
        </div>

        <h1>You don't choose.</h1>

        <p class="subtitle">
            Can't decide what to eat?<br>
            <span style="font-weight: 600;">
                Let the internet decide your fate.
            </span>
        </p>

        <div class="button-container">
            <div class="pulse-ring"></div>
            <button
                type="button"
                onclick="exploreMeals()"
                class="cta-button"
            >
                Discover a Meal
            </button>
        </div>

        <p class="footer-text">
            No filters. No preferences. No overthinking.
        </p>
    </div>

    <script>
        // Background Music Setup
        const bgMusic = document.getElementById('bgMusic');
        const musicToggle = document.getElementById('musicToggle');
        let isPlaying = false;

        // Initialize Web Audio API for ambient sound
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();

        function createAmbientSound() {
            const now = audioContext.currentTime;
            const duration = 2;
            
            // Create a pleasant ambient sound with multiple oscillators
            const osc1 = audioContext.createOscillator();
            const osc2 = audioContext.createOscillator();
            const gain = audioContext.createGain();

            osc1.type = 'sine';
            osc2.type = 'sine';
            
            osc1.frequency.value = 60;
            osc2.frequency.value = 120;
            
            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + duration);
            
            osc1.connect(gain);
            osc2.connect(gain);
            gain.connect(audioContext.destination);
            
            osc1.start(now);
            osc2.start(now);
            osc1.stop(now + duration);
            osc2.stop(now + duration);

            // Loop the sound
            setTimeout(createAmbientSound, duration * 1000);
        }

        function toggleMusic() {
            if (isPlaying) {
                musicToggle.textContent = '🔇';
                isPlaying = false;
            } else {
                createAmbientSound();
                musicToggle.textContent = '🔊';
                isPlaying = true;
            }
        }

        musicToggle.addEventListener('click', toggleMusic);

        // Pop Sound
        const popAudio = new AudioContext || new webkitAudioContext;

        function playPop() {
            const now = popAudio.currentTime;
            const osc = popAudio.createOscillator();
            const gain = popAudio.createGain();

            osc.frequency.setValueAtTime(800, now);
            osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
            
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            
            osc.connect(gain);
            gain.connect(popAudio.destination);
            
            osc.start(now);
            osc.stop(now + 0.1);
        }

        // Navigate to home/meals
        function exploreMeals() {
            document.body.style.transition = "opacity 0.5s ease";
            document.body.style.opacity = "0.8";

            setTimeout(() => {
                window.location.href = "/"; // Changed from /meals to /
            }, 500);
        }

        // Food Particles
        const foods = [
            '🍕','🍔','🍟','🌭','🍿','🧀','🥓','🍗','🍖','🥩',
            '🍤','🍣','🍱','🍛','🍜','🍝','🍲','🥗','🥙','🌮',
            '🌯','🥪','🥞','🧇','🥐','🍞','🥨','🧈','🍩','🍪',
            '🎂','🍰','🧁','🍦','🍨','🍧','🍫','🍬','🍭','🍮',
            '🍎','🍌','🍇','🍓','🍍','🥭','🍑','🍒','🍉','🥥'
        ];

        const container = document.getElementById('particles-container');
        const PARTICLE_COUNT = 50;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const el = document.createElement('div');
            el.className = 'particle';
            el.textContent = foods[Math.floor(Math.random() * foods.length)];

            const size = Math.random() * 2.5 + 1.2;
            const left = Math.random() * 100;
            const duration = Math.random() * 18 + 12;
            const delay = Math.random() * -25;

            el.style.fontSize = `${size}rem`;
            el.style.left = `${left}%`;
            el.style.animationDuration = `${duration}s`;
            el.style.animationDelay = `${delay}s`;

            el.addEventListener('click', (e) => {
                e.stopPropagation();

                if (navigator.vibrate) navigator.vibrate(20);

                playPop();

                el.classList.add('popped');
                setTimeout(() => el.remove(), 500);
            });

            container.appendChild(el);
        }
    </script>
</body>
</html>
