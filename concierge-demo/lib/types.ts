export interface FAQEntry {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface PropertyKnowledgeBase {
  _meta: {
    propertyId: string;
    templateNote: string;
    placeholderFields: string[];
  };
  property: {
    name: string;
    listingTitle: string;
    city: string;
    state: string;
    neighborhood: string;
    maxGuests: number;
    bedrooms: number;
    beds: number;
    baths: number;
  };
  host: {
    name: string;
    yearsHosting: number;
    rating: number;
    reviewCount: number;
    contactPhone: string;
    contactEmail: string;
    responseNote: string;
  };
  logistics: {
    address: string;
    checkInTime: string;
    checkOutTime: string;
    selfCheckIn: {
      method: string;
      backup: string;
    };
    wifi: {
      networkName: string;
      password: string;
    };
    parking: {
      summary: string;
    };
  };
  policies: {
    pets: string;
    smoking: string;
    noise: string;
    maxOccupancy: string;
    events: string;
  };
  amenities: {
    pool: string;
    spa: string;
    bbq: string;
    kitchen: string;
  };
  localRecommendations: {
    golf: string[];
    festivals: string;
    shoppingDining: string[];
    casinos: string[];
  };
  escalationTopics: string[];
  faqs: FAQEntry[];
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatApiResponse {
  reply: string;
  escalate: boolean;
  error?: boolean;
}
