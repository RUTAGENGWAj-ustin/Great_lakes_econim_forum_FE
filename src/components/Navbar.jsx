import { Link } from "react-router-dom";

'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  ChevronRightIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
  


  
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'

const products = [
  { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
  { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
  { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
  { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
  { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
]
const others = [
  { name: 'News & Updates', link1: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
  { name: 'Sponsors & Partners', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
  { name: 'Get Involved', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
  { name: 'Gallery', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
  
]
const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
]
 
function Navbar() {


    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const [isOpen, setIsOpen] = useState(false);

    // Function to toggle dropdown
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  return (

    <header className="fixed top-0 right-0 left-0 bg-white z-10">
    <nav aria-label="Global" className="mx-auto flex max-w-full items-center justify-between p-6 lg:px-8">
      <div className="flex lg:flex-1">
        <a href="#" className="-m-1.5 p-1.5">
          <span className="sr-only">Great Lake Economic Forum</span>
          <img
            alt=""
            src="../public/logo/logo.png"
            className="h-18 w-auto"
          />
        </a>
      </div>
      <div className="flex lg:hidden">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
        >
          <span className="sr-only">Open main menu</span>
          <Bars3Icon aria-hidden="true" className="size-6" />
        </button>
      </div>
      <PopoverGroup className="hidden lg:flex lg:gap-x-12">
      <Link to="/"  className="text-sm/6 font-semibold text-gray-900 hover:text-green-600">
          Home
        </Link>
        <Link to="/events"className="text-sm/6 font-semibold text-gray-900 hover:text-green-600">Events</Link> 
        <Link to="/speakers" className="text-sm/6 font-semibold text-gray-900 hover:text-green-600">Speakers & Expert</Link> 
        <Link to="/about" className="text-sm/6 font-semibold text-gray-900 hover:text-green-600">About Us </Link> 
        <Link to="/gallery"  className="text-sm/6 font-semibold text-gray-900 hover:text-green-600">
          Gallary
        </Link>
        <div className="relative">
          {/* Dropdown Button */}
          <button
            onClick={toggleDropdown}
            className="text-sm/6 font-semibold text-gray-900 hover:text-green-600"
          >
            Others
          </button>

          {/* Dropdown Content */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
             <Link to="/news"  onClick={toggleDropdown}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                News
              </Link>
             <Link to="/contact"  onClick={toggleDropdown}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Contact Us
              </Link>
            </div>
          )}
        </div>
      
      </PopoverGroup>
      <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        <a href="/Login" className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded-md">
          Login <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </nav>
    <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
      <div className="fixed inset-0 z-10" />
      <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt=""
              src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-auto"
            />
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              <Disclosure as="div" className="-mx-3">
                <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                  Product
                  <ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-open:rotate-180" />
                </DisclosureButton>
                <DisclosurePanel className="mt-2 space-y-2">
                  {[...products, ...callsToAction].map((item) => (
                    <DisclosureButton
                      key={item.name}
                      as="a"
                      href={item.href}
                      className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </DisclosureButton>
                  ))}
                </DisclosurePanel>
              </Disclosure>
              <a
                href="#"
                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
              >
                Features
              </a>
              <a
                href="#"
                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
              >
                Marketplace
              </a>
              <a
                href="#"
                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
              >
                Company
              </a>
            </div>
            <div className="py-6">
              <a
                href="#"
                className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
              >
                Log in
              </a>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
  );
}




export default Navbar;
