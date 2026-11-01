import type { Locale } from "../i18n/types";

type L = Record<Locale, string>;

export interface Product {
  /** sert d'ancre (#slug) et de valeur de présélection dans le formulaire */
  slug: string;
  category: "export" | "import";
  flagship?: boolean;
  /** sous-titre optionnel (catégories, ex. "Fer à béton · Cuivre · Fils électriques") */
  cat?: L;
  name: L;
  /** 2 lignes visibles sur la carte */
  short: L;
  /** texte complet (déplié via « En savoir plus ») — source contenu.md */
  long: L;
}

export const products: Product[] = [
  // ---------- PRODUITS PHARES (page d'accueil) ----------
  {
    slug: "ananas",
    category: "export",
    flagship: true,
    name: { fr: "Ananas & Dérivés", en: "Pineapple & Derivatives", zh: "菠萝及其制品", ar: "الأناناس ومشتقاته" },
    short: {
      fr: "Ananas frais, jus et fruits séchés calibrés et conditionnés pour l'export.",
      en: "Fresh pineapple, juice and dried fruit, graded and packaged for export.",
      zh: "新鲜菠萝、果汁和果干，经分级和包装供出口。",
      ar: "أناناس طازج وعصائر وفواكه مجففة، مُصنّفة ومعبّأة للتصدير.",
    },
    long: {
      fr: "Le Bénin produit les meilleurs ananas au monde, notamment les variétés Pain de Sucre et Cayenne lisse, uniques pour leur saveur et leur douceur. BADSAL & FILS OKIKIOLA exporte des ananas frais rigoureusement sélectionnés, ainsi que des dérivés transformés (jus, fruits séchés) répondant aux normes internationales les plus strictes.",
      en: "Benin produces some of the world's finest pineapples, notably the Sugarloaf and Smooth Cayenne varieties, unique for their flavour and sweetness. BADSAL & FILS OKIKIOLA exports rigorously selected fresh pineapples, along with processed derivatives (juice, dried fruit) meeting the strictest international standards.",
      zh: "贝宁出产世界上最优质的菠萝，尤其是「糖面包」和「光皮卡因」品种，风味独特、口感甘甜。BADSAL & FILS OKIKIOLA 出口经严格甄选的新鲜菠萝，以及符合最严格国际标准的加工制品（果汁、果干）。",
      ar: "ينتج بنين أجود أنواع الأناناس في العالم، خصوصاً صنفي «Pain de Sucre» و«Cayenne lisse» المتميّزين بنكهتهما وحلاوتهما. تصدّر BADSAL & FILS OKIKIOLA أناناساً طازجاً مختاراً بعناية، إضافة إلى مشتقات مُحوّلة (عصائر، فواكه مجففة) تستوفي أصرم المعايير الدولية.",
    },
  },
  {
    slug: "karite",
    category: "export",
    flagship: true,
    name: { fr: "Karité & Dérivés", en: "Shea & Derivatives", zh: "乳木果及其制品", ar: "زبدة الشيا ومشتقاتها" },
    short: {
      fr: "Beurre de karité brut et raffiné, traçabilité complète depuis les coopératives.",
      en: "Raw and refined shea butter, full traceability from the cooperatives.",
      zh: "原始及精炼乳木果油，从合作社起全程可追溯。",
      ar: "زبدة شيا خام ومكرّرة، مع تتبّع كامل من التعاونيات.",
    },
    long: {
      fr: "Acteur majeur de la filière des oléagineux, nous fournissons des noix de karité de premier choix ainsi que du beurre de karité pur, brut ou raffiné. Nos produits sont prisés par les industries cosmétiques et agroalimentaires mondiales pour leur richesse et leur traçabilité.",
      en: "A major player in the oilseed sector, we supply premium shea nuts as well as pure shea butter, raw or refined. Our products are sought after by global cosmetics and food industries for their richness and traceability.",
      zh: "作为油料作物领域的重要参与者，我们供应优质乳木果以及纯天然乳木果油（原始或精炼）。我们的产品因其丰富成分和可追溯性，深受全球化妆品和食品行业的青睐。",
      ar: "بصفتنا فاعلاً رئيسياً في قطاع البذور الزيتية، نوفّر جوز شيا من الدرجة الأولى وزبدة شيا نقية، خام أو مكرّرة. تحظى منتجاتنا بتقدير صناعات التجميل والأغذية العالمية لغناها وقابليتها للتتبّع.",
    },
  },
  {
    slug: "manioc",
    category: "export",
    flagship: true,
    name: { fr: "Manioc & Dérivés", en: "Cassava & Derivatives", zh: "木薯及其制品", ar: "المنيهوت ومشتقاته" },
    short: {
      fr: "Gari, tapioca et farine de manioc transformés selon les normes internationales.",
      en: "Gari, tapioca and cassava flour processed to international standards.",
      zh: "木薯粉（gari）、木薯淀粉和木薯面粉，按国际标准加工。",
      ar: "الغاري والتابيوكا ودقيق المنيهوت، مُعالَجة وفق المعايير الدولية.",
    },
    long: {
      fr: "Le manioc est au cœur de notre stratégie de valorisation agricole. Nous exportons le manioc sous plusieurs formes : tubercules frais, poudre de manioc (gari, foufou, etc.) et amidon industriel de haute pureté destiné aux applications alimentaires et manufacturières.",
      en: "Cassava is at the heart of our agricultural value strategy. We export cassava in several forms: fresh tubers, cassava powder (gari, fufu, etc.) and high-purity industrial starch for food and manufacturing applications.",
      zh: "木薯是我们农业增值战略的核心。我们以多种形式出口木薯：新鲜块茎、木薯粉（gari、foufou 等）以及用于食品和制造业的高纯度工业淀粉。",
      ar: "يقع المنيهوت في صميم استراتيجيتنا للتثمين الزراعي. نصدّره بأشكال متعددة: درنات طازجة، ومسحوق منيهوت (غاري، فوفو، إلخ)، ونشا صناعي عالي النقاء موجّه للتطبيقات الغذائية والتصنيعية.",
    },
  },
  {
    slug: "noix-palme",
    category: "export",
    flagship: true,
    name: { fr: "Noix de Palme & Dérivés", en: "Palm Nut & Derivatives", zh: "棕榈果及其制品", ar: "جوز النخيل ومشتقاته" },
    short: {
      fr: "Huile de palme et dérivés issus d'une filière responsable et contrôlée.",
      en: "Palm oil and derivatives from a responsible, controlled supply chain.",
      zh: "来自负责任、受控供应链的棕榈油及其衍生制品。",
      ar: "زيت نخيل ومشتقات من سلسلة توريد مسؤولة ومراقَبة.",
    },
    long: {
      fr: "Nous collectons et sélectionnons les meilleures noix de palme pour l'extraction d'huiles végétales et la production de dérivés de haute qualité, destinés à la consommation humaine et aux besoins industriels.",
      en: "We collect and select the finest palm nuts for vegetable-oil extraction and the production of high-quality derivatives, intended for human consumption and industrial use.",
      zh: "我们采集并甄选最优质的棕榈果，用于植物油提取和高品质衍生制品的生产，供人类食用和工业使用。",
      ar: "نجمع ونختار أجود أنواع جوز النخيل لاستخلاص الزيوت النباتية وإنتاج مشتقات عالية الجودة موجّهة للاستهلاك البشري والاحتياجات الصناعية.",
    },
  },

  // ---------- EXPORTATION (page Exportation) ----------
  {
    slug: "anacarde",
    category: "export",
    name: { fr: "Anacarde (Cajou)", en: "Cashew", zh: "腰果", ar: "الكاجو" },
    short: {
      fr: "Le Bénin produit l'une des noix de cajou les plus prisées au monde pour son excellent rendement (KOR). Nous exportons noix brutes et amandes calibrées, triées et certifiées.",
      en: "Benin produces one of the world's most prized cashews for its excellent KOR yield. We export raw nuts and graded kernels, sorted and certified.",
      zh: "贝宁出产世界上最受青睐的腰果之一，出仁率（KOR）优异。我们出口经分拣和认证的生腰果及分级果仁。",
      ar: "ينتج بنين أحد أكثر أنواع الكاجو طلباً في العالم لمردوده الممتاز (KOR). نصدّر الجوز الخام واللُب المُصنّف، المفروز والمعتمَد.",
    },
    long: {
      fr: "Le Bénin produit l'une des noix de cajou les plus prisées au monde pour son excellent rendement (KOR). Notre vision dépasse le simple négoce de matières brutes : nous structurons notre chaîne de valeur vers la transformation locale. En plus d'exporter des noix de cajou brutes (RCN) rigoureusement triées, nous développons des capacités industrielles pour fournir des amandes décortiquées, calibrées, blanches ou grillées — un produit fini prêt à l'emploi, conforme aux normes de sécurité internationales les plus strictes.",
      en: "Benin produces one of the world's most prized cashews for its excellent KOR yield. Our vision goes beyond trading raw materials: we are structuring our value chain toward local processing. In addition to exporting rigorously sorted raw cashew nuts (RCN), we are building industrial capacity to supply shelled, graded, white or roasted kernels — a ready-to-use finished product compliant with the strictest international safety standards.",
      zh: "贝宁出产世界上最受青睐的腰果之一，以其优异的出仁率（KOR）著称。我们的愿景超越原材料贸易：我们正在构建面向本地加工的价值链。除出口经严格分拣的生腰果（RCN）外，我们还在发展工业产能，提供去壳、分级、白色或烘焙的果仁——即用型成品，符合最严格的国际安全标准。",
      ar: "ينتج بنين أحد أكثر أنواع الكاجو طلباً في العالم بفضل مردوده الممتاز (KOR). تتجاوز رؤيتنا تجارة المواد الخام: نبني سلسلة قيمتنا نحو المعالجة المحلية. إضافة إلى تصدير جوز الكاجو الخام (RCN) المفروز بدقة، نطوّر قدرات صناعية لتوفير لُب مقشور ومُصنّف، أبيض أو محمّص — منتج نهائي جاهز للاستخدام يتوافق مع أصرم معايير السلامة الدولية.",
    },
  },
  {
    slug: "soja",
    category: "export",
    name: { fr: "Soja & Dérivés", en: "Soy & Derivatives", zh: "大豆及其制品", ar: "الصويا ومشتقاتها" },
    short: {
      fr: "Porté par une production nationale 100% sans OGM, le soja béninois est un pilier de notre offre : graines, tourteaux et huile destinés aux marchés internationaux.",
      en: "Backed by 100% GMO-free national production, Beninese soy is a pillar of our offer: seeds, cake and oil destined for international markets.",
      zh: "凭借 100% 非转基因的国家产量，贝宁大豆是我们产品的支柱：豆粒、豆粕和豆油销往国际市场。",
      ar: "مدعوماً بإنتاج وطني خالٍ من المعدّلات وراثياً بنسبة 100%، تُعدّ الصويا البنينية ركيزة في عرضنا: بذور وكُسب وزيت موجّهة للأسواق الدولية.",
    },
    long: {
      fr: "Porté par une production nationale 100% sans OGM (Non-GMO), le soja béninois est un pilier de notre stratégie industrielle. Au-delà de l'exportation de graines brutes, nous investissons dans la trituration et la valorisation locale pour fournir huiles de soja brutes ou raffinées et tourteaux de qualité supérieure (en vrac ou en pellets) pour l'alimentation animale — une sécurité d'approvisionnement sur une gamme complète, de la matière première au produit industriel.",
      en: "Backed by 100% GMO-free national production, Beninese soy is a pillar of our industrial strategy. Beyond exporting raw seeds, we invest in crushing and local processing to supply raw or refined soybean oils and premium cake (in bulk or pellets) for animal feed — supply security across a complete range, from raw material to industrial product.",
      zh: "凭借 100% 非转基因（Non-GMO）的国家产量，贝宁大豆是我们工业战略的支柱。除出口生豆粒外，我们还投资于压榨和本地增值加工，提供粗制或精炼大豆油以及优质豆粕（散装或颗粒）用于动物饲料——为客户提供从原材料到工业产品全系列的供应保障。",
      ar: "مدعوماً بإنتاج وطني خالٍ تماماً من المعدّلات الوراثية (Non-GMO)، تُعدّ الصويا البنينية ركيزة في استراتيجيتنا الصناعية. إلى جانب تصدير البذور الخام، نستثمر في العصر والتثمين المحلي لتوفير زيوت صويا خام أو مكرّرة وكُسب عالي الجودة (سائب أو حُبيبات) لتغذية الحيوان — ضمان توريد عبر مجموعة كاملة، من المادة الخام إلى المنتج الصناعي.",
    },
  },
  {
    slug: "mangue-avocat",
    category: "export",
    name: { fr: "Mangue & Avocat frais", en: "Fresh Mango & Avocado", zh: "新鲜芒果与牛油果", ar: "المانجو والأفوكادو الطازج" },
    short: {
      fr: "Nous exportons des mangues et avocats frais, rigoureusement sélectionnés et conditionnés sous chaîne du froid pour préserver toute leur qualité.",
      en: "We export fresh mangoes and avocados, carefully selected and cold-chain packaged to preserve their full quality.",
      zh: "我们出口经严格甄选、冷链包装的新鲜芒果和牛油果，以保持其优良品质。",
      ar: "نصدّر مانجو وأفوكادو طازجاً، مختاراً بعناية ومعبّأً ضمن سلسلة تبريد للحفاظ على جودته الكاملة.",
    },
    long: {
      fr: "Nous exportons des mangues et des avocats frais, rigoureusement sélectionnés dans les meilleurs vergers du Bénin. Cueillis à un stade de maturité optimal pour le transport, nos fruits garantissent une fraîcheur, une texture et une saveur d'exception sur les marchés internationaux.",
      en: "We export fresh mangoes and avocados, rigorously selected from Benin's finest orchards. Picked at an optimal stage of maturity for transport, our fruit guarantees exceptional freshness, texture and flavour on international markets.",
      zh: "我们出口新鲜芒果和牛油果，均从贝宁最优质的果园中严格甄选。在最适宜运输的成熟阶段采摘，我们的水果在国际市场上保证卓越的新鲜度、口感和风味。",
      ar: "نصدّر مانجو وأفوكادو طازجاً، مختاراً بدقة من أفضل بساتين بنين. يُقطف في مرحلة نضج مثالية للنقل، ويضمن نضارة وقواماً ونكهة استثنائية في الأسواق الدولية.",
    },
  },
  {
    slug: "sesame",
    category: "export",
    name: { fr: "Sésame", en: "Sesame", zh: "芝麻", ar: "السمسم" },
    short: {
      fr: "Le Bénin produit un sésame de haute qualité, riche en huile, blanc et homogène, trié et conditionné selon les exigences des acheteurs internationaux.",
      en: "Benin produces high-quality sesame, oil-rich, white and uniform, sorted and packaged to the requirements of international buyers.",
      zh: "贝宁出产高品质、富含油脂、洁白均匀的芝麻，按国际买家要求分拣和包装。",
      ar: "ينتج بنين سمسماً عالي الجودة، غنياً بالزيت، أبيض ومتجانساً، مفروزاً ومعبّأً وفق متطلبات المشترين الدوليين.",
    },
    long: {
      fr: "Le Bénin produit un sésame de haute qualité, riche en huile. Nous fournissons des graines de sésame brutes, nettoyées et triées, répondant aux exigences strictes des industries alimentaires, de la boulangerie et de l'extraction d'huile en Asie et en Europe.",
      en: "Benin produces high-quality, oil-rich sesame. We supply raw sesame seeds, cleaned and sorted, meeting the strict requirements of the food, bakery and oil-extraction industries in Asia and Europe.",
      zh: "贝宁出产高品质、富含油脂的芝麻。我们提供经清洗和分拣的生芝麻，满足亚洲和欧洲食品、烘焙及榨油行业的严格要求。",
      ar: "ينتج بنين سمسماً عالي الجودة وغنياً بالزيت. نوفّر بذور سمسم خام، منظّفة ومفروزة، تستوفي المتطلبات الصارمة لصناعات الأغذية والمخابز واستخلاص الزيوت في آسيا وأوروبا.",
    },
  },
  {
    slug: "arachide",
    category: "export",
    name: { fr: "Arachide", en: "Groundnut", zh: "花生", ar: "الفول السوداني" },
    short: {
      fr: "L'arachide est au cœur de notre programme de diversification industrielle : graines décortiquées, huile et tourteaux à forte valeur ajoutée.",
      en: "Groundnut is central to our industrial diversification program: shelled seeds, oil and high-value cake.",
      zh: "花生是我们工业多元化项目的核心：去壳花生、花生油和高附加值饼粕。",
      ar: "الفول السوداني في صميم برنامجنا للتنويع الصناعي: بذور مقشورة وزيت وكُسب ذو قيمة مضافة عالية.",
    },
    long: {
      fr: "L'arachide est au cœur de notre programme de diversification industrielle. Au-delà de la sélection de graines de bouche, nous orientons nos activités vers la trituration : huile d'arachide premium recherchée pour ses propriétés culinaires, et sous-produits valorisés en tourteaux riches en protéines pour les fabricants de provendes. Une intégration verticale qui garantit zéro déchet et une qualité maîtrisée de bout en bout.",
      en: "Groundnut is central to our industrial diversification program. Beyond selecting edible seeds, we are moving toward crushing: premium groundnut oil sought for its culinary properties, and by-products valorized into protein-rich cake for feed manufacturers. A vertical integration that guarantees zero waste and end-to-end controlled quality.",
      zh: "花生是我们工业多元化项目的核心。除甄选食用花生外，我们正将业务转向压榨：备受推崇的优质花生油，以及增值为富含蛋白质饼粕的副产品，供饲料制造商使用。这种垂直整合确保零浪费和全程可控的品质。",
      ar: "يقع الفول السوداني في صميم برنامجنا للتنويع الصناعي. إلى جانب اختيار حبوب الأكل، نوجّه أنشطتنا نحو العصر: زيت فول سوداني فاخر مطلوب لخصائصه الطهوية، ومنتجات ثانوية تُثمَّن ككُسب غني بالبروتين لمصنّعي الأعلاف. تكامل عمودي يضمن صفر هدر وجودة محكومة من البداية إلى النهاية.",
    },
  },
  {
    slug: "miel",
    category: "export",
    name: { fr: "Miel Pur Bio", en: "Pure Organic Honey", zh: "纯天然有机蜂蜜", ar: "عسل نقي عضوي" },
    short: {
      fr: "Notre miel est récolté de façon artisanale et écoresponsable auprès d'apiculteurs locaux, garantissant un produit pur, naturel et traçable.",
      en: "Our honey is harvested artisanally and responsibly from local beekeepers, ensuring a pure, natural and traceable product.",
      zh: "我们的蜂蜜以传统、环保的方式从当地养蜂人处采集，确保产品纯净、天然、可追溯。",
      ar: "يُجمع عسلنا بطريقة حرفية وصديقة للبيئة من نحّالين محليين، ما يضمن منتجاً نقياً وطبيعياً وقابلاً للتتبّع.",
    },
    long: {
      fr: "Notre miel est récolté de façon artisanale et écoresponsable dans les zones préservées du Bénin. 100% pur, naturel et certifié bio, il se distingue par ses propriétés nutritionnelles et ses arômes riches, recherchés par les secteurs de la santé et de l'agroalimentaire.",
      en: "Our honey is harvested artisanally and responsibly in Benin's preserved areas. 100% pure, natural and certified organic, it stands out for its nutritional properties and rich aromas, sought after by the health and food sectors.",
      zh: "我们的蜂蜜在贝宁的原始保护区以传统、环保的方式采集。100% 纯净、天然并获得有机认证，凭借其营养价值和浓郁香气，深受健康和食品行业的青睐。",
      ar: "يُجمع عسلنا بطريقة حرفية وصديقة للبيئة في المناطق المحمية في بنين. نقي 100% وطبيعي ومعتمَد عضوياً، يتميّز بخصائصه الغذائية ونكهاته الغنية، المطلوبة في قطاعي الصحة والأغذية.",
    },
  },
  {
    slug: "fruits-seches",
    category: "export",
    name: { fr: "Fruits Séchés", en: "Dried Fruits", zh: "果干", ar: "الفواكه المجففة" },
    short: {
      fr: "Pour répondre à la demande croissante de snacks sains, nous proposons ananas, mangue et banane séchés sans additifs ni sucre ajouté.",
      en: "To meet growing demand for healthy snacks, we offer dried pineapple, mango and banana with no additives or added sugar.",
      zh: "为满足日益增长的健康零食需求，我们提供无添加剂、无添加糖的菠萝干、芒果干和香蕉干。",
      ar: "لتلبية الطلب المتزايد على الوجبات الصحية، نقدّم أناناساً ومانجو وموزاً مجففاً دون إضافات أو سكر مضاف.",
    },
    long: {
      fr: "Pour répondre à la demande croissante de snacks sains, nous proposons une gamme de fruits séchés (ananas, mangues) de qualité premium. Sans sucres ajoutés ni conservateurs, notre procédé de déshydratation préserve toutes les saveurs et vitamines d'origine.",
      en: "To meet growing demand for healthy snacks, we offer a premium range of dried fruits (pineapple, mango). With no added sugar or preservatives, our dehydration process preserves all the original flavours and vitamins.",
      zh: "为满足日益增长的健康零食需求，我们提供优质果干系列（菠萝、芒果）。不添加糖或防腐剂，我们的脱水工艺保留了全部原始风味和维生素。",
      ar: "لتلبية الطلب المتزايد على الوجبات الخفيفة الصحية، نقدّم مجموعة فواكه مجففة فاخرة (أناناس، مانجو). دون سكر مضاف أو مواد حافظة، تحافظ عملية التجفيف لدينا على جميع النكهات والفيتامينات الأصلية.",
    },
  },
  {
    slug: "aliments-betail",
    category: "export",
    name: { fr: "Aliments de Bétail", en: "Animal Feed", zh: "饲料", ar: "الأعلاف" },
    short: {
      fr: "Tourteaux de soja, coton, pellets et Ud-Cake pour éleveurs : des aliments riches en protéines, formulés pour la performance animale.",
      en: "Soybean and cotton cake, pellets and Ud-Cake for breeders: protein-rich feed formulated for animal performance.",
      zh: "为养殖户提供大豆粕、棉籽粕、颗粒饲料和 Ud-Cake：富含蛋白质，专为动物性能配制。",
      ar: "كُسب الصويا والقطن والحُبيبات وUd-Cake للمربّين: أعلاف غنية بالبروتين مُصمّمة لأداء الحيوان.",
    },
    long: {
      fr: "Nous sommes un fournisseur stratégique d'aliments de bétail à forte valeur protéique pour les éleveurs et fabricants de provendes. Notre catalogue inclut tourteaux de soja, tourteaux de graines de coton (en vrac ou en pellets) et Ud-Cake. Ces coproduits industriels garantissent une nutrition animale optimale.",
      en: "We are a strategic supplier of high-protein animal feed for breeders and feed manufacturers. Our catalogue includes soybean cake, cottonseed cake (in bulk or pellets) and Ud-Cake. These industrial co-products ensure optimal animal nutrition.",
      zh: "我们是养殖户和饲料制造商高蛋白饲料的战略供应商。我们的产品包括大豆粕、棉籽粕（散装或颗粒）和 Ud-Cake。这些工业副产品确保最佳的动物营养。",
      ar: "نحن مورّد استراتيجي لأعلاف غنية بالبروتين للمربّين ومصنّعي الأعلاف. تشمل قائمتنا كُسب الصويا، وكُسب بذور القطن (سائب أو حُبيبات)، وUd-Cake. تضمن هذه المنتجات الصناعية الثانوية تغذية حيوانية مثلى.",
    },
  },
  {
    slug: "ressources-minieres",
    category: "export",
    name: { fr: "Ressources Minières (Or)", en: "Mining Resources (Gold)", zh: "矿产资源（黄金）", ar: "الموارد المعدنية (الذهب)" },
    short: {
      fr: "Négoce international d'or de fonderie et pierres précieuses, dans le respect strict des normes de conformité et de traçabilité.",
      en: "International trading of foundry gold and precious stones, in strict compliance with conformity and traceability standards.",
      zh: "国际铸造黄金和宝石贸易，严格遵守合规和可追溯标准。",
      ar: "تجارة دولية لذهب السبائك والأحجار الكريمة، مع الامتثال الصارم لمعايير المطابقة والتتبّع.",
    },
    long: {
      fr: "BADSAL & FILS OKIKIOLA opère dans le négoce international de ressources minières de la sous-région. Nous facilitons l'exportation d'or de fonderie et de pierres précieuses brutes, en stricte conformité avec les réglementations internationales, les processus de traçabilité et les normes de sécurité les plus rigoureuses.",
      en: "BADSAL & FILS OKIKIOLA operates in the international trading of mining resources from the sub-region. We facilitate the export of foundry gold and rough precious stones, in strict compliance with international regulations, traceability processes and the most rigorous safety standards.",
      zh: "BADSAL & FILS OKIKIOLA 从事本区域矿产资源的国际贸易。我们协助出口铸造黄金和未加工宝石，严格遵守国际法规、可追溯流程和最严格的安全标准。",
      ar: "تعمل BADSAL & FILS OKIKIOLA في التجارة الدولية للموارد المعدنية في المنطقة دون الإقليمية. نسهّل تصدير ذهب السبائك والأحجار الكريمة الخام، بالامتثال الصارم للوائح الدولية وعمليات التتبّع وأصرم معايير السلامة.",
    },
  },

  // ---------- IMPORTATION ----------
  {
    slug: "fer-beton", category: "import",
    name: { fr: "Fer à béton", en: "Reinforcing Steel", zh: "钢筋", ar: "حديد التسليح" },
    short: { fr: "Fer à béton sélectionné pour les chantiers et la distribution professionnelle.", en: "Selected reinforcing steel for construction projects and professional distribution.", zh: "为工程项目和专业经销精选的钢筋。", ar: "حديد تسليح مختار للمشاريع والتوزيع المهني." },
    long: { fr: "Nous proposons du fer à béton destiné aux chantiers et aux circuits de distribution, avec une approche commerciale claire sur les volumes et la disponibilité.", en: "We supply reinforcing steel for construction sites and distribution channels, with clear commercial guidance on volumes and availability.", zh: "我们为工地和经销渠道提供钢筋，并就数量和供货情况提供清晰的商务信息。", ar: "نوفّر حديد التسليح لورش البناء وقنوات التوزيع، مع معلومات تجارية واضحة حول الكميات والتوافر." },
  },
  {
    slug: "cuivre", category: "import",
    name: { fr: "Cuivre", en: "Copper", zh: "铜", ar: "النحاس" },
    short: { fr: "Cuivre destiné aux besoins professionnels en installation et approvisionnement.", en: "Copper for professional installation and supply requirements.", zh: "适用于专业安装和采购需求的铜材。", ar: "نحاس مخصص لاحتياجات التركيب والتوريد المهني." },
    long: { fr: "Notre offre cuivre s’adresse aux professionnels recherchant un approvisionnement fiable pour leurs projets d’équipement et d’installation.", en: "Our copper offer serves professionals seeking reliable supply for equipment and installation projects.", zh: "我们的铜材供应面向需要可靠设备和安装项目供货的专业客户。", ar: "عرضنا للنحاس موجه للمهنيين الباحثين عن توريد موثوق لمشاريع التجهيز والتركيب." },
  },
  {
    slug: "fils-electriques", category: "import",
    name: { fr: "Fils électriques", en: "Electrical Wires", zh: "电线", ar: "الأسلاك الكهربائية" },
    short: { fr: "Fils électriques pour les installations et la distribution professionnelle.", en: "Electrical wires for installations and professional distribution.", zh: "用于安装和专业经销的电线。", ar: "أسلاك كهربائية للتركيبات والتوزيع المهني." },
    long: { fr: "Nous accompagnons les besoins d’approvisionnement en fils électriques pour les projets professionnels, avec des échanges adaptés aux quantités recherchées.", en: "We support electrical-wire sourcing for professional projects, with discussions tailored to the quantities required.", zh: "我们支持专业项目的电线采购，并根据所需数量进行对接。", ar: "ندعم توريد الأسلاك الكهربائية للمشاريع المهنية مع تنسيق يتناسب مع الكميات المطلوبة." },
  },
  {
    slug: "platres", category: "import",
    name: { fr: "Plâtres", en: "Plaster", zh: "石膏", ar: "الجبس" },
    short: { fr: "Plâtres de finition pour les travaux de second œuvre et les projets professionnels.", en: "Finishing plaster for second-fix work and professional projects.", zh: "用于辅助工程和专业项目的饰面石膏。", ar: "جبس تشطيب للأعمال الثانوية والمشاريع المهنية." },
    long: { fr: "Notre offre de plâtres répond aux besoins de finition et d’approvisionnement des chantiers et distributeurs professionnels.", en: "Our plaster offer serves finishing and supply needs for construction sites and professional distributors.", zh: "我们的石膏产品满足工地和专业经销商的饰面与采购需求。", ar: "يلبي عرضنا من الجبس احتياجات التشطيب والتوريد لورش البناء والموزعين المهنيين." },
  },
  {
    slug: "tuyaux", category: "import",
    name: { fr: "Tuyaux", en: "Pipes", zh: "管材", ar: "الأنابيب" },
    short: { fr: "Tuyaux pour les besoins d’installation et de distribution des professionnels.", en: "Pipes for professional installation and distribution requirements.", zh: "满足专业安装和经销需求的管材。", ar: "أنابيب لاحتياجات التركيب والتوزيع المهني." },
    long: { fr: "Nous proposons des tuyaux pour accompagner les projets d’installation, les chantiers et les réseaux de distribution.", en: "We supply pipes to support installation projects, construction sites and distribution networks.", zh: "我们提供管材以支持安装项目、工地和经销网络。", ar: "نوفر الأنابيب لدعم مشاريع التركيب وورش البناء وشبكات التوزيع." },
  },
  {
    slug: "riz",
    category: "import",
    name: { fr: "Riz", en: "Rice", zh: "大米", ar: "الأرز" },
    short: { fr: "Riz importé pour l'approvisionnement des distributeurs et du marché béninois.", en: "Imported rice for distributors and the Beninese market.", zh: "进口大米，用于保障贝宁经销商和当地市场的供应。", ar: "أرز مستورد لتزويد الموزعين والسوق البنينية." },
    long: { fr: "Nous importons du riz selon les volumes, le conditionnement et les besoins exprimés par nos partenaires afin d'approvisionner le marché béninois.", en: "We import rice according to our partners' volume, packaging and supply requirements to serve the Beninese market.", zh: "我们根据合作伙伴提出的数量、包装和供应需求进口大米，以服务贝宁市场。", ar: "نستورد الأرز وفق الكميات والتعبئة واحتياجات التوريد التي يحددها شركاؤنا لخدمة السوق البنينية." },
  },
  {
    slug: "sucre",
    category: "import",
    name: { fr: "Sucre", en: "Sugar", zh: "食糖", ar: "السكر" },
    short: { fr: "Sucre importé pour répondre aux besoins de distribution et d'approvisionnement local.", en: "Imported sugar for distribution and local supply requirements.", zh: "进口食糖，用于满足当地经销和供应需求。", ar: "سكر مستورد لتلبية احتياجات التوزيع والإمداد المحلي." },
    long: { fr: "Nous importons du sucre selon les spécifications, les volumes et le calendrier d'approvisionnement souhaités par nos partenaires.", en: "We import sugar according to the specifications, volumes and supply schedule required for the Beninese market.", zh: "我们根据合作伙伴所需的规格、数量和供应计划进口食糖。", ar: "نستورد السكر وفق المواصفات والكميات وجدول التوريد المطلوب من شركائنا." },
  },
  {
    slug: "huiles-alimentaires",
    category: "import",
    name: { fr: "Huiles alimentaires", en: "Cooking oils", zh: "食用油", ar: "الزيوت الغذائية" },
    short: { fr: "Huiles alimentaires importées pour l'approvisionnement des distributeurs et du marché béninois.", en: "Imported cooking oils for distributors and the Beninese market.", zh: "进口食用油，用于保障贝宁经销商和当地市场的供应。", ar: "زيوت غذائية مستوردة لتزويد الموزعين والسوق البنينية." },
    long: { fr: "Nous importons des huiles alimentaires selon les volumes, les formats et la fréquence d'approvisionnement adaptés aux besoins de chaque partenaire.", en: "We import cooking oils in the volumes, formats and supply frequencies required for the Beninese market.", zh: "我们根据每位合作伙伴的需求进口不同数量、规格和供货频率的食用油。", ar: "نستورد الزيوت الغذائية بالكميات والأحجام ووتيرة التوريد المناسبة لاحتياجات كل شريك." },
  },
  {
    slug: "spaghetti",
    category: "import",
    name: { fr: "Spaghetti", en: "Spaghetti", zh: "意大利面", ar: "السباغيتي" },
    short: { fr: "Spaghetti importés pour répondre aux besoins de distribution du marché béninois.", en: "Imported spaghetti for distribution across the Beninese market.", zh: "进口意大利面，用于满足贝宁市场的经销需求。", ar: "سباغيتي مستوردة لتلبية احتياجات التوزيع في السوق البنينية." },
    long: { fr: "Nous importons des spaghetti selon les conditionnements, les volumes et le rythme d'approvisionnement recherchés pour le marché béninois.", en: "We import spaghetti according to the packaging, volumes and supply rhythm required for the Beninese market.", zh: "我们根据贝宁市场所需的包装、数量和供货节奏进口意大利面。", ar: "نستورد السباغيتي بحسب التعبئة والكميات ووتيرة التوريد المطلوبة للسوق البنينية." },
  },];

