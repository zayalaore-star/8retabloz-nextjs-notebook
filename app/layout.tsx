import type { Metadata } from 'next';
import { Josefin_Sans, Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const josefin = Josefin_Sans({
  subsets: ['latin'],
  variable: '--font-josefin',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://hotel8retabloz.pe'),
  title: {
    default: 'Hotel Boutique 8Retabloz — Galería Vivo & Estancias Exclusivas en Ayacucho',
    template: '%s | Hotel Boutique 8Retabloz Ayacucho',
  },
  description:
    'Hotel boutique de lujo en el Centro Histórico de Ayacucho. Habitaciones con retablos artesanales, patio colonial, gastronomía local y reservas con el mejor precio garantizado.',
  keywords: [
    'Hotel Ayacucho',
    'Hostal Boutique Ayacucho',
    'Hotel 8Retabloz',
    'Alojamiento centro historico Ayacucho',
    'Hoteles cerca a la Plaza de Armas de Ayacucho',
    'Turismo Ayacucho Semana Santa',
    'Habitaciones exclusivas Ayacucho',
  ],
  authors: [{ name: 'Hotel 8Retabloz' }],
  creator: 'Hotel 8Retabloz Ayacucho',
  openGraph: {
    title: 'Hotel Boutique 8Retabloz Ayacucho',
    description: 'Estancias boutique exclusivas, galería artística colonial e itinerarios turísticos en Ayacucho.',
    url: 'https://hotel8retabloz.pe',
    siteName: 'Hotel Boutique 8Retabloz',
    locale: 'es_PE',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Patio Colonial Hotel 8Retabloz Ayacucho',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hotel Boutique 8Retabloz Ayacucho',
    description: 'Reserva tu estancia boutique en el corazón del centro histórico de Ayacucho.',
    images: ['https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdHotelSchema = {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    name: 'Hotel Boutique 8Retabloz',
    description:
      'Hotel boutique de lujo con galería fotográfica animada, arquería colonial y suites temáticas en Ayacucho.',
    url: 'https://hotel8retabloz.pe',
    telephone: '+51 966 845 321',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Av. Las Retamas 248, Centro Histórico',
      addressLocality: 'Ayacucho',
      addressRegion: 'Ayacucho',
      postalCode: '05001',
      addressCountry: 'PE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -13.1606,
      longitude: -74.2257,
    },
    priceRange: 'S/ 160 - S/ 380',
    starRating: {
      '@type': 'Rating',
      ratingValue: '4.9',
    },
  };

  return (
    <html lang="es" className={`${josefin.variable} ${cormorant.variable} ${jakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdHotelSchema) }}
        />
      </head>
      <body className="bg-[#FAF8F5] text-[#1C1917] antialiased">
        {children}
      </body>
    </html>
  );
}
