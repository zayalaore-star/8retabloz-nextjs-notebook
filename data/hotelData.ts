import { GalleryPhoto, HotelSuite, HotelExperience, GuestReview } from '@/types';

export const getWhatsAppUrl = (customMessage?: string) => {
  const message =
    customMessage ||
    'Hola Hostal Boutique 8Retabloz, me gustaría solicitar información sobre disponibilidad y reservas.';
  return `https://wa.me/51982584337?text=${encodeURIComponent(message)}`;
};

export const HOTEL_INFO = {
  name: '8RETABLOZ',
  subtitle: 'HOSTAL BOUTIQUE & GALERÍA VIVA',
  tagline: 'Ocho estancias artesanales inspiradas en la magia de los retablos ayacuchanos',
  location: 'Ayacucho, Perú',
  address: 'Avenida Las Retamas 19, Ayacucho 05001',
  phone: '+51 982 584 337',
  phoneDisplay: 'Telf.: +51 982 584 337',
  checkInCheckOut: 'Check - In 12:00 m / Check - Out 10:00 am',
  email: 'reservas@8retabloz.pe',
  instagram: '@8retablozayacucho',
  instagramUrl: 'https://www.instagram.com/8retablosayacucho',
  facebookUrl: 'https://www.facebook.com/8RetablosAyacucho',
  whatsappUrl: getWhatsAppUrl(
    'Hola Hostal Boutique 8Retabloz, deseo consultar sobre las estancias y disponibilidad.'
  ),
  tiktokUrl: 'https://www.tiktok.com/@8retablosayacucho?_r=1&_t=ZS-92mA3JQSvw5',
  googleMapsUrl:
    'https://www.google.com/maps/dir/-13.167541,-74.2217362/Hostal+Boutique+8Retablos,+Avenida+Las+Retamas+19,+Ayacucho+05001/@-13.1420855,-74.2312741,20z/data=!4m9!4m8!1m1!4e1!1m5!1m1!1s0x91127d00789f31ad:0x49b70819f13affa!2m2!1d-74.2307654!2d-13.1420856?hl=es-419&entry=ttu&g_ep=EgoyMDI2MDgwNS4xIKXMDSoASAFQAw%3D%3D',
  googleMapsEmbed:
    'https://maps.google.com/maps?q=-13.1420856,-74.2307654&hl=es&z=17&output=embed',
};

