import Image from 'next/image'

const Navbar = () => (
  <nav className="w-full h-20 bg-white sticky top-0">
    <div className="container mx-auto px-4 h-full">
      <div className="flex justify-between items-center h-full">
        <Image
          src="/aldo.svg"
          alt="Aldo logo"
          width={100}
          height={24}
          priority
        />
      </div>
    </div>
  </nav>
)

export default Navbar
