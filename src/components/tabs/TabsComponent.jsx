"use client";
import React, { useRef, useEffect, useState } from "react";

function TabsComponent({ items }) {
    const [selectedSection, setSelectedSection] = useState(0);
    const [selectedTitle, setSelectedTitle] = useState(0);
    const defaultBtnRef = useRef();

    useEffect(() => {
        if (defaultBtnRef.current) {
            defaultBtnRef.current.focus();
        }
    }, []);

    return (
        <div className='flex justify-center items-center py-8'>
            <div className='w-3/4 flex flex-col justify-start gap-y-6 '>
                <div className='flex items-center font-medium text-gray-700 text-sm border-b border-gray-200'>
                    {items
                        ? items.map((section, sectionIndex) =>
                              section.title.map((title, titleIndex) => (
                                  <button
                                      key={`${sectionIndex}.${titleIndex}`}
                                      ref={
                                          titleIndex === 0 && sectionIndex === 0
                                              ? defaultBtnRef
                                              : null
                                      }
                                      className='px-4 h-full rounded-sm uppercase text-[#55585B] hover:bg-[#89ceecba] hover:text-white hover:rounded-sm hover:text-base focus:drop-shadow-md focus:bg-[#72adc7ba] focus:text-white focus:rounded-sm focus:border-2 focus:border-gray-200 focus:text-semibold'
                                      onClick={() => {
                                          setSelectedSection(sectionIndex);
                                          setSelectedTitle(titleIndex);
                                      }}
                                  >
                                      {title}
                                  </button>
                              ))
                          )
                        : null}
                </div>
                <div className='bg-[#EDF1F3] p-1 m-2 rounded flex items-start text-sm font-base text-gray-700 '>
                    {items
                        ? items.map((item, index) => (
                              <div
                                  key={index}
                                  className={`${
                                      selectedSection === index
                                          ? "border-2 border-gray-200 rounded-lg p-4"
                                          : "hidden"
                                  }`}
                              >
                                  <h1 className='text-3xl text-[#72adc7]'>
                                      {item.content.title}
                                  </h1>
                                  <p className='text-[#3A3A3A] mt-8'>
                                      {item.content.text}
                                  </p>
                                  {selectedSection === index &&
                                      selectedTitle === 1 && (
                                          <div
                                              key={`${index + 1}`}
                                              className='border-2 border-gray-200 rounded-lg p-4'
                                          >
                                              {item.location}
                                          </div>
                                      )}
                              </div>
                          ))
                        : null}
                </div>
            </div>
        </div>
    );
}

export default TabsComponent;
