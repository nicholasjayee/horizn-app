## 2024-05-24 - React Three Fiber zero-allocation memory loop
**Learning:** `new THREE.Color()` inside a `useFrame` loop causes heavy memory allocations per frame leading to garbage collection pressure and stuttering. Even using `.clone().lerp()` results in new memory objects.
**Action:** Move instantiation out of the `useFrame` loop. Use zero-allocation methods like `.lerpColors(startColor, endColor, alpha)` to morph colors on pre-allocated instance references.
