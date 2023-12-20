"use client";

import { Dialog, Transition } from "@headlessui/react";
import React from "react";
import { ClipLoader } from "react-spinners";

const LoadingModal = () => {
  // return /*#__PURE__*/React.createElement("div", {
  //     className: "fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center"
  // }, /*#__PURE__*/React.createElement("div", {
  //     className: "bg-white rounded-lg p-5 flex items-center"
  // }, /*#__PURE__*/React.createElement("div", {
  //     className: "animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"
  // })));

  return (
    <Transition.Root show as={React.Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => {}}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-gray-100 bg-opacity-50 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <Dialog.Panel>
                <ClipLoader size={40} color="#0284c7" />
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default LoadingModal;
