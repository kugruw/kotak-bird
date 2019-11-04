(function () {
    const game = {
        elm: s('.game'),

        player: {
            elm: s('.player'),
            position: 45,
        },

        wall: {
            position: 0,
            create: (style, height) => {
                const elm = document.createElement('div');
                elm.classList.add('wall', style);
                elm.style.height = height + '%';
                s('.game').appendChild(elm);
            }
        },

        controller: {
            up: s('.up'),
            down: s('.down')
        },

        score: {
            elm: s('.score'),
            start: 0
        },

        counter123: {
            elm: s('.counter123'),
            start: 0,
            end: 3 + 1
        },

        retry: s('#retry')
    };

    //Wall
    const runningWall = setInterval(() => {
        const wallHeight = Math.floor(Math.random() * 70);

        game.wall.create('ta', wallHeight);
        game.wall.create('tb', (90 - 10) - wallHeight);
    }, 5000);

    setTimeout(() => {
        //Scorer
        const scorer = setInterval(() => {
            game.score.start++;
            game.score.elm.innerText = game.score.start;
        }, 100);

        //tabrakan
        const tabrakan = setInterval(() => {
            const wall = {
                top: game.elm.lastElementChild.previousElementSibling,
                bottom: game.elm.lastElementChild
            };
            const pos = {
                wall: {
                    left: wall.bottom.offsetLeft,
                    top: wall.top.offsetTop + wall.top.offsetHeight,
                    bottom: wall.bottom.offsetTop
                },
                player: {
                    left: game.player.elm.offsetLeft + game.player.elm.offsetWidth,
                    top: game.player.elm.offsetTop,
                    bottom: game.player.elm.offsetTop + game.player.elm.offsetHeight,
                }
            }
            if (pos.wall.left == pos.player.left) {
                //On nabrak
                if (pos.player.top <= pos.wall.top || pos.player.bottom >= pos.wall.bottom) {
                    clearInterval(runningWall);
                    clearInterval(scorer);
                    clearInterval(tabrakan);

                    ss('.wall').forEach(elm => elm.style.animationPlayState = 'paused');
                    game.elm.style.filter = 'grayscale(1)';
                    game.counter123.elm.innerText = 'Wasted!';
                    game.counter123.elm.show();
                }
            }
        }, 1);
    }, 5000);

    //Counter 123
    const counter = setInterval(() => {
        game.counter123.end--;
        game.counter123.elm.innerText = game.counter123.end;
        if (game.counter123.start == game.counter123.end) {
            clearInterval(counter);
            game.counter123.elm.hide();
        }
    }, 1000);

    game.retry.onclick = () => location.reload();

    //Controller event
    game.controller.up.onclick = () => {
        if (game.player.position <= 0) return;

        game.player.position -= 5;
        game.player.elm.style.top = game.player.position + '%';
    }
    game.controller.down.onclick = () => {
        if (game.player.position >= 85) return;

        game.player.position += 5;
        game.player.elm.style.top = game.player.position + '%';
    }
    window.onkeydown = () => {
        const key = window.event.key;
        if (key == 'ArrowUp') game.controller.up.click();
        else if (key == 'ArrowDown') game.controller.down.click();
    }
})();
//: => bug nabrak abis lewat pinggirs trus kenaik (di dalem pipa)