"use strict";
const buttons = [
    document.getElementById("arrowButton1"),
    document.getElementById("arrowButton2"),
    document.getElementById("arrowButton3"),
    document.getElementById("arrowButton4"),
    document.getElementById("arrowButton5")
];
const reasonExpansions = [
    document.getElementById("reasonExpansionOne"),
    document.getElementById("reasonExpansionTwo"),
    document.getElementById("reasonExpansionThree"),
    document.getElementById("reasonExpansionFour"),
    document.getElementById("reasonExpansionFive")
];
buttons.forEach((button, index) => {
    const expansion = reasonExpansions[index];
    if (!button || !expansion)
        return;
    button.addEventListener("click", () => {
        const isExpanded = expansion.classList.toggle("expanded");
        button.textContent = isExpanded ? "<" : ">";
    });
});
// swiping between panels
function setupSwipe(viewport, track) {
    const panelCount = track.children.length;
    const DRAG_THRESHOLD = 10; // px moved before it counts as a drag
    const SWIPE_FRACTION = 0.2; // fraction of the width needed to change panel
    let currentPanel = 0;
    let startX = 0;
    let startY = 0;
    let deltaX = 0;
    let pressing = false;
    let dragging = false;
    let justDragged = false;
    function showPanel(index) {
        currentPanel = Math.max(0, Math.min(panelCount - 1, index));
        track.style.transition = "";
        track.style.transform = `translateX(${-currentPanel * 100}%)`;
    }
    viewport.addEventListener("pointerdown", (e) => {
        if (e.pointerType === "mouse" && e.button !== 0)
            return;
        pressing = true;
        dragging = false;
        startX = e.clientX;
        startY = e.clientY;
        deltaX = 0;
    });
    viewport.addEventListener("pointermove", (e) => {
        var _a;
        if (!pressing)
            return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        if (!dragging) {
            // ignore tiny movements and mostly-vertical ones
            if (Math.abs(dx) < DRAG_THRESHOLD || Math.abs(dx) < Math.abs(dy))
                return;
            dragging = true;
            viewport.setPointerCapture(e.pointerId);
            viewport.classList.add("dragging");
            track.style.transition = "none";
            (_a = window.getSelection()) === null || _a === void 0 ? void 0 : _a.removeAllRanges();
        }
        deltaX = dx;
        // resist a bit when dragging past the first/last panel
        const pastStart = currentPanel === 0 && dx > 0;
        const pastEnd = currentPanel === panelCount - 1 && dx < 0;
        const offset = pastStart || pastEnd ? dx / 3 : dx;
        track.style.transform = `translateX(calc(${-currentPanel * 100}% + ${offset}px))`;
    });
    function endDrag() {
        if (!pressing)
            return;
        pressing = false;
        if (!dragging)
            return;
        dragging = false;
        viewport.classList.remove("dragging");
        // stops the mouseup from also clicking an arrow button
        justDragged = true;
        setTimeout(() => { justDragged = false; }, 0);
        const needed = viewport.clientWidth * SWIPE_FRACTION;
        if (deltaX < -needed) {
            showPanel(currentPanel + 1);
        }
        else if (deltaX > needed) {
            showPanel(currentPanel - 1);
        }
        else {
            showPanel(currentPanel);
        }
    }
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);
    viewport.addEventListener("click", (e) => {
        if (justDragged) {
            e.preventDefault();
            e.stopPropagation();
        }
    }, true);
    viewport.addEventListener("selectstart", (e) => {
        if (dragging)
            e.preventDefault();
    });
}
const swipeViewport = document.getElementById("swipeViewport");
const swipeTrack = document.getElementById("swipeTrack");
if (swipeViewport && swipeTrack) {
    setupSwipe(swipeViewport, swipeTrack);
}
//# sourceMappingURL=script.js.map