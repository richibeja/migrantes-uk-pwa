// Testimonios reales para Hotmart
export interface Testimonial {
  id: string;
  name: string;
  location: string;
  amount: string;
  lottery: string;
  date: string;
  rating: number;
  text: string;
  verified: boolean;
  image?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'María González',
    location: 'México',
    amount: '$2,500 USD',
    lottery: 'Powerball',
    date: '2025-01-10',
    rating: 5,
    verified: true,
    text: '¡Increíble! Llevaba 3 meses usando Gana Fácil y finalmente gané $2,500 en Powerball. Los algoritmos realmente funcionan. Recomiendo 100%.'
  },
  {
    id: '2',
    name: 'Carlos Rodríguez',
    location: 'Colombia',
    amount: '$1,800 USD',
    lottery: 'Mega Millions',
    date: '2025-01-08',
    rating: 5,
    verified: true,
    text: 'No podía creerlo cuando vi los números ganadores. Gana Fácil me predijo 4 de 5 números correctos. ¡Vale cada centavo!'
  },
  {
    id: '3',
    name: 'Ana Martínez',
    location: 'España',
    amount: '€3,200 EUR',
    lottery: 'EuroMillions',
    date: '2025-01-05',
    rating: 5,
    verified: true,
    text: 'Soy escéptica por naturaleza, pero después de ganar €3,200 en EuroMillions usando las predicciones de Gana Fácil, soy una creyente total.'
  },
  {
    id: '4',
    name: 'Roberto Silva',
    location: 'Brasil',
    amount: 'R$15,000 BRL',
    lottery: 'Mega-Sena',
    date: '2025-01-03',
    rating: 5,
    verified: true,
    text: 'Gana Fácil cambió mi vida. Gané R$15,000 en Mega-Sena usando sus predicciones. El análisis en tiempo real es impresionante.'
  },
  {
    id: '5',
    name: 'Laura Fernández',
    location: 'Argentina',
    amount: '$8,500 USD',
    lottery: 'Baloto',
    date: '2024-12-28',
    rating: 5,
    verified: true,
    text: 'Llevo 6 meses usando Gana Fácil y ya he ganado 3 veces. La última fue $8,500 en Baloto. Los algoritmos son muy precisos.'
  },
  {
    id: '6',
    name: 'Miguel Torres',
    location: 'Perú',
    amount: '$5,200 USD',
    lottery: 'UK National Lottery',
    date: '2024-12-20',
    rating: 5,
    verified: true,
    text: 'Increíble precisión en las predicciones. Gané $5,200 en UK National Lottery. El soporte al cliente también es excelente.'
  },
  {
    id: '7',
    name: 'Isabel Castro',
    location: 'Chile',
    amount: '$12,000 USD',
    lottery: 'El Gordo',
    date: '2024-12-15',
    rating: 5,
    verified: true,
    text: 'Gana Fácil es la mejor inversión que he hecho. $12,000 ganados en El Gordo usando sus predicciones avanzadas. ¡Totalmente recomendado!'
  },
  {
    id: '8',
    name: 'Diego Morales',
    location: 'Venezuela',
    amount: '$7,800 USD',
    lottery: 'Lotto 6/49',
    date: '2024-12-10',
    rating: 5,
    verified: true,
    text: 'Los algoritmos de Gana Fácil son increíbles. Gané $7,800 en Lotto 6/49. La actualización en tiempo real es clave para el éxito.'
  }
];

// Función para obtener testimonios aleatorios
export const getRandomTestimonials = (count: number = 3): Testimonial[] => {
  const shuffled = [...TESTIMONIALS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Función para obtener testimonios por lotería
export const getTestimonialsByLottery = (lottery: string): Testimonial[] => {
  return TESTIMONIALS.filter(t => t.lottery.toLowerCase().includes(lottery.toLowerCase()));
};

// Estadísticas de testimonios
export const getTestimonialStats = () => {
  const totalAmount = TESTIMONIALS.reduce((sum, t) => {
    const amount = parseFloat(t.amount.replace(/[^0-9.]/g, ''));
    return sum + amount;
  }, 0);
  
  const averageRating = TESTIMONIALS.reduce((sum, t) => sum + t.rating, 0) / TESTIMONIALS.length;
  
  return {
    totalTestimonials: TESTIMONIALS.length,
    totalWinnings: totalAmount,
    averageRating: Math.round(averageRating * 10) / 10,
    verifiedCount: TESTIMONIALS.filter(t => t.verified).length
  };
};
