const spdn_events = [
  "mouseover",
  "keydown",
  "touchmove",
  "touchstart",
  "wheel",
];
var perfEntries = performance.getEntriesByType("navigation");

function terminateAndCleanup() {
  spdnx.terminate();
  observer.disconnect();
  removeEventListeners();
  spdn_events.forEach(function (eventType) {
    window.removeEventListener(eventType, terminateAndCleanup, {
      passive: true,
    });
  });
  executeScripts();
}

function seq(functions, callback, index) {
  if (index === void 0) {
    index = 0;
  }
  functions[index](function () {
    ++index === functions.length ? callback() : seq(functions, callback, index);
  });
}

function dispatchEvents() {
  if (perfEntries[0]["loadEventEnd"] > 0) {
    const events = [
      { name: "DOMContentLoaded", target: [window, document] },
      { name: "readystatechange", target: [window, document] },
      { name: "load", target: [window, document] },
      { name: "show", target: [window, document] },
    ];

    events.forEach((eventInfo) => {
      const event = document.createEvent("Event");
      event.initEvent(eventInfo.name, true, true);
      eventInfo.target.forEach((target) => target.dispatchEvent(event));
    });

    const resizeEvent = window.document.createEvent("UIEvents");
    resizeEvent.initUIEvent("resize", true, true, window, 0);
    window.dispatchEvent(resizeEvent);
    document.dispatchEvent(resizeEvent);
  }
}

function injectScript(scriptElement, callback) {
  const newScript = document.createElement("script");
  newScript.type = "text/javascript";
  newScript.id = scriptElement.id;
  newScript.async = false;
  Object.assign(newScript.dataset, scriptElement.dataset);

  if (scriptElement.src) {
    newScript.onload = callback;
    newScript.onerror = callback;
    newScript.src = scriptElement.src;
  } else {
    newScript.textContent = scriptElement.innerText;
  }

  scriptElement.parentNode.removeChild(scriptElement);
  document.body.appendChild(newScript);

  if (!scriptElement.src) {
    callback();
  }
}

function executeScripts() {
  const scripts = document.querySelectorAll("script");
  const scriptFunctions = [];

  [].forEach.call(scripts, function (script) {
    if (script.getAttribute("type") == "text/spdnscript") {
      scriptFunctions.push(function (callback) {
        injectScript(script, callback);
      });
    }
  });

  seq(scriptFunctions, dispatchEvents);
}

function removeEventListeners() {
  if (
    perfEntries[0]["loadEventEnd"] > 0 &&
    typeof document.removeEventListeners !== "undefined"
  ) {
    document.removeEventListeners("DOMContentLoaded");
    document.removeEventListeners("load");
  }
}

spdn_events.forEach(function (eventType) {
  window.addEventListener(eventType, terminateAndCleanup, {
    passive: true,
  });
});