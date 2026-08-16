import "./globals.css"

export const metadata = {
  title: "Ryven",
  description: "Bio-Link Ryven",
  author: "Ryven",
  keywords: "ryven, venzy, ryzen, fikk, fikri, ryvenz",
    robots: {
    index: true,
    follow: true,
  },
}

export default function Layout({ children }) {
  return (
    <html lang="id">
      <body className="bg-black grid-bg text-white min-h-screen font-sans transition-colors duration-300">
        {children}
      </body>
    </html>
  )
}
