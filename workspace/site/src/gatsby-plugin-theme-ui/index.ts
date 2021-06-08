import { Theme, ThemeUIStyleObject } from 'theme-ui'

type Variants = {
  post: {
    title: ThemeUIStyleObject
    metadata: ThemeUIStyleObject
  }
  nav: {
    left: ThemeUIStyleObject
    right: ThemeUIStyleObject
    root: ThemeUIStyleObject
    link: ThemeUIStyleObject
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
    muted: '#f6f6f6',
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
    },
    pre: {
      fontFamily: 'monospace',
      overflowX: 'auto',
      code: {
        color: 'inherit',
      },
    },
    code: {
      fontFamily: 'monospace',
      fontSize: 'inherit',
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
      maxWidth: '100%',
    },
  },
  post: {
    title: {
      fontSize: 6,
      fontWeight: 'heading',
    },
    metadata: {
      fontSize: 1,
      fontStyle: 'italic',
    },
  },
  nav: {
    root: {
      boxShadow: '0 1px 1px rgba(0, 0, 0, 0.05)',
    },
    left: {
      fontWeight: 'heading',
      fontFamily: 'monospace',
    },
    right: {},
    link: {
      color: 'text',
      transition: 'color 0.3s ease-in-out',
      ':hover,:focus': {
        color: 'primary',
      },
    },
  },
}

export default theme
