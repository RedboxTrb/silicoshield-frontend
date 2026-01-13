import { X, Loader2, AlertCircle, CheckCircle, Clock, Eye, Image as ImageIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import type { UploadedImage } from '../App';

interface ImageCardProps {
  image: UploadedImage;
  onRemove: (id: string) => void;
}

export function ImageCard({ image, onRemove }: ImageCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-lg transition-shadow"
    >
      {/* Image Preview */}
      <div className="relative aspect-square bg-slate-100 dark:bg-slate-800 group">
        {image.preview ? (
          <img
            src={image.preview}
            alt="X-ray preview"
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error('Image failed to load:', image.preview);
              e.currentTarget.style.display = 'none';
            }}
            onLoad={() => console.log('Image loaded successfully:', image.preview)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">
            <ImageIcon className="w-16 h-16" />
          </div>
        )}
        
        {/* Overlay Controls */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
          <button className="w-10 h-10 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
            <Eye className="w-5 h-5 text-slate-700 dark:text-slate-300" />
          </button>
          <button
            onClick={() => onRemove(image.id)}
            className="w-10 h-10 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
          >
            <X className="w-5 h-5 text-red-600 dark:text-red-400" />
          </button>
        </div>

        {/* Status Overlay */}
        {image.status === 'analyzing' && (
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 to-slate-900/40 flex items-center justify-center">
            <div className="text-center bg-slate-900/90 backdrop-blur-md px-6 py-4 rounded-xl shadow-2xl border border-white/10">
              <Loader2 className="w-10 h-10 text-blue-500 animate-spin mx-auto mb-3" />
              <p className="text-white font-medium">Analyzing X-ray...</p>
              <p className="text-slate-300 text-sm mt-1">Processing image data</p>
            </div>
          </div>
        )}

        {/* Upload Time */}
        <div className="absolute top-3 left-3 bg-slate-900 bg-opacity-75 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-slate-300" />
          <span className="text-xs text-white">{formatDate(image.uploadedAt)}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5">
        {/* Status */}
        {image.status === 'pending' && (
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-4">
            <div className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500 animate-pulse" />
            <span className="text-sm font-medium">Pending Analysis</span>
          </div>
        )}

        {/* Results */}
        {image.status === 'completed' && image.result && (
          <div className="space-y-4">
            {/* Primary Result */}
            <div
              className={`flex items-start gap-3 p-4 rounded-xl border ${
                image.result.hasSilicosis
                  ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/50'
                  : 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50'
              }`}
            >
              {image.result.hasSilicosis ? (
                <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
              ) : (
                <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-500 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1 min-w-0">
                <p
                  className={`font-medium mb-1 ${
                    image.result.hasSilicosis ? 'text-amber-900 dark:text-amber-400' : 'text-emerald-900 dark:text-emerald-400'
                  }`}
                >
                  {image.result.hasSilicosis
                    ? 'Positive Detection'
                    : 'No Detection'}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Confidence: {image.result.confidence}%
                </p>
              </div>
            </div>

            {/* Severity Badge */}
            {image.result.hasSilicosis && image.result.severity && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">Severity Level:</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    image.result.severity === 'mild'
                      ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400'
                      : image.result.severity === 'moderate'
                      ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
                  }`}
                >
                  {image.result.severity.charAt(0).toUpperCase() +
                    image.result.severity.slice(1)}
                </span>
              </div>
            )}

            {/* Toggle Details */}
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
            >
              {showDetails ? 'Hide Details' : 'View Detailed Report'}
            </button>

            {/* Detailed Report */}
            {showDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-700"
              >
                {/* Findings */}
                <div>
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-2">
                    Key Findings:
                  </h4>
                  <ul className="space-y-1.5">
                    {image.result.findings.map((finding, index) => (
                      <li
                        key={index}
                        className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2"
                      >
                        <span className="text-slate-400 dark:text-slate-500 mt-1">•</span>
                        <span>{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Common Symptoms */}
                {image.result.hasSilicosis && (
                  <div>
                    <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-2">
                      Common Symptoms to Watch For:
                    </h4>
                    <ul className="space-y-1.5">
                      <li className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                        <span className="text-slate-400 dark:text-slate-500 mt-1">•</span>
                        <span>Shortness of breath, especially during physical activity</span>
                      </li>
                      <li className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                        <span className="text-slate-400 dark:text-slate-500 mt-1">•</span>
                        <span>Persistent cough that may produce mucus</span>
                      </li>
                      <li className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                        <span className="text-slate-400 dark:text-slate-500 mt-1">•</span>
                        <span>Chest pain or tightness</span>
                      </li>
                      <li className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                        <span className="text-slate-400 dark:text-slate-500 mt-1">•</span>
                        <span>Fatigue and weakness</span>
                      </li>
                      <li className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                        <span className="text-slate-400 dark:text-slate-500 mt-1">•</span>
                        <span>Fever in acute cases</span>
                      </li>
                    </ul>
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-2 italic">
                      Note: Match your symptoms with the above list. If experiencing multiple symptoms, consult a healthcare professional.
                    </p>
                  </div>
                )}

                {/* Recommendations */}
                <div>
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-2">
                    Recommendations:
                  </h4>
                  <ul className="space-y-1.5">
                    {image.result.recommendations.map((rec, index) => (
                      <li
                        key={index}
                        className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2"
                      >
                        <span className="text-slate-400 dark:text-slate-500 mt-1">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}