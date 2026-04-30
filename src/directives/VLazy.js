/**
 * 懒加载指令
 */
export const VLazy = {
  async mounted(el, binding) {
    const def = await import("@/assets/vue.svg");
    el.src = def.default;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].intersectionRatio > 0) {
        el.src = binding.value;
        observer.unobserve(el);
      }
    });
    observer.observe(el);
    el._lazyObserver = observer;
  },
  unmounted(el) {
    if (el._lazyObserver) {
      el._lazyObserver.disconnect();
      delete el._lazyObserver;
    }
  },
};
