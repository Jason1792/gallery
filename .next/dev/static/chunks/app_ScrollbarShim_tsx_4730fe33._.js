(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/ScrollbarShim.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ScrollbarShim
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
function ScrollbarShim() {
    _s();
    const lastNonZero = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "ScrollbarShim.useLayoutEffect": ()=>{
            const docEl = document.documentElement;
            const body = document.body;
            const setVar = {
                "ScrollbarShim.useLayoutEffect.setVar": (name, px)=>docEl.style.setProperty(name, `${px}px`)
            }["ScrollbarShim.useLayoutEffect.setVar"];
            const measure = {
                "ScrollbarShim.useLayoutEffect.measure": ()=>{
                    // Live scrollbar width (0 when absent)
                    const sbw = Math.max(0, window.innerWidth - docEl.clientWidth);
                    setVar('--sbw', sbw);
                    // Remember last non-zero width so we can use it during no-scroll state
                    if (sbw > 0 && Math.abs(sbw - lastNonZero.current) > 0.5) {
                        lastNonZero.current = sbw;
                        setVar('--sbw-prev', sbw);
                    }
                    // Does body overflow vertically? (ceil to avoid subpixel flapping)
                    const needsScroll = Math.ceil(body.scrollHeight - docEl.clientHeight) > 0;
                    if (needsScroll) {
                        body.classList.add('has-scroll');
                        body.classList.remove('no-scroll');
                    } else {
                        body.classList.add('no-scroll');
                        body.classList.remove('has-scroll');
                    }
                }
            }["ScrollbarShim.useLayoutEffect.measure"];
            // Run now and on changes
            measure();
            const ro = new ResizeObserver(measure);
            ro.observe(docEl);
            window.addEventListener('resize', measure, {
                passive: true
            });
            window.addEventListener('load', measure, {
                once: true
            });
            return ({
                "ScrollbarShim.useLayoutEffect": ()=>{
                    ro.disconnect();
                    window.removeEventListener('resize', measure);
                }
            })["ScrollbarShim.useLayoutEffect"];
        }
    }["ScrollbarShim.useLayoutEffect"], []);
    return null;
}
_s(ScrollbarShim, "XDOBmk3bNX7wdoTU4qC41TVJXvA=");
_c = ScrollbarShim;
var _c;
__turbopack_context__.k.register(_c, "ScrollbarShim");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_ScrollbarShim_tsx_4730fe33._.js.map