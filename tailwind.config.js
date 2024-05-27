/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
export default {
  content: ["./src/**/*.{vue,js,ts}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui,],
  daisyui: {
    themes: ["light", "dark", "cupcake","retro","winter",

    {
      mytheme:{
        "primary": "#409eff",
          
 "secondary": "#e1ffff",
          
 "accent": "#d0ffff",
          
 "neutral": "#f3ffff",
          
 "base-100": "#fcffff",
          
 "info": "#fff0ff",
          
 "success": "#eeffd6",
          
 "warning": "#fffbb9",
          
 "error": "#ffdee4",

      }
    }
    ],
  },
}

