// Runs before the app (index.html), as a file of its own: the app's Content-Security-Policy refuses inline scripts and
// inline event handlers, so nothing here may live in the page itself.
;(function () {
  // DM Sans is fetched without blocking the first paint (media="print"), then switched on: offline (a phone on a
  // plane) the page must not wait for the font server
  var font = document.getElementById('font-dm-sans')
  if (font) {
    var on = function () { font.media = 'all' }
    if (font.sheet) on()
    else font.addEventListener('load', on)
  }

  // The phone / tablet app's opening, after the system's plain graphite splash: "Anvira Notes" fades in at the centre,
  // LOCALHOUSELLM comes in beneath it, then both fade away once the app has drawn (window.__anviraBootDone, called by
  // the touch shell). Only in the native app; the desktop never shows it.
  var w = window
  // Capacitor 8's native shells inject window.Capacitor (neither androidBridge nor webkit.messageHandlers is there any
  // more), so the touch app is recognised by any of the three markers
  var C = w.Capacitor
  var native = !!(
    w.androidBridge ||
    (w.webkit && w.webkit.messageHandlers && w.webkit.messageHandlers.bridge) ||
    (C && (typeof C.isNativePlatform === 'function' ? C.isNativePlatform() : C.platform === 'android' || C.platform === 'ios'))
  )
  if (!native && !/[?&]platform=(android|ios)/.test(location.search)) return
  document.documentElement.classList.add('boot')
  var started = Date.now()
  var gone = false
  w.__anviraBootDone = function () {
    if (gone) return
    gone = true
    // long enough to read both lines, then out of the way
    setTimeout(function () {
      var el = document.getElementById('boot')
      if (!el) return
      el.classList.add('done')
      setTimeout(function () {
        document.documentElement.classList.remove('boot')
        el.remove()
      }, 540)
    }, Math.max(0, 2100 - (Date.now() - started)))
  }
  // never stuck: if the app has not drawn in 10 s, it shows anyway (whatever it has to say)
  setTimeout(w.__anviraBootDone, 10000)
})()
