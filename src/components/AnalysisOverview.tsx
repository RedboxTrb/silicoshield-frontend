import { TrendingUp, AlertTriangle, FileCheck, Activity } from 'lucide-react';
import type { UploadedImage } from '../App';

interface AnalysisOverviewProps {
  images: UploadedImage[];
}

export function AnalysisOverview({ images }: AnalysisOverviewProps) {
  const completedImages = images.filter((img) => img.status === 'completed');
  const positiveCount = completedImages.filter(
    (img) => img.result?.hasSilicosis
  ).length;
  const negativeCount = completedImages.length - positiveCount;

  const avgConfidence =
    completedImages.length > 0
      ? Math.round(
          completedImages.reduce((sum, img) => sum + (img.result?.confidence || 0), 0) /
            completedImages.length
        )
      : 0;

  const severeCases = completedImages.filter(
    (img) => img.result?.severity === 'severe'
  ).length;

  if (completedImages.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-slate-900 dark:text-white mb-4">Analysis Summary</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Analyzed */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <FileCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-2xl font-semibold text-slate-900 dark:text-white mb-1">
            {completedImages.length}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Images Analyzed</div>
        </div>

        {/* Positive Cases */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-amber-50 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            {positiveCount > 0 && (
              <span className="text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-2 py-1 rounded">
                {Math.round((positiveCount / completedImages.length) * 100)}%
              </span>
            )}
          </div>
          <div className="text-2xl font-semibold text-slate-900 dark:text-white mb-1">
            {positiveCount}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Positive Detections</div>
        </div>

        {/* Negative Cases */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            {negativeCount > 0 && (
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded">
                {Math.round((negativeCount / completedImages.length) * 100)}%
              </span>
            )}
          </div>
          <div className="text-2xl font-semibold text-slate-900 dark:text-white mb-1">
            {negativeCount}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Clear Results</div>
        </div>

        {/* Average Confidence */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-violet-50 dark:bg-violet-900/30 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            </div>
            <div className="w-12 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-violet-600 dark:bg-violet-500 rounded-full"
                style={{ width: `${avgConfidence}%` }}
              />
            </div>
          </div>
          <div className="text-2xl font-semibold text-slate-900 dark:text-white mb-1">
            {avgConfidence}%
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Avg. Confidence</div>
        </div>
      </div>

      {/* Critical Alert */}
      {severeCases > 0 && (
        <div className="mt-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-900 dark:text-red-400 font-medium mb-1">
              {severeCases} Severe Case{severeCases > 1 ? 's' : ''} Detected
            </p>
            <p className="text-sm text-red-800 dark:text-red-300/80">
              Immediate medical consultation recommended. Please review detailed findings and contact appropriate healthcare professionals.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}