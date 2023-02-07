//buttons function
function getdirection() {
    window.addEventListener("click", e => {

        switch (e.key) {
            case "up":
                if (lastDirection.y == 1)
                    break;
                direction = { x: 0, y: -1 };
                break;
            case "down":
                if (lastDirection.y == -1)
                    break;
                direction = { x: 0, y: 1 };
                break;
            case "left":
                if (lastDirection.x == 1)
                    break;
                direction = { x: -1, y: 0 };
                break;
            case "right":
                if (lastDirection.x == -1)
                    break;
                direction = { x: 1, y: 0 };
                break;
            default: direction = { x: 0, y: 0 };
        }

    });

    let lastDirection = direction;
    return direction;
}
