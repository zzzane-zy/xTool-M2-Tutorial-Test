(function () {
  "use strict";

  var SOURCE = {
    m2: "https://support.xtool.com/article/2778?from=xTool%20M2&url=%2Fproduct%2F93",
    ink: "https://support.xtool.com/article/2817",
    ra3: "https://support.xtool.com/article/2920"
  };

  var PDF = {
    m2: "https://storage-us.atomm.com/resource/xtool/support-attachment/M2%20%E4%B8%BB%E6%9C%BA/ZH_xTool%20M2_%E4%BA%A7%E5%93%81%E8%AF%B4%E6%98%8E%E4%B9%A6.pdf",
    ink: "https://storage-us.atomm.com/resource/xtool/support-attachment/JS002.1_%E5%A4%9A%E8%AF%AD%E8%A8%80/xTool%20M2%20CMYK%20Inkjet%20Module_%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C_ZH.pdf",
    ra3: "https://storage-us.atomm.com/resource/xtool/support-attachment/RA3%20Lite%20%E5%A4%9A%E8%AF%AD%E8%A8%80%E5%BF%AB%E9%80%9F%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97-6.17/JS002_RA3lite_%E6%93%8D%E4%BD%9C%E6%8C%87%E5%BC%95_%E7%BA%BF%E4%B8%8A%E7%89%88_ZH.pdf"
  };

  var KITS = {
    single: {
      title: "单机套装",
      time: "约 15 分钟",
      image: "assets/images/kit-single.png",
      choose: "single.html",
      guide: "guide-single.html",
      video: "video-single.html",
      downloads: "downloads-single.html",
      path: ["M2 主机", "激光模组", "第一个作品"],
      items: [
        "M2 主机", "激光模组", "模组连接线", "电源适配器与电源线", "USB 线与转接头",
        "排烟管", "卡箍", "润滑脂", "材料包", "磁吸夹具", "六角螺丝刀", "M3×6 螺丝",
        "美纹纸胶带", "安全说明", "说明卡"
      ]
    },
    color: {
      title: "多彩套装",
      time: "约 25 分钟",
      image: "assets/images/kit-color.png",
      choose: "color.html",
      guide: "guide-color.html",
      video: "video-color.html",
      downloads: "downloads-color.html",
      path: ["M2 主机", "激光模组", "CMYK 喷墨", "彩色作品"],
      items: [
        "M2 主机与单机套装配件", "CMYK 喷墨模组", "墨盒", "底盖", "保湿液",
        "底盖固定板", "固定螺丝", "A5 校准卡", "磁环", "喷墨模组用户手册"
      ]
    },
    deluxe: {
      title: "豪华套装",
      time: "约 35 分钟",
      image: "assets/images/kit-deluxe.png",
      choose: "deluxe.html",
      guide: "guide-deluxe.html",
      video: "video-deluxe.html",
      downloads: "downloads-deluxe.html",
      path: ["M2 主机", "CMYK 喷墨", "RA3 Lite", "完整体验"],
      items: [
        "M2 主机与多彩套装全部配件", "RA3 Lite 夹盘", "圆柱夹爪", "T 形夹爪", "加长夹爪",
        "动力模组", "主底板", "支撑模组", "螺柱组件", "激光防护罩",
        "水平出光支架", "定位板", "设备连接线", "卷尺"
      ]
    }
  };

  var DOCS = {
    m2: {
      label: "主机",
      title: "xTool M2 快速使用指南",
      desc: "开箱、安装、连接软件与材料固定",
      href: PDF.m2,
      source: SOURCE.m2
    },
    ink: {
      label: "喷墨模组",
      title: "xTool M2 CMYK Inkjet Module 用户手册",
      desc: "墨盒安装、模组连接与日常保养",
      href: PDF.ink,
      source: SOURCE.ink
    },
    ra3: {
      label: "旋转配件",
      title: "xTool Rotary Attachment 3 Lite 快速使用指南",
      desc: "夹爪选择、工件装夹与 M2 连接",
      href: PDF.ra3,
      source: SOURCE.ra3
    }
  };

  function image(src, alt, cap) {
    return { src: src, alt: alt, cap: cap };
  }

  function pdfPage(pdfKey, pageNumber) {
    var page = String(pageNumber).padStart(2, "0");
    return "assets/images/pdf-originals/" + pdfKey + "/pages/" + pdfKey + "-page-" + page + "-content.png";
  }

  function step(id, group, eyebrow, title, body, checks, tip, images, source) {
    return {
      id: id,
      group: group,
      eyebrow: eyebrow,
      title: title,
      body: body,
      checks: checks,
      tip: tip,
      images: images,
      source: source
    };
  }

  function inventoryStep(kitId) {
    var images = [image("assets/images/inventory-1.png", "xTool M2 物料清单第 1 张", "")];
    if (kitId !== "single") images.push(image("assets/images/inventory-2.png", "xTool M2 物料清单第 2 张", ""));
    if (kitId === "deluxe") images.push(image("assets/images/inventory-3.png", "xTool M2 物料清单第 3 张", ""));
    return step(
      "check-box", "M2 主机", "开箱前", "物料清单",
      "打开包装后，按套装清点主机、模组、连接线、电源和随附配件。外箱或设备有明显破损时，先拍照留存。",
      [],
      "不同套装的配件不同，以实际收到的物料为准。",
      images,
      SOURCE.m2
    );
  }

  var MACHINE = step(
    "machine-overview", "M2 主机", "先认识，再操作", "认识机器",
    "先熟悉上盖、底板、前板、模组支架和排烟口的位置，后续安装与操作会更顺手。",
    [],
    "打开上盖或移动模组前，先确认设备已断电。",
    [image("assets/images/machine-1.png", "xTool M2 机器结构示意图 1", ""),
      image("assets/images/machine-2.png", "xTool M2 机器结构示意图 2", "")],
    SOURCE.m2
  );

  var INDICATOR = step(
    "indicator", "M2 主机", "开机后先看这里", "认识指示灯",
    "熟悉电源、连接和工作状态对应的指示灯，遇到异常时先根据灯光状态判断设备状态。",
    [],
    "指示灯状态异常时，先暂停操作并检查连接。",
    [image("assets/images/indicator-1.png", "xTool M2 指示灯示意图 1", ""),
      image("assets/images/indicator-2.png", "xTool M2 指示灯示意图 2", "")],
    SOURCE.m2
  );

  var COMMON = [
    step(
      "remove-foam", "M2 主机", "通电前", "取出泡棉与物料",
      "打开盖子，取出机器内部全部泡棉和物料。",
      [],
      "移动模组支架时动作放轻，不要拉扯线缆。",
      [
        image("assets/images/foam-1.png", "取出 M2 内部泡棉图 1", ""),
        image("assets/images/foam-2.png", "取出 M2 内部泡棉图 2", ""),
        image("assets/images/foam-3.png", "取出 M2 内部泡棉图 3", "")
      ],
      SOURCE.m2
    ),
    step(
      "grease", "M2 主机", "运动更顺畅", "涂润滑脂",
      "一手下拉模组支架背板，在前、后光轴上涂满润滑脂。松开支架后重复下拉 3 次，让润滑脂均匀分布。",
      [],
      "顶部光轴也要涂到；避免润滑脂沾到皮带、镜片或底板。",
      [
        image("assets/images/grease-1.png", "给 M2 光轴涂润滑脂图 1", ""),
        image("assets/images/grease-2.png", "给 M2 光轴涂润滑脂图 2", ""),
        image("assets/images/grease-3.png", "给 M2 光轴涂润滑脂图 3", "")
      ],
      SOURCE.m2
    ),
    step(
      "exhaust", "M2 主机", "正式加工前", "安装排烟管",
      "拧松卡箍锁扣，将卡箍套在排烟管上；把排烟管接到设备排烟口并拧紧。另一端接净化器或伸到窗外。",
      [],
      "激光加工可能产生烟尘和气味。没有可靠排烟时，不要开始加工。",
      [
        image("assets/images/exhaust-install-1.png", "安装 M2 排烟管图 1", ""),
        image("assets/images/exhaust-install-2.png", "安装 M2 排烟管图 2", "")
      ],
      SOURCE.m2
    ),
    step(
      "laser-module", "M2 主机", "对准再吸附", "安装激光器",
      "将激光器背面的两个固定销对准多功能模组支架，吸附到位。连接线紧贴激光器，避免进入运动区域。",
      [],
      "模组切换必须在设备断电后进行。",
      [
        image(pdfPage("m2", 14), "对齐 M2 激光器固定销原图", "PDF 原图 · M2 产品说明书第 14 页。"),
        image(pdfPage("m2", 15), "连接 M2 激光器线缆原图", "PDF 原图 · M2 产品说明书第 15 页。")
      ],
      SOURCE.m2
    ),
    step(
      "connect-power", "M2 主机", "第一次开机", "连通电源",
      "接好电源，打开设备后侧开关。",
      [],
      "接通电源前，确认机器内部没有泡棉或其他物料。",
      [image("assets/images/power-1.png", "连接 M2 电源图 1", ""),
        image("assets/images/power-2.png", "连接 M2 电源图 2", "")],
      SOURCE.m2
    ),
    step(
      "download-software", "M2 主机", "开始使用软件", "下载软件",
      "打开 xTool 官方软件页面，下载并安装适用于电脑的 xTool 软件。",
      [],
      "按电脑系统选择对应版本。",
      [image("assets/images/computer-1.png", "下载 xTool 软件图", "")],
      SOURCE.m2
    ),
    step(
      "connect-computer", "M2 主机", "连接设备", "连通电脑",
      "用 USB 连接线和转接头连接电脑，再在 xTool 软件中添加 M2。请跟随软件指示，完成激光模组校准流程。",
      [],
      "随附转接头只用于电脑端接口适配，不要把它接到设备端。",
      [image("assets/images/computer-2.png", "连接 M2 电脑图", "")],
      SOURCE.m2
    )
  ];

  COMMON[2].followup = {
    body: "您可以使用不同的方式连接烟管另一端",
    images: [
      image("assets/images/exhaust-option-1.png", "连接排烟管另一端的方式 1", ""),
      image("assets/images/exhaust-option-2.png", "连接排烟管另一端的方式 2", "")
    ]
  };

  var MATERIAL = step(
    "secure-material", "第一次使用", "加工前最后一步", "固定材料",
    "先清洁底板并保持材料平整。喷墨或激光雕刻材料用美纹胶固定；激光切割材料用磁吸固定件垫高。加工元素与固定件保持 5 mm 以上距离。",
    [],
    "喷墨时无论材料多薄，都建议用胶带固定，避免材料翘起后与喷墨模组碰撞。",
    [image(pdfPage("m2", 17), "使用美纹胶固定材料原图", "PDF 原图 · M2 产品说明书第 17 页。"),
      image(pdfPage("m2", 18), "使用磁吸固定件原图", "PDF 原图 · M2 产品说明书第 18 页。"),
      image(pdfPage("m2", 20), "保持加工元素与固定件距离原图", "PDF 原图 · M2 产品说明书第 20 页。")],
    SOURCE.m2
  );

  var FIRST_CASE = step(
    "first-case", "第一次使用", "准备开始", "请根据软件指引，完成你的第一个案例吧~",
    "打开 xTool 软件，按照屏幕提示完成操作即可。",
    [],
    "",
    [],
    SOURCE.m2
  );

  var COLOR_STEPS = [
    step(
      "ink-prepare", "CMYK 喷墨模组", "设备保持关机", "准备墨盒",
      "取出墨盒，撕下保护膜，不要触摸出墨口或底部金属触点。",
      [],
      "保持出墨口和底部金属触点清洁。",
      [image("assets/images/ink-prepare-1.png", "取下墨盒", ""),
        image("assets/images/ink-prepare-2.png", "撕下墨盒保护膜", "")],
      SOURCE.ink
    ),
    step(
      "ink-open", "CMYK 喷墨模组", "准备安装", "打开前盖",
      "打开喷墨模组前盖，准备沿内侧轨道安装墨盒。",
      [],
      "安装墨盒时保持模组平稳。",
      [image("assets/images/ink-cartridge-1.png", "打开喷墨模组前盖", "")],
      SOURCE.ink
    ),
    step(
      "ink-cartridge", "CMYK 喷墨模组", "沿轨道推入", "安装墨盒",
      "沿模组内侧轨道以约 45° 倾斜角推入，完全插入后向内按压，听到“咔哒”声即安装到位。",
      [],
      "不要垂直硬塞。遇到阻力时退回，调整角度后再试。",
      [image("assets/images/ink-cartridge-2.png", "以约 45 度安装墨盒", ""),
        image("assets/images/ink-cartridge-3.png", "按压墨盒直至咔哒一声", "")],
      SOURCE.ink
    ),
    step(
      "ink-moisture", "CMYK 喷墨模组", "保持海绵湿润", "滴保湿液",
      "在底盖保湿海绵上滴加适量保湿液，保持海绵湿润。",
      [],
      "保湿液不要过量，避免液体进入模组内部。",
      [image("assets/images/ink-cover-1.png", "向底盖保湿海绵滴加保湿液", "")],
      SOURCE.ink
    ),
    step(
      "ink-cover", "CMYK 喷墨模组", "吸附到位", "安装底盖",
      "将底盖安装到喷墨模组，确保通过内置磁铁吸附固定。",
      [],
      "材料厚度大于 26 mm 不支持喷墨；20–26 mm 时需手动取下底盖。",
      [image("assets/images/ink-cover-2.png", "安装底盖", "")],
      SOURCE.ink
    ),
    step(
      "ink-fixed-plate", "CMYK 喷墨模组", "先完成激光校准", "安装底盖固定片",
      "关闭 M2 并取下其他模组，在 xTool 软件中完成激光模组标定。移除底板左上角预装螺丝，用六角螺丝刀将底盖固定片安装到位。",
      [],
      "安装固定片前，确认设备已断电。",
      [image("assets/images/ink-fixed-plate-1.png", "移除预装螺丝", ""),
        image("assets/images/ink-fixed-plate-2.png", "安装底盖固定片", "")],
      SOURCE.ink
    ),
    step(
      "ink-install", "CMYK 喷墨模组", "对准后吸附", "磁吸安装喷墨模组",
      "将喷墨模组对准 M2 多功能模组支架并吸附到位。",
      [],
      "确认模组吸附牢靠后，再连接线缆。",
      [image("assets/images/ink-module-magnetic.png", "磁吸安装喷墨模组", "")],
      SOURCE.ink
    ),
    step(
      "ink-connect", "CMYK 喷墨模组", "避免与皮带摩擦", "连接模组",
      "将磁环夹在模组连接线上，再把连接线两端接入喷墨模组和多功能模组支架。磁环避开皮带一侧，整理好线缆后再开机。",
      [],
      "磁环靠近皮带会产生摩擦。",
      [image("assets/images/ink-connect-1.png", "连接喷墨模组线缆", ""),
        image("assets/images/ink-connect-2.png", "整理模组连接线", "")],
      SOURCE.ink
    ),
    step(
      "ink-safety", "CMYK 喷墨模组", "使用与存放", "安全说明",
      "推荐工作环境：\n工作湿度：40% ~ 60% RH\n■ 请勿将墨盒存放在温湿度剧烈变化或高温/高湿的环境中。\n■ 请将墨盒及模组置于儿童无法触及的地方。避免墨盒直接暴露在阳光下。\n■ 请勿触摸墨盒侧面的金属触点及出墨口。请勿撕下墨盒侧面的标签。\n■ 设备通电时，严禁安装或拆卸墨盒。墨水不可食用。\n■ 若墨水不慎接触皮肤或眼睛，请立即用大量清水冲洗；如仍有不适，请及时就医。",
      [],
      "",
      [image("assets/images/ink-cartridge-safety.png", "墨盒注意事项", "")],
      SOURCE.ink
    )
  ];

  var RA3_STEPS = [
    step(
      "ra3-assemble", "RA3 Lite", "在桌面上先组好", "组装旋转附件三代 Lite",
      "把动力组件固定在主底板上，按工件形状选择圆柱爪尖、T 型爪尖或延长爪尖，再安装爪盘组件并拧紧手拧螺丝。",
      [],
      "磁吸和旋转部件有夹手风险。装配、旋转夹盘和调整支撑模组时，手指不要放在结合面之间。",
      [
        image("assets/images/ra3-assemble-1.png", "组装 RA3 Lite 旋转附件 1", ""),
        image("assets/images/ra3-assemble-2.png", "组装 RA3 Lite 旋转附件 2", "")
      ],
      SOURCE.ra3
    ),
    step(
      "ra3-position", "RA3 Lite", "放入 M2 中央", "连接M2",
      "把组装好的动力组件和主底板放在 M2 中央，用两块定位板确定位置。主机连接线接入动力组件，再从上盖缺口引出并接到任意扩展接口。",
      [],
      "合盖前沿线缆走向检查一遍，避免线缆被上盖压住或进入运动区域。",
      [
        image("assets/images/ra3-connect-1.png", "连接 RA3 Lite 与 M2 1", ""),
        image("assets/images/ra3-connect-2.png", "连接 RA3 Lite 与 M2 2", ""),
        image("assets/images/ra3-connect-3.png", "连接 RA3 Lite 与 M2 3", ""),
        image("assets/images/ra3-connect-4.png", "连接 RA3 Lite 与 M2 4", ""),
        image("assets/images/ra3-connect-5.png", "连接 RA3 Lite 与 M2 5", ""),
        image("assets/images/ra3-connect-6.png", "连接 RA3 Lite 与 M2 6", ""),
        image("assets/images/ra3-connect-7.png", "连接 RA3 Lite 与 M2 7", ""),
        image("assets/images/ra3-connect-8.png", "连接 RA3 Lite 与 M2 8", ""),
        image("assets/images/ra3-connect-9.png", "连接 RA3 Lite 与 M2 9", "")
      ],
      SOURCE.ra3
    ),
    step(
      "first-rotary", "第一次使用", "先用边框预览", "加工圆柱体",
      "打开 xTool 软件，选择 RA3 Lite，输入工件直径并放置图案。先执行完整边框预览，确认无碰撞后合上盖子开始加工。",
      [],
      "第一次建议使用直筒、无把手的圆柱体。",
      [image("assets/images/ra3-cylinder-1.png", "加工圆柱体 1", ""),
        image("assets/images/ra3-cylinder-2.png", "加工圆柱体 2", ""),
        image("assets/images/ra3-cylinder-3.png", "加工圆柱体 3", ""),
        image("assets/images/ra3-cylinder-4.png", "加工圆柱体 4", "")],
      SOURCE.ra3
    ),
    step(
      "ra3-sphere", "第一次使用", "适合球形工件", "加工球体",
      "使用支撑组件承托球体，调整夹爪和支撑高度使工件保持稳定。输入球体直径，完成边框预览后开始加工。",
      [],
      "球体必须保持旋转中心稳定，确认激光头不会碰到工件或支撑组件。",
      [image("assets/images/ra3-sphere-1.png", "加工球体 1", ""),
        image("assets/images/ra3-sphere-2.png", "加工球体 2", "")],
      SOURCE.ra3
    ),
    step(
      "ra3-ring", "第一次使用", "适合戒指工件", "加工戒指",
      "安装戒指夹具并固定戒指，确认戒指与夹具同心。输入工件尺寸，完成边框预览后开始加工。",
      [],
      "戒指夹具和工件要锁紧，避免旋转时松动。",
      [image("assets/images/ra3-ring-1.png", "加工戒指 1", ""),
        image("assets/images/ra3-ring-2.png", "加工戒指 2", "")],
      SOURCE.ra3
    )
  ];

  function guideSteps(kitId) {
    var base = [inventoryStep(kitId), COMMON[0], MACHINE, INDICATOR].concat(COMMON.slice(1));
    if (kitId === "single") return base.concat([MATERIAL, FIRST_CASE]);
    if (kitId === "color") return base.concat(COLOR_STEPS, [MATERIAL, FIRST_CASE]);
    return base.concat(COLOR_STEPS, RA3_STEPS, [MATERIAL, FIRST_CASE]);
  }

  function guideStructure(steps) {
    var sectionById = {
      "check-box": ["M2主机/激光头", "物料清单"],
      "remove-foam": ["M2主机/激光头", "取出泡棉与物料"],
      "machine-overview": ["M2主机/激光头", "认识机器"],
      "indicator": ["M2主机/激光头", "认识指示灯"],
      "grease": ["M2主机/激光头", "安装机器"],
      "exhaust": ["M2主机/激光头", "安装机器"],
      "laser-module": ["M2主机/激光头", "安装机器"],
      "connect-power": ["M2主机/激光头", "连接机器"],
      "download-software": ["M2主机/激光头", "连接机器"],
      "connect-computer": ["M2主机/激光头", "连接机器"],
      "ink-prepare": ["喷墨模组", "安装墨盒"],
      "ink-open": ["喷墨模组", "安装墨盒"],
      "ink-cartridge": ["喷墨模组", "安装墨盒"],
      "ink-moisture": ["喷墨模组", "安装墨盖"],
      "ink-cover": ["喷墨模组", "安装墨盖"],
      "ink-fixed-plate": ["喷墨模组", "安装喷墨头"],
      "ink-install": ["喷墨模组", "安装喷墨头"],
      "ink-connect": ["喷墨模组", "安装喷墨头"],
      "ink-safety": ["喷墨模组", "安全说明"],
      "ra3-assemble": ["RA3 Lite模组", "组装旋转附件三代 Lite"],
      "ra3-position": ["RA3 Lite模组", "连接M2"],
      "first-rotary": ["RA3 Lite模组", "加工圆柱体"],
      "ra3-sphere": ["RA3 Lite模组", "加工球体"],
      "ra3-ring": ["RA3 Lite模组", "加工戒指"],
      "secure-material": ["第一次使用", "固定材料"],
      "first-case": ["第一次使用", "开始你的第一个案例"]
    };
    return steps.map(function (item) {
      var copy = Object.assign({}, item);
      var structure = sectionById[item.id] || [item.group || "其他", item.title];
      copy.section = structure[0];
      copy.subsection = structure[1];
      return copy;
    });
  }

  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char];
    });
  }

  function icon(name) {
    var icons = {
      arrow: "→",
      play: "▶",
      pdf: "↓",
      guide: "↳",
      check: "✓",
      external: "↗",
      menu: "☰",
      home: "⌂"
    };
    return "<span class='icon' aria-hidden='true'>" + icons[name] + "</span>";
  }

  function brand() {
    return "<a class='brand transition-link' href='index.html' aria-label='返回 xTool M2 指南首页'>" +
      "<span class='brand-mark'>xTool</span><span class='brand-divider'></span><span>M2 使用指南</span></a>";
  }

  function header(kit) {
    var kitBlock = kit ? "<span class='kit-chip'>" + esc(kit.title) + "</span>" : "";
    var sourceLink = kit ? "<a class='header-source' href='" + SOURCE.m2 + "' target='_blank' rel='noopener'>查看官方说明 " + icon("external") + "</a>" : "";
    return "<header class='topbar'>" +
      "<div class='brand-wrap'>" + brand() + sourceLink + "</div>" +
      "<div class='top-actions'>" + kitBlock +
      (kit ? "<a class='quiet-link transition-link' href='" + kit.choose + "'>教程首页</a>" : "") +
      "<a class='quiet-link transition-link' href='index.html'>更换套装</a></div>" +
      "</header><div class='page-progress' aria-hidden='true'><span></span></div>";
  }

  function footer() {
    return "<footer class='footer'><div>" + brand() + "</div>" +
      "<p>按你的套装，只看需要的步骤。操作细节与安全要求以 xTool 官方资料为准。</p>" +
      "<div class='footer-links'><a href='" + SOURCE.m2 + "' target='_blank' rel='noopener'>官方帮助中心 " + icon("external") + "</a></div></footer>";
  }

  function flowStrip(active) {
    var labels = ["选择套装", "选择上手方式", "开始体验"];
    return "<ol class='flow-strip' aria-label='使用流程'>" + labels.map(function (label, index) {
      var state = index + 1 < active ? " done" : index + 1 === active ? " active" : "";
      return "<li class='" + state.trim() + "'><span>" + (index + 1 < active ? "✓" : index + 1) + "</span>" + label + "</li>";
    }).join("") + "</ol>";
  }

  function modeRail(kit, current) {
    var modes = [
      { id: "guide", title: "在线指引", sub: "推荐", href: kit.guide, icon: "guide" },
      { id: "video", title: "开箱视频", sub: "先看一遍", href: kit.video, icon: "play" },
      { id: "downloads", title: "PDF", sub: "直接下载", href: kit.downloads, icon: "pdf" }
    ];
    return "<nav class='mode-rail' aria-label='切换教程方式'><span class='rail-title'>教程方式</span>" +
      modes.map(function (mode) {
        var active = mode.id === current;
        return "<a class='rail-item transition-link" + (active ? " active" : "") + "' href='" + mode.href + "'" +
          (active ? " aria-current='page'" : "") + ">" +
          icon(mode.icon) + "<span><strong>" + mode.title + "</strong><small>" + mode.sub + "</small></span></a>";
      }).join("") + "</nav>";
  }

  function kitVisual(kitId, kit) {
    return "<div class='kit-visual'><img src='" + kit.image + "' alt='" + esc(kit.title + "示意图") + "'></div>";
  }

  function renderHome() {
    document.title = "xTool M2 交互式使用指南";
    var cards = Object.keys(KITS).map(function (id, index) {
      var kit = KITS[id];
      return "<a class='kit-card transition-link' href='" + kit.choose + "' data-kit='" + id + "'>" +
        "<div class='kit-card-top'><span>0" + (index + 1) + "</span><strong>" + kit.title + "</strong></div>" +
        kitVisual(id, kit) +
        "<div class='kit-card-bottom'><span>选择这套 " + icon("arrow") + "</span></div></a>";
    }).join("");

    return header(null) +
      "<main id='main' class='home-main'>" +
      "<section class='home-hero'><div class='home-copy'>" +
      "<p class='eyebrow'>xTool M2 · 快速开始</p><h1><span class='title-line'>欢迎开启你的</span><span class='title-line'><em>xTool M2 之旅</em></span></h1>" +
      flowStrip(1) + "</div>" +
      "<div class='hero-machine'><div class='cmyk-line'></div><img src='assets/images/m2-product.webp' alt='xTool M2 主机'></div></section>" +
      "<section class='kit-section' aria-labelledby='kit-title'><div class='section-heading'>" +
      "<div><p class='eyebrow'>第 1 步</p><h2 id='kit-title'>选择你的套装</h2></div>" +
      "<p>套装不同，后面的安装与下载内容也会自动调整。</p></div>" +
      "<div class='kit-grid'>" + cards + "</div></section></main>" + footer();
  }

  function renderChoose(kitId) {
    var kit = KITS[kitId];
    document.title = kit.title + "｜选择上手方式";
    return header(kit) +
      "<main id='main' class='choose-main'>" +
      "<section class='choose-hero'>" + flowStrip(2) +
      "<p class='eyebrow'>已选择 · " + kit.title + "</p>" +
      "<h1>选个喜欢的方式开始吧</h1>" +
      "<div class='kit-path'>" + kit.path.map(function (item) { return "<span>" + item + "</span>"; }).join(icon("arrow")) + "</div></section>" +
      "<section class='mode-grid' aria-label='选择上手方式'>" +
      "<a class='mode-card primary transition-link' href='" + kit.guide + "'><span class='recommend'>推荐</span>" +
      "<div class='mode-icon'>" + icon("guide") + "</div><p>在线指引</p><h2>跟着步骤，边看边做</h2>" +
      "<ul><li>" + kit.time + "</li><li>清晰目录</li><li>按套装完整串联</li></ul><span class='mode-cta'>开始在线指引 " + icon("arrow") + "</span></a>" +
      "<a class='mode-card transition-link' href='" + kit.video + "'><div class='mode-icon'>" + icon("play") + "</div>" +
      "<p>开箱视频</p><h2>跟着视频，轻松上手</h2><span class='mode-cta'>打开视频 " + icon("arrow") + "</span></a>" +
      "<a class='mode-card transition-link' href='" + kit.downloads + "'><div class='mode-icon'>" + icon("pdf") + "</div>" +
      "<p>PDF 快速指南</p><h2>下载指南，随时查看</h2><span class='mode-cta'>查看可下载文档 " + icon("arrow") + "</span></a>" +
      "</section></main>" + footer();
  }

  function renderFigure(images) {
    return "<div class='step-gallery cols-" + Math.min(images.length, 3) + "'>" + images.map(function (item) {
      return "<figure><a class='image-zoom' href='" + item.src + "' target='_blank' rel='noopener' title='点击查看高清原图'><div class='image-frame'><img loading='lazy' src='" + item.src + "' alt='" + esc(item.alt) + "'></div></a></figure>";
    }).join("") + "</div>";
  }

  function renderStep(item, index) {
    return "<section class='guide-step reveal' id='" + item.id + "' data-toc='" + esc(item.title) + "'>" +
      "<div class='step-number'>" + String(index + 1).padStart(2, "0") + "</div>" +
      "<div class='step-copy'><p class='step-eyebrow'>" + esc(item.eyebrow) + "</p><h2>" + esc(item.title) + "</h2>" +
      "<p class='step-body'>" + esc(item.body) + "</p>" +
      (item.tip ? "<aside class='tip'><strong>注意</strong><p>" + esc(item.tip) + "</p></aside>" : "") +
      "</div>" +
      (item.images && item.images.length ? renderFigure(item.images) : "") +
      (item.followup ? "<div class='step-followup'><p class='step-body'>" + esc(item.followup.body) + "</p>" + renderFigure(item.followup.images) + "</div>" : "") +
      "</section>";
  }

  function renderCare(kitId) {
    var cards = [
      ["主机与激光", "定期清洁底板、排烟口和激光模组气嘴；发现运动不顺时检查直线轴润滑状态。"],
      ["每次加工前", "确认排烟通畅、材料固定牢靠，并先执行边框预览。加工过程中不要无人看管。"]
    ];
    if (kitId !== "single") {
      cards.push(["喷墨模组", "底盖保湿海绵保持湿润但不要积液；长期停用时至少每月清洁一次清洁海绵。"]);
      cards.push(["喷嘴护理", "不要让喷嘴长时间暴露在空气中。残墨或灰尘用无尘布轻轻擦拭。"]);
    }
    if (kitId === "deluxe") {
      cards.push(["RA3 Lite", "使用干布清洁。每次更换工件后重新检查夹持、把手位置和完整边框预览。"]);
    }
    return "<section class='care-section reveal' id='care'><div><p class='eyebrow'>日常维护与使用技巧</p>" +
      "<h2>第一次完成后，记住这几件事</h2></div><div class='care-grid'>" +
      cards.map(function (card) {
        return "<article><span>" + icon("check") + "</span><h3>" + card[0] + "</h3><p>" + card[1] + "</p></article>";
      }).join("") + "</div></section>";
  }

  function renderGuideToc(steps) {
    var sections = [];
    var section = null;
    var subsection = null;
    steps.forEach(function (item, index) {
      if (!section || section.title !== item.section) {
        section = { title: item.section, groups: [] };
        sections.push(section);
        subsection = null;
      }
      if (!subsection || subsection.title !== item.subsection) {
        subsection = { title: item.subsection, items: [] };
        section.groups.push(subsection);
      }
      subsection.items.push({ item: item, index: index });
    });
    function link(entry) {
      return "<a href='#" + entry.item.id + "' data-toc-link='" + entry.item.id + "'><span>" + String(entry.index + 1).padStart(2, "0") + "</span>" + esc(entry.item.title) + "</a>";
    }
    return "<div class='toc-tree'>" + sections.map(function (item) {
      return "<section class='toc-section'><h3>" + esc(item.title) + "</h3>" + item.groups.map(function (group) {
        var heading = group.items.length === 1 && group.items[0].item.title === group.title ? "" : "<h4>" + esc(group.title) + "</h4>";
        return "<div class='toc-subsection'>" + heading + group.items.map(link).join("") + "</div>";
      }).join("") + "</section>";
    }).join("") + "<a class='toc-care-link' href='#care' data-toc-link='care'><span>✓</span>维护与技巧</a></div>";
  }

  function renderGuide(kitId) {
    var kit = KITS[kitId];
    var steps = guideStructure(guideSteps(kitId));
    var heroTitle = kitId === "single" ? "M2" :
      kitId === "color" ? "M2 多彩套装" : "M2 豪华套装";
    var toc = renderGuideToc(steps);
    var groups = [];
    var lastSection = "";
    var lastSubsection = "";
    var sectionCount = 0;
    steps.forEach(function (item, index) {
      if (item.section !== lastSection) {
        sectionCount += 1;
        groups.push("<div class='chapter-marker reveal'><span>阶段 " + sectionCount +
          "</span><h2>" + esc(item.section) + "</h2></div>");
        lastSection = item.section;
        lastSubsection = "";
      }
      if (item.subsection && item.subsection !== lastSubsection) {
        groups.push("<div class='subchapter-marker reveal'><h3>" + esc(item.subsection) + "</h3></div>");
        lastSubsection = item.subsection;
      }
      groups.push(renderStep(item, index));
    });

    document.title = kit.title + "｜在线指引";
    return header(kit) + modeRail(kit, "guide") +
      "<main id='main' class='guide-page'>" +
      "<aside class='toc-panel'><div class='toc-head'><span>目录</span><small>" + steps.length + " 个步骤</small></div>" +
      "<nav aria-label='在线指引目录'>" + toc + "</nav></aside>" +
      "<article class='guide-article'><section class='guide-intro'>" +
      "<p class='eyebrow'>在线指引 · " + kit.title + "</p><h1><span class='title-line'>一步步上手你的</span><span class='title-line'>" + esc(heroTitle) + "</span></h1>" +
      "<div class='guide-meta'><span>" + kit.time + "</span><span>" + steps.length + " 个步骤</span></div>" +
      "<div class='kit-path'>" + kit.path.map(function (item) { return "<span>" + item + "</span>"; }).join(icon("arrow")) + "</div>" +
      "</section>" +
      "<section class='safety-banner reveal'><span>!</span><div><strong>开始前</strong><p>设备放在稳固平整的工作台上，排烟通向净化器或室外。移除全部泡棉后再接电；加工时关闭上盖并留在设备附近。</p></div></section>" +
      "<details class='mobile-toc'><summary>" + icon("menu") + " 打开目录</summary><nav>" + toc + "</nav></details>" +
      groups.join("") + renderCare(kitId) +
      "<section class='finish-card reveal'><span class='finish-check'>" + icon("check") + "</span><p class='eyebrow'>完成</p><h2>你的 " + kit.title + " 已准备好</h2>" +
      "<p>以后想复习时，可以从目录直接跳到需要的部分。</p><div><a class='secondary-button transition-link' href='" + kit.video + "'>查看开箱视频</a>" +
      "<a class='primary-button transition-link' href='" + kit.downloads + "'>下载 PDF 指南 " + icon("arrow") + "</a></div></section>" +
      "</article></main>" + footer();
  }

  function renderVideo(kitId) {
    var kit = KITS[kitId];
    document.title = kit.title + "｜开箱视频";
    return header(kit) + modeRail(kit, "video") +
      "<main id='main' class='content-page video-page'><section class='content-hero'>" +
      "<p class='eyebrow'>开箱视频 · " + kit.title + "</p><h1>跟着视频，<br>轻松上手</h1></section>" +
      "<section class='video-block reveal'><div class='video-label'><div><span>BILIBILI</span><h2>开箱视频-中文版</h2></div>" +
      "<a href='https://www.bilibili.com/video/BV1tK5Q6cEJM/' target='_blank' rel='noopener'>在哔哩哔哩打开 " + icon("external") + "</a></div>" +
      "<div class='bili-frame'><iframe src='https://player.bilibili.com/player.html?aid=116571838089009&bvid=BV1tK5Q6cEJM&cid=38325260059&p=1&high_quality=1&danmaku=0&autoplay=0' title='xTool M2 开箱视频' scrolling='no' frameborder='0' allowfullscreen></iframe></div>" +
      "<p class='video-fallback'>预览无法加载？<a href='https://www.bilibili.com/video/BV1tK5Q6cEJM/' target='_blank' rel='noopener'>直接打开视频</a></p></section>" +
      "<a class='youtube-card reveal' href='https://www.youtube.com/watch?v=E7UKRsn_N2g' target='_blank' rel='noopener'>" +
      "<img src='assets/images/youtube-m2.jpg' alt='xTool M2 YouTube 开箱视频预览'><div><span>YOUTUBE</span>" +
      "<h2>开箱视频-英文版</h2><p>打开 YouTube 观看 " + icon("external") + "</p></div></a>" +
      "<section class='next-card reveal'><div><h2>回到在线指引</h2></div>" +
      "<a class='primary-button icon-only transition-link' href='" + kit.guide + "' aria-label='回到在线指引' title='回到在线指引'>" + icon("arrow") + "</a></section></main>" + footer();
  }

  function docsFor(kitId) {
    if (kitId === "single") return [DOCS.m2];
    if (kitId === "color") return [DOCS.m2, DOCS.ink];
    return [DOCS.m2, DOCS.ink, DOCS.ra3];
  }

  function renderDownloads(kitId) {
    var kit = KITS[kitId];
    var docs = docsFor(kitId);
    document.title = kit.title + "｜下载快速指南";
    return header(kit) + modeRail(kit, "downloads") +
      "<main id='main' class='content-page download-page'><section class='content-hero'>" +
      "<p class='eyebrow'>PDF 快速指南 · " + kit.title + "</p><h1>你的 M2 指南，<br>随时带在身边</h1>" +
      "<p class='lede'>选择您所需的快速指南语言版本，打开 PDF 预览或下载保存。</p></section>" +
      "<section class='document-list'>" + docs.map(function (doc, index) {
        return "<article class='document-card reveal'><div class='doc-index'>0" + (index + 1) + "</div><div class='doc-copy'>" +
          "<span>" + doc.label + "</span><h2>" + doc.title + "</h2><p>" + doc.desc + "</p>" +
          "<div class='doc-actions'><a class='primary-button' href='" + doc.href + "' target='_blank' rel='noopener'>打开并下载 PDF " + icon("pdf") + "</a>" +
          "<a class='source-link' href='" + doc.source + "' target='_blank' rel='noopener'>其他语言与在线原文 " + icon("external") + "</a></div></div>" +
          "<div class='pdf-badge'><strong>PDF</strong><span>简体中文</span></div></article>";
      }).join("") + "</section>" +
      "<section class='next-card reveal'><div><h2>回到在线指引</h2></div>" +
      "<a class='primary-button icon-only transition-link' href='" + kit.guide + "' aria-label='回到在线指引' title='回到在线指引'>" + icon("arrow") + "</a></section></main>" + footer();
  }

  function installInteractions() {
    requestAnimationFrame(function () {
      document.body.classList.add("is-ready");
    });

    document.querySelectorAll("[data-kit]").forEach(function (link) {
      link.addEventListener("click", function () {
        try { localStorage.setItem("m2-kit", link.getAttribute("data-kit")); } catch (error) {}
      });
    });

    document.addEventListener("click", function (event) {
      var link = event.target.closest("a.transition-link");
      if (!link || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (link.target || link.getAttribute("href").charAt(0) === "#") return;
      var target = new URL(link.href, window.location.href);
      if (target.protocol !== window.location.protocol || target.host !== window.location.host) return;
      event.preventDefault();
      document.body.classList.add("is-leaving");
      window.setTimeout(function () { window.location.href = link.href; }, 170);
    });

    var progress = document.querySelector(".page-progress span");
    function updateProgress() {
      if (!progress) return;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = "scaleX(" + (max > 0 ? Math.min(1, window.scrollY / max) : 0) + ")";
    }
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    var reveal = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      reveal.forEach(function (item) { item.classList.add("in-view"); });
    } else {
      var revealObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
      reveal.forEach(function (item) { revealObserver.observe(item); });
    }

    var sections = document.querySelectorAll("[data-toc]");
    var tocLinks = document.querySelectorAll("[data-toc-link]");
    if (sections.length && "IntersectionObserver" in window) {
      var tocObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          tocLinks.forEach(function (link) {
            link.classList.toggle("active", link.getAttribute("data-toc-link") === entry.target.id);
          });
        });
      }, { rootMargin: "-18% 0px -68% 0px", threshold: 0 });
      sections.forEach(function (section) { tocObserver.observe(section); });
    }
  }

  var root = document.getElementById("site-root");
  if (!root) return;
  var page = document.body.getAttribute("data-page") || "home";
  var kitId = document.body.getAttribute("data-kit") || "single";
  var output = "";

  if (page === "home") output = renderHome();
  if (page === "choose") output = renderChoose(kitId);
  if (page === "guide") output = renderGuide(kitId);
  if (page === "video") output = renderVideo(kitId);
  if (page === "downloads") output = renderDownloads(kitId);

  root.innerHTML = output;
  installInteractions();
})();
