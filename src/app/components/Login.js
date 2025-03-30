'use client'
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { TbCards } from 'react-icons/tb';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslations } from "@/hooks/useTranslations";

export default function Login() {
  const router = useRouter();
  const hasShownToast = useRef(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const t = useTranslations('auth');

  // Show unauthorized page accesses
  // useEffect(() => {
  //   const error = useSearchParams.get('error');
  //   if (error === 'unauthorized' && !hasShownToast.current) {
  //     console.log("ERROR");
  //     toast.error("You must be logged in to access the page.");
  //     hasShownToast.current = true;

  //     setTimeout(() => {
  //       router.replace('/login', undefined, { shallow: true });
  //     }, 100);
  //   }

  // }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("in handleSubmit")

    try {
      const response = await fetch("/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email, password}),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
        return;
      }

      if (data.email === "admin@admin.com") {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

      <ToastContainer position="bottom-right"/>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className='w-full h-full flex justify-center items-center'>
          <TbCards className='text-5xl'/>
        </div>
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          {t('login.title')}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
              {t('login.emailLabel')}
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                onChange={(e)=>setEmail(e.target.value)}
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                {t('login.passwordLabel')}
              </label>
              <div className="text-sm">
                <a href="/forgot-password" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  {t('login.forgotLabel')}
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                onChange={(e)=>setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {t('login.button')}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          {t('login.signupLabel')}{' '}
          <a href="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
            {t('login.signupButton')}
          </a>
        </p>
      </div>
    </div>
  )
}