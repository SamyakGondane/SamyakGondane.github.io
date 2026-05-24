let start_btn = document.querySelector(".start_game")

start_btn.addEventListener("click", () => {
    const howtoplaybox = document.querySelector(".how_to_play")
    howtoplaybox.style.animation = "invpopupanimation 0.2s cubic-bezier(0, 0.64, 0.74, 1.39) forwards"

    setTimeout(() => {
        document.querySelector(".how_to_play_container").classList.add("hide")
    }, 200);
})

let game_box = document.querySelectorAll(".boxes")
let reset = document.querySelector(".reset")

let player = 1
let gameActive = true

let win_ways = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

game_box.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "" || !gameActive) {
            return;
        }

        if (player == 1) {
            box.innerText = "X"
            box.style.color = "red"
        }
        else {
            box.innerText = "O"
            box.style.color = "blue"
        }

        let winning_player = check();
        winner(winning_player)
        if (!winning_player) {
            player = 3 - player

            let filled = true

            game_box.forEach((box) => {
                if (box.innerText === "") {
                    filled = false
                }
            })

            if (filled) {
                draw()
                gameActive = false
            }
        }
    })
})

const winner = (winning_player) => {
    if (winning_player == 1 || winning_player == 2) {
        const winplay = document.querySelector(".pop_up_container")
        winplay.classList.remove("hide")
        winplay.innerHTML =
            `<div class="pop_up">
                <h1>Player ${winning_player} is the Winner!!!</h1>
                <button class="reset">New Game</button>
            </div>`
    }
}

const draw = () => {
    const winplay = document.querySelector(".pop_up_container")
    winplay.classList.remove("hide")
    winplay.innerHTML =
        `<div class="pop_up">
                <h1>It's a Draw!!!</h1>
                <button class="reset">New Game</button>
        </div>`
}

let check = () => {
    for (let i = 0; i < win_ways.length; i++) {
        if (game_box[win_ways[i][0]].innerText && game_box[win_ways[i][1]].innerText && game_box[win_ways[i][2]].innerText && gameActive) {
            if (game_box[win_ways[i][0]].innerText === game_box[win_ways[i][1]].innerText && game_box[win_ways[i][1]].innerText === game_box[win_ways[i][2]].innerText) {
                gameActive = false
                return player;
            }
        }
    }
    return null;
};

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("reset")) {
        const invpopupanimation = document.querySelector(".pop_up")
        invpopupanimation.style.animation = "invpopupanimation 0.2s cubic-bezier(0, 0.64, 0.74, 1.39) forwards"

        setTimeout(() => {
            document.querySelector(".pop_up_container").classList.add("hide")
            gameActive = true
            player = 1
            game_box.forEach((box) => {
                box.innerText = ""
            })
        }, 200);
    }
})