export const HOTEL_SUITES: HotelSuite[] = [
  {
    id: 'senorial-matrimonial',
    number: '01',
    name: 'Habitación Señorial Matrimonial',
    subtitle: 'Confortable & Acogedora para 2 Personas',
    shortDescription:
      'Un espacio ideal para relajarse después de recorrer la ciudad y disfrutar de una estadía cálida y armoniosa en Ayacucho.',
    description:
      'Nuestra Habitación Señorial Matrimonial, ha sido cuidadosamente diseñada para ofrecer un descanso placentero y una experiencia confortable en un ambiente acogedor, tranquilo y funcional. Es el espacio ideal para relajarse después de recorrer la ciudad y disfrutar de una estadía cálida y armoniosa en Ayacucho.',
    pricePerNight: 160,
    sizeSqM: 28,
    capacity: 'Máx. 2 personas',
    bedType: 'Cama matrimonial (2 plazas)',
    view: 'Vista Galería Viva & Arte Ayacuchano',
    mainImage:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=85',
    ],
    features: [
      '🛌 Cama matrimonial (2 plazas)',
      '📺 Smart TV con servicio de cable',
      '📶 WiFi inalámbrico de alta velocidad',
      '🧥 Clóset amplio y veladores funcionales',
      '🪑 Mesa y silla de escritorio',
      '💡 Lámparas colgantes para descanso',
      '🚿 Baño privado con ducha tipo española',
      '🔥 Agua caliente en ducha y lavamanos',
      '🧴 Amenities de baño y toallas incluidas',
    ],
    artWork: 'Retablo Ayacuchano tradicional "Festividad Colonial"',
    artisanNote: 'Inspirada en el arte artesanal de las familias maestras de Ayacucho.',
  },
  {
    id: 'senorial-superior',
    number: '02',
    name: 'Habitación Señorial Superior',
    subtitle: 'Espacio Amplio con Cama Queen & Atmósfera Elegante',
    shortDescription:
      'Ofrece un espacio más amplio y una atmósfera elegante con Cama Queen, pensada para quienes buscan mayor comodidad.',
    description:
      'Nuestra Habitación Señorial Superior, ofrece un espacio más amplio y una atmósfera elegante, pensada para quienes buscan mayor comodidad durante su estadía. Su diseño armonioso y su cama Queen brindan un descanso superior, ideal para relajarse con tranquilidad y disfrutar de una experiencia confortable en Ayacucho.',
    pricePerNight: 220,
    sizeSqM: 35,
    capacity: 'Máx. 4 personas',
    bedType: 'Cama matrimonial (Queen)',
    view: 'Vista Patio Central & Balcón Colonial',
    mainImage:
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1600&q=85',
    ],
    features: [
      '🛌 Cama matrimonial (Queen)',
      '📺 Smart TV con servicio de cable',
      '📶 WiFi inalámbrico de alta velocidad',
      '🧥 Clóset amplio y veladores funcionales',
      '🪑 Mesa y silla de escritorio',
      '💡 Lámparas colgantes para descanso',
      '🚿 Baño privado con ducha tipo española',
      '🔥 Agua caliente en ducha y lavamanos',
      '🧴 Amenities de baño y toallas incluidas',
    ],
    artWork: 'Mural tallado en madera noble y detalles dorados',
    artisanNote: 'Diseño arquitectónico armonioso con luminarias colgantes de autor.',
  },
  {
    id: 'senorial-doble',
    number: '03',
    name: 'Habitación Señorial Doble',
    subtitle: '2 Camas Matrimoniales para Grupos y Familias',
    shortDescription:
      'Amplitud, comodidad y funcionalidad con 2 camas de 2 plazas, ideal para familias o grupos de viajeros.',
    description:
      'Nuestra Habitación Señorial Doble ha sido diseñada para ofrecer amplitud, comodidad y funcionalidad, siendo ideal para familias, grupos o viajeros que desean compartir el espacio sin renunciar al confort. Sus dos camas de 2 plazas y baño privado brindan una estadía práctica, tranquila y agradable en un ambiente acogedor y bien distribuido.',
    pricePerNight: 260,
    sizeSqM: 42,
    capacity: 'Máx. 4 personas',
    bedType: '2 Camas matrimoniales (2 plazas)',
    view: 'Vista Jardín de las Retamas',
    mainImage:
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1600&q=85',
    ],
    features: [
      '🛌 2 Camas matrimoniales (2 plazas)',
      '📺 Smart TV con servicio de cable',
      '📶 WiFi inalámbrico de alta velocidad',
      '🧥 Clóset amplio y veladores funcionales',
      '🪑 Mesa y silla de escritorio',
      '💡 Lámparas colgantes para descanso',
      '🚿 Baño privado con ducha tipo española',
      '🔥 Agua caliente en ducha y lavamanos',
      '🧴 Amenities de baño y toallas incluidas',
    ],
    artWork: 'Colección de tapices textiles artesanales',
    artisanNote: 'Distribución equilibrada pensada para el bienestar compartido.',
  },
  {
    id: 'senorial-familiar',
    number: '04',
    name: 'Habitación Señorial Familiar',
    subtitle: 'Distribución Funcional: 1 Cama Matrimonial + 1 Cama Individual',
    shortDescription:
      'Pensada para familias o grupos pequeños con 1 cama de 2 plazas y 1 cama de 1 plaza.',
    description:
      'Nuestra Habitación Señorial Familiar ha sido diseñada para brindar comodidad y amplitud a quienes viajan en familia o en grupo. Su distribución funcional, con una cama de 2 plazas y una cama de 1 plaza, junto a su baño privado, permite disfrutar de una estadía práctica, acogedora y tranquila, ideal para compartir momentos y descansar plenamente en Ayacucho.',
    pricePerNight: 240,
    sizeSqM: 38,
    capacity: 'Máx. 3 personas',
    bedType: '1 Cama matrimonial (2 plazas) + 1 Cama de 1 plaza',
    view: 'Vista Interior de la Casona Boutique',
    mainImage:
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85',
    ],
    features: [
      '🛌 1 Cama matrimonial (2 plazas) + 1 Cama (1 plaza)',
      '📺 Smart TV con servicio de cable',
      '📶 WiFi inalámbrico de alta velocidad',
      '🧥 Clóset amplio y veladores funcionales',
      '🪑 Mesa y silla de escritorio',
      '💡 Lámparas colgantes para descanso',
      '🚿 Baño privado con ducha tipo española',
      '🔥 Agua caliente en ducha y lavamanos',
      '🧴 Amenities de baño y toallas incluidas',
    ],
    artWork: 'Escultura artesanal en piedra de Huamanga',
    artisanNote: 'Ambiente familiar cálido preparado con la más fina lencería de cama.',
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'photo-1',
    title: 'Fachada Barroca de Cantera',
    subtitle: 'Entrada Principal',
    category: 'architecture',
    categoryLabel: 'Arquitectura & Luz',
    url: 'https://asset.cloudinary.com/dqdzahaup/75ac67d67bde2c211183c06c269de7ab',
    alt: 'Fachada colonial barroca iluminada con cálidos faroles',
    location: 'Patio Principal',
    architecturalNote:
      'Arcos de mampostería del siglo XVII esculpidos en cantera rosa con iluminación indirecta.',
    aspectRatio: 'landscape',
  },
  {
    id: 'photo-2',
    title: 'Retablo del Sol - Alberca',
    subtitle: 'Suite 01 Presidencial',
    category: 'suite',
    categoryLabel: '8 Estancias',
    suiteId: 'retablo-sol',
    url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85',
    alt: 'Alberca privada en la suite con vistas panorámicas',
    location: 'Nivel Superior',
    architecturalNote: 'Cantera pulida a mano con acabado antideslizante y sistema de climatización solar.',
    aspectRatio: 'wide',
  },
  {
    id: 'photo-3',
    title: 'Cava de Vinos Subterránea',
    subtitle: 'Reserva Histórica',
    category: 'gastronomy',
    categoryLabel: 'Gastronomía & Cava',
    url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1600&q=85',
    alt: 'Cava subterránea con botellas añejas bajo arcos de piedra',
    location: 'Cimientos del Hotel',
    architecturalNote:
      'Microclima natural a 16°C constantes ideales para conservar cosechas raras de Guanajuato y Europa.',
    aspectRatio: 'portrait',
  },
  {
    id: 'photo-4',
    title: 'Patio de los Naranjos al Atardecer',
    subtitle: 'Corazón del Hotel',
    category: 'architecture',
    categoryLabel: 'Arquitectura & Luz',
    url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85',
    alt: 'Patio colonial interior con naranjos y fuente de cantera',
    location: 'Patio Central',
    architecturalNote:
      'Geometría simétrica hispano-árabe con fuente central que canaliza el viento de la montaña.',
    aspectRatio: 'landscape',
  },
  {
    id: 'photo-5',
    title: 'Suite El Jardín Secreto',
    subtitle: 'Suite 02',
    category: 'suite',
    categoryLabel: '8 Estancias',
    suiteId: 'jardin-secreto',
    url: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1600&q=85',
    alt: 'Interior de suite luminosa con patio botánico privado',
    location: 'Planta Baja',
    architecturalNote: 'Lino orgánico, madera de mezquite y muros a la cal natural transpirable.',
    aspectRatio: 'square',
  },
  {
    id: 'photo-6',
    title: 'Desayuno Gastronómico en Terraza',
    subtitle: 'Cocina de Origen',
    category: 'gastronomy',
    categoryLabel: 'Gastronomía & Cava',
    url: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1600&q=85',
    alt: 'Mesa servida con pan recién horneado, frutas exóticas y café de especialidad',
    location: 'Restaurante El Retablo',
    architecturalNote:
      'Vajilla de barro negro elaborada exclusivamente para el hotel por el chef residente.',
    aspectRatio: 'landscape',
  },
  {
    id: 'photo-7',
    title: 'Ritual de Cacao & Copal',
    subtitle: 'Spa de Sanación Ancestral',
    category: 'experience',
    categoryLabel: 'Experiencias',
    url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1600&q=85',
    alt: 'Cabina de spa en la piedra con velas y aceites esenciales',
    location: 'Spa 8Retabloz',
    architecturalNote:
      'Cabina excavada en la roca con aislamiento acústico completo y aroma a resina de copal.',
    aspectRatio: 'portrait',
  },
  {
    id: 'photo-8',
    title: 'Detalle de Tallado en Madera',
    subtitle: 'Retablo Barroco No. 5',
    category: 'detail',
    categoryLabel: 'Detalles Artesanales',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85',
    alt: 'Detalle de relieve tallado en madera con acentos dorados',
    location: 'Galería de Entrada',
    architecturalNote:
      'Técnica de encolado de pan de oro de 24 quilates aplicada por restauradores del INAH.',
    aspectRatio: 'square',
  },
  {
    id: 'photo-9',
    title: 'Terraza de las Estrellas - Vista Nocturna',
    subtitle: 'Suite 04',
    category: 'suite',
    categoryLabel: '8 Estancias',
    suiteId: 'terraza-estrellas',
    url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=85',
    alt: 'Jacuzzi iluminado en terraza privada con vista nocturna a las iglesias',
    location: 'Rooftop Suite',
    architecturalNote:
      'Cristal térmico fotocromático que ajusta la opacidad según la intensidad solar.',
    aspectRatio: 'wide',
  },
  {
    id: 'photo-10',
    title: 'Galería de Esculturas de Latón',
    subtitle: 'Colección Permanente',
    category: 'detail',
    categoryLabel: 'Detalles Artesanales',
    url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1600&q=85',
    alt: 'Esculturas contemporáneas sobre peanas de cantera gris',
    location: 'Pasillo de los Arcos',
    architecturalNote: 'Iluminación museográfica ERCO de alta fidelidad cromática (CRI > 98).',
    aspectRatio: 'portrait',
  },
  {
    id: 'photo-11',
    title: 'Cata de Mezcales Ancestrales',
    subtitle: 'Cava Privada',
    category: 'experience',
    categoryLabel: 'Experiencias',
    url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1600&q=85',
    alt: 'Copas de degustación y botellas de mezcal artesanal sobre mesa de nogal',
    location: 'Cava de Vinos & Destilados',
    architecturalNote: 'Maridaje artesanal con sales botánicas y chocolates silvestres.',
    aspectRatio: 'landscape',
  },
  {
    id: 'photo-12',
    title: 'Piscina de Inmersión al Alba',
    subtitle: 'Espejo de Agua',
    category: 'architecture',
    categoryLabel: 'Arquitectura & Luz',
    url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1600&q=85',
    alt: 'Agua cristalina en piscina rodeada de muros de cantera y árboles',
    location: 'Patio Sur',
    architecturalNote:
      'Recubrimiento de piedra volcánica volcánica verde que mantiene el calor solar.',
    aspectRatio: 'wide',
  },
];

