(function () {
    const game = {

        player: {
            elm: s('.player'),
            position: 45
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
        }

    };

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

    const runningWall = setInterval(() => {
        const wallHeight = Math.floor(Math.random() * 70);
    
        game.wall.create('ta', wallHeight);
        game.wall.create('tb', (90 - 10) - wallHeight);
    }, 5000);


    window.onkeydown = () => {
        const key = window.event.key;
        if (key == 'ArrowUp') game.controller.up.click();
        else if (key == 'ArrowDown') game.controller.down.click();
    }
})();
//: => buat klo nabrak