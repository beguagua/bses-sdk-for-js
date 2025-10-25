function sprite(name, configStr) {
    const config = {};
    
    configStr.split(",").forEach(line => {
        let [key, value] = line.split(":");
        key = key.trim();
        value = value.trim();
        if (value.startsWith('"') && value.endsWith('"')) {
            value = value.slice(1, -1);
        }
        config[key] = value;
    });

    window[name] = createSprite(config);
}

function createSprite(config) {
    const sprite = document.createElement("img");
    sprite.src = config.img;
    sprite.style.position = "absolute";
    sprite.style.left = "0px";
    sprite.style.top = "0px";
    document.body.appendChild(sprite);

    if (config.create_wasd === "true") {
        const keys = { W: 0, A: 0, S: 0, D: 0 };

        window.addEventListener("keydown", e => keys[e.key.toUpperCase()] = 1);
        window.addEventListener("keyup", e => keys[e.key.toUpperCase()] = 0);

        function move() {
            let x = parseInt(sprite.style.left);
            let y = parseInt(sprite.style.top);

            if (keys.W) y -= 5;
            if (keys.S) y += 5;
            if (keys.A) x -= 5;
            if (keys.D) x += 5;

            sprite.style.left = x + "px";
            sprite.style.top = y + "px";

            requestAnimationFrame(move);
        }

        move();
    }

    return sprite;
}