export const HOTEL_EXPERIENCES: HotelExperience[] = [
  {
    id: 'cata-cava',
    title: 'Cata Privada en la Cava Histórica',
    subtitle: 'Sommelier Privado & Etiquetas de Autor',
    description:
      'Un recorrido sensorial de 5 tiempos maridado con etiquetas exclusivas de bodegas boutique de la región y vinos de guarda europeos en el ambiente subterráneo del siglo XVII.',
    image:
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=85',
    duration: '2.5 Horas',
    tag: 'Gastronomía & Vino',
  },
  {
    id: 'spa-copal',
    title: 'Ritual Ancestral de Copal & Cacao',
    subtitle: 'Spa Holistic Curado',
    description:
      'Inicia con un temazcal herbal suave, exfoliación de cacao silvestre y masaje profundo con piedras volcánicas de basalto tibio e infusiones orgánicas.',
    image:
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=85',
    duration: '2 Horas',
    tag: 'Wellness & Relajación',
  },
  {
    id: 'cena-terraza',
    title: 'Cena Bajo las Estrellas en la Parroquia',
    subtitle: 'Chef de 3 Estrellas Michelin Invitado',
    description:
      'Menú degustación servido en el mirador privado con iluminación de velas, música de arpa en vivo y vista inolvidable a los campanarios iluminados.',
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85',
    duration: '3 Horas',
    tag: 'Romántico & Exclusivo',
  },
  {
    id: 'taller-retablos',
    title: 'Taller de Hoja de Oro & Retablos',
    subtitle: 'Impartido por Maestros Restauradores',
    description:
      'Aprende la ancestral técnica virreinal de doraduría con lámina de oro de 24k sobre madera noble y llévate tu propia pieza artística como recuerdo.',
    image:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85',
    duration: '1.5 Horas',
    tag: 'Arte & Cultura',
  },
];

