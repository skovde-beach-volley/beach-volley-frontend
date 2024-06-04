// export default {
//   content: ['./index.html', './src//*.{vue,js,ts,jsx,tsx}', './node_modules/flowbite//*.js'],
//   theme: {
//     extend: {}
//   },
//   plugins: [require('flowbite/plugin')]
// }

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx,vue}',
    'node_modules/flowbite/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {},
  plugins: [require('flowbite/plugin')]
}

// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     './index.html',
//     './src/**/*.{vue,js,ts,jsx,tsx}',
//     'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx,vue}',
//     'node_modules/flowbite/**/*.{js,jsx,ts,tsx}'
//   ],
//   theme: {
//     extend: {
//       colors: {
//         pink: '#e837b6',
//         purple: '#c143ae',
//         blue: '#8bb8e2',
//         white: '#f5f5f5',
//         darkblue: '#2C3E50'
//       },
//       fontFamily: {
//         sans: ['Helvetica', 'Arial', 'sans-serif']
//       },
//       typography: (theme) => ({
//         DEFAULT: {
//           css: {
//             h1: {
//               color: theme('colors.white'),
//               fontFamily: theme('fontFamily.sans').join(', '),
//               fontSize: '2.25rem', // exempelstorlek, justera efter behov
//               fontWeight: '700'
//             }
//           }
//         }
//       })
//     }
//   },
//   plugins: [require('flowbite/plugin')]
// }
