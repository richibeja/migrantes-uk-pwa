'use client';

import { useState, useEffect, useCallback } from 'react';
import { anbelAIAgent, AnbelAIResponse } from '@/lib/anbel-ai-agent';

export interface AnbelAIState {
  isActive: boolean;
  isInitializing: boolean;
  lastUpdate: string;
  capabilities: any;
  status: 'idle' | 'working' | 'error' | 'success';
  error: string | null;
  responses: AnbelAIResponse[];
  memory: any;
  predictions: any[];
  users: any[];
  patterns: any[];
  trends: any[];
}

export function useAnbelAI() {
  const [state, setState] = useState<AnbelAIState>({
    isActive: false,
    isInitializing: true,
    lastUpdate: '',
    capabilities: {},
    status: 'idle',
    error: null,
    responses: [],
    memory: {},
    predictions: [],
    users: [],
    patterns: [],
    trends: []
  });

  const [isLoading, setIsLoading] = useState(true);
  const [updateCount, setUpdateCount] = useState(0);

  // Inicializar Agente Anbel IA
  const initializeAnbelAI = useCallback(async () => {
    try {
      setIsLoading(true);
      setState(prev => ({ ...prev, status: 'working', error: null }));

      console.log('🤖 Inicializando Agente Anbel IA...');
      
      // Obtener estado del agente
      const status = await anbelAIAgent.getStatus();
      
      setState(prev => ({
        ...prev,
        isActive: status.isActive,
        isInitializing: false,
        lastUpdate: status.lastUpdate.toISOString(),
        capabilities: status.capabilities,
        status: 'success',
        memory: status.memory,
        predictions: Array.isArray(status.predictions) ? status.predictions : [],
        users: Array.isArray(status.users) ? status.users : []
      }));

      setUpdateCount(prev => prev + 1);
      console.log('✅ Agente Anbel IA inicializado');

    } catch (error) {
      console.error('❌ Error inicializando Agente Anbel IA:', error);
      setState(prev => ({
        ...prev,
        status: 'error',
        error: error instanceof Error ? error.message : 'Error desconocido',
        isInitializing: false
      }));
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Generar predicción avanzada
  const generateAdvancedPrediction = useCallback(async (
    lotteryId: string,
    userId?: string,
    preferences?: any
  ): Promise<AnbelAIResponse | null> => {
    try {
      setState(prev => ({ ...prev, status: 'working', error: null }));

      console.log(`🎯 Anbel IA generando predicción avanzada para ${lotteryId}...`);
      
      const response = await anbelAIAgent.generateAdvancedPrediction(
        lotteryId,
        userId,
        preferences
      );

      setState(prev => ({
        ...prev,
        responses: [response, ...prev.responses],
        status: 'success',
        lastUpdate: new Date().toISOString()
      }));

      console.log('✅ Predicción avanzada generada');
      return response;

    } catch (error) {
      console.error('❌ Error generando predicción avanzada:', error);
      setState(prev => ({
        ...prev,
        status: 'error',
        error: error instanceof Error ? error.message : 'Error generando predicción'
      }));
      return null;
    }
  }, []);

  // Chat inteligente
  const processIntelligentChat = useCallback(async (
    message: string,
    userId: string,
    language: 'es' | 'en' = 'es'
  ): Promise<AnbelAIResponse | null> => {
    try {
      setState(prev => ({ ...prev, status: 'working', error: null }));

      console.log(`💬 Anbel IA procesando chat: ${message}`);
      
      const response = await anbelAIAgent.processIntelligentChat(
        message,
        userId,
        language
      );

      setState(prev => ({
        ...prev,
        responses: [response, ...prev.responses],
        status: 'success',
        lastUpdate: new Date().toISOString()
      }));

      console.log('✅ Chat procesado');
      return response;

    } catch (error) {
      console.error('❌ Error procesando chat:', error);
      setState(prev => ({
        ...prev,
        status: 'error',
        error: error instanceof Error ? error.message : 'Error procesando chat'
      }));
      return null;
    }
  }, []);

  // Generar dashboard inteligente
  const generateIntelligentDashboard = useCallback(async (
    userId: string
  ): Promise<AnbelAIResponse | null> => {
    try {
      setState(prev => ({ ...prev, status: 'working', error: null }));

      console.log(`📊 Anbel IA generando dashboard inteligente para ${userId}...`);
      
      const response = await anbelAIAgent.generateIntelligentDashboard(userId);

      setState(prev => ({
        ...prev,
        responses: [response, ...prev.responses],
        status: 'success',
        lastUpdate: new Date().toISOString()
      }));

      console.log('✅ Dashboard inteligente generado');
      return response;

    } catch (error) {
      console.error('❌ Error generando dashboard inteligente:', error);
      setState(prev => ({
        ...prev,
        status: 'error',
        error: error instanceof Error ? error.message : 'Error generando dashboard'
      }));
      return null;
    }
  }, []);

  // Enviar notificación inteligente
  const sendIntelligentNotification = useCallback(async (
    type: 'pattern' | 'hotNumber' | 'trend' | 'opportunity',
    userId: string,
    data: any
  ): Promise<AnbelAIResponse | null> => {
    try {
      setState(prev => ({ ...prev, status: 'working', error: null }));

      console.log(`🔔 Anbel IA enviando notificación: ${type}`);
      
      const response = await anbelAIAgent.sendIntelligentNotification(
        type,
        userId,
        data
      );

      setState(prev => ({
        ...prev,
        responses: [response, ...prev.responses],
        status: 'success',
        lastUpdate: new Date().toISOString()
      }));

      console.log('✅ Notificación enviada');
      return response;

    } catch (error) {
      console.error('❌ Error enviando notificación:', error);
      setState(prev => ({
        ...prev,
        status: 'error',
        error: error instanceof Error ? error.message : 'Error enviando notificación'
      }));
      return null;
    }
  }, []);

  // Activar agente
  const activateAgent = useCallback(async (): Promise<void> => {
    try {
      setState(prev => ({ ...prev, status: 'working', error: null }));

      await anbelAIAgent.activate();
      
      setState(prev => ({
        ...prev,
        isActive: true,
        status: 'success',
        lastUpdate: new Date().toISOString()
      }));

      console.log('✅ Agente Anbel IA activado');

    } catch (error) {
      console.error('❌ Error activando agente:', error);
      setState(prev => ({
        ...prev,
        status: 'error',
        error: error instanceof Error ? error.message : 'Error activando agente'
      }));
    }
  }, []);

  // Desactivar agente
  const deactivateAgent = useCallback(async (): Promise<void> => {
    try {
      setState(prev => ({ ...prev, status: 'working', error: null }));

      await anbelAIAgent.deactivate();
      
      setState(prev => ({
        ...prev,
        isActive: false,
        status: 'success',
        lastUpdate: new Date().toISOString()
      }));

      console.log('❌ Agente Anbel IA desactivado');

    } catch (error) {
      console.error('❌ Error desactivando agente:', error);
      setState(prev => ({
        ...prev,
        status: 'error',
        error: error instanceof Error ? error.message : 'Error desactivando agente'
      }));
    }
  }, []);

  // Actualizar agente
  const updateAgent = useCallback(async (): Promise<void> => {
    try {
      setState(prev => ({ ...prev, status: 'working', error: null }));

      await anbelAIAgent.update();
      
      setState(prev => ({
        ...prev,
        status: 'success',
        lastUpdate: new Date().toISOString()
      }));

      setUpdateCount(prev => prev + 1);
      console.log('✅ Agente Anbel IA actualizado');

    } catch (error) {
      console.error('❌ Error actualizando agente:', error);
      setState(prev => ({
        ...prev,
        status: 'error',
        error: error instanceof Error ? error.message : 'Error actualizando agente'
      }));
    }
  }, []);

  // Obtener respuestas por tipo
  const getResponsesByType = useCallback((type: string): AnbelAIResponse[] => {
    return state.responses.filter(response => response.type === type);
  }, [state.responses]);

  // Obtener respuestas por idioma
  const getResponsesByLanguage = useCallback((language: string): AnbelAIResponse[] => {
    return state.responses.filter(response => response.language === language);
  }, [state.responses]);

  // Obtener respuestas recientes
  const getRecentResponses = useCallback((limit: number = 10): AnbelAIResponse[] => {
    return state.responses
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  }, [state.responses]);

  // Obtener estadísticas del agente
  const getAgentStatistics = useCallback(() => {
    return {
      totalResponses: state.responses.length,
      predictions: getResponsesByType('prediction').length,
      chats: getResponsesByType('chat').length,
      analyses: getResponsesByType('analysis').length,
      notifications: getResponsesByType('notification').length,
      averageConfidence: state.responses.reduce((sum, r) => sum + r.confidence, 0) / state.responses.length || 0,
      averageAccuracy: state.responses.reduce((sum, r) => sum + r.accuracy, 0) / state.responses.length || 0,
      lastUpdate: state.lastUpdate,
      updateCount
    };
  }, [state.responses, state.lastUpdate, updateCount, getResponsesByType]);

  // Inicialización automática
  useEffect(() => {
    initializeAnbelAI();
  }, [initializeAnbelAI]);

  // Actualización automática cada 5 minutos
  useEffect(() => {
    if (state.isActive) {
      const interval = setInterval(updateAgent, 5 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [state.isActive, updateAgent]);

  return {
    ...state,
    isLoading,
    updateCount,
    initializeAnbelAI,
    generateAdvancedPrediction,
    processIntelligentChat,
    generateIntelligentDashboard,
    sendIntelligentNotification,
    activateAgent,
    deactivateAgent,
    updateAgent,
    getResponsesByType,
    getResponsesByLanguage,
    getRecentResponses,
    getAgentStatistics
  };
}
