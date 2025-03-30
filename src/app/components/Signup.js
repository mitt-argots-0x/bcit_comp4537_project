'use client';
import { useEffect, useState } from "react"
import { FaChess } from "react-icons/fa"
import { useRouter } from "next/navigation";
import { useTranslations } from "@/hooks/useTranslations";

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [message, setMessage] = useState('');
  const t = useTranslations('auth');

  // Load saved form data from localStorage when the component mounts
  useEffect(() => {
    const savedData = JSON.parse(sessionStorage.getItem("formData"));
    if (savedData) {
      setFormData(savedData); // Restore previous input values
    }
  }, []);

  // Save form data to localStorage when it changes
  useEffect(() => {
    sessionStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/v1/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Signup failed");

        // Preserve email while clearing only password fields on error
        setFormData(prevData => ({
          ...prevData,
          email: prevData.email,
          password: "",
          confirmPassword: ""
        }));
      } else {
        setMessage(data.message);
        setFormData({ email: "", password: "", confirmPassword: "" }); // Clear form on success
        sessionStorage.removeItem("formData"); // Clear stored data on successful submission
        sessionStorage.setItem("email", data.email);
        sessionStorage.setItem("sessionToken", data.sessionToken);
        router.push('/dashboard');
      }
    } catch (error) {
      setMessage("Submission failed");
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <FaChess className='text-white text-xl lg:text-3xl' />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            {t('signup.title')}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                {t('signup.emailLabel')}
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  {t('signup.passwordLabel')}
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  {t('signup.passwordConfirmLabel')}
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
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
                {t('signup.button')}
              </button>
            </div>
          </form>

        </div>
      </div>
    </>
  )
}