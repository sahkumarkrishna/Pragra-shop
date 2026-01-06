import React from 'react'

const Footer = () => {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto px-4 py-5 flex items-center justify-center">

        <p className="text-sm text-gray-500 text-center">
          © {new Date().getFullYear()} All Rights Reserved.
        </p>

      </div>
    </footer>
  )
}

export default Footer
