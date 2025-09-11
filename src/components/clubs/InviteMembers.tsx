'use client';

import { useState, useEffect } from 'react';
import { Share2, Copy, Mail, MessageCircle, Facebook, Twitter, Users, Gift, Star } from 'lucide-react';
import { generateInvitationLink, shareMethods, getShareMessages, calculateReferralRewards } from '@/utils/invitations';

interface InviteMembersProps {
  clubId: string;
  clubName: string;
  currentUserId: string;
  referralCount?: number;
}

export default function InviteMembers({ 
  clubId, 
  clubName, 
  currentUserId, 
  referralCount = 0 
}: InviteMembersProps) {
  return (
  const [invitationLink, setInvitationLink] = useState('');
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Generate invitation link
    const token = `inv_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const link = generateInvitationLink(clubId, currentUserId, token);
    setInvitationLink(link);
  }, [clubId, currentUserId]);

  const handleCopyLink = async () => {
    const success = await shareMethods.copyToClipboard(invitationLink);
    if (success) {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleShare = (method: string) => {
    const messages = getShareMessages(clubName, invitationLink);
    
    switch (method) {
      case 'whatsapp':
        shareMethods.whatsapp(messages.whatsapp);
        break;
      case 'email':
        shareMethods.email(messages.email.subject, messages.email.body);
        break;
      case 'facebook':
        shareMethods.facebook(invitationLink);
        break;
      case 'twitter':
        shareMethods.twitter(messages.twitter, invitationLink);
        break;
    }
    setShowShareOptions(false);
  };

  const handleEmailInvite = () => {
    if (email.trim()) {
      const messages = getShareMessages(clubName, invitationLink);
      shareMethods.email(messages.email.subject, messages.email.body);
      setEmail('');
    }
  };

  const rewards = calculateReferralRewards(referralCount);

    <div className="bg-gray-800/90 rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Users className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-semibold text-white">Invite More Members</h3>
        </div>
        <button
          onClick={() => setShowShareOptions(!showShareOptions)}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center space-x-2"
        >
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </button>
      </div>

      {/* Invitation Link */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Invitation Link
        </label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={invitationLink}
            readOnly
            className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm"
          />
          <button
            onClick={handleCopyLink}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
              copySuccess
                ? 'bg-green-600 text-white'
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
          >
            <Copy className="w-4 h-4" />
            <span>{copySuccess ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Share Options */}
      {showShareOptions && (
        <div className="mb-6 p-4 bg-gray-700/50 rounded-lg">
          <h4 className="text-lg font-semibold text-white mb-4">Share via:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              onClick={() => handleShare('whatsapp')}
              className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp</span>
            </button>
            
            <button
              onClick={() => handleShare('email')}
              className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Mail className="w-5 h-5" />
              <span>Email</span>
            </button>
            
            <button
              onClick={() => handleShare('facebook')}
              className="bg-blue-800 text-white p-3 rounded-lg hover:bg-blue-900 transition-colors flex items-center justify-center space-x-2"
            >
              <Facebook className="w-5 h-5" />
              <span>Facebook</span>
            </button>
            
            <button
              onClick={() => handleShare('twitter')}
              className="bg-sky-600 text-white p-3 rounded-lg hover:bg-sky-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Twitter className="w-5 h-5" />
              <span>Twitter</span>
            </button>
          </div>
        </div>
      )}

      {/* Email Invite */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Send Email Invitation
        </label>
        <div className="flex space-x-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
            className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            onClick={handleEmailInvite}
            disabled={!email.trim()}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <Mail className="w-4 h-4" />
            <span>Send</span>
          </button>
        </div>
      </div>

      {/* Referral Rewards */}
      <div className="bg-gradient-to-r from-gold/20 to-yellow-400/20 rounded-lg p-4 border border-gold/30">
        <div className="flex items-center space-x-3 mb-3">
          <Gift className="w-6 h-6 text-gold" />
          <h4 className="text-lg font-semibold text-white">Referral Rewards</h4>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium">
                {rewards.badge || 'No rewards yet'}
              </div>
              <div className="text-gray-300 text-sm">
                {rewards.description}
              </div>
            </div>
            <div className="text-right">
              <div className="text-gold font-bold text-lg">
                {rewards.discount > 0 ? `${rewards.discount}% OFF` : '0%'}
              </div>
              <div className="text-gray-400 text-sm">
                {referralCount} invites
              </div>
            </div>
          </div>
          
          {rewards.nextMilestone && (
            <div className="bg-gray-700/50 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400 font-medium text-sm">Next Milestone</span>
              </div>
              <div className="text-gray-300 text-sm">
                Invite {rewards.nextMilestone.target - referralCount} more friends to get: {rewards.nextMilestone.reward}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-6 p-4 bg-gray-700/30 rounded-lg">
        <h5 className="text-white font-medium mb-2">How it works:</h5>
        <ol className="text-gray-300 text-sm space-y-1">
          <li>1. Share the invitation link with your friends</li>
          <li>2. They click the link and join the club</li>
          <li>3. You earn rewards for each successful invitation</li>
          <li>4. Use your rewards to get discounts on premium plans</li>
        </ol>
      </div>
    </div>
  );
}
