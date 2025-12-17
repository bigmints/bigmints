import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { SiteConfig } from '../types';
import SEO from '../components/SEO';
interface PhotographyProps {
    config: SiteConfig | null;
}

interface Photo {
    id: string;
    url: string;
    thumbnail: string;
    name: string;
    category: string;
}

const Photography: React.FC<PhotographyProps> = ({ config }) => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [categories, setCategories] = useState<string[]>(['All']);

    useEffect(() => {
        const loadLocalPhotos = async () => {
            try {
                setLoading(true);
                setError(null);

                // Fetch the manifest file
                const response = await fetch('/photos/manifest.json');

                if (!response.ok) {
                    setError('Photos not found. Please run "npm run sync-photos" to download photos from Google Drive.');
                    setLoading(false);
                    return;
                }

                const manifestData = await response.json();

                // Check if manifest is in new format (object) or old format (array)
                if (Array.isArray(manifestData)) {
                    // Old format - flat array of photo names
                    console.warn('Using old manifest format. Run "npm run sync-photos" to update to folder-based categories.');

                    const photoData: Photo[] = manifestData.map((name, index) => ({
                        id: `photo-${index}`,
                        url: `/photos/${name}`,
                        thumbnail: `/photos/${name}`,
                        name: name,
                        category: 'All'
                    }));

                    setPhotos(photoData);
                    setCategories(['All']);
                } else {
                    // New format - object with categories
                    const manifest: Record<string, string[]> = manifestData;
                    const categoryNames = Object.keys(manifest);

                    if (categoryNames.length === 0) {
                        setPhotos([]);
                        setLoading(false);
                        return;
                    }

                    // Set categories dynamically from manifest (capitalize first letter)
                    const formattedCategories = ['All', ...categoryNames.map(cat =>
                        cat.charAt(0).toUpperCase() + cat.slice(1)
                    )];
                    setCategories(formattedCategories);

                    // Create photo objects from manifest
                    const photoData: Photo[] = [];
                    let photoIndex = 0;

                    for (const [category, photoNames] of Object.entries(manifest)) {
                        for (const name of photoNames) {
                            photoData.push({
                                id: `photo-${photoIndex++}`,
                                url: `/photos/${category}/${name}`,
                                thumbnail: `/photos/${category}/${name}`,
                                name: name,
                                category: category.charAt(0).toUpperCase() + category.slice(1)
                            });
                        }
                    }

                    console.log(`Loaded ${photoData.length} photos from ${categoryNames.length} categories`);
                    setPhotos(photoData);
                }
            } catch (err) {
                console.error('Error loading photos:', err);
                setError('Failed to load photos. Please run "npm run sync-photos" to sync from Google Drive.');
            } finally {
                setLoading(false);
            }
        };

        loadLocalPhotos();
    }, []);

    const openLightbox = (index: number) => {
        setSelectedPhoto(index);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setSelectedPhoto(null);
        document.body.style.overflow = 'unset';
    };

    const navigatePhoto = (direction: 'prev' | 'next') => {
        if (selectedPhoto === null) return;

        if (direction === 'prev') {
            setSelectedPhoto(selectedPhoto === 0 ? photos.length - 1 : selectedPhoto - 1);
        } else {
            setSelectedPhoto(selectedPhoto === photos.length - 1 ? 0 : selectedPhoto + 1);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedPhoto === null) return;

            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') navigatePhoto('prev');
            if (e.key === 'ArrowRight') navigatePhoto('next');
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedPhoto]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-8 h-8 animate-spin text-zinc-400 dark:text-zinc-600" />
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Loading gallery...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="animate-in fade-in duration-500">
                <div className="mb-16 max-w-2xl">
                    <h1 className="text-5xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
                        Photography
                    </h1>
                    <p className="text-xl text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                        A curated collection of moments captured through my lens.
                    </p>
                </div>
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6 max-w-2xl">
                    <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-200 mb-2">
                        Setup Required
                    </h3>
                    <p className="text-amber-800 dark:text-amber-300 mb-4">
                        {error}
                    </p>
                    <div className="text-sm text-amber-700 dark:text-amber-400">
                        <p className="font-medium mb-2">Quick fix:</p>
                        <ol className="list-decimal list-inside space-y-1 ml-2">
                            <li>Get a free Google Drive API key from Google Cloud Console</li>
                            <li>Add it to your <code className="bg-amber-100 dark:bg-amber-900/40 px-1 rounded">.env.local</code> file</li>
                            <li>Restart the dev server</li>
                        </ol>
                        <p className="mt-3 text-xs opacity-75">
                            See the setup guide for detailed instructions.
                        </p>
                    </div>
                </div>
            </div>
        );
    }



    return (
        <div className="animate-in fade-in duration-500 -mx-6 md:-mx-8">
            <SEO
                title="Photography"
                description="A curated collection of moments captured through my lens. Each photograph tells a story."
                url="/photography"
            />
            {/* Header */}
            <div className="mb-16 max-w-2xl px-6 md:px-8">
                <h1 className="text-5xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
                    Photography
                </h1>
                <p className="text-xl text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                    A curated collection of moments captured through my lens. Each photograph tells a story.
                </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-12">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedCategory === cat
                                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-lg scale-105'
                                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Gallery Grid - Equal Size Containers */}
            {photos.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {photos
                        .filter(photo => selectedCategory === 'All' || photo.category === selectedCategory)
                        .map((photo) => (
                            <div
                                key={photo.id}
                                className="group cursor-pointer relative overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900 aspect-square shadow-sm hover:shadow-xl transition-shadow duration-300"
                                onClick={() => openLightbox(photos.indexOf(photo))}
                            >
                                <img
                                    src={photo.thumbnail}
                                    alt={photo.name}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-110"
                                />

                                {/* Dark overlay that removes on hover */}
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/0 transition-all duration-300" />
                            </div>
                        ))}
                </div>
            ) : (
                <div className="text-center py-32">
                    <p className="text-zinc-400 dark:text-zinc-600 text-lg">
                        No photos available at the moment.
                    </p>
                    <p className="text-zinc-400 dark:text-zinc-600 text-sm mt-2">
                        Check back soon for new captures!
                    </p>
                </div>
            )}

            {/* Lightbox */}
            {selectedPhoto !== null && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
                    onClick={closeLightbox}
                >
                    {/* Close button */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/80 hover:text-white hover:bg-white/20 transition-all duration-200 z-10"
                        aria-label="Close"
                    >
                        <X size={24} />
                    </button>

                    {/* Navigation buttons */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            navigatePhoto('prev');
                        }}
                        className="absolute left-6 w-14 h-14 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/80 hover:text-white hover:bg-white/20 hover:scale-110 transition-all duration-200 z-10 hidden md:flex"
                        aria-label="Previous photo"
                    >
                        <ChevronLeft size={28} />
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            navigatePhoto('next');
                        }}
                        className="absolute right-6 w-14 h-14 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/80 hover:text-white hover:bg-white/20 hover:scale-110 transition-all duration-200 z-10 hidden md:flex"
                        aria-label="Next photo"
                    >
                        <ChevronRight size={28} />
                    </button>

                    {/* Image */}
                    <img
                        src={photos[selectedPhoto].url}
                        alt={photos[selectedPhoto].name}
                        className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />

                    {/* Photo counter */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium">
                        {selectedPhoto + 1} / {photos.length}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Photography;
