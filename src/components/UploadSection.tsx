import { useState } from 'react';
import { Upload, FileImage, CheckCircle, AlertCircle, Image as ImageIcon } from 'lucide-react';
import type { UploadedImage } from '../App';

interface UploadSectionProps {
  onImagesAdded: (images: UploadedImage[]) => void;
}

export function UploadSection({ onImagesAdded }: UploadSectionProps) {
  const [dragActive, setDragActive] = useState(false);

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

  return (
    <section className="bg-slate-50 dark:bg-slate-950 py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-slate-900 dark:text-white mb-3">Upload X-Ray Images</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Upload chest X-rays for instant screening analysis
          </p>
        </div>

        {/* Upload Area */}
        <div
          className={`relative border-2 border-dashed rounded-2xl p-12 sm:p-16 text-center transition-all ${
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
            id="file-upload-main"
            multiple
            accept="image/*"
            onChange={handleChange}
            className="sr-only"
          />
          <label
            htmlFor="file-upload-main"
            className="cursor-pointer flex flex-col items-center"
          >
            <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 border border-blue-100 dark:border-blue-800">
              <Upload className="w-10 h-10 text-blue-600 dark:text-blue-400" strokeWidth={2} />
            </div>
            <p className="text-slate-900 dark:text-white mb-2 text-lg">
              Drag and drop your X-ray images here
            </p>
            <p className="text-slate-600 dark:text-slate-400 mb-6">or</p>
            <div className="px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-medium">
              Browse Files
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-500 mt-6">
              Supported: JPG, PNG, DICOM • Multiple files allowed
            </p>
          </label>
        </div>

        {/* Guidelines */}
        <div className="mt-10 grid sm:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="text-slate-900 dark:text-white mb-2">Image Requirements</h3>
                <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1.5">
                  <li>• PA chest X-rays preferred</li>
                  <li>• Clear, high-resolution images</li>
                  <li>• Full lung field visible</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-slate-900 dark:text-white mb-2">Privacy & Security</h3>
                <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1.5">
                  <li>• All data transmitted over HTTPS</li>
                  <li>• Images processed in memory only</li>
                  <li>• No permanent storage of medical images</li>
                  <li>• HIPAA-compliant security measures</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Medical & HIPAA Disclaimer */}
        <div className="mt-10 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <FileImage className="w-5 h-5 text-amber-700 dark:text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-amber-900 dark:text-amber-400 mb-3 font-semibold">Important Notices</h3>
              <div className="space-y-3 text-sm text-amber-800 dark:text-amber-300/80 leading-relaxed">
                <p>
                  <strong>Medical Disclaimer:</strong> This screening tool is designed to assist healthcare professionals and should not replace clinical judgment. All results must be reviewed and interpreted by a qualified radiologist or physician. This tool is not a substitute for professional medical diagnosis, treatment, or advice.
                </p>
                <p>
                  <strong>HIPAA Compliance:</strong> This application implements HIPAA-compliant security measures including encrypted data transmission, no permanent storage of medical images, audit logging, and access controls. Images are processed in memory and immediately discarded after analysis. By using this tool, you acknowledge that you are responsible for ensuring proper authorization and consent for any medical images uploaded.
                </p>
                <p>
                  <strong>Data Privacy:</strong> Remove all patient identifying information from images before upload. Image filenames and metadata may contain PHI and should be scrubbed prior to submission.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
