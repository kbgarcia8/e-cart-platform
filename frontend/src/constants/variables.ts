export const v:Record<string, Record<string, string|number>> = {
    base: {
        fontSize: '14px',
        spacing: '24px',
        lineHeight: '1.2',
    },
    fonts: {
        primary: 'Comfortaa',
        secondary: 'Raleway',
        tertiary: 'Lato',
        additional: 'Proxima',
        fallback: 'system-ui, -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Oxygen, Ubuntu, Cantarell, \'Open Sans\', \'Helvetica Neue\', sans-serif',
    },
    fontWeight : {
        light: 300,
        regular: 400,
        medium: 500,
        bold: 700,
        bolder: 900,
    },
    fontSize: {
        xxxsmall: '0.35rem',
        xxsmall: '0.55rem',
        xsmall: '0.75rem',
        small: '1rem',
        medium: '1.25rem',
        large: '1.5rem',
        xlarge: '1.75rem',
        xxlarge: '2rem',
        xxxlarge: '2.25rem',
        giga: '3rem',
        mega: '3.5rem',
    },
    spacing: {
        xxxsmall: '0.25rem',
        xxsmall: '0.375rem',
        xsmall: '0.5rem',
        small: '0.75rem',
        medium: '1.25rem',
        large: '2rem',
        xlarge: '3.25rem',
        xxlarge: '5.25rem',
        xxxlarge: '8.5rem',
    },
    borderRadius: {
        xsmall: '0.125rem',
        small: '0.25rem',
        medium: '0.5rem',
        large: '1rem',
        xlarge: '2rem',
        circle: '50%',
    },
    borderThickness: {
        thin: '0.0625rem',
        light: '0.125rem',
        medium: '0.25rem',
        thick: '0.5rem',
    },
    width : {
        fixed_xsmall: '50px',
        fixed_small: '150px',
        fixed_medium: '300px',
        fixed_large: '500px',
        quarter: '25%',
        half: '50%',
        third: '75%',
        full: '100%'        
    },
    breakpoints: {
        mobile: '320px', //Small iPhone SE & Medium: iPhone 12-15
        tablet: '768px', //iPad 
        laptop: '1024px', //Macbook 13" (1280x800)
        desktop: '1440px',
        largeDesktop: '1920px'
    }
};