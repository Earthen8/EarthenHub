import { useState, useEffect } from 'react';

interface ImageWithFallbackProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
    src?: string | null;
    fallbackSrc?: string;
}

export default function ImageWithFallback({
    src,
    fallbackSrc = "/earthen-pixar.jpg",
    alt,
    className,
    ...props
}: ImageWithFallbackProps) {
    const [error, setError] = useState(false);

    useEffect(() => {
        setError(false);
    }, [src]);

    const displaySrc = !src || error ? fallbackSrc : src;

    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={displaySrc}
            alt={alt || "Fallback image"}
            className={className}
            onError={() => setError(true)}
            {...props}
        />
    );
}