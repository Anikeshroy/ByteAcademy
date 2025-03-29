// Register service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((registration) => {
      console.log("📱 PWA: Service Worker registered with scope:", registration.scope);
    })
    .catch((error) => {
      console.error("📱 PWA: Service Worker registration failed:", error);
    });
}

// Handle beforeinstallprompt event
window.addEventListener("beforeinstallprompt", (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  console.log("📱 PWA: beforeinstallprompt event fired and stored");
  
  // Store the event for later use
  window.deferredPrompt = e;
  
  // Send a custom event that PWANotification component can listen for
  try {
    const pwaNotificationEvent = new CustomEvent('pwaInstallable', { 
      detail: { deferredPrompt: e } 
    });
    console.log("📱 PWA: Dispatching pwaInstallable event");
    window.dispatchEvent(pwaNotificationEvent);
  } catch (error) {
    console.error("📱 PWA: Error dispatching pwaInstallable event:", error);
  }
  
  // Some browsers might not properly pass the event object via CustomEvent
  // So we'll also set a flag in localStorage to indicate the app is installable
  try {
    localStorage.setItem('pwa-installable', 'true');
  } catch (error) {
    console.error("📱 PWA: Error setting localStorage flag:", error);
  }
});

// Handle app installed event
window.addEventListener("appinstalled", () => {
  console.log("📱 PWA: App was installed");
  
  // Clear the deferredPrompt variable
  window.deferredPrompt = undefined;
  
  // Trigger custom event for app components to respond to
  window.dispatchEvent(new Event('pwaInstalled'));
  
  // Also set a flag in localStorage
  try {
    localStorage.setItem('pwa-app-installed', 'true');
  } catch (error) {
    console.error("📱 PWA: Error setting install flag in localStorage:", error);
  }
}); 