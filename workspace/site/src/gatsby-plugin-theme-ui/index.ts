import { Theme, ThemeUIStyleObject } from 'theme-ui'

type Variants = {
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

const theme: Theme & Variants = {
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
    text: '#505050',
    background: '#fff',
    primary: '#07c',
    secondary: '#30c',
    muted: '#999',
    dark: '#2d2d2d',
    warning: '#f00',
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
    },
    h2: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 4,
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
      color: 'primary',
      borderBottomWidth: '2px',
      borderBottomColor: 'transparent',
      borderBottomStyle: 'solid',
      textDecoration: 'none',
      transition: 'all 0.2s ease-in-out',
      ':hover, :focus': {
        borderBottomColor: 'primary',
      },
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
    },
    toc: {
      root: {},
      link: {
        variant: 'styles.a',
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
      padding: 3,
      fontSize: 3,
      variant: 'styles.a',
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
      p: 2,
    },
    title: {
      fontSize: 1,
      p: 2,
      textAlign: 'center',
      color: 'muted',
    },
  },
}

export default theme
