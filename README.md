# FeatherScroll

FeatherScroll is a lightweight, smooth scrolling library designed for full device support and easy integration. It provides advanced scrolling features such as parallax effects, sticky elements, and smooth animations without requiring additional dependencies.

## 🚀 Features

- **Smooth Scrolling:** Automatically enables smooth scrolling when included.
- **Supports Multiple Scrollable Areas:** Works with multiple content sections on a single page.
- **Parallax Scrolling:** Apply horizontal and vertical scroll effects.
- **Sticky Elements:** Keep elements fixed within their parent while scrolling.
- **Scroll Direction Detection:** Identify whether the user is scrolling up or down.
- **Fully Configurable:** Customize scroll speed, easing, and gestures.
- **Integration with GSAP ScrollTrigger:** Seamless compatibility for advanced animations.

---

## 📦 Installation

### **Using JSDelivr (CDN)**

```html
<script src="https://cdn.jsdelivr.net/npm/scrollfeather/featherScroll.js"></script>
```

FeatherScroll will be automatically available globally as `FeatherScroll`.

---

## 🛠️ Basic Usage

### **1️⃣ Include FeatherScroll in Your Project**

```html
<script src="https://cdn.jsdelivr.net/npm/scrollfeather/featherScroll.js"></script>
```

### **2️⃣ Initialize FeatherScroll**

Feather Scroll doesn't need any extra options for basic smooth scrolling initialization

```js
const scroll = new FeatherScroll();
```

---

## ⚙️ Options

You can customize FeatherScroll with various options:

```js
const scroll = new FeatherScroll({
  smooth: true, // Enable smooth scrolling
  duration: 1.2, // Scroll duration (seconds)
  easing: (t) => 1 - Math.pow(1 - t, 3), // Easing function
  direction: 'vertical', // 'vertical' | 'horizontal'
  gestureDirection: 'both', // Mouse/touch gesture control
  mouseSensitivity: 1, // Sensitivity for wheel scrolling
  touchSensitivity: 2, // Sensitivity for touch scrolling
  infinite: false // Infinite scrolling
});
```

---

## 📌 Sticky Elements

To make an element sticky within its parent, add the `data-scroll-sticky` attribute:

```html
<div class="parent">
    <div class="sticky" data-scroll-sticky>I'm a sticky element!</div>
</div>
```

The element will remain fixed inside its parent container while scrolling.

---

## 🎭 Parallax Scrolling

Apply a **scroll speed effect** using `data-scroll-speed`:

```html
<div data-scroll-speed="0.5">This moves slower.</div>
<div data-scroll-speed="1.5">This moves faster.</div>
```

Apply **horizontal scrolling** using `data-scroll-direction="horizontal"`:

```html
<div data-scroll-speed="1" data-scroll-direction="horizontal">This moves sideways.</div>
```

You can combine both:

```html
<div data-scroll-speed="1" data-scroll-direction="both">Moves in diagonally!</div>
```

---

## 🔄 Scroll Direction Detection

You can detect whether the user is scrolling up or down using an event listener:

```js
document.addEventListener('scroll', () => {
  const direction = scroll.getScrollDirection();
  console.log(`Scrolling ${direction}`);
});
```

This will return `'up'` or `'down'` based on the user's scroll behavior.

---

## 🎯 Scroll to Specific Section

You can scroll to any element or position programmatically:

```js
scroll.scrollTo('#section', { offset: -50, duration: 1 });
```

---

## 🎬 GSAP ScrollTrigger Integration

If GSAP ScrollTrigger is included, FeatherScroll will automatically sync with it

The below code is useful when you have set a custom scroll container:

```js
ScrollTrigger.defaults({ scroller: scroll.wrapper });
//scroll is the variable in which FeatherScroll is initialized
```

---

## 🛑 Controlling Scroll Behavior

### **Start or Stop Smooth Scrolling**

```js
scroll.start(); // Enable smooth scrolling
scroll.stop();  // Disable smooth scrolling
```

### **Destroy FeatherScroll**

```js
scroll.destroy();
```

---

## 🛠️ Updating Options Dynamically

You can update the scroll options dynamically:

```js
scroll.updateOptions({ duration: 2, smooth: false });
```

This allows you to modify scroll settings without reinitializing the instance.

---

## 🌍 Supporting Multiple Scroll Instances

FeatherScroll supports multiple scrolling areas:

```js
const scroll1 = new FeatherScroll({ wrapper: '.container1', content: '.content1' });
const scroll2 = new FeatherScroll({ wrapper: '.container2', content: '.content2' });
```

---

## 📜 License

FeatherScroll is open-source under the [MIT License](LICENSE).

---

## 🤝 Contributing

If you want to contribute, feel free to submit pull requests on [GitHub](https://github.com/yourusername/featherscroll).

---

## ❤️ Support FeatherScroll

If you find FeatherScroll useful and would like to support its development, consider donating:  

- **PayPal:** [@RanvijayRaj7](https://www.paypal.me/RanvijayRaj7)  
- **UPI:** gamersuraj720@okhdfcbank  

Your support helps keep this project alive and improving! 🚀 

---
## 📧 Need Help?

For questions or issues, create a GitHub issue or reach out to me!

