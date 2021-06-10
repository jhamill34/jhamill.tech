import { Theme, ThemeUIStyleObject } from 'theme-ui'

type Variants = {
  links: {
    base: ThemeUIStyleObject
    navigation: ThemeUIStyleObject
    inline: ThemeUIStyleObject
  }
  post: {
    title: ThemeUIStyleObject
    metadata: ThemeUIStyleObject
    toc: {
      root: ThemeUIStyleObject
      heading: ThemeUIStyleObject
      link: ThemeUIStyleObject
    }
  }
  nav: {
    left: ThemeUIStyleObject
    right: ThemeUIStyleObject
    root: ThemeUIStyleObject
    link: ThemeUIStyleObject
  }
  code: {
    root: ThemeUIStyleObject
    button: ThemeUIStyleObject
    title: ThemeUIStyleObject
  }
}

const headingEffect: ThemeUIStyleObject = {
  position: 'relative',
  display: 'inline-block',
  '::before': {
    content: "''",
    width: '20%',
    height: '0.1em',
    backgroundColor: 'primary',
    display: 'block',
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: -1,
    transition: 'transform 0.3s ease-in-out',
    transformOrigin: 'bottom left',
  },
  ':hover': {
    '::before': {
      transform: 'scaleY(2) scaleX(5)',
    },
  },
}

const theme: Theme & Variants = {
  breakpoints: ['600px', '980px'],
  initialColorModeName: 'light',
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body: '"Roboto", sans-serif',
    heading: '"Open Sans", sans-serif',
    monospace: 'Menlo, monospace',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  colors: {
    text: '#1d1d1d',
    background: '#eee',
    primary: '#5e35b1',
    secondary: '#4527a0',
    muted: '#999',
    dark: '#2d2d2d',
    warning: '#f00',
    modes: {
      dark: {
        text: '#eee',
        background: '#1d1d1d',
        primary: '#9575cd',
        secondary: '#673ab7',
      },
    },
  },
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
      color: 'text',
      fontSize: 2,
    },
    h1: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 5,
      ...headingEffect,
    },
    h2: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 4,
      ...headingEffect,
    },
    h3: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 3,
    },
    h4: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 2,
    },
    h5: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 1,
    },
    h6: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 0,
    },
    p: {
      color: 'text',
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
    },
    a: {
      variant: 'links.inline',
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
    },
    th: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
    },
    td: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
    },
    img: {
      margin: 'auto',
      maxWidth: '100%',
      boxShadow: '0 4px 5px rgba(0, 0, 0, 0.3)',
    },
  },
  post: {
    title: {
      fontSize: 6,
      fontWeight: 'heading',
      fontFamily: 'heading',
      lineHeight: 'heading',
    },
    metadata: {
      fontSize: 1,
      fontStyle: 'italic',
      color: 'muted',
    },
    toc: {
      root: {
        position: [null, 'sticky'],
        top: 3,
      },
      link: {
        variant: 'links.navigation',
      },
      heading: {
        variant: 'styles.h3',
      },
    },
  },
  nav: {
    root: {
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
    },
    left: {
      fontWeight: 'heading',
      fontFamily: 'monospace',
    },
    right: {},
    link: {
      py: 3,
      fontSize: 3,
      variant: 'links.navigation',
    },
  },
  code: {
    root: {
      marginBottom: 3,
      marginTop: 3,
      borderRadius: 8,
      overflow: 'hidden',
      backgroundColor: 'dark',
      boxShadow: '0 4px 5px rgba(0, 0, 0, 0.3)',
      transition: 'all 0.2s ease-in-out',
      ':hover': {
        boxShadow: '0 6px 10px rgba(0, 0, 0, 0.2)',
      },
    },
    button: {
      color: 'muted',
      cursor: 'pointer',
      borderRadius: 4,
      fontSize: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
      borderBottomWidth: '4px',
      borderBottomStyle: 'solid',
      borderBottomColor: 'transparent',
      transition: 'all 0.3s ease-in-out',
      px: 2,
      paddingTop: 2,
      ':hover, :focus': {
        borderBottomColor: 'primary',
      },
    },
    title: {
      fontSize: 1,
      p: 2,
      textAlign: 'center',
      color: 'muted',
    },
  },
  links: {
    base: {
      color: 'primary',
      fontWeight: 'bold',
      textDecoration: 'none',
      cursor: 'pointer',
    },
    inline: {
      variant: 'links.base',
      borderBottomWidth: '4px',
      borderBottomStyle: 'solid',
      borderBottomColor: 'transparent',
      transition: 'border-bottom-color 0.1s ease-in-out',
      ':hover,:focus': {
        borderBottomColor: 'primary',
      },
    },
    navigation: {
      variant: 'links.base',
      display: 'inline-block',
      '::before': {
        fontFamily: 'monospace',
        content: "'{'",
        marginRight: 1,
        display: 'inline-block',
        opacity: 0,
        transform: 'translateX(20px)',
        transition: 'all 0.2s ease-in-out',
      },
      '::after': {
        fontFamily: 'monospace',
        content: "'}'",
        marginLeft: 1,
        display: 'inline-block',
        opacity: 0,
        transform: 'translateX(-20px)',
        transition: 'all 0.2s ease-in-out',
      },
      ':hover,:focus': {
        '::before, ::after': {
          opacity: 1,
          transform: 'translateX(0)',
        },
      },
    },
  },
}

export default theme
