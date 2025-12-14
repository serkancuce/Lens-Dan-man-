
import React from 'react';

interface BrandLogoProps {
  brand: string;
}

const BrandLogo: React.FC<BrandLogoProps> = ({ brand }) => {
  const brandLogos: { [key: string]: React.ReactNode } = {
    'Essilor': (
        <svg
            className="h-6 w-auto mx-auto"
            viewBox="0 0 155 35"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Essilor Logo"
        >
        <path d="M17.39 21.84V11.52h5.76v10.32h-5.76zm-6.88-10.32h5.76v10.32h-5.76V11.52zM3.63 11.52h5.76v10.32H3.63V11.52zM24.03 11.52h6.12v1.56h-6.12v-1.56zm0 5.4h6.12v1.56h-6.12v-1.56zM31.23 11.52h1.56v8.58h-1.56v-8.58zM37.83 11.52h5.76v7h-5.76v-7zM44.43 11.52h5.76v7h-5.76v-7zM51.03 21.84V11.52h5.76v10.32h-5.76zM58.71 23.07c-1.41 0-2.58-1.17-2.58-2.58s1.17-2.58 2.58-2.58 2.58 1.17 2.58 2.58-1.17 2.58-2.58 2.58zm0-3.54c-.58 0-1 .41-1 1s.42 1 1 1 1-.41 1-1-.42-1-1-1zM66.63 11.52h1.56v8.58h-1.56v-8.58zM73.23 11.52h5.76v7h-5.76v-7zM83.85 16.68c0-1.98-1.62-3.6-3.6-3.6s-3.6 1.62-3.6 3.6 1.62 3.6 3.6 3.6 3.6-1.62 3.6-3.6zm-5.76 0c0-1.14.96-2.1 2.16-2.1s2.1.96 2.1 2.1-.96 2.1-2.16 2.1-2.1-.96-2.1-2.1zM92.73 23.07h-1.56l-2.4-5h-1.56v5h-1.56V11.52h3.18c1.26 0 2.34 1.08 2.34 2.34s-1.08 2.34-2.34 2.34l2.4 3.9h-0.3zm-3.6-9h-1.62v1.56h1.62c.41 0 .84-.36.84-.81s-.42-.75-.84-.75z" />
      </svg>
    ),
    'Zeiss': (
      <svg
        className="h-8 w-auto mx-auto"
        viewBox="0 0 100 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Zeiss Logo"
      >
        <path d="M0 0h25v25H0V0z" fill="#0099D8" />
        <path
          d="M33.4 15.6V9.4h11.2v2.3H36.6v1.6h7.5v2.3H36.6v2.3h8.3v2.3H33.4v-4.6zM48 20.2h2.9V4.8H48v15.4zM54.3 18.2l5.8-9.9h3.2l-7.4 12v-12h-2.9v15.4h3.1l7.3-12v12h2.9V4.8h-4.8l-5.8 9.8V4.8h-2.9v15.4h3.2v-2z"
          fill="white"
        />
      </svg>
    ),
    'Hoya': (
        <svg
            className="h-6 w-auto mx-auto"
            viewBox="0 0 150 30"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Hoya Logo"
        >
        <path d="M9.4 25.1V4.9h6.6v20.2H9.4zM23.3 25.1V4.9h17.8v5.5h-11.2v1.3h9.1v5.5h-9.1v1.3h11.2v5.5H23.3zM48.5 25.1V4.9h6.6v20.2h-6.6zM62.4 25.1V4.9h6.6v20.2h-6.6zM76.4 25.1V4.9h6.6v10.2h9.3V4.9h6.6v20.2h-6.6v-5.4h-9.3v5.4h-6.6zM106.3 25.1V4.9h6.6v20.2h-6.6z" />
      </svg>
    ),
    'Fuji': (
        <svg
            className="h-6 w-auto mx-auto"
            viewBox="0 0 100 25"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Fuji Logo"
        >
            <path d="M0 25V0h11.2v10.8h10V0h11.2v25h-11.2V14.2h-10v10.8H0zM38.5 25V0h11.2v25h-11.2zM55.9 25V0h11.2v25h-11.2zM73.2 25V0h25.4v9.1H84.4v15.9h-11.2z" />
        </svg>
    ),
    'Rodenstock': (
        <svg
            className="h-6 w-auto mx-auto"
            viewBox="0 0 200 30"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Rodenstock Logo"
        >
            <path d="M10.7 28.5c-6.6 0-10.7-4-10.7-10.6V10.7C0 4.1 4.1 0 10.7 0h8.6c6.6 0 10.7 4 10.7 10.6v7.2c0 6.6-4.1 10.7-10.7 10.7h-8.6zM19.3 3.6c-4.4 0-7 2.6-7 7v7.2c0 4.4 2.6 7 7 7h.1c4.4 0 7-2.6 7-7v-7.2c0-4.4-2.6-7-7-7h-.1z" />
            <path d="M43.7 28.5c-6.6 0-10.7-4-10.7-10.6V10.7C33 4.1 37.1 0 43.7 0s10.7 4 10.7 10.6v7.2c0 6.6-4.1 10.7-10.7 10.7zm0-24.9c-4.4 0-7 2.6-7 7v7.2c0 4.4 2.6 7 7 7s7-2.6 7-7v-7.2c0-4.4-2.6-7-7-7z" />
            <path d="M78.6 28.1V0h3.6v28.1h-3.6zM96.7 28.5c-6.6 0-10.7-4-10.7-10.6V10.7C86 4.1 90.1 0 96.7 0s10.7 4 10.7 10.6v7.2c0 6.6-4.1 10.7-10.7 10.7zm0-24.9c-4.4 0-7 2.6-7 7v7.2c0 4.4 2.6 7 7 7s7-2.6 7-7v-7.2c0-4.4-2.6-7-7-7z" />
            <path d="M117.8 28.1V0h11.2c5.5 0 8.7 3.3 8.7 8.3s-3.2 8.3-8.7 8.3h-7.6v11.5h-3.6zm7.6-11.5c3.2 0 5.1-2 5.1-4.7s-1.9-4.7-5.1-4.7h-7.6v9.4h7.6z" />
            <path d="M149.2 28.1V0h3.6v14.4l9.1-14.4h4.5l-8.4 13.1 9.4 15h-4.6l-7.4-12.7-2.6 4.1v8.6h-3.6z" />
            <path d="M185.3 16.6l-8-16.6h4.3l5.9 12.4L193.4 0h4.2l-8 16.6v11.5h-3.6V16.6z" />
        </svg>
    ),
  };

  const logo = brandLogos[brand];

  if (logo) {
    return logo;
  }
  
  return <h3 className="text-white text-xl font-bold text-center">{brand}</h3>;
};

export default BrandLogo;