export const flagshipProducts = products.filter((p) => p.flagship);
export const exportProducts = products.filter((p) => p.category === "export");
const importOrder = ["riz", "sucre", "huiles-alimentaires", "spaghetti", "fer-beton", "cuivre", "fils-electriques", "platres", "tuyaux"];
export const importProducts = products
  .filter((p) => p.category === "import")
  .sort((a, b) => importOrder.indexOf(a.slug) - importOrder.indexOf(b.slug));

// Photos produits fournies (dans public/images/). Nom de base sans extension —
// le composant charge le .webp avec repli .jpg. Les produits absents d'ici gardent
// le visuel provisoire (dégradé). Ajouter une ligne quand une nouvelle photo arrive.
const imageBySlug: Record<string, string> = {
  "fer-beton": "import-rebar-v1",
  cuivre: "import-copper-v1",
  "fils-electriques": "import-electrical-wire-v1",
  platres: "import-plaster-v1",
  tuyaux: "import-pipes-v1",
  riz: "import-rice-v1.png",
  sucre: "import-sugar-v1.png",
  "huiles-alimentaires": "import-cooking-oils-v1.png",
  spaghetti: "import-spaghetti-v2.png",
  ananas: "export-ananas-v2",
  karite: "export-karite-v2",
  manioc: "export-manioc-v2",
  "noix-palme": "export-noix-palme-v2",
  anacarde: "export-anacarde-v2",
  soja: "export-soja-v2",
  "mangue-avocat": "export-mangue-avocat-v2",
  sesame: "export-sesame-v2",
  miel: "export-miel-v2",
  "aliments-betail": "export-aliments-betail-v2",
  arachide: "export-arachide-v2",
  "fruits-seches": "export-fruits-seches-v2",
  "ressources-minieres": "export-ressources-minieres-v2",
  // manquantes : hero3 (accueil) + photo institutionnelle (Qui sommes-nous)
};

