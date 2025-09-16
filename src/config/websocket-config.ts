// CONFIGURACIÓN DE WEBSOCKETS - PRODUCCIÓN
export const WEBSOCKET_CONFIG = {
  RECONNECT_INTERVAL: 5000,
  MAX_RECONNECT_ATTEMPTS: 10,
  PING_INTERVAL: 30000,
  PONG_TIMEOUT: 5000,
  
  ENDPOINTS: {
    POWERBALL: 'wss://data.powerball.com/ws',
    MEGA_MILLIONS: 'wss://data.megamillions.com/ws',
    EURO_MILLIONS: 'wss://data.euromillions.com/ws',
    BALOTO: 'wss://data.baloto.com/ws',
    LOTTO_6_49: 'wss://data.lotto649.com/ws'
  },
  
  MESSAGE_TYPES: {
    DRAW_RESULT: 'draw_result',
    JACKPOT_UPDATE: 'jackpot_update',
    DRAW_SCHEDULE: 'draw_schedule',
    ERROR: 'error',
    PING: 'ping',
    PONG: 'pong'
  }
};

export class WebSocketManager {
  private connections: Map<string, WebSocket> = new Map();
  private reconnectAttempts: Map<string, number> = new Map();
  
  connect(lotteryType: string): WebSocket {
    const url = WEBSOCKET_CONFIG.ENDPOINTS[lotteryType];
    if (!url) {
      throw new Error(`WebSocket endpoint not found for ${lotteryType}`);
    }
    
    const ws = new WebSocket(url);
    this.connections.set(lotteryType, ws);
    
    ws.onopen = () => {
      console.log(`✅ WebSocket conectado para ${lotteryType}`);
      this.reconnectAttempts.set(lotteryType, 0);
    };
    
    ws.onmessage = (event) => {
      this.handleMessage(lotteryType, event.data);
    };
    
    ws.onclose = () => {
      console.log(`❌ WebSocket desconectado para ${lotteryType}`);
      this.handleReconnect(lotteryType);
    };
    
    ws.onerror = (error) => {
      console.error(`❌ Error WebSocket ${lotteryType}:`, error);
    };
    
    return ws;
  }
  
  private handleMessage(lotteryType: string, data: string) {
    try {
      const message = JSON.parse(data);
      // Procesar mensaje según tipo
      console.log(`📨 Mensaje recibido de ${lotteryType}:`, message.type);
    } catch (error) {
      console.error('Error procesando mensaje WebSocket:', error);
    }
  }
  
  private handleReconnect(lotteryType: string) {
    const attempts = this.reconnectAttempts.get(lotteryType) || 0;
    
    if (attempts < WEBSOCKET_CONFIG.MAX_RECONNECT_ATTEMPTS) {
      setTimeout(() => {
        console.log(`🔄 Reintentando conexión ${lotteryType} (intento ${attempts + 1})`);
        this.reconnectAttempts.set(lotteryType, attempts + 1);
        this.connect(lotteryType);
      }, WEBSOCKET_CONFIG.RECONNECT_INTERVAL);
    } else {
      console.error(`❌ Máximo de intentos de reconexión alcanzado para ${lotteryType}`);
    }
  }
}
