# konva-gsap3-plugin

Usage
```javascript
gsap.to(konvaobject, {
    duration: 1,
    konva:{ 
        x: "+=150",
        y: 10
    }
});
```

Using objects:
```javascript
gsap.to(konvaobject, {
    duration: 1,
    konva:{ 
        position:{
            x: "+=150",
            y: 10
        },
        scale:{
            x: 2
        }
    }
});
```

Using array, e.g. for points:
```javascript
gsap.to(konvaobject, {
    duration: 1,
    konva:{ 
        points: [15, 170, 140, 23, 150, 60, 270, 150, 15,170]
    }
});
```
