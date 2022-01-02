// import { useEffect, useState } from 'react';

// const useLoadImage = ({ src }: { src: string; }) => {
//     const [loadedSrc, setLoadedSrc] = useState(null);
//     useEffect(() => {
//         setLoadedSrc(null);
//         if (src) {
//             const handleLoad = () => {
//                 setLoadedSrc(src);
//             };
//             const image = new Image();
//             image.addEventListener('load', handleLoad);
//             image.src = src;
//             return () => {
//                 image.removeEventListener('load', handleLoad);
//             };
//         }
//     }, [src]);

//     if (loadedSrc === props.src) {
//         return (
//             <img {...props} />
//         );
//     }
//     return null;
// }
