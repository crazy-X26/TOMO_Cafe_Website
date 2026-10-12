const gallery = document.querySelector("#gallery");
const images = gallery.querySelector(".gallery-items");

let isDragging = false;
let startX = 0;
let startScroll = 0;
let lastTime = 0;

const speed = 45; // px per second

function getLoopWidth() {
    const firstImage = images.children[0];
    const firstDuplicate = images.children[images.children.length / 2];

    return firstDuplicate.offsetLeft - firstImage.offsetLeft;
}

function animate(time) {
    if(!lastTime) lastTime = time;

    const delta = Math.min((time -lastTime) / 1000, 0.05);
    lastTime = time;

    if (!isDragging && !document.hidden) {
        const loopWidth = getLoopWidth();

        if (loopWidth > 0) {
            gallery.scrollLeft += speed * delta;
            
            if(gallery.scrollLeft >= loopWidth) {
                gallery.scrollLeft -= loopWidth;
            }
        }
    }

    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

let activePointerId = null;
// Via mouse
gallery.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;

    isDragging = true;
    activePointerId = event.pointerId;

    startX = event.clientX;
    startScroll = gallery.scrollLeft;

    gallery.classList.add("is-dragging");
    gallery.setPointerCapture(event.pointerId);
});

gallery.addEventListener("pointermove", (event) => {
    if (!isDragging || event.pointerId !== activePointerId) return;

    const distiance = event.clientX - startX;

    gallery.scrollLeft = startScroll - distiance;
});

function stopDragging(event) {
    if (!isDragging) return;

    if(event?.pointerId != null && event.pointerId !== activePointerId) return;
    
    isDragging = false;
    gallery.classList.remove("is-dragging");
}

gallery.addEventListener("pointerup", stopDragging);
gallery.addEventListener("pointercancel", stopDragging);
gallery.addEventListener("lostpointercapture", stopDragging);

// Via touch
gallery.addEventListener("touchstart", () => {
    isDragging = true;
}, { passive: true});

gallery.addEventListener("touchend", () => {
    isDragging = false;
});

gallery.addEventListener("touchcancel", () => {
    isDragging = true;
});