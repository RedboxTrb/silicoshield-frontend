import { Shield, Zap, Award, ArrowRight, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <>
      {/* Hero Section with Background */}
      <section className="relative bg-slate-900 dark:bg-slate-950 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=1600&q=80"
            alt="Medical background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-blue-900/50" />
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-blue-100 font-medium">
                  Next-Gen Medical Imaging
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Early Detection
                <br />
                <span className="text-blue-400">Saves Lives</span>
              </h1>

              {/* Description */}
              <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-xl">
                Advanced AI-powered screening for silicosis detection. Upload chest X-rays and receive instant, accurate analysis to support early intervention.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={onGetStarted}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl transition-all shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 font-medium"
                >
                  <span>Start Free Analysis</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl transition-all border border-white/20 font-medium">
                  Watch Demo
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 grid grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="w-5 h-5 text-blue-400" />
                    <span className="text-2xl font-bold text-white">HIPAA</span>
                  </div>
                  <p className="text-xs text-slate-400">Compliant</p>
                </div>
                <div className="relative group">
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="w-5 h-5 text-blue-400" />
                    <span className="text-2xl font-bold text-white">&lt;3s*</span>
                  </div>
                  <p className="text-xs text-slate-400">Analysis Time</p>
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-xl">
                    Can be affected due to latency and traffic
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                      <div className="border-4 border-transparent border-t-slate-800"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual - X-Ray Preview */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                {/* Medical Scan Visualization */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 relative overflow-hidden">
                  {/* Scanning Animation */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute h-px w-full bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-scan" />
                  </div>
                  
                  {/* Chest X-Ray Illustration */}
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-slate-900">
                    <img
                      src="/xray-hero.jpg"
                      alt="Chest X-ray scan"
                      className="w-full h-full object-cover opacity-60"
                    />

                    {/* Analysis Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  </div>
                </div>
              </div>

              {/* Floating Badges */}
              <div className="absolute -top-4 -right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-xl text-sm font-medium border border-blue-500">
                Real-time AI
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-2 rounded-lg shadow-xl text-sm font-medium border border-slate-200 dark:border-slate-700">
                Clinical Grade
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 fill-slate-50 dark:fill-slate-950" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-50 dark:bg-slate-950 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-slate-900 dark:text-white font-semibold mb-2">HIPAA Compliant</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Enterprise-grade security with end-to-end encryption and automatic data deletion.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-slate-900 dark:text-white font-semibold mb-2">Lightning Fast</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Get comprehensive analysis results in under 3 seconds with our optimized AI models.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-slate-900 dark:text-white font-semibold mb-2">AI-Powered Analysis</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Advanced deep learning model (VGG19) trained on medical imaging datasets for reliable detection.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
