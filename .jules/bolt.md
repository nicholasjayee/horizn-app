## 2024-05-24 - React Three Fiber zero-allocation memory loop
**Learning:** `new THREE.Color()` inside a `useFrame` loop causes heavy memory allocations per frame leading to garbage collection pressure and stuttering. Even using `.clone().lerp()` results in new memory objects.
**Action:** Move instantiation out of the `useFrame` loop. Use zero-allocation methods like `.lerpColors(startColor, endColor, alpha)` to morph colors on pre-allocated instance references.

## 2024-07-26 - Stochastic value stability and memory allocation in React Three Fiber
**Learning:** Unmemoized vector allocations (e.g., `.clone()`, `new THREE.Vector3()`) and stochastic functions (e.g., `Math.random()`) inside render functions like React components cause garbage collection pressure on every render and lead to unstable stochastic values.
**Action:** Wrap object allocations and stochastic values with `useMemo` hooks so they are correctly instantiated once or when dependencies change, stabilizing values and preventing memory reallocation on every frame/render.
