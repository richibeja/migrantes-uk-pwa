'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Camera, Upload, Check, AlertCircle } from 'lucide-react';
import { ClubTicket } from '@/types/clubs';

interface UploadTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  clubId: string;
  userId: string;
  userName: string;
  onTicketUploaded: (ticket: ClubTicket) => void;
}

export default function UploadTicketModal({ 
  isOpen, 
  onClose, 
  clubId, 
  userId, 
  userName,
  onTicketUploaded 
}: UploadTicketModalProps) {
  if (!isOpen) return null;
  const [foto, setFoto] = useState<File | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [datos, setDatos] = useState({
    numeros: [] as number[],
    fechaSorteo: '',
    loteria: '',
    monto: '',
    local: '',
    horaCompra: ''
  });
  const [errores, setErrores] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const loterias = [
    'Powerball',
    'Mega Millions', 
    'EuroMillions',
    'UK National Lottery',
    'Baloto',
    'Mega-Sena',
    'Lotería Nacional',
    'El Gordo',
    'Lotto 6/49'
  ];

  // Funciones para la cámara
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment', // Cámara trasera
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setShowCamera(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setErrores(['No se pudo acceder a la cámara. Usa la opción de seleccionar archivo.']);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setShowCamera(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'ticket-photo.jpg', { type: 'image/jpeg' });
            setFoto(file);
            setFotoPreview(canvas.toDataURL('image/jpeg'));
            stopCamera();
          }
        }, 'image/jpeg', 0.8);
      }
    }
  };

  // Limpiar cámara cuando se cierre el modal
  useEffect(() => {
    if (!isOpen) {
      stopCamera();
    }
  }, [isOpen]);

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB max
        setErrores(['La foto debe ser menor a 5MB']);
        return;
      }
      setFoto(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setFotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setErrores([]);
    }
  };

  const handleNumeroChange = (index: number, value: string) => {
    const newNumeros = [...datos.numeros];
    newNumeros[index] = parseInt(value) || 0;
    setDatos({ ...datos, numeros: newNumeros });
  };

  const addNumero = () => {
    if (datos.numeros.length < 10) {
      setDatos({ ...datos, numeros: [...datos.numeros, 0] });
    }
  };

  const removeNumero = (index: number) => {
    const newNumeros = datos.numeros.filter((_, i) => i !== index);
    setDatos({ ...datos, numeros: newNumeros });
  };

  const validarDatos = () => {
    const nuevosErrores: string[] = [];
    
    if (!foto) {
      nuevosErrores.push('Debes subir una foto del ticket');
    }
    
    if (datos.numeros.length === 0 || datos.numeros.some(n => n === 0)) {
      nuevosErrores.push('Debes ingresar al menos un número válido');
    }
    
    if (!datos.fechaSorteo) {
      nuevosErrores.push('Debes seleccionar la fecha del sorteo');
    }
    
    if (!datos.loteria) {
      nuevosErrores.push('Debes seleccionar la lotería');
    }
    
    if (!datos.monto || parseFloat(datos.monto) <= 0) {
      nuevosErrores.push('Debes ingresar un monto válido');
    }
    
    if (!datos.local.trim()) {
      nuevosErrores.push('Debes ingresar el local de compra');
    }

    setErrores(nuevosErrores);
    return nuevosErrores.length === 0;
  };

  const subirTicket = async () => {
    if (!validarDatos()) return;

    setIsUploading(true);
    try {
      // Simular subida a Firebase Storage
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const nuevoTicket: ClubTicket = {
        id: `ticket_${Date.now()}`,
        userId,
        userName,
        clubId,
        fotoTicket: fotoPreview, // En producción sería la URL de Firebase Storage
        numeros: datos.numeros.filter(n => n > 0),
        fechaCompra: new Date(),
        fechaSubida: new Date(),
        estado: 'pendiente',
        datosVerificacion: {
          fechaSorteo: new Date(datos.fechaSorteo),
          loteria: datos.loteria,
          montoPagado: parseFloat(datos.monto),
          localCompra: datos.local,
          horaCompra: datos.horaCompra
        }
      };

      onTicketUploaded(nuevoTicket);
      onClose();
      
      // Reset form
      setFoto(null);
      setFotoPreview('');
      setDatos({
        numeros: [],
        fechaSorteo: '',
        loteria: '',
        monto: '',
        local: '',
        horaCompra: ''
      });
    } catch (error) {
      setErrores(['Error al subir el ticket. Intenta nuevamente.']);
    } finally {
      setIsUploading(false);
    }
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Registrar Ticket Comprado</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Errores */}
        {errores.length > 0 && (
          <div className="bg-red-600/20 border border-red-600/30 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <span className="text-red-400 font-semibold">Errores encontrados:</span>
            </div>
            <ul className="text-red-300 text-sm space-y-1">
              {errores.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Sección de Foto */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Foto del Ticket</h3>
            
            {showCamera ? (
              <div className="relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-48 object-cover rounded-lg border border-gray-600"
                />
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  <button
                    onClick={capturePhoto}
                    className="bg-green-600 text-white p-3 rounded-full hover:bg-green-700 transition-colors"
                  >
                    <Camera className="w-6 h-6" />
                  </button>
                  <button
                    onClick={stopCamera}
                    className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <canvas ref={canvasRef} className="hidden" />
              </div>
            ) : fotoPreview ? (
              <div className="relative">
                <img 
                  src={fotoPreview} 
                  alt="Preview del ticket" 
                  className="w-full h-48 object-cover rounded-lg border border-gray-600"
                />
                <button
                  onClick={() => {
                    setFoto(null);
                    setFotoPreview('');
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="w-full h-48 border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center">
                <Camera className="w-12 h-12 text-gray-400 mb-2" />
                <p className="text-gray-400 text-center mb-4">
                  Selecciona una opción para<br />
                  capturar tu ticket
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={startCamera}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Tomar Foto</span>
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Seleccionar</span>
                  </button>
                </div>
                <p className="text-gray-500 text-xs mt-2">Máximo 5MB</p>
              </div>
            )}
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFotoChange}
              className="hidden"
            />
          </div>

          {/* Sección de Datos */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Datos del Ticket</h3>
            
            {/* Números */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Números del Ticket
              </label>
              <div className="space-y-2">
                {datos.numeros.map((numero, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="number"
                      min="1"
                      max="99"
                      value={numero || ''}
                      onChange={(e) => handleNumeroChange(index, e.target.value)}
                      className="w-20 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Número"
                    />
                    <button
                      onClick={() => removeNumero(index)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {datos.numeros.length < 10 && (
                  <button
                    onClick={addNumero}
                    className="text-purple-400 hover:text-purple-300 text-sm flex items-center space-x-1"
                  >
                    <span>+</span>
                    <span>Agregar número</span>
                  </button>
                )}
              </div>
            </div>

            {/* Fecha del sorteo */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Fecha del Sorteo
              </label>
              <input
                type="date"
                value={datos.fechaSorteo}
                onChange={(e) => setDatos({ ...datos, fechaSorteo: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Lotería */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Lotería
              </label>
              <select
                value={datos.loteria}
                onChange={(e) => setDatos({ ...datos, loteria: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Seleccionar lotería</option>
                {loterias.map((loteria) => (
                  <option key={loteria} value={loteria}>{loteria}</option>
                ))}
              </select>
            </div>

            {/* Monto */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Monto Pagado ($)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={datos.monto}
                onChange={(e) => setDatos({ ...datos, monto: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>

            {/* Local de compra */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Local de Compra
              </label>
              <input
                type="text"
                value={datos.local}
                onChange={(e) => setDatos({ ...datos, local: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Ej: 7-Eleven, CVS, etc."
              />
            </div>

            {/* Hora de compra (opcional) */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Hora de Compra (opcional)
              </label>
              <input
                type="time"
                value={datos.horaCompra}
                onChange={(e) => setDatos({ ...datos, horaCompra: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="flex space-x-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-700 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={subirTicket}
            disabled={isUploading}
            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isUploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Subiendo...</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>Enviar para Verificación</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
