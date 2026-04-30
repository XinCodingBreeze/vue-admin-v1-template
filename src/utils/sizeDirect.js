// 创建观察者实例
const ob = new ResizeObserver(entries => {
    entries.forEach(() => {
        // resize observed
    })
})

export default {
    onMounted() {
        ob.observe(document.body)
    },

    onUnmounted() {
        ob.unobserve(document.body)
    }
}