/** Nom de base de la photo d'un produit (sans extension), ou undefined si non fournie. */
export function productImage(slug: string): string | undefined {
  return imageBySlug[slug];
}

// ---------- « AUTRES PRODUITS DÉRIVÉS » (sous-menu Export « Autres ») ----------
// Simple galerie image + nom (pas de description), affichée en bas de la page Exportation.
export interface AutreProduit {
  slug: string;
  name: Record<Locale, string>;
  /** nom de base de l'image dans public/images (sans extension) */
  image: string;
}

export const autresProducts: AutreProduit[] = [
  { slug: "poudre-henne", image: "export-poudre-henne-v2",
    name: { fr: "Poudre de henné", en: "Henna powder", zh: "指甲花粉（散沫花粉）", ar: "مسحوق الحناء" } },
  { slug: "poudre-moringa", image: "export-poudre-moringa-v2",
    name: { fr: "Poudre de moringa", en: "Moringa powder", zh: "辣木粉", ar: "مسحوق المورينغا" } },
  { slug: "poudre-cacao", image: "export-poudre-cacao-v2",
    name: { fr: "Poudre de cacao alcalinisée", en: "Alkalized cocoa powder", zh: "碱化可可粉", ar: "مسحوق الكاكاو المُقلوَن" } },
  { slug: "huile-moringa", image: "export-huile-moringa-v2",
    name: { fr: "Huile de moringa", en: "Moringa oil", zh: "辣木油", ar: "زيت المورينغا" } },
  { slug: "huile-avocat", image: "export-huile-avocat-v2",
    name: { fr: "Huile d'avocat", en: "Avocado oil", zh: "牛油果油", ar: "زيت الأفوكادو" } },
  { slug: "huile-soja", image: "export-huile-soja-v2",
    name: { fr: "Huile de soja", en: "Soybean oil", zh: "大豆油", ar: "زيت الصويا" } },
  { slug: "beurre-cacao", image: "export-beurre-cacao-v2",
    name: { fr: "Beurre de cacao alimentaire", en: "Food-grade cocoa butter", zh: "食品级可可脂", ar: "زبدة الكاكاو الغذائية" } },
];

/** Options du menu déroulant « Produit » du formulaire de devis (tous produits + autres). */
export function productOptions(locale: Locale): string[] {
  return [...products.map((p) => p.name[locale]), ...autresProducts.map((p) => p.name[locale])];
}
