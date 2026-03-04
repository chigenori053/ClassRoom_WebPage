export const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "KuKKA Programming School",
    "url": "https://kukka.info",
    "potentialAction": {
        "@type": "SearchAction",
        "target": "https://kukka.info/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
    }
};

export const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "KuKKA Programming School",
    "url": "https://kukka.info",
    "logo": "https://kukka.info/logo.png",
    "sameAs": [
        "https://facebook.com/kukka",
        "https://instagram.com/kukka"
    ],
    "address": {
        "@type": "PostalAddress",
        "addressRegion": "Gunma",
        "addressCountry": "JP"
    }
};
