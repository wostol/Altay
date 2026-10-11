/* Глобальные keyframes и утилиты для одностраничника ТФСО.
   Вставляются один раз через <style> в App (см. App.tsx). */

export const CSS = `
.tfso{font-family:'Manrope Variable','Manrope',system-ui,'Segoe UI',Roboto,sans-serif;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
.tfso-mono{font-family:'JetBrains Mono Variable','JetBrains Mono',ui-monospace,SFMono-Regular,Menlo,monospace;font-variant-numeric:tabular-nums}
html{scroll-behavior:smooth}
::selection{background:#BEF264;color:#052E16}
.reveal{opacity:0;transform:translateY(26px);transition:opacity .75s ease,transform .75s cubic-bezier(.2,.75,.3,1)}
.reveal.is-visible{opacity:1;transform:none}
@keyframes tfso-dash{to{stroke-dashoffset:-420}}
@keyframes tfso-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes tfso-pulse{0%{transform:scale(1);opacity:.5}70%{transform:scale(2.8);opacity:0}100%{opacity:0}}
@keyframes tfso-in{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:none}}
@keyframes tfso-sweep{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}
@keyframes tfso-spin{to{transform:rotate(360deg)}}
.tfso-route{animation:tfso-dash 18s linear infinite}
.tfso-float{animation:tfso-float 8s ease-in-out infinite}
.tfso-pulse{transform-box:fill-box;transform-origin:center;animation:tfso-pulse 3s ease-out infinite}
.tfso-drawer{animation:tfso-in .24s ease-out both}
.tfso-sweep{transform-origin:50% 50%;animation:tfso-sweep 26s linear infinite}
.tfso-spin{animation:tfso-spin .9s linear infinite}
.tfso-no-scrollbar::-webkit-scrollbar{display:none}
.tfso-no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}
.tfso-grain{background-image:radial-gradient(rgba(20,35,27,.045) 1px,transparent 1px);background-size:3px 3px}
@media (prefers-reduced-motion: reduce){
  html{scroll-behavior:auto}
  .reveal{opacity:1!important;transform:none!important;transition:none!important}
  .tfso-route,.tfso-float,.tfso-pulse,.tfso-sweep{animation:none!important}
}
`
