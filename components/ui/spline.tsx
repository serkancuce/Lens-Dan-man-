
'use client'

import { Suspense, lazy } from 'react'

const Spline = lazy(() => 
  import('@splinetool/react-spline')
    .then(module => {
      // Robust check for various ESM export types
      if (module.default) return { default: module.default };
      if (module.Spline) return { default: module.Spline };
      return { default: () => <div className="text-red-400 p-4">Error loading 3D Module</div> };
    })
)

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <span className="loader"></span>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
      />
    </Suspense>
  )
}
