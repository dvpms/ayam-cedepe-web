import { FAQ_ITEMS, MENU_ITEMS, OUTLET_CONFIG } from '@/config/site';

function buildMenuSchema() {
  const packages = MENU_ITEMS.filter((item) => item.isPackage);
  const addOns = MENU_ITEMS.filter((item) => !item.isPackage);

  return {
    '@type': 'Menu',
    name: 'Daftar Menu Ayam Cedepe BSD',
    hasMenuSection: [
      {
        '@type': 'MenuSection',
        name: 'Menu Paket Utama',
        hasMenuItem: packages.map((item) => ({
          '@type': 'MenuItem',
          name: item.name,
          description: item.description,
          offers: {
            '@type': 'Offer',
            price: String(item.price),
            priceCurrency: 'IDR',
            availability: 'https://schema.org/InStock',
          },
        })),
      },
      {
        '@type': 'MenuSection',
        name: 'Menu Tambahan & Sambal Bawang',
        hasMenuItem: addOns.map((item) => ({
          '@type': 'MenuItem',
          name: item.name,
          description: item.description,
          offers: {
            '@type': 'Offer',
            price: String(item.price),
            priceCurrency: 'IDR',
            availability: 'https://schema.org/InStock',
          },
        })),
      },
    ],
  };
}

export function JsonLdSchema() {
  const restaurantJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Restaurant',
        '@id': `${OUTLET_CONFIG.siteUrl}/#restaurant`,
        name: OUTLET_CONFIG.branchName,
        alternateName: OUTLET_CONFIG.name,
        description: `${OUTLET_CONFIG.name} (${OUTLET_CONFIG.tagline}) di ${OUTLET_CONFIG.address}. Menyajikan Paket Cedepe 20K, Paket Special 30K, ayam goreng bawang utuh, kremesan gurih, kulit goreng bawang, dan sambal bawang pete.`,
        url: OUTLET_CONFIG.siteUrl,
        telephone: `+${OUTLET_CONFIG.whatsappNumber}`,
        image: [
          `${OUTLET_CONFIG.siteUrl}/images/ayam-goreng-bawang-hero.jpg`,
          `${OUTLET_CONFIG.siteUrl}/images/logo.png`,
          `${OUTLET_CONFIG.siteUrl}/images/poster-grand-opening.jpg`,
        ],
        servesCuisine: ['Indonesian', 'Ayam Goreng Bawang'],
        priceRange: 'Rp 2.000 - Rp 30.000',
        address: {
          '@type': 'PostalAddress',
          streetAddress: OUTLET_CONFIG.address,
          addressLocality: OUTLET_CONFIG.city,
          addressRegion: OUTLET_CONFIG.province,
          postalCode: OUTLET_CONFIG.postalCode,
          addressCountry: 'ID',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: OUTLET_CONFIG.coordinates.lat,
          longitude: OUTLET_CONFIG.coordinates.lng,
        },
        hasMap: OUTLET_CONFIG.googleMapsShortUrl,
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ],
            opens: '10:00',
            closes: '21:00',
          },
        ],
        sameAs: [OUTLET_CONFIG.instagramUrl, OUTLET_CONFIG.googleMapsShortUrl],
        hasMenu: buildMenuSchema(),
      },
      {
        '@type': 'FAQPage',
        '@id': `${OUTLET_CONFIG.siteUrl}/#faq-schema`,
        mainEntity: FAQ_ITEMS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(restaurantJsonLd).replace(/</g, '\\u003c'),
      }}
    />
  );
}
