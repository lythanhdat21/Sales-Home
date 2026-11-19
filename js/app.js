/* Website giới thiệu – bản mẫu 2 (19/11/2026). Mã nguồn giao diện, chép nguyên sang 03_Website/js/app.js.
 * Dữ liệu: window.DATA (js/data.js, do dung_website.py tạo) = 1 dự án mẫu, gắn vào loại công trình "van-phong".
 * Địa chỉ: #trang-chu | #<loại>/<mục>/<trang>[/<mã thiết bị>] | #tai-lieu ; ?lang=en
 *   loại: nha-o, van-phong, biet-thu, khach-san ; mục: mat-bang, so-do, kich-ban
 */
(function () {
  "use strict";
  var D = window.DATA;

  /* ===== biểu tượng (nét, 24 × 24) ===== */
  var ICON = {
    plan: '<path d="M3 4h18v16H3z"/><path d="M10 4v7H3M14 20v-6h7M14 9h7"/>',
    sld: '<rect x="9" y="3" width="6" height="5" rx="1"/><rect x="3" y="16" width="6" height="5" rx="1"/><rect x="15" y="16" width="6" height="5" rx="1"/><path d="M12 8v4M6 16v-4h12v4"/>',
    scn: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
    home: '<path d="M3 11 12 4l9 7"/><path d="M5 9.5V20h14V9.5"/><path d="M10 20v-6h4v6"/>',
    office: '<rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M10 21v-3h4v3"/>',
    villa: '<path d="M2 11.5 8 6l6 5.5"/><path d="M4 10v10h16v-7.5"/><path d="M11 8.5 16 4l6 5.5"/><path d="M7 20v-4h3v4M14 14h3"/>',
    hotel: '<path d="M5 21V3h14v18"/><path d="M3 21h18M10 21v-4h4v4"/><path d="M9.5 7v6M14.5 7v6M9.5 10h5"/>',
    light: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9V16h7v-2.1A6 6 0 0 0 12 3z"/>',
    curtain: '<path d="M3 4h18M5 4v16M19 4v16M5 4c3.5 4 3.5 12 0 16M19 4c-3.5 4-3.5 12 0 16"/>',
    climate: '<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 10v6"/>',
    energy: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    audio: '<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M17 9a4 4 0 0 1 0 6M19.5 6.5a8 8 0 0 1 0 11"/>',
    app: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
    tap: '<path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11"/><path d="M12 10.5V9a1.5 1.5 0 0 1 3 0v2M15 10.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-1a6 6 0 0 1-5-2.7L4 15.5a1.5 1.5 0 0 1 2.5-1.7L9 16"/>',
    dl: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
    fit: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
    left: '<path d="M15 5l-7 7 7 7"/>',
    right: '<path d="M9 5l7 7-7 7"/>'
  };
  function ic(k) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + ICON[k] + "</svg>"; }

  /* ===== màu theo nhóm thiết bị (ban-mau-4: màu đậm nổi bật trên nền trắng, màu sáng trên cột phải tối) ===== */
  var KIND_GROUP = {
    SW: "ctrl", SO: "ctrl",
    PIR: "sens", DC: "sens", AQ: "sens", MIC: "sens",
    MR: "hvac", IR: "hvac", ERV: "hvac",
    CAM: "media", SPK: "media", NL: "media",
    RCU: "cab"
  };
  function colorOfKind(k) { return "var(--c-" + (KIND_GROUP[k] || "ctrl") + ")"; }
  function barColorOfKind(k) { return "var(--cb-" + (KIND_GROUP[k] || "ctrl") + ")"; }
  function colorOfDevice(d) {
    if (d.rcu) return "var(--c-cab)";
    var k0 = d.items && d.items[0] ? d.items[0].kind : "SW";
    return colorOfKind(k0);
  }

  /* ===== chữ giao diện VI / EN ===== */
  var I18N = {
    vi: {
      home: "Trang chủ", docs: "Tài liệu",
      home_title: "Control Solution Systems",
      home_lead: "Thiết kế và tích hợp hệ thống điều khiển ánh sáng, rèm, điều hòa, âm thanh và điện năng.",
      home_view: "Xem dự án mẫu", home_docs: "Tài liệu",
      has_demo: "Có dự án mẫu", soon: "Sắp có",
      demo: "Dự án mẫu", get_docs: "Xem tài liệu →",
      hint: "Bấm vào thiết bị trên bản vẽ để xem chi tiết.", on_page: "Thiết bị trên trang này", pages_h: "Các trang",
      dl_pdf: "Tải PDF", close: "Đóng", clear_flt: "Bỏ lọc", prev: "Trước", next: "Sau", zoom_in: "Phóng to", zoom_out: "Thu nhỏ", fit: "Vừa khung",
      keys: "Chức năng phím", panel: "Thiết bị trong tủ", page: "Trang", pages: "trang",
      empty_h: "Dự án mẫu {c} đang được cập nhật", empty_p: "Các giải pháp tiêu biểu cho {c}:", empty_btn: "Xem dự án mẫu Văn phòng",
      dl_eyebrow: "Hồ sơ kỹ thuật", dl_title: "Tài liệu", dl_desc: "Bản PDF đầy đủ của từng dự án mẫu, in được khổ A3 / A4.", dl_soon: "Đang chuẩn bị:"
    },
    en: {
      home: "Home", docs: "Documents",
      home_title: "Control Solution Systems",
      home_lead: "Integrated control for lighting, shading, climate, audio and energy.",
      home_view: "View showcase", home_docs: "Documents",
      has_demo: "Showcase", soon: "Coming soon",
      demo: "Showcase project", get_docs: "View documents →",
      hint: "Click a device on the drawing to see its details.", on_page: "Devices on this page", pages_h: "Pages",
      dl_pdf: "Download PDF", close: "Close", clear_flt: "Clear", prev: "Prev", next: "Next", zoom_in: "Zoom in", zoom_out: "Zoom out", fit: "Fit",
      keys: "Key functions", panel: "Inside the cabinet", page: "Page", pages: "pages",
      empty_h: "{c} showcase coming soon", empty_p: "Typical solutions for {c}:", empty_btn: "View the office showcase",
      dl_eyebrow: "Technical documents", dl_title: "Documents", dl_desc: "Full PDF set for each showcase project, printable on A3 / A4.", dl_soon: "In preparation:"
    }
  };
  var POINTS = [
    ["light", "Chiếu sáng", "Bật/tắt, chỉnh độ sáng, gọi cảnh một chạm.", "Lighting", "Dimming and one-touch scenes."],
    ["curtain", "Rèm điện", "Đóng mở theo giờ, nắng hoặc cảnh.", "Shading", "Timed, daylight and scene control."],
    ["climate", "Điều hòa & Khí tươi", "Tự chỉnh theo hiện diện và CO₂.", "Climate & Air", "Occupancy and CO₂ driven."],
    ["energy", "Điện năng & AI", "Đo tải từng nhánh, cảnh báo bất thường.", "Energy & AI", "Per-circuit metering and alerts."],
    ["audio", "Âm thanh đa vùng", "Nhạc nền độc lập từng không gian.", "Multi-zone Audio", "Independent background music."],
    ["app", "Vận hành linh hoạt", "Nút nhấn, ứng dụng hoặc tự động.", "Flexible Control", "Wall keypads, app or automation."]
  ];
  // loại công trình, theo thứ tự trên thanh menu (người dùng chốt 19/11: Văn phòng trước Nhà ở); data = dự án mẫu (hiện chỉ có 1)
  var CATS = [
    { id: "van-phong", icon: "office", vi: "Văn phòng", en: "Offices", data: D,
      d_vi: "Sảnh đón, phòng họp, tiết kiệm điện theo người dùng thực.", d_en: "Receptions, meeting rooms, energy saving by real occupancy." },
    { id: "nha-o", icon: "home", vi: "Nhà ở", en: "Homes", data: null,
      d_vi: "Ánh sáng, rèm, máy lạnh theo nhịp sinh hoạt gia đình.", d_en: "Lighting, curtains and climate that follow family life.",
      b_vi: ["Cảnh Về nhà, Đi ngủ, Rời nhà một chạm", "Cảm biến hiện diện tự tắt đèn phòng trống", "Điều khiển bằng app, theo lịch, theo cảm biến"],
      b_en: ["One-touch Arrive, Sleep and Leave scenes", "Presence sensors switch off empty rooms", "App, schedule and sensor-based control"] },
    { id: "biet-thu", icon: "villa", vi: "Biệt thự", en: "Villas", data: null,
      d_vi: "Nhiều tầng, sân vườn, hồ bơi trên cùng một hệ điều khiển.", d_en: "Multi-level living, garden and pool on one control system.",
      b_vi: ["Chiếu sáng sân vườn, mặt tiền theo lịch", "Bơm hồ bơi, tưới cây tự động", "Camera, cảm biến cửa, báo động an ninh"],
      b_en: ["Garden and façade lighting on schedules", "Automatic pool pumps and irrigation", "Cameras, door contacts and security alerts"] },
    { id: "khach-san", icon: "hotel", vi: "Khách sạn", en: "Hotels", data: null,
      d_vi: "Thẻ phòng, cảnh chào khách, tiết kiệm điện cho từng phòng.", d_en: "Key-card rooms, welcome scenes, per-room energy saving.",
      b_vi: ["Thẻ từ cấp nguồn, cảnh chào khách", "Máy lạnh tiết kiệm khi phòng trống, cửa mở", "Nút Dọn phòng / Không làm phiền"],
      b_en: ["Key-card power and welcome scene", "Eco cooling when the room is empty or a door is open", "Make-up room / Do-not-disturb buttons"] }
  ];
  var CAT_BY = {}; CATS.forEach(function (c) { CAT_BY[c.id] = c; });
  var MUC = [
    { id: "mat-bang", icon: "plan", vi: "Mặt bằng", en: "Floor plans" },
    { id: "so-do", icon: "sld", vi: "Sơ đồ nguyên lý", en: "Single-line diagram", key: "so_do",
      a_vi: "Sơ đồ một sợi: tủ điều khiển, bus KNX, mạng LAN và các thiết bị đầu cuối.",
      a_en: "Single-line view of control cabinets, the KNX bus, the LAN and every end device." },
    { id: "kich-ban", icon: "scn", vi: "Kịch bản vận hành", en: "Operation scenarios", key: "kich_ban",
      a_vi: "Hệ thống vận hành hằng ngày ra sao: chức năng từng phím, các cảnh, tự động theo cảm biến và lịch.",
      a_en: "How the system runs day to day: every key, every scene, and automation by sensors and schedules." }
  ];
  var MUC_BY = {}; MUC.forEach(function (m) { MUC_BY[m.id] = m; });
  var SLD_LABEL = [{ vi: "Tầng 2", en: "Level 2" }, { vi: "Tầng 5", en: "Level 5" }];
  var KB_LABEL = [
    { vi: "Nguyên tắc chung, nhóm đèn", en: "General principles, lighting groups" },
    { vi: "Nút nhấn tầng 2", en: "Level 2 push-buttons" },
    { vi: "Nút nhấn tầng 5", en: "Level 5 push-buttons" },
    { vi: "Nút nhấn tầng 5 (tiếp)", en: "Level 5 push-buttons (cont.)" },
    { vi: "Bảng cảnh tầng 2", en: "Level 2 scenes" },
    { vi: "Bảng cảnh tầng 5", en: "Level 5 scenes" },
    { vi: "Tự động theo cảm biến, cửa, lịch", en: "Automation: sensors, doors, schedules" },
    { vi: "Tự động (tiếp)", en: "Automation (cont.)" },
    { vi: "Điện năng, AI cảnh báo bất thường", en: "Energy metering, AI anomaly alerts" },
    { vi: "Điện năng, AI (tiếp)", en: "Energy, AI (cont.)" },
    { vi: "Quy định chung", en: "General rules" }
  ];
  // thiết bị tiêu biểu ở trang chủ: [mã, loại]
  var PRODUCTS = [["CHPB-06/02.S.21", "SW"], ["CSBP-04/00.1.00", "PIR"], ["BTIRC-01/00.2", "IR"], ["RL-SS1", "MR"], ["CSAQI-06/00.1.0x", "AQ"], ["NS-IC600", "SPK"]];

  var lang = "vi";
  try { lang = localStorage.getItem("lang") || lang; } catch (e) {}
  var qLang = new URLSearchParams(location.search).get("lang");
  if (qLang === "vi" || qLang === "en") lang = qLang;
  function t(k) { return I18N[lang][k] || k; }
  function L(o) { return o ? (o[lang] || o.vi) : ""; }
  function N(o) { return lang === "en" ? o.en : o.vi; }
  function $(s, r) { return (r || document).querySelector(s); }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  // ảnh sản phẩm theo mã, theo loại
  var SKU_IMG = {}, KIND_IMG = {};
  D.mat_bang.forEach(function (p) {
    p.devices.forEach(function (d) {
      d.items.forEach(function (it) {
        it.plates.forEach(function (pl) { if (pl.img) { SKU_IMG[pl.sku] = pl.img; if (!KIND_IMG[it.kind]) KIND_IMG[it.kind] = pl.img; } });
      });
      d.panel.forEach(function (x) { if (x.img) SKU_IMG[x.sku] = x.img; });
    });
  });
  KIND_IMG.RCU = SKU_IMG["RCU PANEL 2"] || KIND_IMG.RCU;

  /* ===== khung xem ảnh: phóng to, kéo, chụm 2 ngón ===== */
  function Viewer(host, onTap) {
    var self = this;
    this.host = host; this.onTap = onTap;
    this.stage = el("div", "stage"); this.img = el("img"); this.img.alt = ""; this.layer = el("div", "layer");
    this.stage.appendChild(this.img); this.stage.appendChild(this.layer); host.insertBefore(this.stage, host.firstChild);
    var z = el("div", "zoom");
    z.innerHTML = '<button type="button" data-z="out">−</button><span class="pct"></span><button type="button" data-z="in">+</button>' +
      '<button type="button" data-z="fit" class="wide"></button><a class="btn btn-sm pdf" download></a>';
    host.appendChild(z);
    this.pct = z.querySelector(".pct");
    z.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-z]"); if (!b) return;
      var r = host.getBoundingClientRect();
      if (b.dataset.z === "fit") self.fit(); else self.zoomAt(r.width / 2, r.height / 2, b.dataset.z === "in" ? 1.5 : 1 / 1.5);
    });
    this.s = 1; this.x = 0; this.y = 0; this.W = 1; this.H = 1;
    var ptr = {}, start = null, moved = false, downHs = null;
    host.addEventListener("pointerdown", function (e) {
      if (e.target.closest("button, a")) return;
      if (e.button !== 0 && e.pointerType === "mouse") return;
      e.preventDefault();
      ptr[e.pointerId] = { x: e.clientX, y: e.clientY };
      host.setPointerCapture(e.pointerId);
      downHs = e.target.closest("[data-i]");
      moved = false;
      start = self.snapshot(ptr);
      host.classList.add("drag");
    });
    host.addEventListener("pointermove", function (e) {
      if (!ptr[e.pointerId]) return;
      ptr[e.pointerId] = { x: e.clientX, y: e.clientY };
      var ids = Object.keys(ptr), r = host.getBoundingClientRect();
      if (ids.length === 1 && start) {
        var dx = e.clientX - start.cx, dy = e.clientY - start.cy;
        if (Math.abs(dx) + Math.abs(dy) > 5) moved = true;
        self.x = start.x + dx; self.y = start.y + dy; self.apply();
      } else if (ids.length >= 2 && start && start.d) {
        var a = ptr[ids[0]], b = ptr[ids[1]];
        var d = Math.hypot(a.x - b.x, a.y - b.y), mx = (a.x + b.x) / 2 - r.left, my = (a.y + b.y) / 2 - r.top;
        var s = self.clamp(start.s * d / start.d);
        self.x = mx - (start.mx - start.x) * s / start.s; self.y = my - (start.my - start.y) * s / start.s; self.s = s;
        moved = true; self.apply();
      }
    });
    function up(e) {
      if (!ptr[e.pointerId]) return;
      delete ptr[e.pointerId];
      if (Object.keys(ptr).length === 0) {
        host.classList.remove("drag");
        if (!moved && downHs && self.onTap) self.onTap(downHs);
        start = null;
      } else start = self.snapshot(ptr);
    }
    host.addEventListener("pointerup", up);
    host.addEventListener("pointercancel", up);
    host.addEventListener("wheel", function (e) {
      e.preventDefault();
      var r = host.getBoundingClientRect();
      self.zoomAt(e.clientX - r.left, e.clientY - r.top, Math.exp(-e.deltaY * 0.0016));
    }, { passive: false });
    host.addEventListener("dblclick", function (e) {
      if (e.target.closest(".hs, button")) return;
      var r = host.getBoundingClientRect();
      self.zoomAt(e.clientX - r.left, e.clientY - r.top, 2);
    });
  }
  Viewer.prototype.snapshot = function (ptr) {
    var ids = Object.keys(ptr), r = this.host.getBoundingClientRect(), o = { s: this.s, x: this.x, y: this.y };
    if (ids.length === 1) { o.cx = ptr[ids[0]].x; o.cy = ptr[ids[0]].y; }
    if (ids.length >= 2) {
      var a = ptr[ids[0]], b = ptr[ids[1]];
      o.d = Math.hypot(a.x - b.x, a.y - b.y); o.mx = (a.x + b.x) / 2 - r.left; o.my = (a.y + b.y) / 2 - r.top;
    }
    return o;
  };
  Viewer.prototype.load = function (page) {
    this.W = page.w; this.H = page.h;
    this.stage.style.width = page.w + "px"; this.stage.style.height = page.h + "px";
    this.img.src = page.img;
    this.layer.innerHTML = "";
    this.fit();
  };
  // vùng đặt bản vẽ: chừa chỗ cho dải tiêu đề (trên), 2 mũi tên (hai bên), bảng chi tiết trượt lên (điện thoại)
  Viewer.prototype.view = function () {
    var r = this.host.getBoundingClientRect(), h = r.height;
    var det = $("#detail");
    if (det && !det.classList.contains("idle") && getComputedStyle(det).position === "fixed") h -= det.offsetHeight - $(".pager").offsetHeight;
    var ar = this.host.querySelector(".arrow"), mobile = ar && getComputedStyle(ar).backgroundColor !== "rgba(0, 0, 0, 0)";
    var side = ar && !mobile ? ar.offsetWidth + 28 : 8;
    var top = this.host.querySelector(".v-title").offsetHeight ? (mobile ? 46 : 62) : 8;
    return { x: side, w: Math.max(120, r.width - side * 2), h: Math.max(120, h - top - 10), top: top };
  };
  Viewer.prototype.fitScale = function () { var v = this.view(); return Math.min(v.w / this.W, v.h / this.H); };
  Viewer.prototype.clamp = function (s) { var f = this.fitScale(); return Math.max(f * 0.6, Math.min(s, Math.max(f * 8, 4))); };
  Viewer.prototype.fit = function () {
    var v = this.view(), s = this.fitScale();
    this.s = s; this.x = v.x + (v.w - this.W * s) / 2; this.y = v.top + (v.h - this.H * s) / 2; this.apply();
  };
  Viewer.prototype.zoomAt = function (cx, cy, f) {
    var s = this.clamp(this.s * f);
    this.x = cx - (cx - this.x) * s / this.s; this.y = cy - (cy - this.y) * s / this.s; this.s = s; this.apply();
  };
  Viewer.prototype.focus = function (x0, y0, x1, y1) {
    var v = this.view(), pad = 30;
    var s = Math.min((v.w - pad * 2) / (x1 - x0), (v.h - pad * 2) / (y1 - y0));
    s = Math.min(this.clamp(s), this.fitScale() * 3);
    this.s = s; this.x = v.x + v.w / 2 - (x0 + x1) / 2 * s; this.y = v.top + v.h / 2 - (y0 + y1) / 2 * s; this.apply();
  };
  Viewer.prototype.apply = function () {
    this.stage.style.transform = "translate(" + this.x + "px," + this.y + "px) scale(" + this.s + ")";
    if (this.pct) this.pct.textContent = Math.round(this.s / this.fitScale() * 100) + "%";
  };

  /* ===== thanh trên ===== */
  function renderNav() {
    var h = '<a href="#trang-chu" data-nav="trang-chu">' + esc(t("home")) + '</a><i class="sep"></i>';
    h += CATS.map(function (c) { return '<a href="#' + c.id + '" data-nav="' + c.id + '">' + esc(N(c)) + "</a>"; }).join("");
    h += '<i class="sep"></i><a href="#tai-lieu" data-nav="tai-lieu">' + esc(t("docs")) + "</a>";
    $("#nav").innerHTML = h;
  }

  /* ===== trang chủ ===== */
  function renderHome() {
    $("#homePoints").innerHTML = POINTS.map(function (p) {
      var h = lang === "en" ? p[3] : p[1], d = lang === "en" ? p[4] : p[2];
      return "<li><i>" + ic(p[0]) + "</i><div><b>" + esc(h) + "</b><span>" + esc(d) + "</span></div></li>";
    }).join("");
    $("#homeCats").innerHTML = CATS.map(function (c) {
      return '<a class="cat' + (c.data ? " has-demo" : "") + '" href="#' + c.id + '"><div class="cat-top"><span class="ic">' + ic(c.icon) +
        '</span><span class="badge' + (c.data ? "" : " soon") + '">' + esc(t(c.data ? "has_demo" : "soon")) + "</span></div>" +
        "<h3>" + esc(N(c)) + "</h3><p>" + esc(lang === "en" ? c.d_en : c.d_vi) + "</p></a>";
    }).join("");
  }

  /* ===== khung xem ===== */
  var st = { cat: null, muc: null, page: {}, loaded: "", sel: -1, kinds: {} };
  var viewer = null, PAGES = {};
  function pagesOf(muc) {
    if (PAGES[muc]) return PAGES[muc];
    if (muc === "mat-bang") return (PAGES[muc] = D.mat_bang);
    var m = MUC_BY[muc], lab = muc === "so-do" ? SLD_LABEL : KB_LABEL;
    return (PAGES[muc] = D.trang[m.key].map(function (p, i) {
      return { img: p.img, mini: p.mini, w: p.w, h: p.h, title: lab[i] || { vi: "Trang " + (i + 1), en: "Page " + (i + 1) } };
    }));
  }
  function cur() { return st.page[st.cat + "/" + st.muc] || 0; }
  function hashOf(i, code) { return "#" + st.cat + "/" + st.muc + "/" + (i + 1) + (code ? "/" + encodeURIComponent(code) : ""); }

  function renderSide() {
    var c = CAT_BY[st.cat];
    $("#mucList").innerHTML = MUC.map(function (m) {
      var n = c.data ? pagesOf(m.id).length : "";
      return '<a href="#' + c.id + "/" + m.id + '" class="' + (m.id === st.muc ? "on" : "") + '">' + ic(m.icon) + "<span>" + esc(N(m)) + '</span><span class="n">' + n + "</span></a>";
    }).join("");
    $("#projCard").innerHTML = c.data
      ? "<small>" + esc(t("demo")) + "</small><b>" + esc(L(c.data.ten)) + "</b><span>KNX K-BUS · " + esc(N(c)) + '</span><a href="#tai-lieu">' + esc(t("get_docs")) + "</a>"
      : "<small>" + esc(N(c)) + "</small><span>" + esc(t("soon")) + "</span>";
  }
  function renderEmpty(c) {
    var name = N(c), lower = lang === "en" ? name.toLowerCase() : name.toLowerCase();
    $("#empty").innerHTML = '<div class="empty-card"><span class="ic">' + ic(c.icon) + "</span><h3>" + esc(t("empty_h").replace("{c}", name)) + "</h3><p>" +
      esc(t("empty_p").replace("{c}", lower)) + "</p><ul>" + (lang === "en" ? c.b_en : c.b_vi).map(function (b) { return "<li>" + esc(b) + "</li>"; }).join("") +
      '</ul><a class="btn" href="#van-phong/mat-bang/1">' + esc(t("empty_btn")) + "</a></div>";
  }
  function showWork(c, mucId, n, code) {
    st.cat = c.id;
    st.muc = MUC_BY[mucId] ? mucId : (st.muc || "mat-bang");
    renderSide();
    var work = $("#work");
    work.classList.toggle("no-data", !c.data);
    $("#empty").hidden = !!c.data;
    if (!c.data) { renderEmpty(c); st.loaded = ""; return; }
    if (!viewer) viewer = new Viewer($("#viewer"), function (hs) { select(+hs.dataset.i); });
    var pages = pagesOf(st.muc);
    var i = isNaN(n) ? cur() : Math.max(0, Math.min(n, pages.length - 1));
    st.page[st.cat + "/" + st.muc] = i;
    var key = st.cat + "/" + st.muc + "/" + i;
    if (key !== st.loaded) { st.loaded = key; loadPage(i); }
    if (code && st.muc === "mat-bang") {
      var k = pages[i].devices.findIndex(function (d) { return d.ma === code || d.ma.split(" + ").indexOf(code) >= 0; });
      if (k >= 0 && k !== st.sel) select(k, true);
    }
  }
  function loadPage(i) {
    var pages = pagesOf(st.muc), p = pages[i];
    st.sel = -1; st.kinds = {};
    var qFlt = new URLSearchParams(location.search).get("flt");
    if (qFlt && st.muc === "mat-bang") {
      qFlt.split(",").forEach(function (k) { if (k.trim()) st.kinds[k.trim()] = 1; });
    }
    renderPanel();
    viewer.load(p);
    if (st.muc === "mat-bang") {
      var svgParts = ['<svg class="flt-svg" viewBox="0 0 ' + p.w + " " + p.h + '">'];
      var htmlParts = [];
      p.devices.forEach(function (d, k) {
        var r = d.rect, kinds = Object.keys(devKinds(d)).join(" "), col = colorOfDevice(d);
        var ax = d.anchor ? d.anchor[0] : (r[0] + r[2]) / 2;
        var ay = d.anchor ? d.anchor[1] : (r[1] + r[3]) / 2;
        var ex = d.end ? d.end[0] : d.mx;
        var ey = d.end ? d.end[1] : d.my;

        // SVG đường gạch đứt + điểm đánh dấu nổi bật
        svgParts.push('<g class="flt-g" data-i="' + k + '" data-k="' + kinds + '" style="--c:' + col + '">');
        svgParts.push('<line class="flt-casing" x1="' + ax + '" y1="' + ay + '" x2="' + ex + '" y2="' + ey + '"/>');
        svgParts.push('<line class="flt-line" x1="' + ax + '" y1="' + ay + '" x2="' + ex + '" y2="' + ey + '"/>');
        svgParts.push('<circle class="flt-dot" cx="' + ax + '" cy="' + ay + '" r="2.6"/>');
        if (d.rcu && d.rcu_rect) {
          var rr = d.rcu_rect;
          svgParts.push('<rect class="flt-rcu-box" x="' + rr[0] + '" y="' + rr[1] + '" width="' + (rr[2] - rr[0]) + '" height="' + (rr[3] - rr[1]) + '" rx="2.5"/>');
        } else {
          svgParts.push('<circle class="flt-ring" cx="' + d.mx + '" cy="' + d.my + '" r="6"/>');
          svgParts.push('<circle class="flt-core" cx="' + d.mx + '" cy="' + d.my + '" r="2.4"/>');
        }
        svgParts.push("</g>");

        // Vùng thẻ (tô đậm khi chọn/lọc, phủ mờ khi không được chọn lúc đang lọc)
        htmlParts.push('<div class="hs cd" data-i="' + k + '" data-k="' + kinds + '" style="left:' + r[0] + "px;top:" + r[1] + "px;width:" + (r[2] - r[0]) + "px;height:" + (r[3] - r[1]) + "px;--c:" + col + '"></div>');

        // Vùng điểm lắp trên mặt bằng
        if (d.rcu && d.rcu_rect) {
          var rr2 = d.rcu_rect;
          htmlParts.push('<div class="hs mk is-rcu" data-i="' + k + '" data-k="' + kinds + '" style="left:' + rr2[0] + "px;top:" + rr2[1] + "px;width:" + (rr2[2] - rr2[0]) + "px;height:" + (rr2[3] - rr2[1]) + "px;--c:" + col + '"></div>');
        } else {
          htmlParts.push('<div class="hs mk" data-i="' + k + '" data-k="' + kinds + '" style="left:' + (d.mx - 7) + "px;top:" + (d.my - 7) + "px;width:14px;height:14px;--c:" + col + '"></div>');
          if (d.label_rect) {
            var lr = d.label_rect;
            htmlParts.push('<div class="flt-lbl" data-i="' + k + '" data-k="' + kinds + '" style="left:' + lr[0] + "px;top:" + lr[1] + "px;--c:" + col + '">' + esc(d.ma) + "</div>");
          }
        }
      });
      svgParts.push("</svg>");
      viewer.layer.innerHTML = svgParts.join("") + htmlParts.join("");
      applyFilter();
    }
    renderTitle();
    renderPager();
  }
  function renderTitle() {
    var pages = pagesOf(st.muc), i = cur();
    var m = MUC_BY[st.muc], f = D.tai_ve.filter(function (x) { return x.key === (m.key || "mat_bang"); })[0];
    $("#vTitle").innerHTML = "<b>" + (i + 1) + " / " + pages.length + "</b>· " + esc(L(pages[i].title));
    var a = $(".zoom .pdf");
    if (f) { a.href = f.file; a.innerHTML = ic("dl") + "<span>" + esc(t("dl_pdf")) + "</span>"; }
    a.hidden = !f;
    var fw = $(".zoom .wide");
    fw.innerHTML = ic("fit") + "<span>" + esc(t("fit")) + "</span>";
    fw.title = t("fit");
  }
  function renderPager() {
    var n = pagesOf(st.muc).length, c = cur(), items = [];
    if (n <= 7) { for (var i = 0; i < n; i++) items.push(i); }
    else {
      var a = Math.max(1, c - 1), b = Math.min(n - 2, c + 1);
      if (c <= 2) b = 3;
      if (c >= n - 3) a = n - 4;
      items.push(0); if (a > 1) items.push("…");
      for (var j = a; j <= b; j++) items.push(j);
      if (b < n - 2) items.push("…"); items.push(n - 1);
    }
    $("#pager").innerHTML = '<button type="button" class="pn" data-go="' + (c - 1) + '"' + (c === 0 ? " disabled" : "") + ">" + ic("left") + "<b>" + esc(t("prev")) + "</b></button>" +
      items.map(function (x) { return x === "…" ? "<span>…</span>" : '<button type="button" data-go="' + x + '"' + (x === c ? ' class="on" aria-current="page"' : "") + ">" + (x + 1) + "</button>"; }).join("") +
      '<button type="button" class="pn" data-go="' + (c + 1) + '"' + (c === n - 1 ? " disabled" : "") + "><b>" + esc(t("next")) + "</b>" + ic("right") + "</button>";
    $("#aPrev").disabled = c === 0; $("#aNext").disabled = c === n - 1;
    $("#aPrev").title = t("prev"); $("#aNext").title = t("next");
  }
  function goPage(i) {
    var n = pagesOf(st.muc).length;
    if (i < 0 || i >= n) return;
    location.hash = hashOf(i);
  }

  /* chọn thiết bị, lọc loại */
  function devKinds(d) { var k = {}; d.items.forEach(function (it) { k[it.kind] = 1; }); return k; }
  function mark(k, cls, on) { viewer.layer.querySelectorAll('[data-i="' + k + '"]').forEach(function (h) { h.classList.toggle(cls, on); }); }
  function applyFilter() {
    var any = Object.keys(st.kinds).length > 0;
    viewer.host.classList.toggle("flt", any);
    viewer.layer.querySelectorAll("[data-k]").forEach(function (h) {
      h.classList.toggle("match", any && h.dataset.k.split(" ").some(function (k) { return st.kinds[k]; }));
    });
  }
  function select(k, fromRoute) {
    if (st.sel >= 0) mark(st.sel, "sel", false);
    st.sel = k; mark(k, "sel", true);
    var d = pagesOf("mat-bang")[cur()].devices[k];
    renderPanel();
    var det = $("#detail");
    det.scrollTop = 0;
    if (getComputedStyle(det).position === "fixed") {          // điện thoại: đưa thiết bị lên phần còn thấy
      var x0 = Math.min(d.mx, d.rect[0]), y0 = Math.min(d.my, d.rect[1]), x1 = Math.max(d.mx, d.rect[2]), y1 = Math.max(d.my, d.rect[3]);
      requestAnimationFrame(function () { viewer.focus(x0 - 10, y0 - 10, x1 + 10, y1 + 10); });
    }
    if (!fromRoute) history.replaceState(null, "", location.pathname + location.search + hashOf(cur(), d.ma.split(" + ")[0]));
  }
  function closeDetail() {
    if (st.sel >= 0) mark(st.sel, "sel", false);
    st.sel = -1; renderPanel();
    history.replaceState(null, "", location.pathname + location.search + hashOf(cur()));
    requestAnimationFrame(function () { viewer.fit(); });
  }

  /* thanh lọc thiết bị ngang cho iPad dọc & điện thoại (<= 960px) */
  function renderMobFilter() {
    var mf = $("#mobFilter");
    if (!mf) return;
    if (st.muc !== "mat-bang" || !CAT_BY[st.cat] || !CAT_BY[st.cat].data) {
      mf.hidden = true; mf.innerHTML = ""; return;
    }
    var p = pagesOf("mat-bang")[cur()], cnt = {};
    p.devices.forEach(function (d) { d.items.forEach(function (it) { cnt[it.kind] = (cnt[it.kind] || 0) + 1; }); });
    var any = Object.keys(st.kinds).length > 0;
    var h = any ? '<button type="button" class="mf-chip mf-clear" data-clear-flt="1">× ' + esc(t("clear_flt")) + "</button>" : "";
    h += Object.keys(D.loai).filter(function (k) { return cnt[k]; }).map(function (k) {
      return '<button type="button" class="mf-chip kind' + (st.kinds[k] ? " on" : "") + '" data-k="' + k + '" style="--cb:' + barColorOfKind(k) + '">' +
        '<span class="pi">' + (KIND_IMG[k] ? '<img src="' + KIND_IMG[k] + '" alt="">' : "") + "</span>" +
        "<b>" + esc(N(D.loai[k])) + "</b><em>" + cnt[k] + "</em></button>";
    }).join("");
    mf.innerHTML = h;
    mf.hidden = false;
  }

  /* cột phải */
  function renderPanel() {
    renderMobFilter();
    var det = $("#detail");
    if (st.muc === "mat-bang" && st.sel >= 0) {
      det.classList.remove("idle");
      det.innerHTML = detailHtml(pagesOf("mat-bang")[cur()].devices[st.sel]);
      return;
    }
    det.classList.add("idle");
    var h;
    if (st.muc === "mat-bang") {
      var p = pagesOf("mat-bang")[cur()], cnt = {};
      p.devices.forEach(function (d) { d.items.forEach(function (it) { cnt[it.kind] = (cnt[it.kind] || 0) + 1; }); });
      h = '<div class="hint">' + ic("tap") + "<span>" + esc(t("hint")) + '</span></div><h3 class="side-h">' + esc(t("on_page")) + '</h3><div class="kinds">' +
        Object.keys(D.loai).filter(function (k) { return cnt[k]; }).map(function (k) {
          return '<button type="button" class="kind' + (st.kinds[k] ? " on" : "") + '" data-k="' + k + '" style="--cb:' + barColorOfKind(k) + '"><span class="pi">' + (KIND_IMG[k] ? '<img src="' + KIND_IMG[k] + '" alt="">' : "") +
            "</span><b>" + esc(N(D.loai[k])) + "</b><em>" + cnt[k] + "</em></button>";
        }).join("") + "</div>";
    } else {
      var m = MUC_BY[st.muc], pages = pagesOf(st.muc), f = D.tai_ve.filter(function (x) { return x.key === m.key; })[0];
      h = '<div class="dt-code">' + esc(N(m)) + '</div><p class="doc-about">' + esc(lang === "en" ? m.a_en : m.a_vi) + "</p>";
      if (f) h += '<a class="btn btn-sm" href="' + f.file + '" download>' + ic("dl") + esc(t("dl_pdf")) + " · " + (f.kb / 1024).toFixed(1) + " MB</a>";
      h += '<h3 class="side-h">' + esc(t("pages_h")) + '</h3><div class="toc">' + pages.map(function (pg, i) {
        return '<a href="' + hashOf(i) + '"' + (i === cur() ? ' class="on"' : "") + "><i>" + (i + 1) + "</i>" + esc(L(pg.title)) + "</a>";
      }).join("") + "</div>";
    }
    det.innerHTML = h;
  }
  function detailHtml(d) {
    var h = '<div class="dt-head"><div class="dt-code">' + esc(d.ma) + '</div><button type="button" class="dt-close" aria-label="' + esc(t("close")) + '">×</button></div>';
    h += '<div class="dt-area">' + esc(L(d.area)) + "</div>";
    if (d.rcu) {
      var k0 = D.loai.RCU;
      h += '<div class="dt-item"><div class="dt-name">' + esc(N(k0)) + '</div><p class="dt-fn">' + esc(lang === "en" ? k0.fn_en : k0.fn_vi) + "</p></div>";
      h += '<h3 class="side-h">' + esc(t("panel")) + '</h3><div class="panel-list">' + d.panel.map(function (x) {
        return '<div><span class="pi">' + (x.img ? '<img src="' + x.img + '" alt="">' : "") + "</span><p>" + (x.sl > 1 ? x.sl + " × " : "") + esc(N(x)) + "<br><small>" + esc(x.sku) + "</small></p></div>";
      }).join("") + "</div>";
      return h;
    }
    d.items.forEach(function (it) {
      var k = D.loai[it.kind] || { vi: it.kind, en: it.kind, fn_vi: "", fn_en: "" };
      h += '<div class="dt-item"><div class="dt-top"><div class="dt-imgs">' + it.plates.map(function (pl) {
        return pl.img ? '<div><img src="' + pl.img + '" alt=""></div>' : "";
      }).join("") + '</div><div><div class="dt-name"><b>' + esc(it.code) + "</b>" + esc(N(k)) + "</div>";
      h += '<div class="dt-sku">' + it.plates.map(function (pl) { return esc(pl.sku) + " – " + esc(L(pl.desc)); }).join("<br>") + "</div>";
      if (it.h) h += '<span class="dt-h">' + esc(L(it.h)) + "</span>";
      h += '</div></div><p class="dt-fn">' + esc(lang === "en" ? k.fn_en : k.fn_vi) + "</p>";
      if (it.buttons && it.buttons.length) {
        h += '<div class="keys">' + it.buttons.map(function (b, n) { return "<div><i>" + (n + 1) + "</i>" + esc(L(b)) + "</div>"; }).join("") + "</div>";
      }
      h += "</div>";
    });
    return h;
  }

  /* ===== tài liệu ===== */
  function renderDocs() {
    var h = "";
    CATS.filter(function (c) { return c.data; }).forEach(function (c) {
      h += '<div class="dl-group"><h3>' + esc(N(c)) + "<span>· " + esc(L(c.data.ten)) + '</span></h3><div class="dl-cards">' + c.data.tai_ve.map(function (f) {
        var thumb = (c.data.trang[f.key] || [])[0];
        return '<div class="dl-card"><div class="thumb">' + (thumb ? '<img src="' + thumb.mini + '" alt="" loading="lazy">' : "") + '</div><div class="body"><h4>' + esc(L(f)) +
          "</h4><small>" + f.trang + " " + esc(t("pages")) + " · " + (f.kb / 1024).toFixed(1) + ' MB</small><a class="btn btn-sm" href="' + f.file + '" download>' + esc(t("dl_pdf")) + "</a></div></div>";
      }).join("") + "</div></div>";
    });
    var soon = CATS.filter(function (c) { return !c.data; });
    if (soon.length) h += '<div class="dl-group"><h3>' + esc(t("dl_soon")) + '</h3><div class="soon-row">' + soon.map(function (c) { return "<span>" + esc(N(c)) + "</span>"; }).join("") + "</div></div>";
    $("#dlGroups").innerHTML = h;
  }

  /* ===== điều hướng, ngôn ngữ ===== */
  var tabNow = "";
  function route() {
    var parts = (location.hash || "#trang-chu").slice(1).split("/").map(function (s) { try { return decodeURIComponent(s); } catch (e) { return s; } });
    var c = CAT_BY[parts[0]];
    var tab = c ? "work" : (parts[0] === "tai-lieu" ? "tai-lieu" : "trang-chu");
    var changed = tab !== tabNow; tabNow = tab;
    document.querySelectorAll(".tab").forEach(function (s) { s.classList.toggle("active", s.id === tab); });
    document.querySelectorAll("#nav a").forEach(function (a) { a.classList.toggle("active", a.dataset.nav === (c ? c.id : tab)); });
    $("#nav").classList.remove("open");
    if (changed) window.scrollTo(0, 0);
    if (c) {
      if (changed) st.loaded = "";
      showWork(c, parts[1], parseInt(parts[2], 10) - 1, parts[3]);
    }
  }
  function setLang(l) {
    lang = l;
    try { localStorage.setItem("lang", l); } catch (e) {}
    document.documentElement.lang = l;
    document.querySelectorAll("[data-i18n]").forEach(function (e) { e.textContent = t(e.dataset.i18n); });
    document.querySelectorAll(".lang button").forEach(function (b) { b.classList.toggle("on", b.dataset.lang === l); });
    renderNav(); renderHome(); renderDocs();
    if (st.cat) {
      renderSide();
      if (CAT_BY[st.cat].data && viewer) { renderTitle(); renderPager(); renderPanel(); }
      else renderEmpty(CAT_BY[st.cat]);
    }
    var z = $(".zoom");
    if (z) { z.querySelector('[data-z="in"]').title = t("zoom_in"); z.querySelector('[data-z="out"]').title = t("zoom_out"); }
  }

  /* ===== sự kiện ===== */
  document.addEventListener("click", function (e) {
    var b;
    if ((b = e.target.closest(".lang button"))) { setLang(b.dataset.lang); route(); return; }
    if (e.target.closest("#menuBtn")) { $("#nav").classList.toggle("open"); return; }
    if ((b = e.target.closest("#pager button"))) { goPage(+b.dataset.go); return; }
    if (e.target.closest("#aPrev")) { goPage(cur() - 1); return; }
    if (e.target.closest("#aNext")) { goPage(cur() + 1); return; }
    if (e.target.closest("[data-clear-flt]")) {
      st.kinds = {}; applyFilter(); renderPanel(); return;
    }
    if ((b = e.target.closest(".kind"))) {
      var k = b.dataset.k;
      if (st.kinds[k]) delete st.kinds[k]; else st.kinds[k] = 1;
      applyFilter(); renderPanel(); return;
    }
    if (e.target.closest(".dt-close")) { closeDetail(); return; }
  });
  document.addEventListener("mouseover", function (e) {
    if (!viewer) return;
    var h = e.target.closest && e.target.closest("#viewer [data-i]");
    viewer.layer.querySelectorAll(".hov").forEach(function (x) { x.classList.remove("hov"); });
    if (h) mark(h.dataset.i, "hov", true);
  });
  document.addEventListener("keydown", function (e) {
    if (tabNow !== "work" || !CAT_BY[st.cat].data) return;
    if (e.key === "Escape" && st.sel >= 0) closeDetail();
    else if (e.key === "ArrowLeft") goPage(cur() - 1);
    else if (e.key === "ArrowRight") goPage(cur() + 1);
  });
  window.addEventListener("hashchange", route);
  var rt;
  window.addEventListener("resize", function () {
    clearTimeout(rt);
    rt = setTimeout(function () { if (viewer && viewer.host.offsetParent) viewer.fit(); }, 120);
  });

  setLang(lang);
  route();
})();
