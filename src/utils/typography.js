import Typography from 'typography';
import gray from 'gray-percentage';
import { MOBILE_MEDIA_QUERY } from 'typography-breakpoint-constants';

const typography = new Typography({
  title: 'Muli',
  baseFontSize: '16px',
  baseLineHeight: 1.6875,
  googleFonts: [
    {
      name: 'Muli',
      styles: ['200', '400', '400i', '700'],
    },
  ],
  headerFontFamily: ['Muli', 'sans-serif'],
  bodyFontFamily: ['Muli', 'sans-serif'],
  headerColor: 'hsla(0,0%,0%,0.8)',
  bodyColor: 'hsla(0,0%,0%,0.8)',
  headerWeight: 700,
  bodyWeight: 400,
  boldWeight: 700,
  overrideStyles: ({ adjustFontSizeTo, scale, rhythm }, options) => ({
    a: {
      color: options.bodyColor,
      textDecoration: 'none',
    },
    'a:hover,a:active': {
      color: 'hsla(0,0%,0%,0.9)',
      textDecoration: 'underline',
    },
    'a.inverse': {
      color: 'hsla(255,100%,100%,1)',
    },
    'a.inverse:hover,a.inverse:active': {
      color: 'hsla(255,100%,100%,1)',
    },
    'h2,h3,h4': {
      fontWeight: 200,
    },
    h1: {
      ...adjustFontSizeTo('42px'),
      fontWeight: 400,
    },
    h2: {
      ...adjustFontSizeTo('40px'),
    },
    h3: {
      ...adjustFontSizeTo('32px'),
    },
    h3: {
      ...adjustFontSizeTo('24px'),
    },
    blockquote: {
      ...scale(1 / 5),
      color: gray(41),
      paddingLeft: rhythm(13 / 16),
      marginLeft: 0,
      borderLeft: `${rhythm(3 / 16)} solid #fca206`,
    },
    'blockquote > :last-child': {
      marginBottom: 0,
    },
    'blockquote cite': {
      ...adjustFontSizeTo(options.baseFontSize),
      color: options.bodyColor,
      fontWeight: options.bodyWeight,
    },
    'blockquote cite:before': {
      content: '"— "',
    },
    'ul, li': {
      margin: 0,
      padding: 0,
    },
    [MOBILE_MEDIA_QUERY]: {
      blockquote: {
        marginLeft: rhythm(-3 / 4),
        marginRight: 0,
        paddingLeft: rhythm(9 / 16),
      },
    },
  }),
});

export default typography;
