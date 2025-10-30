(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/scrollbar-shift-fix.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ScrollbarShiftFix
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
function ScrollbarShiftFix() {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ScrollbarShiftFix.useEffect": ()=>{
            const docEl = document.documentElement;
            const body = document.body;
            const getScrollbarWidth = {
                "ScrollbarShiftFix.useEffect.getScrollbarWidth": ()=>window.innerWidth - docEl.clientWidth
            }["ScrollbarShiftFix.useEffect.getScrollbarWidth"]; // works across platforms
            const apply = {
                "ScrollbarShiftFix.useEffect.apply": ()=>{
                    const locked = body.style.overflow === "hidden" || docEl.style.overflow === "hidden" || body.classList.contains("modal-open") || docEl.classList.contains("modal-open");
                    const w = getScrollbarWidth();
                    if (locked && w > 0) {
                        body.style.paddingRight ||= `${w}px`;
                        docEl.style.setProperty("--scrollbar-width", `${w}px`);
                    } else {
                        // remove only if we set it
                        if (body.style.paddingRight) body.style.paddingRight = "";
                        docEl.style.removeProperty("--scrollbar-width");
                    }
                }
            }["ScrollbarShiftFix.useEffect.apply"];
            // Observe style/class changes that typically happen during modal open/close
            const observer = new MutationObserver(apply);
            observer.observe(body, {
                attributes: true,
                attributeFilter: [
                    "style",
                    "class"
                ]
            });
            observer.observe(docEl, {
                attributes: true,
                attributeFilter: [
                    "style",
                    "class"
                ]
            });
            // Recompute on resize (scrollbar width can change)
            const onResize = {
                "ScrollbarShiftFix.useEffect.onResize": ()=>apply()
            }["ScrollbarShiftFix.useEffect.onResize"];
            window.addEventListener("resize", onResize);
            // Initial run
            apply();
            return ({
                "ScrollbarShiftFix.useEffect": ()=>{
                    observer.disconnect();
                    window.removeEventListener("resize", onResize);
                    // cleanup any padding we added
                    if (body.style.paddingRight) body.style.paddingRight = "";
                    docEl.style.removeProperty("--scrollbar-width");
                }
            })["ScrollbarShiftFix.useEffect"];
        }
    }["ScrollbarShiftFix.useEffect"], []);
    return null;
}
_s(ScrollbarShiftFix, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = ScrollbarShiftFix;
var _c;
__turbopack_context__.k.register(_c, "ScrollbarShiftFix");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_scrollbar-shift-fix_tsx_2df42fb7._.js.map