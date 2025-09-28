// List of remote hostnames for images
const remoteHostnames = [
  "placehold.co",
  "picsum.photos",
  "cdn-1.webcatalog.io",
  "thumbnails.gamenora.com",
  "play-lh.googleusercontent.com",
  "m.funkypotato.com",
  "rocketgames.imgix.net",
  "static.wikia.nocookie.net",
  "avatars.githubusercontent.com",
  "lh4.googleusercontent.com",
  "i.imgur.com",
  "www.inet-web.com",
  "iili.io",
  "gamepluto.com",
  "a.silvergames.com",
  "1games.io",
  "m.media-amazon.com",
  "img.poki-cdn.com"
];

const nextConfig = {
  output: "export",
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    unoptimized: true,
    remotePatterns: remoteHostnames.map((hostname) => ({
      protocol: "https",
      hostname,
      pathname: "/**"
    }))
  }
};

export default nextConfig;
