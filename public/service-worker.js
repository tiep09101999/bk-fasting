let staticCacheName = "static-cache-v69";
let dynamicCacheName = "dynamic-cache-v1";

let assets = [
  // "/countup",
  // "/choose",
  "/",
  "/countup",
  "/plan",
  "/mine",
  "/timeline",
  "/login",
  "/component/header.ejs",
  "/component/footerMobile.ejs",
  "/choose.ejs",
  "/countdown_home.ejs",
  "/learn.ejs",
  "/timeLine.ejs",
  "/plan.ejs",
  "/mine.ejs",
  "/login.ejs",
  "/register.ejs",
  "/example.html",
  "/offline.ejs",

  //các file js
  // "/js/calculateTime.js",
  "/js/chart.js",
  "/js/choose.js",
  "/js/editAccount.js",
  "/js/cdn.chart.js",
  "/js/drinkWater.js",
  "/js/endFast.js",
  "/js/logout.js",
  "/js/chartWeight.js",
  "/js/chartEat.js",
  "/js/chart.min.js",
  "/js/main.js",
  "/js/main.min.js",
  "/js/modal_count.js",
  "/js/modal_learn.js",
  "/js/plan.js",
  "/js/swiper-bundle.js",
  "/css/main.css",
  "/css/main.min.css",
  "/css/main.css.map",
  "/css/swiper-bundle.css",
  // các file library trong component public
  "/component/jquery/dist/jquery.min.js",
  "https://cdn.jsdelivr.net/npm/sweetalert2@10",
  "component/AlertifyJS/build/alertify.js",
  // 2 file socket
  "https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.1/socket.io.js",
  "/socket.io/socket.io.js",
  "/socket.io/?EIO=3&transport=polling&t=NZHEpq6",
];

self.addEventListener("install", function (event) {
  console.log("used to register the service worker");
  event.waitUntil(
    caches
      .open(staticCacheName)
      .then((cache) => {
        return fetch("/offline").then((response) =>
          cache.put("/offline", new Response(response.body))
        );
      })
      .then(() => self.skipWaiting())
  );
});

// self.addEventListener("fetch", function (event) {
//   //console.log(event.request);

//   event.respondWith(
//     caches.match(event.request).then((cacheRes) => {
//       console.log(cacheRes);
//       // if (cacheRes.redirected === true) {
//       //   cleanResponse(cacheRes);
//       // }

//       return (
//         cacheRes ||
//         fetch(event.request).then((fetchRes) => {
//           return caches.open(dynamicCacheName).then((cache) => {
//             cache.put(event.request.url, fetchRes.clone());
//             return fetchRes;
//           });
//         })
//       );
//     })
//   );
// });

// self.addEventListener("fetch", function (event) {
//   console.log(event.request);
//   event.respondWith(
//     // Phương thức này xem xét request và tìm xem có
//     // kết quả nào đã được cache từ tất cả các cache
//     // mà Service Worker đã tạo.
//     caches.match(event.request).then(function (response) {
//       console.log(response);
//       // Nếu tìm thấy cache thì trả về response.
//       if (response) {
//         return response;
//       }

//       // Nhân bản request. Một request là 1 stream và chỉ có thể sử dụng 1 lần.
//       // Bởi vì chúng ta đang xài 1 cái cho cache và 1 cái cho trình duyệt để fetch,
//       // nến ta cần phải nhân bản request.
//       var fetchRequest = event.request.clone();

//       // Cache không tìm thấy nên ta cần thực hiện fetch
//       // để tạo request tới mạng và trả về dữ liệu nếu tìm thấy
//       // thứ gì đó.
//       return fetch(fetchRequest).then(function (response) {
//         // Kiểm tra nếu ta nhận được response hợp lệ.
//         if (!response || response.status !== 200 || response.type !== "basic") {
//           return response;
//         }

//         // Nhân bản response bởi vì nó cũng không phải là 1 stream.
//         // Bởi vì chúng ta muốn trình duyệt sử dụng response cũng như
//         // cache sử dụng response, ta cần nhân bản nó thành 2 stream.
//         var responseToCache = response.clone();

//         caches.open(dynamicCacheName).then(function (cache) {
//           // Thêm request vào cache phục vụ sau này
//           cache.put(event.request.url, responseToCache);
//         });

//         return response;
//       });
//     })
//   );
// });

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== staticCacheName) {
            console.log("[ServiceWorker] Removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// self.oninstall = function (evt) {
//   evt.waitUntil(
//     caches.open(staticCacheName).then(function (cache) {
//       return Promise.all(
//         ["/"].map(function (url) {
//           return fetch(new Request(url, { redirect: "manual" })).then(function (
//             res
//           ) {
//             return cache.put(url, res);
//           });
//         })
//       );
//     })
//   );
// };
// // self.onfetch = function (evt) {
// //   var url = new URL(evt.request.url);
// //   if (url.pathname != "/") return;
// //   evt.respondWith(caches.match(evt.request, { cacheName: staticCacheName }));
// // };
function cleanResponse(response) {
  const clonedResponse = response.clone();

  // Not all browsers support the Response.body stream, so fall back to reading
  // the entire body into memory as a blob.
  const bodyPromise =
    "body" in clonedResponse
      ? Promise.resolve(clonedResponse.body)
      : clonedResponse.blob();

  return bodyPromise.then((body) => {
    // new Response() is happy when passed either a stream or a Blob.
    return new Response(body, {
      headers: clonedResponse.headers,
      status: clonedResponse.status,
      statusText: clonedResponse.statusText,
    });
  });
}

self.addEventListener("push", (event) => {
  console.log(event.data);
  const data = event.data.json();
  // const data = {
  //   title: "xinchao",
  // };
  self.registration.showNotification(data.title, {
    body: data.body,

    icon: "../assets/fasting-96x96.png",
  });
});

self.addEventListener("notificationclick", (event) => {
  event.waitUntil(
    self.clients.matchAll().then((clients) => {
      if (clients.length) {
        // check if at least one tab is already open
        clients[0].focus();
        clients[0].postMessage("Push notification clicked!");
      } else {
        self.clients.openWindow("/");
        event.notification.close();
      }
    })
  );
});
