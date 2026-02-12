import { useState } from 'react';
import { Upload, Download, Printer, BarChart3 } from 'lucide-react';
import { ImageCard } from './ImageCard';
import { AnalysisOverview } from './AnalysisOverview';
import { HospitalRecommendations } from './HospitalRecommendations';
import { API_ENDPOINTS, getAPIHeaders } from '../config/api';
import type { UploadedImage } from '../App';
import type { LocationData } from '../services/locationService';

interface ResultsSectionProps {
  images: UploadedImage[];
  onRemoveImage: (id: string) => void;
  onUpdateImage: (image: UploadedImage) => void;
  onImagesAdded: (images: UploadedImage[]) => void;
  userLocation: LocationData | null;
}

export function ResultsSection({
  images,
  onRemoveImage,
  onUpdateImage,
  onImagesAdded,
  userLocation,
}: ResultsSectionProps) {
  const [dragActive, setDragActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showPdfHeader, setShowPdfHeader] = useState(false);

  const handleExport = () => {
    setShowPdfHeader(true);
    setTimeout(() => {
      window.print();
      setShowPdfHeader(false);
    }, 100);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const newImages: UploadedImage[] = [];
    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const id = Math.random().toString(36).substr(2, 9);
        newImages.push({
          id,
          file,
          preview: URL.createObjectURL(file),
          status: 'pending',
          uploadedAt: new Date(),
        });
      }
    });
    if (newImages.length > 0) {
      onImagesAdded(newImages);
    }
  };

  const analyzeImages = async () => {
    setIsAnalyzing(true);

    const pendingImages = images.filter((img) => img.status === 'pending');

    for (const image of pendingImages) {
      onUpdateImage({ ...image, status: 'analyzing' });

      try {
        const formData = new FormData();
        formData.append('images', image.file);

        const response = await fetch(API_ENDPOINTS.predict, {
          method: 'POST',
          headers: getAPIHeaders(false), // Don't include Content-Type for FormData
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success && data.results && data.results.length > 0) {
          const result = data.results[0];

          onUpdateImage({
            ...image,
            status: 'completed',
            result: {
              hasSilicosis: result.hasSilicosis,
              confidence: result.confidence,
              severity: result.severity,
              findings: result.findings,
              recommendations: result.recommendations,
            },
          });
        } else {
          throw new Error(data.error || 'Analysis failed');
        }
      } catch (error) {
        console.error('Error analyzing image:', error);
        onUpdateImage({
          ...image,
          status: 'pending',
        });
        alert(`Failed to analyze ${image.file.name}. Please try again.`);
      }
    }

    setIsAnalyzing(false);
  };

  const pendingCount = images.filter((img) => img.status === 'pending').length;
  const completedCount = images.filter((img) => img.status === 'completed').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-slate-900 dark:text-white mb-1">Analysis Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400">
            {images.length} image{images.length !== 1 ? 's' : ''} uploaded
            {completedCount > 0 && ` • ${completedCount} analyzed`}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {completedCount > 0 && (
            <>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">Export Report</span>
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300"
              >
                <Printer className="w-4 h-4" />
                <span className="text-sm font-medium">Print</span>
              </button>
            </>
          )}
          
          {pendingCount > 0 && (
            <button
              onClick={analyzeImages}
              disabled={isAnalyzing}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 disabled:bg-slate-400 dark:disabled:bg-slate-700 disabled:cursor-not-allowed transition-colors font-medium shadow-lg shadow-blue-600/20"
            >
              <BarChart3 className="w-4 h-4" />
              {isAnalyzing ? 'Analyzing...' : `Analyze ${pendingCount}`}
            </button>
          )}
        </div>
      </div>

      {/* PDF Header (only visible during print) */}
      {showPdfHeader && (
        <div className="pdf-header bg-white p-6 mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-semibold text-gray-900">Silicosis Detection Analysis Report</h1>
            <p className="text-sm text-gray-500">Generated: {new Date().toLocaleDateString()}</p>
          </div>
          <p className="text-sm text-gray-600">
            {completedCount} image{completedCount !== 1 ? 's' : ''} analyzed
          </p>
        </div>
      )}

      {/* Analysis Overview */}
      {completedCount > 0 && <AnalysisOverview images={images} />}

      {/* Upload More Section */}
      <div
        className={`mb-8 border-2 border-dashed rounded-xl transition-all ${
          dragActive
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30'
            : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-400 dark:hover:border-slate-600'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-upload-results"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="sr-only"
        />
        <label
          htmlFor="file-upload-results"
          className="cursor-pointer flex items-center justify-center gap-3 p-6"
        >
          <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center">
            <Upload className="w-6 h-6 text-slate-600 dark:text-slate-400" />
          </div>
          <div>
            <p className="text-slate-900 dark:text-white mb-0.5">Add more X-ray images</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Drop files or click to browse
            </p>
          </div>
        </label>
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {images.map((image) => (
          <ImageCard
            key={image.id}
            image={image}
            onRemove={onRemoveImage}
          />
        ))}
      </div>

      {/* Hospital Recommendations */}
      <HospitalRecommendations
        show={completedCount > 0}
        userLocation={userLocation}
      />
    </div>
  );
}