/**
 * 滑动指令 
 * 边界：基于浏览器
 */
export const VMove = {
    mounted(el) {
        let moveElement = el.firstElementChild;
        let elWidth = el.offsetWidth;
        let elHeight = el.offsetHeight;
        let parentWidth = window.innerWidth;
        let parentHeight = window.innerHeight;

        const onMouseDown = (e) => {
            let offsetX = e.clientX - el.offsetLeft;
            let offsetY = e.clientY - el.offsetTop;

            const onMouseMove = (moveEvent) => {
                let newLeft = moveEvent.clientX - offsetX;
                let newTop = moveEvent.clientY - offsetY;
                if (newLeft < 0) {
                    newLeft = 0;
                } else if (newLeft > parentWidth - elWidth) {
                    newLeft = parentWidth - elWidth;
                }
                if (newTop < 0) {
                    newTop = 0;
                } else if (newTop > parentHeight - elHeight) {
                    newTop = parentHeight - elHeight;
                }
                el.style.left = `${newLeft}px`;
                el.style.top = `${newTop}px`;
            };

            const onMouseUp = () => {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        };

        moveElement.addEventListener('mousedown', onMouseDown);
        // 保存引用以便 unmounted 时清理
        el._moveCleanup = () => {
            moveElement.removeEventListener('mousedown', onMouseDown);
        };
    },
    unmounted(el) {
        if (el._moveCleanup) {
            el._moveCleanup();
            delete el._moveCleanup;
        }
    }
};   