export const GUEST_REVIEWS: GuestReview[] = [
  {
    id: 'rev-1',
    name: 'Camila Mendoza',
    city: 'Lima, Perú',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    date: 'Julio 2026',
    stayedSuite: 'Estancia El Dorado',
    comment:
      'Una experiencia mágica en Ayacucho. La atención al detalle, la tranquilidad del lugar y los acabados artesanales superaron todas nuestras expectativas.',
  },
  {
    id: 'rev-2',
    name: 'Mateo Rodríguez',
    city: 'Arequipa, Perú',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    date: 'Junio 2026',
    stayedSuite: 'Estancia San Cristóbal',
    comment:
      'Habitaciones amplias, impecables y cargadas de arte ayacuchano. La ubicación sobre Av. Las Retamas es ideal para caminar por el centro histórico.',
  },
  {
    id: 'rev-3',
    name: 'Valeria & Jean',
    city: 'Cusco, Perú',
    avatar:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    date: 'Mayo 2026',
    stayedSuite: 'Estancia La Purísima',
    comment:
      'Un verdadero refugio boutique. El servicio personalizado del equipo y las recomendaciones locales hicieron que nuestras vacaciones fueran inolvidables.',
  },
  {
    id: 'rev-4',
    name: 'Carlos Alarcón',
    city: 'Santiago, Chile',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    date: 'Abril 2026',
    stayedSuite: 'Estancia Los Ángeles',
    comment:
      'El balance perfecto entre la herencia colonial y el confort contemporáneo. Las camas son comodísimas y la calidez del personal es insuperable.',
  },
  {
    id: 'rev-5',
    name: 'Sofía Torrealba',
    city: 'Madrid, España',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    date: 'Marzo 2026',
    stayedSuite: 'Estancia Trinidad',
    comment:
      'Hospedarse aquí es habitar dentro de una galería viva. Felicidades por conservar la elegancia del retablo tradicional con un toque tan refinado.',
  },
];