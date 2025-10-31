module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/app/scrollbar-shift-fix.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ScrollbarShiftFix
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
function ScrollbarShiftFix() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const docEl = document.documentElement;
        const body = document.body;
        const getScrollbarWidth = ()=>window.innerWidth - docEl.clientWidth; // works across platforms
        const apply = ()=>{
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
        };
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
        const onResize = ()=>apply();
        window.addEventListener("resize", onResize);
        // Initial run
        apply();
        return ()=>{
            observer.disconnect();
            window.removeEventListener("resize", onResize);
            // cleanup any padding we added
            if (body.style.paddingRight) body.style.paddingRight = "";
            docEl.style.removeProperty("--scrollbar-width");
        };
    }, []);
    return null;
}
}),
"[project]/app/scrollbar-consistency.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ScrollbarConsistency
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
function ScrollbarConsistency() {
    const lastWRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const html = document.documentElement;
        const getScrollbarWidth = ()=>window.innerWidth - html.clientWidth;
        const update = ()=>{
            const hasOverflow = html.scrollHeight > html.clientHeight;
            const w = getScrollbarWidth();
            // remember the last *non-zero* scrollbar width we observed
            if (w > 0) {
                lastWRef.current = w;
                html.style.setProperty("--sbw-prev", `${w}px`);
            }
            // toggle a class based on whether we have a vertical scrollbar
            html.classList.toggle("no-scrollbar", !hasOverflow);
        };
        // initial run
        update();
        // react to size/layout/content changes
        const ro = new ResizeObserver(update);
        ro.observe(document.documentElement);
        ro.observe(document.body);
        const mo = new MutationObserver(update);
        mo.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true
        });
        window.addEventListener("resize", update);
        return ()=>{
            ro.disconnect();
            mo.disconnect();
            window.removeEventListener("resize", update);
        };
    }, []);
    return null;
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d4356ddb._.js.map