import { useCallback } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

const ParticlesBG = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
      }}
      options={{
        background: { color: { value: 'transparent' } },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: { enable: true, mode: 'repulse' },
            onClick: { enable: true, mode: 'push' },
          },
          modes: {
            repulse: { distance: 100, duration: 0.4 },
            push:    { quantity: 2 },
          },
        },
        particles: {
          color: { value: ['#64ffda', '#a78bfa', '#f472b6', '#38bdf8'] },
          links: {
            color: '#64ffda',
            distance: 150,
            enable: true,
            opacity: 0.08,
            width: 1,
          },
          move: {
            direction: 'none',
            enable: true,
            outModes: { default: 'bounce' },
            random: false,
            speed: 0.6,
            straight: false,
          },
          number: {
            density: { enable: true, area: 900 },
            value: 70,
          },
          opacity: {
            value: { min: 0.1, max: 0.4 },
            animation: { enable: true, speed: 1, minimumValue: 0.1 },
          },
          shape: { type: 'circle' },
          size: {
            value: { min: 1, max: 3 },
            animation: { enable: true, speed: 2, minimumValue: 0.5 },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticlesBG;
