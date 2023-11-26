if (!self.define) {
    let e,
        a = {};
    const i = (i, c) => (
        (i = new URL(i + ".js", c).href),
        a[i] ||
            new Promise((a) => {
                if ("document" in self) {
                    const e = document.createElement("script");
                    (e.src = i), (e.onload = a), document.head.appendChild(e);
                } else (e = i), importScripts(i), a();
            }).then(() => {
                let e = a[i];
                if (!e)
                    throw new Error(`Module ${i} didn’t register its module`);
                return e;
            })
    );
    self.define = (c, s) => {
        const t =
            e ||
            ("document" in self ? document.currentScript.src : "") ||
            location.href;
        if (a[t]) return;
        let f = {};
        const d = (e) => i(e, t),
            b = { module: { uri: t }, exports: f, require: d };
        a[t] = Promise.all(c.map((e) => b[e] || d(e))).then(
            (e) => (s(...e), f)
        );
    };
}
define(["./workbox-7c2a5a06"], function (e) {
    "use strict";
    importScripts(),
        self.skipWaiting(),
        e.clientsClaim(),
        e.precacheAndRoute(
            [
                {
                    url: "/Donation-Image.svg",
                    revision: "3eb351f2e1656981643e3cf6802a902b",
                },
                {
                    url: "/_next/app-build-manifest.json",
                    revision: "02206ed4af6f814e51fd7b3b0ccf4aa0",
                },
                {
                    url: "/_next/static/JK8bhEH6Icvq1t4izbbGW/_buildManifest.js",
                    revision: "ea16ad30db5aa1d5a2d8af91e2917c6c",
                },
                {
                    url: "/_next/static/JK8bhEH6Icvq1t4izbbGW/_ssgManifest.js",
                    revision: "b6652df95db52feb4daf4eca35380933",
                },
                {
                    url: "/_next/static/chunks/00cbbcb7-dc9ad04aa8c51596.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/07115393-94af6566f1152dad.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/08ffe114-f26cd8f003a88fcf.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/1173-d5ae0dc3efa02f30.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/12038df7-f43285d550e6bb2a.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/2122-f981492b9402fc0b.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/2472-1ad94f8877d4fc4d.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/2929-34d94b42f6dfe64d.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/3410-de6ed03910eaf700.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/3627521c-ae0db874777e27d4.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/39209d7c-dc8bfce7e6b68ed3.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/4503-c76dc0a833bfeab2.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/472688b4-92257d522db3a771.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/484-081368b193740bd6.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/4f9d9cd8-d3050fe4516221be.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/5400-7f219b7f83419517.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/5916-76c590080ebc484e.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/6691-f5faa078eb0c8569.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/6734-5d7f55de8435e4e9.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/7212.ccb7e0c8d79cbbe1.js",
                    revision: "ccb7e0c8d79cbbe1",
                },
                {
                    url: "/_next/static/chunks/7233-ed400893a87209a2.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/8dc5345f-bb0bab7243b90d2a.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/9081a741-1af5dec96a4e6174.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/9616-8da63be1d24d093e.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/98916abf-057e4a47b5974567.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/app/%5Blocale%5D/%5B...rest%5D/page-01f930960de5a6ae.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/app/%5Blocale%5D/(auth)/profile/page-bfed91c301317a48.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/app/%5Blocale%5D/(auth)/sign-in/page-f48b951b2360215c.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/app/%5Blocale%5D/(auth)/sign-up/page-8dd337ecc7f4ac40.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/app/%5Blocale%5D/about/page-dd80fa03c9230bc6.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/app/%5Blocale%5D/dashboard/layout-8927b44e35017d64.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/app/%5Blocale%5D/dashboard/loading-8eaa2c264634db57.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/app/%5Blocale%5D/dashboard/page-49a84ca8b44e6105.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/app/%5Blocale%5D/donate/checkout/page-a8467340d9926e73.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/app/%5Blocale%5D/donate/page-cf01f1c609626d8b.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/app/%5Blocale%5D/error-8994992e740c8f3a.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/app/%5Blocale%5D/layout-81ce46d65bceee82.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/app/%5Blocale%5D/loading-24ba899d234ff06b.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/app/%5Blocale%5D/not-found-3ed850399e3ac5e5.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/app/%5Blocale%5D/page-4b22c2f9e752d59e.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/app/%5Blocale%5D/products/%5Bid%5D/not-found-bfb987b0554ec31e.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/app/%5Blocale%5D/products/%5Bid%5D/page-53cafc583b7115bd.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/app/%5Blocale%5D/products/page-f4e1fc784d5572d9.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/app/_not-found-42af8a803310af9e.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/bc9c3264-a66f2efcd3df2d61.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/d0deef33.a83fba576190f22e.js",
                    revision: "a83fba576190f22e",
                },
                {
                    url: "/_next/static/chunks/d622d42c-67a1e224fe5e6fb9.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/ec3863c0-e88f656e8e6ba049.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/fd9d1056-9efa752c0e4e9498.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/framework-964c2d6016b0d731.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/main-ab33f5c315674c8f.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/main-app-af75e6a5819524fc.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/pages/_app-649ff3ad97b7cfcd.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/pages/_error-1a9fa3ac20787313.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",
                    revision: "837c0df77fd5009c9e46d446188ecfd0",
                },
                {
                    url: "/_next/static/chunks/webpack-97964756e57e2982.js",
                    revision: "JK8bhEH6Icvq1t4izbbGW",
                },
                {
                    url: "/_next/static/css/25933d2f764a2352.css",
                    revision: "25933d2f764a2352",
                },
                {
                    url: "/_next/static/css/803894178d919b49.css",
                    revision: "803894178d919b49",
                },
                {
                    url: "/_next/static/css/aa9896d2148ddf81.css",
                    revision: "aa9896d2148ddf81",
                },
                {
                    url: "/_next/static/css/fc1c9daac70c093b.css",
                    revision: "fc1c9daac70c093b",
                },
                {
                    url: "/_next/static/media/0072718f43aaa392-s.woff2",
                    revision: "7c1ac668aa72b90969eda6472165db44",
                },
                {
                    url: "/_next/static/media/0662b626da5db789-s.woff2",
                    revision: "7092f7117afa134bee383085e5baffcb",
                },
                {
                    url: "/_next/static/media/080af2d585a0945f-s.woff2",
                    revision: "06c3d45b388e49337175902308068c98",
                },
                {
                    url: "/_next/static/media/08d8dbf030d999e9-s.woff2",
                    revision: "7f83fdfa064d708623f9af63fc2dbc39",
                },
                {
                    url: "/_next/static/media/0a47131846b6a2de-s.woff2",
                    revision: "de612a8a4794c93bba265c671b96f8c3",
                },
                {
                    url: "/_next/static/media/0ae5fd07c8851f56-s.woff2",
                    revision: "43ff7054b9dccb5bc8f39e2fabd63539",
                },
                {
                    url: "/_next/static/media/0d280338bf12c87e-s.woff2",
                    revision: "b8c13e2a269b0f0e50336155b2b0d4c9",
                },
                {
                    url: "/_next/static/media/0e4fe491bf84089c-s.woff2",
                    revision: "5e22a46c04d947a36ea0cad07afcc9e1",
                },
                {
                    url: "/_next/static/media/1230b0a22309c39f-s.woff2",
                    revision: "e78f1cb52740de1e52f9aae6f7e9bad5",
                },
                {
                    url: "/_next/static/media/12ac8982e5ad67f5-s.woff2",
                    revision: "a26489a8823cdf39c1839d32d15c2dfd",
                },
                {
                    url: "/_next/static/media/155cae559bbd1a77-s.p.woff2",
                    revision: "268d01e94fa0e3a13787891fe19f739c",
                },
                {
                    url: "/_next/static/media/162938472036e0a8-s.woff2",
                    revision: "f07093b23087bde42e34448bcbad3f78",
                },
                {
                    url: "/_next/static/media/1687dc000bc6a506-s.woff2",
                    revision: "839f47fdd6523a3fe7c7bdb8bc871f4b",
                },
                {
                    url: "/_next/static/media/16f0403045ba05f5-s.woff2",
                    revision: "0895a78fb3edf0d5d7b867ff25fe0db0",
                },
                {
                    url: "/_next/static/media/1bd6413b4bc9d576-s.woff2",
                    revision: "06188038298dd58aebfba94dde918aa7",
                },
                {
                    url: "/_next/static/media/1c2dd1ba53df5d6c-s.woff2",
                    revision: "2af19297cf9ad739ebd8dddee0b2a822",
                },
                {
                    url: "/_next/static/media/1cdae5d3d9de8203-s.p.woff2",
                    revision: "a28fd4b7953eb7c1f27bfbe59b29226f",
                },
                {
                    url: "/_next/static/media/1f50ff87c1c2acdb-s.p.woff2",
                    revision: "709b3524db73c6f5362e799863680d1e",
                },
                {
                    url: "/_next/static/media/1fe84a733deddad4-s.woff2",
                    revision: "c9f346d5d19d0d10e27b26904f5f6d7f",
                },
                {
                    url: "/_next/static/media/20b8b8f6f47c1e10-s.woff2",
                    revision: "7def222d1a45cb1cb7d8c3ae675dbdcc",
                },
                {
                    url: "/_next/static/media/21223c277fea05e1-s.woff2",
                    revision: "ac021ecbecc7e85d4d0e318d93a1099b",
                },
                {
                    url: "/_next/static/media/2234fe345265ef66-s.woff2",
                    revision: "0b20dfafaf9d895696adc2f0e23500e9",
                },
                {
                    url: "/_next/static/media/2633821eecbce89d-s.woff2",
                    revision: "38fa0fc4a78da73516d265e040857c2e",
                },
                {
                    url: "/_next/static/media/2688a16d230e7cac-s.woff2",
                    revision: "bad5aaf380147793a90cbfdfcd2e80d0",
                },
                {
                    url: "/_next/static/media/285a1102e99fce15-s.woff2",
                    revision: "e88d69a7fc4b534b08db7aac1921c1a1",
                },
                {
                    url: "/_next/static/media/2bd7b49002789b0b-s.woff2",
                    revision: "b0fda81708f1d32bb3af27ec8eed0bb4",
                },
                {
                    url: "/_next/static/media/2e2cda50aae824c7-s.woff2",
                    revision: "1b1a5523788d10deb2f06b8e2537375b",
                },
                {
                    url: "/_next/static/media/30c30cecdc348b70-s.woff2",
                    revision: "aa1fdd02980ce10690ce3a3c3047d23b",
                },
                {
                    url: "/_next/static/media/3abef073beb0bc8b-s.woff2",
                    revision: "7318b1e5f053b30c2dd2a5ea5c3d8243",
                },
                {
                    url: "/_next/static/media/3db0bb54d3b7e242-s.woff2",
                    revision: "04365bbfb6b5272955a08231d2b72f07",
                },
                {
                    url: "/_next/static/media/3e70b656b8cc773c-s.p.woff2",
                    revision: "e0a507374e32b2e2a8df9f4aa131766b",
                },
                {
                    url: "/_next/static/media/4263a34ee59227d7-s.p.woff2",
                    revision: "ac0bfeb1dff679f03c3862c25bd3f54f",
                },
                {
                    url: "/_next/static/media/4390aea73ad6eba3-s.woff2",
                    revision: "466fb24be0a6aa84af15a1a48c0025a3",
                },
                {
                    url: "/_next/static/media/43e90cc5ca03a26b-s.woff2",
                    revision: "ef1f860cd760fd4ff19ba9978621969b",
                },
                {
                    url: "/_next/static/media/45ffc60243366c23-s.woff2",
                    revision: "5fb0ac212c0314ecfbb638c9905cb756",
                },
                {
                    url: "/_next/static/media/48f4f904af848af4-s.woff2",
                    revision: "3aa60774b916cec632989739514e139c",
                },
                {
                    url: "/_next/static/media/4a488cb9d3d79fde-s.woff2",
                    revision: "ce624333a67cd6dadd5206987bbd4def",
                },
                {
                    url: "/_next/static/media/4b0541b7a99689cb-s.woff2",
                    revision: "39aca83b1794e7cb49fed6159760f7b8",
                },
                {
                    url: "/_next/static/media/4c341ab39f3acced-s.woff2",
                    revision: "1f52498afe8b0be11d0e0ea74dc518e9",
                },
                {
                    url: "/_next/static/media/4c472ffaefe8ebfa-s.woff2",
                    revision: "49b25daabc57074a94c6480cb7325ea3",
                },
                {
                    url: "/_next/static/media/4caeef6da8d39a4c-s.woff2",
                    revision: "9dd23ab8e851b7e31964d7ba10ed10af",
                },
                {
                    url: "/_next/static/media/4cfc83504dc246bb-s.woff2",
                    revision: "b0aae063d3e7fcd882ea2e33a8b37549",
                },
                {
                    url: "/_next/static/media/4de1fea1a954a5b6-s.p.woff2",
                    revision: "b7d6b48d8d12946dc808ff39aed6c460",
                },
                {
                    url: "/_next/static/media/51051a7edfeea436-s.woff2",
                    revision: "f1b74fe764967ea8636858297f750d66",
                },
                {
                    url: "/_next/static/media/52ec3f49db6b1a9b-s.woff2",
                    revision: "a4beb6b4931e20c7d8f43bb7bb5f971a",
                },
                {
                    url: "/_next/static/media/53a5fc736b8d7c9b-s.woff2",
                    revision: "e7cf80c7ed0ead9d8172d94a9172e2b8",
                },
                {
                    url: "/_next/static/media/55c20a7790588da9-s.p.woff2",
                    revision: "816d95a45d019ad06908231c9584ec03",
                },
                {
                    url: "/_next/static/media/570916778a34aa4f-s.woff2",
                    revision: "857fa044756d9685869fcaeda2d2501f",
                },
                {
                    url: "/_next/static/media/591327bf3b62a611-s.woff2",
                    revision: "0ed299a4bb5262e17e2145783b2c18f1",
                },
                {
                    url: "/_next/static/media/5af02463bdc14146-s.woff2",
                    revision: "331da2617ec3145f4fe6ddc748175cb9",
                },
                {
                    url: "/_next/static/media/64e585854c866b1d-s.woff2",
                    revision: "0e13b2a0750569aea0e1d47de586121e",
                },
                {
                    url: "/_next/static/media/650a9f4ef0790987-s.woff2",
                    revision: "504523d5c3c178fb1fa8b8a224d6e4e5",
                },
                {
                    url: "/_next/static/media/6534b404b87645d0-s.woff2",
                    revision: "9a935bcdf34e713332723f3a114c8ba9",
                },
                {
                    url: "/_next/static/media/67495633554e6132-s.woff2",
                    revision: "c2cfed3af4f72470fbebc3f959b6ebfa",
                },
                {
                    url: "/_next/static/media/6a8fdfbc699c5898-s.woff2",
                    revision: "86a91e456c8efd7ca6dc24321f7fe410",
                },
                {
                    url: "/_next/static/media/6ac317f972dd70ac-s.woff2",
                    revision: "2e77f3e83559f8434212ebd68751f1f2",
                },
                {
                    url: "/_next/static/media/6d664cce900333ee-s.p.woff2",
                    revision: "017598645bcc882a3610effe171c2ca3",
                },
                {
                    url: "/_next/static/media/6dd9be8e5e3a71b8-s.woff2",
                    revision: "5ba98aeb09d84a8db9015f1a5a850c33",
                },
                {
                    url: "/_next/static/media/6ec89c3f4265bc9b-s.woff2",
                    revision: "5396d177b727ae5121d49fda50183c3b",
                },
                {
                    url: "/_next/static/media/6f5d33a38a1dc5b9-s.woff2",
                    revision: "8c76726d8dd115bf5e3c04b6f0cf56de",
                },
                {
                    url: "/_next/static/media/7067487a207349d3-s.woff2",
                    revision: "c1b66593674d8c0011a346771fa628af",
                },
                {
                    url: "/_next/static/media/70ef5d755ee797d0-s.woff2",
                    revision: "7e9154292216ae7b74db355b94e5585e",
                },
                {
                    url: "/_next/static/media/73600732f94148b0-s.woff2",
                    revision: "c275240feb0f16dceaf18d9228bd50d1",
                },
                {
                    url: "/_next/static/media/76db66a777b69690-s.woff2",
                    revision: "362fbe1d1a7481161d73bd8e79524980",
                },
                {
                    url: "/_next/static/media/779a6e774b0ea607-s.woff2",
                    revision: "a5fed3224b0978dcb52f7e204aa74286",
                },
                {
                    url: "/_next/static/media/77c838dc29827ec7-s.woff2",
                    revision: "ab9228c47cc71dd0255131c3b451b2a9",
                },
                {
                    url: "/_next/static/media/7917bd69bb623719-s.woff2",
                    revision: "3bd1d048c046e4a7ca7d9c22fff98f07",
                },
                {
                    url: "/_next/static/media/7a78f1ce0329757f-s.p.woff2",
                    revision: "15ef609d3bea2ccc8a36910ba440e1f3",
                },
                {
                    url: "/_next/static/media/7ee2433ab1038ad4-s.woff2",
                    revision: "a5d02c9a1ead4b9ab5674050a20d7b26",
                },
                {
                    url: "/_next/static/media/7ff6869a1704182a-s.p.woff2",
                    revision: "cf5ec3859b05de1b9351ab934b937417",
                },
                {
                    url: "/_next/static/media/80cd513840934483-s.woff2",
                    revision: "be42be7f9018ca08d7e0a88c874108ff",
                },
                {
                    url: "/_next/static/media/81a4e44b7afd4ffd-s.woff2",
                    revision: "66632aaf8ce191bd0edf1c390e8d224b",
                },
                {
                    url: "/_next/static/media/84a66669f6209e63-s.woff2",
                    revision: "50877dc4d0887d3f8dabd849197115fe",
                },
                {
                    url: "/_next/static/media/853f640c54191eab-s.woff2",
                    revision: "88a57a0afd518c4ece7ad62b3d148f8a",
                },
                {
                    url: "/_next/static/media/87c72f23c47212b9-s.woff2",
                    revision: "790d0c8dbcd491d29d58f1369c199d40",
                },
                {
                    url: "/_next/static/media/88e0930a0f69887f-s.woff2",
                    revision: "b67a664d99bf0f44b959d804f8920b28",
                },
                {
                    url: "/_next/static/media/88edf0e9a087af79-s.woff2",
                    revision: "02935f76b48c83d31df1442c5dca2586",
                },
                {
                    url: "/_next/static/media/8980bbd10601b8c7-s.woff2",
                    revision: "b7a39eaac04396d896b1b5b04a5e026f",
                },
                {
                    url: "/_next/static/media/8a255811860e0002-s.woff2",
                    revision: "f6cc33dc2aa16ecaa82e219a3c4206b9",
                },
                {
                    url: "/_next/static/media/8e0a94606b670897-s.woff2",
                    revision: "1ab483fd5c65fc33b62eeabb9e499a4d",
                },
                {
                    url: "/_next/static/media/8fb72f69fba4e3d2-s.woff2",
                    revision: "7a2e2eae214e49b4333030f789100720",
                },
                {
                    url: "/_next/static/media/905ee4d99b7802f5-s.woff2",
                    revision: "924d1539e168d130deec962a80d2da73",
                },
                {
                    url: "/_next/static/media/912a9cfe43c928d9-s.p.woff2",
                    revision: "376ffe2ca0b038d08d5e582ec13a310f",
                },
                {
                    url: "/_next/static/media/916d3686010a8de2-s.p.woff2",
                    revision: "9212f6f9860f9fc6c69b02fedf6db8c3",
                },
                {
                    url: "/_next/static/media/94c1cbd50245a716-s.woff2",
                    revision: "3b13481ebb00ffcc4c678bb5f2bbf3ba",
                },
                {
                    url: "/_next/static/media/953974ac5e9ff354-s.woff2",
                    revision: "6731e1ba3788bda094c89ee8fc131aef",
                },
                {
                    url: "/_next/static/media/995091fbfa519189-s.woff2",
                    revision: "1e22556a938bc595b4de89f5898f5435",
                },
                {
                    url: "/_next/static/media/9a881e2ac07d406b-s.p.woff2",
                    revision: "25b0e113ca7cce3770d542736db26368",
                },
                {
                    url: "/_next/static/media/9b44cfc48addbfc9-s.woff2",
                    revision: "b8f12782fb372c92a5c8e3380f926e17",
                },
                {
                    url: "/_next/static/media/9c0443c23bb85467-s.woff2",
                    revision: "32a69947a040032e32f17d81e00499bf",
                },
                {
                    url: "/_next/static/media/a3bfe233e5f7c725-s.woff2",
                    revision: "3fa12bdf236f604d3fdc94f1e22b21b5",
                },
                {
                    url: "/_next/static/media/a60a6967d4c991bd-s.woff2",
                    revision: "1c0f6f4da838596fcab44439e7218b4c",
                },
                {
                    url: "/_next/static/media/a6a3dc4c015c93a4-s.woff2",
                    revision: "62c5f6579355f8231fdea2e4574f2a24",
                },
                {
                    url: "/_next/static/media/a73bf86e1706af0f-s.woff2",
                    revision: "f386e2aeb7dc06f144e24fc7b7159873",
                },
                {
                    url: "/_next/static/media/a9b6c57cb5b13304-s.woff2",
                    revision: "f0bb6fe8bdaa78b60e87953e15da784d",
                },
                {
                    url: "/_next/static/media/ae5416a9cc27b15b-s.woff2",
                    revision: "49b6992da8722670d98c520bfe5094b7",
                },
                {
                    url: "/_next/static/media/af4d27004aa34222-s.woff2",
                    revision: "c5a05a4e2a52b4590fbb511cc93b5045",
                },
                {
                    url: "/_next/static/media/b1c47c47d092792d-s.woff2",
                    revision: "6da56a20a6d3a116cde402bf5325140c",
                },
                {
                    url: "/_next/static/media/b249c3695d2971d9-s.woff2",
                    revision: "fc81fa56e5973e778d5b1fe36152a731",
                },
                {
                    url: "/_next/static/media/baf12dd90520ae41-s.woff2",
                    revision: "8096f9b1a15c26638179b6c9499ff260",
                },
                {
                    url: "/_next/static/media/bbdb6f0234009aba-s.woff2",
                    revision: "5756151c819325914806c6be65088b13",
                },
                {
                    url: "/_next/static/media/bd427f25ac24d036-s.p.woff2",
                    revision: "5426bf50c8455aab7a3e89d1138eb969",
                },
                {
                    url: "/_next/static/media/bec247de9d1f19c4-s.woff2",
                    revision: "65dad10ce1a5ea7816b24a075343d14c",
                },
                {
                    url: "/_next/static/media/c04551857776278f-s.p.woff2",
                    revision: "8d91ec1ca2d8b56640a47117e313a3e9",
                },
                {
                    url: "/_next/static/media/c475a2c1cb90262e-s.woff2",
                    revision: "426ae9dba9ad93b28f28c04350c032f3",
                },
                {
                    url: "/_next/static/media/caf0fd4c8a56c6bd-s.woff2",
                    revision: "af98792fb245600324bdc627dc168e9a",
                },
                {
                    url: "/_next/static/media/ce275198c70c4ec4-s.woff2",
                    revision: "7980647b18c1fc05298038132135a9d2",
                },
                {
                    url: "/_next/static/media/d05ab252f71fb7a5-s.woff2",
                    revision: "93f6161f6d7660a314c1c428b11e423b",
                },
                {
                    url: "/_next/static/media/d39d3d0cd6ecb4bc-s.woff2",
                    revision: "3a5b39408b6327af986eedd7740582ed",
                },
                {
                    url: "/_next/static/media/d575051f49db4558-s.woff2",
                    revision: "3a768c818173044f5928b7304770e15a",
                },
                {
                    url: "/_next/static/media/d61d340d1b8cb687-s.woff2",
                    revision: "3b4e07161718d06a286b7e0a8780dd76",
                },
                {
                    url: "/_next/static/media/d9f54f88c8300fb5-s.woff2",
                    revision: "402881868ab992d712667025319964a1",
                },
                {
                    url: "/_next/static/media/dea1b0b5366e69d5-s.woff2",
                    revision: "df3001b9fc589b06ceb7e63c13a05c45",
                },
                {
                    url: "/_next/static/media/e025c64520263018-s.woff2",
                    revision: "dc820d9f0f62811268590ff631f36be9",
                },
                {
                    url: "/_next/static/media/e25729ca87cc7df9-s.woff2",
                    revision: "9a74bbc5f0d651f8f5b6df4fb3c5c755",
                },
                {
                    url: "/_next/static/media/e2bc10d309e63cb2-s.woff2",
                    revision: "d94b66f83cc0fdcf5e1d797354d86204",
                },
                {
                    url: "/_next/static/media/e7736eee3815d4c0-s.woff2",
                    revision: "9cb1babc6e3b1f850e90037f502000db",
                },
                {
                    url: "/_next/static/media/eaf1e47ae07ba789-s.woff2",
                    revision: "de64f61cbd55505f83d7170992c6b54c",
                },
                {
                    url: "/_next/static/media/ee5690b6a277230c-s.woff2",
                    revision: "dbe57ba036c334720d386e35d6a12da9",
                },
                {
                    url: "/_next/static/media/f06116e890b3dadb-s.woff2",
                    revision: "2855f7c90916c37fe4e6bd36205a26a8",
                },
                {
                    url: "/_next/static/media/f1df658da56627d0-s.woff2",
                    revision: "372d9cf6e4822b41d014fcc9de0a979a",
                },
                {
                    url: "/_next/static/media/f635d68977b0500e-s.woff2",
                    revision: "c3564d9e6f977e8e93d3c7e1d15dc29f",
                },
                {
                    url: "/_next/static/media/f93b79c1ea023ab6-s.woff2",
                    revision: "96b6d54684daa94742f7bfd72a981213",
                },
                {
                    url: "/_next/static/media/fdb2647c7ef61643-s.woff2",
                    revision: "a271072d171c163da7e7b5b52fb44f20",
                },
                {
                    url: "/_next/static/media/layers-2x.9859cd12.png",
                    revision: "9859cd12",
                },
                {
                    url: "/_next/static/media/layers.ef6db872.png",
                    revision: "ef6db872",
                },
                {
                    url: "/_next/static/media/marker-icon.d577052a.png",
                    revision: "d577052a",
                },
                {
                    url: "/android-chrome-192x192.png",
                    revision: "720fde3e1eb3bd263078ff84dff82693",
                },
                {
                    url: "/android-chrome-512x512.png",
                    revision: "746801b5dd32f938d37171dda5ab4be6",
                },
                {
                    url: "/apple-touch-icon.png",
                    revision: "bce0ebde72b20a7d4a7e5d34215d5a71",
                },
                {
                    url: "/conditionLabelVector.svg",
                    revision: "13d8ee9ad0ebe078932b6e30231eb21d",
                },
                {
                    url: "/donation-banner-transformed.jpg",
                    revision: "8fc895e413a7fbf03cc3e42cee572584",
                },
                {
                    url: "/favicon-16x16.png",
                    revision: "d5121e3b3bf62279ec5c89716f2434ba",
                },
                {
                    url: "/favicon-32x32.png",
                    revision: "b9051444f4f161df933b1c04916a9693",
                },
                {
                    url: "/favicon.ico",
                    revision: "1566652eb9664acba0ade07e696b5af5",
                },
                {
                    url: "/manifest.webmanifest",
                    revision: "525435078ddea21298624e1da322452f",
                },
                {
                    url: "/marker.png",
                    revision: "ea28758d706689f670677b7f608bb00e",
                },
                {
                    url: "/next.svg",
                    revision: "8e061864f388b47f33a1c3780831193e",
                },
                {
                    url: "/sitemap-0.xml",
                    revision: "a48eca7048c0d3f40cb9ce169e008370",
                },
                {
                    url: "/sitemap.xml",
                    revision: "19e65523f1563303a13ee457d4a72ba2",
                },
            ],
            { ignoreURLParametersMatching: [] }
        ),
        e.cleanupOutdatedCaches(),
        e.registerRoute(
            "/",
            new e.NetworkFirst({
                cacheName: "start-url",
                plugins: [
                    {
                        cacheWillUpdate: async ({
                            request: e,
                            response: a,
                            event: i,
                            state: c,
                        }) =>
                            a && "opaqueredirect" === a.type
                                ? new Response(a.body, {
                                      status: 200,
                                      statusText: "OK",
                                      headers: a.headers,
                                  })
                                : a,
                    },
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
            new e.CacheFirst({
                cacheName: "google-fonts-webfonts",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 4,
                        maxAgeSeconds: 31536e3,
                    }),
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
            new e.StaleWhileRevalidate({
                cacheName: "google-fonts-stylesheets",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 4,
                        maxAgeSeconds: 604800,
                    }),
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
            new e.StaleWhileRevalidate({
                cacheName: "static-font-assets",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 4,
                        maxAgeSeconds: 604800,
                    }),
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
            new e.StaleWhileRevalidate({
                cacheName: "static-image-assets",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 64,
                        maxAgeSeconds: 86400,
                    }),
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            /\/_next\/image\?url=.+$/i,
            new e.StaleWhileRevalidate({
                cacheName: "next-image",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 64,
                        maxAgeSeconds: 86400,
                    }),
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            /\.(?:mp3|wav|ogg)$/i,
            new e.CacheFirst({
                cacheName: "static-audio-assets",
                plugins: [
                    new e.RangeRequestsPlugin(),
                    new e.ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 86400,
                    }),
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            /\.(?:mp4)$/i,
            new e.CacheFirst({
                cacheName: "static-video-assets",
                plugins: [
                    new e.RangeRequestsPlugin(),
                    new e.ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 86400,
                    }),
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            /\.(?:js)$/i,
            new e.StaleWhileRevalidate({
                cacheName: "static-js-assets",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 86400,
                    }),
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            /\.(?:css|less)$/i,
            new e.StaleWhileRevalidate({
                cacheName: "static-style-assets",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 86400,
                    }),
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            /\/_next\/data\/.+\/.+\.json$/i,
            new e.StaleWhileRevalidate({
                cacheName: "next-data",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 86400,
                    }),
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            /\.(?:json|xml|csv)$/i,
            new e.NetworkFirst({
                cacheName: "static-data-assets",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 86400,
                    }),
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            ({ url: e }) => {
                if (!(self.origin === e.origin)) return !1;
                const a = e.pathname;
                return !a.startsWith("/api/auth/") && !!a.startsWith("/api/");
            },
            new e.NetworkFirst({
                cacheName: "apis",
                networkTimeoutSeconds: 10,
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 16,
                        maxAgeSeconds: 86400,
                    }),
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            ({ url: e }) => {
                if (!(self.origin === e.origin)) return !1;
                return !e.pathname.startsWith("/api/");
            },
            new e.NetworkFirst({
                cacheName: "others",
                networkTimeoutSeconds: 10,
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 86400,
                    }),
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            ({ url: e }) => !(self.origin === e.origin),
            new e.NetworkFirst({
                cacheName: "cross-origin",
                networkTimeoutSeconds: 10,
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 3600,
                    }),
                ],
            }),
            "GET"
        );
});
