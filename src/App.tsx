import { useState, useEffect } from 'react';
import { UploadSection } from './components/UploadSection';
import { ResultsSection } from './components/ResultsSection';
import { HeroSection } from './components/HeroSection';
import { Header } from './components/Header';
import { PasswordGate } from './components/PasswordGate';
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

export default function App() {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [currentView, setCurrentView] = useState<'home' | 'results'>('home');
  const [userLocation, setUserLocation] = useState<LocationData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Check if already authenticated on mount
  useEffect(() => {
    const authenticated = sessionStorage.getItem('authenticated') === 'true';
    setIsAuthenticated(authenticated);
  }, []);

  // Request user location on mount (only after authentication)
  useEffect(() => {
    if (isAuthenticated) {
      requestUserLocation().then((location) => {
        if (location) {
          setUserLocation(location);
          console.log('Location detected:', location);
        }
      });
    }
  }, [isAuthenticated]);

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

  // Show password gate if not authenticated
  if (!isAuthenticated) {
    return <PasswordGate onAuthenticated={() => setIsAuthenticated(true)} />;
  }

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
