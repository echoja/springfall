"use client";

import { Dialog, Transition } from "@headlessui/react";
import {
  ArrowDownOnSquareIcon,
  Bars3Icon,
  HomeIcon,
  ListBulletIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import type { LayoutWrapper } from "@modules/content/types";
import Link from "next/link";
import { Fragment, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

import useAdminAuth from "../auth/use-admin-auth";

const AdminLayoutWrapper: LayoutWrapper = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigation = useMemo(() => {
    return [
      {
        name: "대시보드",
        href: "/admin",
        icon: HomeIcon,
        // current: pathname === "/admin",
        current: false,
      },
      {
        name: "게시글 목록",
        href: "/admin/post/list/1",
        icon: ListBulletIcon,
        // current: pathname?.startsWith("/admin/post/list"),
        current: false,
      },
      {
        name: "가져오기",
        href: "/admin/import",
        icon: ArrowDownOnSquareIcon,
        // current: pathname?.startsWith("/admin/import"),
        current: false,
      },
    ];
  }, []);

  const currentTitle = useMemo(() => {
    const current = navigation.find((n) => n.current);
    if (current) {
      return current.name;
    }
    return "Monnomlog";
  }, [navigation]);

  useAdminAuth();

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div className="font-sans">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex flex-col flex-1 w-full max-w-xs bg-white">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 pt-2 -mr-12">
                      <button
                        type="button"
                        className="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="w-6 h-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                    {/* <div className="flex items-center flex-shrink-0 px-4">
                      <img
                        className="w-auto h-8"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                      />
                    </div> */}
                    <nav className="px-2 mt-5 space-y-1">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={twMerge(
                            item.current
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                            "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                          )}
                        >
                          <item.icon
                            className={twMerge(
                              item.current
                                ? "text-gray-500"
                                : "text-gray-400 group-hover:text-gray-500",
                              "mr-4 flex-shrink-0 h-6 w-6"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      ))}
                    </nav>
                  </div>
                  <div className="flex flex-shrink-0 p-4 border-t border-gray-200">
                    <a href="#nothing" className="flex-shrink-0 block group">
                      <div className="flex items-center">
                        <div>
                          <img
                            className="inline-block w-10 h-10 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                            Tom Cook
                          </p>
                          <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                            View profile
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="flex-shrink-0 w-14">
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-1 min-h-0 bg-white border-r border-gray-200">
            <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
              {/* <div className="flex items-center flex-shrink-0 px-4">
                <img
                  className="w-auto h-8"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt="Your Company"
                />
              </div> */}
              <nav className="flex-1 px-2 mt-5 space-y-1 bg-white">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={twMerge(
                      item.current
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    )}
                  >
                    <item.icon
                      className={twMerge(
                        item.current
                          ? "text-gray-500"
                          : "text-gray-400 group-hover:text-gray-500",
                        "mr-3 flex-shrink-0 h-6 w-6"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex flex-shrink-0 p-4 border-t border-gray-200">
              <a href="#nothing" className="flex-shrink-0 block w-full group">
                <div className="flex items-center">
                  <div>
                    <img
                      className="inline-block rounded-full h-9 w-9"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      Tom Cook
                    </p>
                    <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                      View profile
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 md:pl-64">
          <div className="sticky top-0 z-10 pt-1 pl-1 bg-gray-100 sm:pl-3 sm:pt-3 md:hidden">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1">
            <div className="py-6">
              <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">
                  {currentTitle}
                </h1>
              </div>
              <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
                {/* Replace with your content */}
                {children}
                {/* <div className="py-4">
                  <div className="border-4 border-gray-200 border-dashed rounded-lg h-96" />
                </div> */}
                {/* /End replace */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

// const AdminLayoutWrapper: LayoutWrapper = ({ page }) => {
//   useAdminAuth();

//   return (
//     <div className="flex mx-auto">
//       <div className="w-64 p-8">
//         <h2 className="text-lg font-bold">관리자</h2>
//         <hr className="mt-3 mb-4" />
//         <Link href="/admin/post/list/1">게시글 목록</Link>
//       </div>
//       <main className="flex-1 m-8">{page}</main>
//     </div>
//   );
// };

// export default AdminLayoutWrapper;

export default AdminLayoutWrapper;
