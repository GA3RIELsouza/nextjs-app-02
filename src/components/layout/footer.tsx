export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-800  py-8">
      <div className="container mx-auto px-4 text-center">
        {/* <div className="flex justify-center items-center flex-wrap gap-x-6 gap-y-2 mb-4">
          <a href="#" className="text-gray-100 hover:text-blue-600 hover:underline">About Us</a>
          <a href="#" className="text-gray-100 hover:text-blue-600 hover:underline">Contact Us</a>
          <a href="#" className="text-gray-100 hover:text-blue-600 hover:underline">Careers</a>
          <a href="#" className="text-gray-100 hover:text-blue-600 hover:underline">Privacy Policy</a>
          <a href="#" className="text-gray-100 hover:text-blue-600 hover:underline">Terms of Service</a>
        </div> */}
        <p className="text-sm text-gray-400 border-t-2 border-gray-100 pt-4">
          © {currentYear} Sua Empresa. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}