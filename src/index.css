@import "tailwindcss";

/* Custom animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

.animate-slide-up {
  animation: slideUp 0.3s ease-out;
}

/* Custom component classes using @utility (Tailwind v4 way) */
@utility glass-effect {
  background-color: rgb(255 255 255 / 0.8);
  backdrop-filter: blur(16px);
  
  @media (prefers-color-scheme: dark) {
    background-color: rgb(31 41 55 / 0.8);
  }
}

@utility input-field {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid rgb(229 231 235);
  background-color: white;
  outline: none;
  transition: all 0.2s;
  
  &:focus {
    ring: 2px solid rgb(59 130 246);
    border-color: transparent;
  }
  
  @media (prefers-color-scheme: dark) {
    background-color: rgb(17 24 39);
    border-color: rgb(55 65 81);
  }
}

@utility btn-primary {
  padding: 0.75rem 1.5rem;
  background-image: linear-gradient(to right, rgb(37 99 235), rgb(29 78 216));
  color: white;
  border-radius: 0.75rem;
  font-weight: 600;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  transition: all 0.2s;
  
  &:hover {
    background-image: linear-gradient(to right, rgb(29 78 216), rgb(30 64 175));
    transform: scale(1.05);
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
  }
}

@utility btn-secondary {
  padding: 0.5rem 1rem;
  background-color: rgb(229 231 235);
  color: rgb(55 65 81);
  border-radius: 0.5rem;
  transition: all 0.2s;
  
  &:hover {
    background-color: rgb(209 213 219);
  }
  
  @media (prefers-color-scheme: dark) {
    background-color: rgb(55 65 81);
    color: rgb(229 231 235);
    
    &:hover {
      background-color: rgb(75 85 99);
    }
  }
}

@utility card {
  border-radius: 1rem;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
  padding: 1.5rem;
  border: 1px solid rgb(229 231 235 / 0.5);
  
  @apply glass-effect;
  
  @media (prefers-color-scheme: dark) {
    border-color: rgb(55 65 81 / 0.5);
  }
}

/* Base styles */
@layer base {
  body {
    background-image: linear-gradient(to bottom right, rgb(249 250 251), rgb(243 244 246));
    min-height: 100vh;
  }
  
  @media (prefers-color-scheme: dark) {
    body {
      background-image: linear-gradient(to bottom right, rgb(17 24 39), rgb(31 41 55));
    }
  }
}