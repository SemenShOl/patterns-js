"use strict";
function main() {
    const box = document.querySelector(".box");
    const proxyImg = document.querySelector(".proxy");
    let offsetX, offsetY, startX, startY;
    class RealImage {
        LoadImg() {
            //   console.log("LoadImg");
            //   alert("Бля");
            const imgReal = document.createElement("img");
            imgReal.classList.add("real-img");
            imgReal.src = "./img2.jpg";
            box.append(imgReal);
            box.removeChild(proxyImg);
            //   imgReal.style.position = "absolute";
        }
        MoveImg() {
            //   console.log("DrawImg");
        }
        BeforeMove(event) { }
        AfterMove(event) { }
    }
    class ImageProxy {
        constructor() {
            this.realImage = null;
            box.addEventListener("mousedown", (event) => this.MoveImg(event));
        }
        LoadImg() {
            if (!this.realImage) {
                this.realImage = new RealImage();
            }
            this.realImage.LoadImg();
            this.realImage.MoveImg();
        }
        MoveImg(event) {
            const newX = event.clientX - offsetX;
            const newY = event.clientY - offsetY;
            if (!this.realImage) {
                box.style.left = newX + "px";
                box.style.top = newY + "px";
            }
            else {
                this.realImage.MoveImg();
            }
        }
        BeforeMove(event) {
            offsetX = event.clientX - box.getBoundingClientRect().left;
            offsetY = event.clientY - box.getBoundingClientRect().top;
            startX = box.getBoundingClientRect().left;
            startY = box.getBoundingClientRect().top;
        }
        AfterMove(event) {
            document.removeEventListener("mousemove", this.MoveImg);
            document.removeEventListener("mouseup", this.AfterMove.bind(this));
        }
    }
    const image = new ImageProxy();
    box.addEventListener("mousedown", (event) => {
        console.log("mousedown");
        image.BeforeMove(event);
        document.addEventListener("mousemove", image.MoveImg);
        document.addEventListener("mouseup", image.AfterMove.bind(image));
    });
    box.addEventListener("dblclick", () => {
        image.LoadImg();
    });
}
function main2() {
    const box = document.querySelector(".box");
    let offsetX, offsetY, startX, startY;
    console.log("start");
    function dragStart(e) {
        // Сохраняем начальные координаты мыши и бокса
        offsetX = e.clientX - box.getBoundingClientRect().left;
        offsetY = e.clientY - box.getBoundingClientRect().top;
        startX = box.getBoundingClientRect().left;
        startY = box.getBoundingClientRect().top;
        console.log("Почему");
        // Подписываемся на события перемещения мыши и отпускания кнопки
        document.addEventListener("mousemove", dragMove);
        document.addEventListener("mouseup", dragEnd);
    }
    // Функция, запускаемая при перемещении мыши
    function dragMove(e) {
        // Вычисляем новые координаты бокса
        var newX = e.clientX - offsetX;
        var newY = e.clientY - offsetY;
        // Перемещаем бокс
        box.style.left = newX + "px";
        box.style.top = newY + "px";
    }
    // Функция, запускаемая при отпускании кнопки мыши
    function dragEnd(e) {
        // Отписываемся от событий перемещения мыши и отпускания кнопки
        document.removeEventListener("mousemove", dragMove);
        document.removeEventListener("mouseup", dragEnd);
    }
    // Подписываемся на событие начала перетаскивания
    box.addEventListener("mousedown", dragStart);
}
main();
