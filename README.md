# Varia
This is a personal coding project about a UI theme creator


# Project Structure
```
src/
├── components/             # Reusable Svelte components
│ └── Button.svelte         # Example of a Svelte component
├── lib/                    # Utility functions
├── styles/                 # Global Sass styles
│ ├── _variables.scss       # Base colors, fonts, spacing etc.
│ ├── _mixins.scss          # Basic mixins
│ ├── _index.scss           # Forwards all the styles to be reused across the app (used once in the preprocessor)
│ ├── base/                 
│ │ └── _reset.scss         # CSS reset (for browsers, imported once in main.ts)
│ └── components/           # Specific styles for each component
│ └── button.scss           # Styles for the Button component (forward it in _index.scss)
├── App.svelte              # Entry point of the app
└── main.ts
```

# Styling Approach
- **Global tokens & mixins** are defined in ```src/styles/_variables.scss``` and ```src/styles/_mixins.scss```.
- These are re-exported via ```src/styles/_index.scss```.
    - Styles from this file are made available by using it in Vite Preprocessor (```vite.config.ts```)
    ```ts 
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@use "/src/styles/_index.scss" as *;'
            }
        }
    },
    ```
- **Reset styles** (```src/styles/base/_reset.scss```) are loaded once globally in ```main.ts```.
- Each component has a **dedicated SCSS file** inside ```src/styles/components/```
    - **This file needs to be forwarded in ```_index.scss``` to be accessible in the corresponding Svelte component**


# Development
- Run dev server:
```bash 
npm run dev
```

