<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Decide For Me</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    {{-- Vite + Tailwind --}}
    @vite(['resources/css/app.css'])

    <style>
        body {
            background: radial-gradient(circle at top, #fff1d6, #ffe29a);
            overflow: hidden;
        }

        .particle {
            position: absolute;
            pointer-events: auto;
            cursor: pointer;
            opacity: 0.9;
            user-select: none;
            animation-name: floatUp;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
        }

        @keyframes floatUp {
            from {
                transform: translateY(120vh) rotate(0deg);
                opacity: 0;
            }
            10% { opacity: 1; }
            to {
                transform: translateY(-150vh) rotate(360deg);
                opacity: 0;
            }
        }

        @keyframes pop {
            0% {
                transform: scale(1) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: scale(1.8) rotate(180deg);
                opacity: 0;
            }
        }

        .popped {
            animation: pop 0.35s ease-out forwards !important;
        }

        .fate-btn {
            background: linear-gradient(135deg, #ff4d00, #ff9900);
            box-shadow: 0 20px 40px rgba(255, 77, 0, 0.4);
            transition: all 0.25s ease;
        }

        .fate-btn:hover {
            transform: scale(1.1);
            box-shadow: 0 35px 70px rgba(255, 77, 0, 0.6);
        }

        .fate-btn:active {
            transform: scale(0.95);
        }

        .pulse-ring {
            position: absolute;
            inset: -32px;
            border-radius: 9999px;
            border: 2px solid rgba(255, 77, 0, 0.4);
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0% { transform: scale(0.9); opacity: 1; }
            100% { transform: scale(1.5); opacity: 0; }
        }
    </style>
</head>

<body class="min-h-screen flex items-center justify-center text-center relative">

    <div id="particles"></div>

    <main class="relative z-10 px-6 max-w-xl">

        <div class="flex justify-center gap-3 text-4xl mb-6 animate-bounce">
            🍕 🍔 🍜 🥗 🍣 🍩 🍟 🍗
        </div>

        <h1 class="text-4xl md:text-5xl font-extrabold text-orange-600 mb-4">
            You don’t choose.
        </h1>

        <p class="text-lg md:text-xl text-gray-700 mb-10 leading-relaxed">
            Can’t decide what to eat?<br>
            <span class="font-semibold">
                Let the internet decide your fate.
            </span>
        </p>

        <div class="relative inline-block">
            <div class="pulse-ring"></div>

            <button
                type="button"
                onclick="decideForMe()"
                class="fate-btn relative z-10 px-14 py-6 rounded-full text-white text-xl font-bold tracking-wide"
            >
                Decide for me
            </button>
        </div>

        <p class="mt-6 text-sm text-gray-600 italic">
            No filters. No preferences. No overthinking.
        </p>

    </main>

    <script>
        /* ---------- POP SOUND ---------- */
        const popSound = new Audio('/sounds/pop1.wav');
        popSound.volume = 0.35;
        popSound.preload = 'auto';

        function playPop() {
            popSound.currentTime = 0;
            popSound.play().catch(() => {});
        }

        /* ---------- REDIRECT ---------- */
        function decideForMe() {
            document.body.style.transition = "opacity 0.6s ease";
            document.body.style.opacity = "0.5";

            setTimeout(() => {
                window.location.href = "/meals";
            }, 700);
        }

        /* ---------- FOOD PARTICLES ---------- */
        const foods = [
            '🍕','🍔','🍟','🌭','🍿','🧀','🥓','🍗','🍖','🥩',
            '🍤','🍣','🍱','🍛','🍜','🍝','🍲','🥗','🥙','🌮',
            '🌯','🥪','🥞','🧇','🥐','🍞','🥨','🧈','🍩','🍪',
            '🎂','🍰','🧁','🍦','🍨','🍧','🍫','🍬','🍭','🍮',
            '🍎','🍌','🍇','🍓','🍍','🥭','🍑','🍒','🍉','🥥'
        ];

        const container = document.getElementById('particles');
        const PARTICLE_COUNT = 60;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const el = document.createElement('div');
            el.className = 'particle';
            el.textContent = foods[Math.floor(Math.random() * foods.length)];

            const size = Math.random() * 3.2 + 1.5;
            const left = Math.random() * 100 - 5;
            const duration = Math.random() * 20 + 15;
            const delay = Math.random() * -30;

            el.style.fontSize = `${size}rem`;
            el.style.left = `${left}%`;
            el.style.animationDuration = `${duration}s`;
            el.style.animationDelay = `${delay}s`;

            el.addEventListener('pointerdown', (e) => {
                e.stopPropagation();

                if (navigator.vibrate) navigator.vibrate(15);

                playPop(); // 🔊 POP

                el.classList.add('popped');
                setTimeout(() => el.remove(), 350);
            });

            container.appendChild(el);
        }
    </script>

</body>
</html>
