import { ClubInvitation } from '@/types/clubs';

// Generate unique invitation token
export const generateInvitationToken = (): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 15);
  return `${timestamp}_${random}`;
};

// Generate invitation link
export const generateInvitationLink = (clubId: string, userId: string, token: string): string => {
  const baseUrl = typeof window !== 'undefined' 
    ? window.location.origin 
    : 'https://gana-facil-rifa-d5609.web.app';
  
  return `${baseUrl}/join?club=${clubId}&ref=${userId}&token=${token}`;
};

// Create invitation object
export const createInvitation = (
  clubId: string, 
  userId: string, 
  email?: string
): ClubInvitation => {
  const token = generateInvitationToken();
  const now = new Date();
  const expirationDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days

  return {
    id: `inv_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    clubId,
    invitadorId: userId,
    email: email || '',
    token,
    estado: 'pendiente',
    fechaCreacion: now,
    expira: expirationDate,
    usada: false,
    creador: userId
  };
};

// Share methods
export const shareMethods = {
  whatsapp: (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
  },

  email: (subject: string, body: string) => {
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    window.open(`mailto:?subject=${encodedSubject}&body=${encodedBody}`, '_blank');
  },

  facebook: (url: string) => {
    const encodedUrl = encodeURIComponent(url);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank');
  },

  twitter: (text: string, url: string) => {
    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(url);
    window.open(`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`, '_blank');
  },

  copyToClipboard: async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        document.body.removeChild(textArea);
        return true;
      } catch (fallbackErr) {
        document.body.removeChild(textArea);
        return false;
      }
    }
  }
};

// Get share messages
export const getShareMessages = (clubName: string, invitationLink: string) => {
  return {
    whatsapp: `🎯 Join my lottery prediction club "${clubName}"! 

Together we can increase our chances of winning! 

Join here: ${invitationLink}

#Lottery #Predictions #Winning`,
    
    email: {
      subject: `Invitation to join "${clubName}" lottery club`,
      body: `Hello!

I'd like to invite you to join my lottery prediction club "${clubName}".

Together we can:
• Share predictions and analysis
• Increase our winning chances
• Learn from each other's strategies
• Have fun playing together

Join here: ${invitationLink}

Best regards!`
    },
    
    facebook: `🎯 Join my lottery prediction club "${clubName}"! Together we can increase our chances of winning! ${invitationLink}`,
    
    twitter: `🎯 Join my lottery prediction club "${clubName}"! Together we can increase our chances of winning! ${invitationLink} #Lottery #Predictions`
  };
};

// Calculate referral rewards
export const calculateReferralRewards = (invitesCount: number) => {
  if (invitesCount >= 10) {
    return { 
      discount: 20, 
      badge: '🎖️ Ambassador',
      description: 'Club Ambassador - 20% discount on all plans',
      nextMilestone: null
    };
  }
  if (invitesCount >= 5) {
    return { 
      discount: 10, 
      badge: '⭐ Star Inviter',
      description: 'Star Inviter - 10% discount on all plans',
      nextMilestone: { target: 10, reward: '20% discount + Ambassador badge' }
    };
  }
  if (invitesCount >= 3) {
    return { 
      discount: 5, 
      badge: '🔥 Active Inviter',
      description: 'Active Inviter - 5% discount on all plans',
      nextMilestone: { target: 5, reward: '10% discount + Star Inviter badge' }
    };
  }
  return { 
    discount: 0, 
    badge: '',
    description: 'Start inviting friends to earn rewards!',
    nextMilestone: { target: 3, reward: '5% discount + Active Inviter badge' }
  };
};

// Validate invitation token
export const validateInvitationToken = (token: string): boolean => {
  // Basic token validation - in production, check against database
  return token && token.length > 10 && token.includes('_');
};

// Parse invitation URL parameters
export const parseInvitationUrl = (): { clubId: string; referrerId: string; token: string } | null => {
  if (typeof window === 'undefined') return null;
  
  const urlParams = new URLSearchParams(window.location.search);
  const clubId = urlParams.get('club');
  const referrerId = urlParams.get('ref');
  const token = urlParams.get('token');
  
  if (!clubId || !referrerId || !token) return null;
  
  return { clubId, referrerId, token };
};
