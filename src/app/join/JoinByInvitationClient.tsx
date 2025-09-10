'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Users, Star, Check, AlertCircle, ArrowRight, Gift } from 'lucide-react';
import { parseInvitationUrl, validateInvitationToken } from '@/utils/invitations';

interface ClubInfo {
  id: string;
  nombre: string;
  descripcion: string;
  miembros: number;
  administrador: string;
  fechaCreacion: string;
  estado: 'activo' | 'inactivo';
}

export default function JoinByInvitationClient() {
  const router = useRouter();
  const [invitationData, setInvitationData] = useState<{ clubId: string; referrerId: string; token: string } | null>(null);
  const [clubInfo, setClubInfo] = useState<ClubInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isJoining, setIsJoining] = useState(false);
  const [joinSuccess, setJoinSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Parse invitation URL parameters
    const data = parseInvitationUrl();
    if (!data) {
      setError('Invalid invitation link');
      setIsLoading(false);
      return;
    }

    if (!validateInvitationToken(data.token)) {
      setError('Invalid invitation token');
      setIsLoading(false);
      return;
    }

    setInvitationData(data);
    loadClubInfo(data.clubId);
  }, []);

  const loadClubInfo = async (clubId: string) => {
    try {
      // Simulate loading club info
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock club data based on clubId
      const clubData = {
        '1': {
          id: '1',
          nombre: 'Club Ganadores VIP',
          descripcion: 'Club exclusivo para jugadores experimentados con estrategias avanzadas',
          miembros: 12,
          administrador: 'María González',
          fechaCreacion: '2025-01-10',
          estado: 'activo' as const
        },
        '2': {
          id: '2',
          nombre: 'Lucky Numbers Team',
          descripcion: 'Equipo enfocado en análisis estadístico y patrones numéricos',
          miembros: 8,
          administrador: 'Carlos Rodríguez',
          fechaCreacion: '2025-01-15',
          estado: 'activo' as const
        },
        '3': {
          id: '3',
          nombre: 'Golden Tickets',
          descripcion: 'Club premium con estrategias avanzadas y seguimiento profesional',
          miembros: 15,
          administrador: 'Ana Martínez',
          fechaCreacion: '2025-01-20',
          estado: 'activo' as const
        }
      };
      
      const mockClub: ClubInfo = clubData[clubId as keyof typeof clubData] || {
        id: clubId,
        nombre: `Club ${clubId}`,
        descripcion: 'Club de jugadores expertos con estrategias avanzadas',
        miembros: Math.floor(Math.random() * 20) + 5,
        administrador: 'Admin User',
        fechaCreacion: '2025-01-01',
        estado: 'activo' as const
      };
      
      setClubInfo(mockClub);
    } catch (err) {
      setError('Error al cargar información del club');
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinClub = async () => {
    if (!invitationData || !clubInfo) return;

    setIsJoining(true);
    try {
      // Simulate joining process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In production: call API to join club
      setJoinSuccess(true);
      
      // Redirect to club after 3 seconds
      setTimeout(() => {
        router.push(`/clubs/${clubInfo.id}`);
      }, 3000);
    } catch (err) {
      setError('Failed to join club. Please try again.');
    } finally {
      setIsJoining(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-gold text-xl">Loading invitation...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-24 h-24 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-12 h-12 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">Invalid Invitation</h1>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => router.push('/clubs')}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
          >
            Browse Available Clubs
          </button>
        </div>
      </div>
    );
  }

  if (joinSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-24 h-24 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-12 h-12 text-green-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">Welcome to the Club!</h1>
          <p className="text-gray-400 mb-6">
            You've successfully joined <strong>{clubInfo?.nombre}</strong>. 
            Redirecting you to the club dashboard...
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <div className="bg-gray-800/90 backdrop-blur-md border-b border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-gold">🎯 Club Invitation</h1>
              <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">INVITATION</span>
            </div>
            <button
              onClick={() => router.push('/clubs')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Browse Clubs
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Club Information Card */}
          <div className="bg-gray-800/90 rounded-2xl p-8 border border-gray-700 mb-8">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">{clubInfo?.nombre}</h2>
              <p className="text-gray-400 text-lg">{clubInfo?.descripcion}</p>
            </div>

            {/* Club Stats */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{clubInfo?.miembros}</div>
                <div className="text-gray-400 text-sm">Current Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{clubInfo?.administrador}</div>
                <div className="text-gray-400 text-sm">Club Administrator</div>
              </div>
            </div>

            {/* Club Benefits */}
            <div className="bg-gray-700/50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span>What you'll get:</span>
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>Access to exclusive predictions and analysis</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>Collaborate with experienced players</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>Share tickets and verify purchases together</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>Increase your winning chances as a team</span>
                </li>
              </ul>
            </div>

            {/* Referral Bonus */}
            <div className="bg-gradient-to-r from-gold/20 to-yellow-400/20 rounded-lg p-4 border border-gold/30 mb-8">
              <div className="flex items-center space-x-3">
                <Gift className="w-6 h-6 text-gold" />
                <div>
                  <h4 className="text-gold font-semibold">Referral Bonus</h4>
                  <p className="text-gray-300 text-sm">
                    You were invited by a friend! Both of you will receive special benefits.
                  </p>
                </div>
              </div>
            </div>

            {/* Join Button */}
            <button
              onClick={handleJoinClub}
              disabled={isJoining || clubInfo?.estado !== 'activo'}
              className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-3 ${
                clubInfo?.estado !== 'activo'
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : isJoining
                  ? 'bg-gray-600 text-white cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 hover:scale-105'
              }`}
            >
              {isJoining ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Joining Club...</span>
                </>
              ) : clubInfo?.estado !== 'activo' ? (
                <>
                  <AlertCircle className="w-5 h-5" />
                  <span>Club Not Available</span>
                </>
              ) : (
                <>
                  <span>Join Club Now</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            {clubInfo?.estado !== 'activo' && (
              <p className="text-red-400 text-sm text-center mt-3">
                This club is currently inactive and not accepting new members.
              </p>
            )}
          </div>

          {/* Terms and Conditions */}
          <div className="text-center text-gray-400 text-sm">
            <p>
              By joining this club, you agree to follow the club rules and respect other members. 
              You can leave the club at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
