import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function AccordionItem({ title, children, isOpen, onToggle, id, badge }) {
  return (
    <div className="border-b border-[#E8DFCE] py-4 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left py-2 font-serif text-lg md:text-xl font-medium text-[#143628] hover:text-[#C5A059] transition-colors focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-3 pr-4">
          {id && <span className="font-sans text-xs font-bold text-[#C5A059]">{id}</span>}
          <span>{title}</span>
          {badge && (
            <span className="text-xs font-sans px-2 py-0.5 rounded bg-[#143628]/10 text-[#143628]">
              {badge}
            </span>
          )}
        </span>
        <ChevronDown 
          className={`w-5 h-5 text-[#C5A059] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      {isOpen && (
        <div className="pt-2 pb-3 text-[#143628]/85 text-sm sm:text-base leading-relaxed pl-1 sm:pl-7">
          {children}
        </div>
      )}
    </div>
  );
}

export function Accordion({ items, allowMultiple = false, className = '' }) {
  const [openIndex, setOpenIndex] = useState(0); // first item open by default

  const handleToggle = (idx) => {
    setOpenIndex(prev => (prev === idx ? -1 : idx));
  };

  return (
    <div className={`divide-y divide-[#E8DFCE] ${className}`}>
      {items.map((item, idx) => (
        <AccordionItem
          key={item.id || idx}
          id={item.number || `Q${idx + 1}`}
          title={item.question || item.title}
          badge={item.badge}
          isOpen={openIndex === idx}
          onToggle={() => handleToggle(idx)}
        >
          {item.answer || item.content}
        </AccordionItem>
      ))}
    </div>
  );
}
