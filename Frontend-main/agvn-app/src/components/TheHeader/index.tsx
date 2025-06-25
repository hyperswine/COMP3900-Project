// @ts-nocheck
'use client';

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import Cookies from 'universal-cookie';
import { motion } from 'framer-motion';
import Link from 'next/link';
import LogoAnimateVariants from '../2DAnimations'

async function randomQuote() {
  const response = await fetch('https://api.quotable.io/random')
  const data = await response.json()
  console.log(`${data.content} —${data.author}`)
  return data
}

export interface BannerProps {
  title: string,
  subtitle?: string,
  quote?: string,
  author?: string,
  imgUrl?: string,
  display?: boolean,
}

export function Banner({ title, subtitle, quote, author, imgUrl, display = true }: BannerProps) {
  const [currentQuote, setCurrentQuote] = React.useState(quote || '')
  const [currentAuthor, setCurrentAuthor] = React.useState(author || '')

  React.useEffect(() => {
    if (!quote || !author) {
      randomQuote().then((d) => {
        setCurrentQuote(d.content)
        setCurrentAuthor(d.author)
      })
    }
  }, [])

  return (
    <div className="bg-gray-800 text-gray-300 p-20">
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col w-full lg:w-1/2 items-center mb-8 lg:mb-0">
          <motion.div whileHover={{ color: "#dc2626", transition: { spring: "infinite" } }}>
            <h1 className="text-4xl font-bold text-center">{title}</h1>
          </motion.div>
          {subtitle && (
            <>
              <hr className="w-40 border-gray-400 my-4" />
              <motion.p
                whileHover={{ skew: 5, textShadow: "0 0 10px", transition: { yoyo: "infinite" } }}
                className="text-lg text-center"
              >
                {subtitle}
              </motion.p>
            </>
          )}
        </div>
        <div className="flex flex-col w-full lg:w-1/2">
          <motion.div whileHover={{ skew: 2.5, textShadow: "0 0 10px", transition: { spring: "infinite" } }}>
            <h2 className="text-sm font-bold mb-2">"{currentQuote}"</h2>
          </motion.div>
          {currentAuthor && (
            <p className="ml-8 text-sm">- {currentAuthor}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default function TheHeader() {
  const router = useRouter();
  const [auth, setAuth] = React.useState(false);
  const cookies = new Cookies();
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const logo = "/assets/AGVN_white_transparent.png";
  const aeros = "/assets/aeros_logo.svg";

  React.useEffect(() => {
    if (cookies.get('token') !== undefined) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // You can implement actual theme switching logic here
  };

  const logout = () => {
    cookies.remove('token');
    router.push('/');
  };

  const mainNavItems = [
    { label: 'About', href: '/about' },
    { label: 'Actions', href: '/actions' },
    { label: 'Policies', href: '/policies' },
  ];

  const actionNavItems = [
    { label: 'Vote', href: '/vote' },
    { label: 'Poll', href: '/poll' },
    { label: 'Contribute', href: '/contribute' },
  ];

  const otherItems = [
    { label: 'Departments', href: '/departments' },
    { label: 'Initiatives', href: '/initiatives' },
    { label: 'Results', href: '/results' },
    { label: 'Budget', href: '/budget' },
  ];

  return (
    <header className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-800 text-gray-300'} shadow-lg`}>
      {/* Top navigation bar */}
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <motion.img
              src={logo}
              width={80}
              height={60}
              className="cursor-pointer rounded-lg"
              alt="AGVN Logo"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6 text-sm">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-blue-400 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Secondary navigation */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <motion.div whileHover={{ skew: 20, transition: { yoyo: "infinite" } }}>
              <Link href="/" className="text-sm hover:text-blue-400">
                Auto Governing System | Australia
              </Link>
            </motion.div>

            <div className="flex items-center space-x-4">
              <Link href="/aeros">
                <motion.img
                  src={aeros}
                  width={60}
                  height={30}
                  variants={LogoAnimateVariants}
                  whileHover="hover"
                  className="cursor-pointer"
                  alt="Aeros"
                />
              </Link>

              {auth && (
                <Link href="/notifications" className="hover:text-blue-400">
                  <Bell size={20} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Mobile menu button */}
            <button
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <List size={24} />}
            </button>

            {/* Desktop navigation */}
            <nav className="hidden lg:flex space-x-6">
              {actionNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                >
                  {item.label}
                </Link>
              ))}

              {/* Others dropdown - simplified for now */}
              <div className="relative group">
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors">
                  Others
                </button>
                <div className="absolute top-full left-0 mt-1 w-48 bg-gray-700 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  {otherItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 hover:bg-gray-600 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>

            {/* User actions */}
            <div className="flex items-center space-x-4">
              {!auth ? (
                <Link href="/auth/signin" className="hover:text-blue-400">
                  Login
                </Link>
              ) : (
                <>
                  <Link href="/profile" className="hover:text-blue-400">
                    <Person size={20} />
                  </Link>
                  <Link href="/settings" className="hover:text-blue-400">
                    <motion.div whileHover="hoverthree" variants={LogoAnimateVariants}>
                      <Gear size={20} />
                    </motion.div>
                  </Link>
                </>
              )}

              <button onClick={toggleTheme} className="hover:text-blue-400">
                <motion.div
                  whileHover="hoverfive"
                  variants={LogoAnimateVariants}
                  className="rounded-full"
                >
                  <Sun size={20} />
                </motion.div>
              </button>

              {auth && (
                <button onClick={logout} className="hover:text-blue-400">
                  Logout
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 border-t border-gray-700 pt-4">
              <div className="space-y-2">
                {[...actionNavItems, ...otherItems].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}