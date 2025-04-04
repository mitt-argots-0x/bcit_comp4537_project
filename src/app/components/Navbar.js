'use client'
import { useEffect, useState } from 'react'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { TbCards } from 'react-icons/tb'
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify'
import { useTranslations } from '@/hooks/useTranslations';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NavBar() {
  const t = useTranslations('navbar');
  const router = useRouter();
  const [showSignOut, setShowSignOut] = useState(false);
  const navigation = [
    { name: t('page.dashboardLabel'), href: '/dashboard', current: false },
    { name: t('page.homeLabel'), href: '/', current: false },
    { name: t('page.gameLabel'), href: '/game', current: false },
  ]

  useEffect(() => {
    const checkSession = async () => {
      const res = await fetch('/api/v1/session');
      const data = await res.json();
      setShowSignOut(data.isLoggedIn);
    };
    checkSession();
  }, []);

  const signOut = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/v1/signout", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
        return;
      }

      setShowSignOut(false);
      router.push('/')
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Disclosure as="nav" className="bg-gray-800">
      <ToastContainer position='bottom-left' />
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">{t('title')}</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <a className="flex items-center" href='/'>
              <TbCards className='text-white text-xl lg:text-3xl' />
            </a>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium',
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {showSignOut && (
              <button
                type="button"
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                onClick={signOut}
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">{t('signoutLabel')}</span>
                {t('signoutLabel')}
              </button>
            )}

          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
