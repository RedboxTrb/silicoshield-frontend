import { useState, useEffect } from 'react';
import { UploadSection } from './components/UploadSection';
import { ResultsSection } from './components/ResultsSection';
import { HeroSection } from './components/HeroSection';
import { Header } from './components/Header';
import { AuthProvider } from './context/AuthContext';
import { useTheme } from './hooks/useTheme';
import { requestUserLocation, type LocationData } from './services/locationService';

export interface UploadedImage {
  id: string;
  file: File;
  preview: string;
  status: 'pending' | 'analyzing' | 'completed';
  uploadedAt: Date;
  result?: {
    hasSilicosis: boolean;
    confidence: number;
    severity?: 'mild' | 'moderate' | 'severe';
    findings: string[];
    recommendations: string[];
  };
}

function AppContent() {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [currentView, setCurrentView] = useState<'home' | 'results'>('home');
  const [userLocation, setUserLocation] = useState<LocationData | null>(null);
  const { theme, toggleTheme } = useTheme();

  // Request user location on mount
  useEffect(() => {
    requestUserLocation().then((location) => {
      if (location) {
        setUserLocation(location);
        console.log('Location detected:', location);
      }
    });
  }, []);

  const handleImagesAdded = (newImages: UploadedImage[]) => {
    setImages((prev) => [...prev, ...newImages]);
    if (currentView === 'home' && newImages.length > 0) {
      setCurrentView('results');
    }
  };

  const handleRemoveImage = (id: string) => {
    setImages((prev) => {
      const image = prev.find((img) => img.id === id);
      if (image) {
        URL.revokeObjectURL(image.preview);
      }
      return prev.filter((img) => img.id !== id);
    });
  };

  const handleUpdateImage = (updatedImage: UploadedImage) => {
    setImages((prev) =>
      prev.map((img) => (img.id === updatedImage.id ? updatedImage : img))
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <Header
        currentView={currentView}
        onNavigate={setCurrentView}
        hasImages={images.length > 0}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {currentView === 'home' ? (
        <>
          <HeroSection onGetStarted={() => setCurrentView('results')} />
          <UploadSection onImagesAdded={handleImagesAdded} />
        </>
      ) : (
        <ResultsSection
          images={images}
          onRemoveImage={handleRemoveImage}
          onUpdateImage={handleUpdateImage}
          onImagesAdded={handleImagesAdded}
          userLocation={userLocation}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
