export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-primary z-50 shadow-lg">
      <div className="w-full px-8">
        <div className="flex items-center justify-between h-20">
          {/* Solo scritta Ametyst a sinistra */}
          <h1 className="text-white text-2xl sm:text-3xl font-bold">
            Ametyst
          </h1>

          {/* Spazio per futuri elementi a destra */}
          <div className="flex items-center">
            {/* Link o CTA possono essere aggiunti qui */}
          </div>
        </div>
      </div>
    </nav>
  );
}
