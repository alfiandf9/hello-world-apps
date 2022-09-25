import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col h-screen bg-white">
      {children}
      <Footer />
    </div>
  )
}