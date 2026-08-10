import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Accordion({ items }) {
  const [openIdx, setOpenIdx] = useState(null);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="space-y-4">
      {items.map((item, idx) => (
        <div key={idx} className="border-b border-white/10 pb-4">
          <button
            onClick={() => toggle(idx)}
            className="w-full flex items-center justify-between text-left py-4 group hover:text-water-sky transition-all focus:outline-none"
            aria-expanded={openIdx === idx}
          >
            <span className="font-editorial text-lg sm:text-xl font-medium text-white group-hover:text-water-sky transition-colors">
              {item.q}
            </span>
            <ChevronDown 
              className={`w-5 h-5 text-water-blue transition-transform duration-300 ${openIdx === idx ? 'rotate-180 text-water-sky' : ''}`} 
            />
          </button>
          <div 
            className={`overflow-hidden transition-all duration-500 ease-in-out ${openIdx === idx ? 'max-h-60 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}
          >
            <p className="text-white/60 text-sm leading-relaxed pl-4 border-l-2 border-water-blue/40">
              {item.a}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
