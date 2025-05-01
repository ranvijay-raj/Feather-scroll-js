import Lenis from 'lenis'
class FeatherScroll {
    // Stores all instances of FeatherScroll
    static instances = [];
    constructor(options = {}) {
      this.wrapper = options.wrapper || document.documentElement;
      this.content = options.content || document.body;
      // Initialize Lenis with custom options or defaults
      this.lenis = new Lenis({
        wrapper: this.wrapper,
        content: this.content,
        smooth: options.smooth ?? true,
        duration: options.duration ?? 1.2,
        easing: options.easing ?? ((t) => 1 - Math.pow(1 - t, 3)),
        direction: options.direction ?? 'vertical',
        gestureDirection: options.gestureDirection ?? 'both',
        wheelMultiplier: options.mouseSenstivity ?? 1,
        touchMultiplier: options.touchSenstivity ?? 2,
        infinite: options.infinite ?? false
      });
      // Scroll direction tracking
      this.scrollDirection = 'down';
      this.lastScroll = 0;
      // Elements with sticky and parallax behavior
      this.stickyElements = [...this.content.querySelectorAll('[data-scroll-sticky]')];
      this.parallaxElements = [...this.content.querySelectorAll('[data-scroll-speed]')];
      // Store initial positions for parallax elements
      this.parallaxElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        el.dataset.initialTop = rect.top + window.scrollY;
        el.dataset.initialLeft = rect.left + window.scrollX;
      });
      // Initialize features
      this.initStickyElements();
      this.trackScrollDirection();
      this.startRAF(); // Start animation loop
      FeatherScroll.instances.push(this); // Register instance
      if (window.ScrollTrigger) {
        this.setupScrollTrigger();
      }
      // Observe body overflow for automatic disabling
      this.observeBodyOverflow();
    }
    // RAF loop for Lenis + sticky + parallax
    startRAF() {
      const raf = (time) => {
        this.lenis.raf(time);
        this.updateStickyElements();
        this.updateParallax();
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }
    // Detect scroll direction: 'up' or 'down'
    trackScrollDirection() {
      this.lenis.on('scroll', ({ scroll }) => {
        const newDirection = scroll > this.lastScroll ? 'down' : 'up';
        if (newDirection !== this.scrollDirection) {
          this.scrollDirection = newDirection;
        }
        this.lastScroll = scroll;
      });
    }
    // Observe overflow-y on body, pause/resume Lenis
    observeBodyOverflow() {
      const observer = new MutationObserver(() => {
        const overflowY = window.getComputedStyle(document.body).overflowY;
        if (overflowY === 'hidden') {
          this.lenis.stop();
        } else {
          this.lenis.start();
        }
      });
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['style']
      });
      // Initial check
      const initialOverflowY = window.getComputedStyle(document.body).overflowY;
      if (initialOverflowY === 'hidden') {
        this.lenis.stop();
      }
    }
    // Return current scroll direction
    getScrollDirection() {
      return this.scrollDirection || 'down';
    }
    // Set initial positions for sticky elements
    initStickyElements() {
      this.stickyElements.forEach((el) => {
        const parent = el.parentElement;
        const rect = el.getBoundingClientRect();
        el.dataset.stickyStart = parent.offsetTop;
        el.dataset.stickyEnd = parent.offsetTop + parent.offsetHeight;
        el.dataset.originalWidth = `${rect.width}px`;
        el.dataset.originalHeight = `${rect.height}px`;
      });
    }
    // Update sticky element positions
    updateStickyElements() {
      const scrollY = this.lenis.scroll;
      const viewportHeight = window.innerHeight;
      this.stickyElements.forEach((el) => {
        const parent = el.parentElement;
        const nextSibling = parent.nextElementSibling;
        if (!nextSibling) return;
        const stickyStart = parseFloat(el.dataset.stickyStart);
        const stickyEnd = parseFloat(el.dataset.stickyEnd);
        const parentRect = parent.getBoundingClientRect();
        const nextRect = nextSibling.getBoundingClientRect();
        // If next section enters halfway viewport, stop sticking
        const isNextEntering = nextRect.top < viewportHeight * 0.5;
        if (scrollY >= stickyStart && scrollY < stickyEnd && !isNextEntering) {
          el.style.position = 'fixed';
          el.style.top = `${window.innerHeight / 2 - el.offsetHeight / 2}px`;
          el.style.left = `${parentRect.left + parentRect.width / 2 - el.offsetWidth / 2}px`;
          el.style.opacity = '1';
        } else {
          el.style.position = 'relative';
          el.style.opacity = '0';
        }
      });
    }
    // Apply parallax effect based on data attributes
    updateParallax() {
      const scrollY = this.lenis.scroll;
      this.parallaxElements.forEach((el) => {
        const speed = parseFloat(el.getAttribute("data-scroll-speed")) || 1;
        const direction = el.getAttribute("data-scroll-direction") || "vertical";
        const initialTop = parseFloat(el.dataset.initialTop);
        const initialLeft = parseFloat(el.dataset.initialLeft);
        let offsetX = 0, offsetY = 0;
        if (direction === "horizontal") {
          offsetX = (scrollY - initialTop) * speed * 0.1;
        } else if (direction === "vertical") {
          offsetY = (scrollY - initialTop) * speed * 0.1;
        } else if (direction === "both") {
          offsetX = (scrollY - initialTop) * speed * 0.1;
          offsetY = (scrollY - initialTop) * speed * 0.1;
        }
        // If GSAP is present, respect GSAP transforms
        let gsapX = 0, gsapY = 0;
        if (window.gsap) {
          gsapX = gsap.getProperty(el, "x") || 0;
          gsapY = gsap.getProperty(el, "y") || 0;
        }
        el.style.transform = `translate3d(${offsetX + gsapX}px, ${offsetY + gsapY}px, 0)`;
      });
    }
    // Integration with GSAP ScrollTrigger
    setupScrollTrigger() {
      this.lenis.on('scroll', () => {
        ScrollTrigger.update();
      });
    }
    // Public method: Scroll to a target
    scrollTo(target, options = {}) {
      this.lenis.scrollTo(target, options);
    }
    // Public method: Start scrolling
    start() {
      this.lenis.start();
    }
    // Public method: Stop scrolling
    stop() {
      this.lenis.stop();
    }
    // Public method: Destroy the instance
    destroy() {
      this.lenis.destroy();
      FeatherScroll.instances = FeatherScroll.instances.filter((instance) => instance !== this);
    }
    // Public method: Get scroll position
    getScrollPosition() {
      return this.lenis.scroll;
    }
    // Update Lenis options dynamically
    updateOptions(newOptions) {
      Object.assign(this.lenis.options, newOptions);
    }
  }
export default FeatherScroll;

// Also attach to window for CDN users
if (typeof window !== 'undefined') {
  window.FeatherScroll = FeatherScroll;
}