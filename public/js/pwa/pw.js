function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
const publicVapidKey =
  "BDY3n6s0t4JOym8mCBlT55h8J70jOD_iiOjDZfp0sfGDPIFfmH-S660UMHAj-mf8SoRx4UaPsd7A491Or2zhXWU";
const registerSWandWebpush = async () => {
  if ("serviceWorker" in navigator) {
    //
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js", { scope: "/" })
        .then(
          (reg) => {
            console.log("Service worker registered -->", reg);
          },
          (err) => {
            console.error("Service worker not registered -->", err);
          }
        );
    });
    navigator.serviceWorker.ready
      .then(function (serviceWorkerRegistration) {
        const subscription = serviceWorkerRegistration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
        });
        return subscription;
      })
      .then(async (subscription) => {
        //console.log(subscription);
        await fetch("/subscribe", {
          method: "POST",
          body: JSON.stringify(subscription),
          headers: {
            "content-type": "application/json",
          },
        });
      });
  } else {
    console.error("Service workers are not supported in this browser");
  }
  navigator.serviceWorker.addEventListener("message", (event) =>
    console.log(event.data)
  );
};
registerSWandWebpush();
