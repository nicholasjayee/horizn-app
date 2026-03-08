## 2024-05-24 - React Three Fiber zero-allocation memory loop
**Learning:** `new THREE.Color()` inside a `useFrame` loop causes heavy memory allocations per frame leading to garbage collection pressure and stuttering. Even using `.clone().lerp()` results in new memory objects.
**Action:** Move instantiation out of the `useFrame` loop. Use zero-allocation methods like `.lerpColors(startColor, endColor, alpha)` to morph colors on pre-allocated instance references.

## 2024-05-25 - Caching stochastic values and Vector3 clones in React Three Fiber components
**Learning:** `Math.random()` and `THREE.Vector3.clone()` inside functional components (but outside `useFrame`) cause reallocation and recalculation of values on every React render. For visual effects like particles or lines, this can cause stuttering or unexpected visual jumps.
**Action:** Use `useMemo` to cache cloned `THREE.Vector3` instances and stochastic random values so they are only calculated once (or when their dependencies change), preventing unnecessary GC pressure during React re-renders.
