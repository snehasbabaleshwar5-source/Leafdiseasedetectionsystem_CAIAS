"use client"

import React, { useEffect, useState } from 'react';
import { Leaf } from 'lucide-react';

export function NatureDecor() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden select-none">
      {/* Birds */}
      <div className="bird">
        <svg width="40" height="20" viewBox="0 0 40 20" fill="currentColor" className="text-primary/40">
          <path className="bird-wing" d="M0 10 Q10 0 20 10 Q30 0 40 10 Q30 5 20 10 Q10 5 0 10" />
        </svg>
      </div>
      <div className="bird" style={{ animationDelay: '8s', top: '25%' }}>
        <svg width="30" height="15" viewBox="0 0 40 20" fill="currentColor" className="text-primary/30">
          <path className="bird-wing" d="M0 10 Q10 0 20 10 Q30 0 40 10 Q30 5 20 10 Q10 5 0 10" />
        </svg>
      </div>

      {/* Floating Leaves */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="leaf text-primary/10"
          style={{
            left: `${Math.random() * 100}%`,
            top: '110%',
            animationDelay: `${Math.random() * 15}s`,
            animationDuration: `${10 + Math.random() * 10}s`
          }}
        >
          <Leaf size={16 + Math.random() * 24} />
        </div>
      ))}
    </div>
  );
}
