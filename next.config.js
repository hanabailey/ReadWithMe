/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      }
    ]
  },


}
// module.exports = {
//   async rewrites() {
//     return [
//       {
//         source: '/api/:path*',
//         destination: 'https://openapi.naver.com/v1/search/book.json/:path*', // 프록시할 API 도메인과 경로
//       },
//     ];
//   },
// };




// module.exports = {
//   async headers() {
//     return [
//       {
//         source: '/api/:path*', // API 경로에 따라 변경
//         headers: [
//           {
//             key: 'Access-Control-Allow-Origin',
//             value: '*', // 허용할 도메인을 지정 (모든 도메인 허용 시 '*')
//           },
//         ],
//       },
//     ];
//   },
// };

module.exports = nextConfig
