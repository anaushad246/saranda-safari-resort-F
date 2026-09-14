import React from 'react';

export function Section({ children, className = '', background = 'cream', id, ...props }) {
  const bgClasses = {
    cream: 'bg-[#F9F6F0]',
    'cream-deep': 'bg-[#F4EFE6]',
    'forest-deep': 'bg-[#0E261C] text-[#F9F6F0]',
    forest: 'bg-[#143628] text-[#F9F6F0]'
  };

  return (
    <section 
      id={id} 
      className={`py-16 md:py-24 border-b border-[#E8DFCE]/70 transition-colors duration-200 ${bgClasses[background] || bgClasses.cream} ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}

export function Container({ children, className = '', size = 'default', ...props }) {
  const sizeClasses = {
    small: 'max-w-4xl',
    default: 'max-w-7xl',
    wide: 'max-w-8xl',
    full: 'max-w-full'
  };

  return (
    <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${sizeClasses[size] || sizeClasses.default} ${className}`} {...props}>
      {children}
    </div>
  );
}

export function Heading({ 
  children, 
  level = 2, 
  subheading, 
  badge, 
  align = 'center', 
  className = '',
  light = false 
}) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto'
  };

  const Tag = `h${level}`;

  return (
    <div className={`mb-12 md:mb-16 max-w-3xl ${alignClasses[align]} ${className}`}>
      {badge && (
        <span className={`inline-block text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full mb-3 ${
          light 
            ? 'bg-[#C5A059]/20 text-[#DFCA95] border border-[#C5A059]/40' 
            : 'bg-[#143628]/10 text-[#143628] border border-[#143628]/20'
        }`}>
          {badge}
        </span>
      )}
      <Tag className={`font-serif tracking-tight font-semibold ${
        level === 1 ? 'text-4xl sm:text-5xl lg:text-6xl leading-[1.15]' :
        level === 2 ? 'text-3xl sm:text-4xl lg:text-4xl leading-snug' :
        'text-2xl sm:text-3xl leading-snug'
      } ${light ? 'text-[#F9F6F0]' : 'text-[#143628]'}`}>
        {children}
      </Tag>
      {subheading && (
        <p className={`mt-3 text-base sm:text-lg leading-relaxed ${
          light ? 'text-[#DFCA95]' : 'text-[#143628]/75'
        }`}>
          {subheading}
        </p>
      )}
      <div className={`mt-4 h-0.5 w-12 bg-[#C5A059] ${align === 'center' ? 'mx-auto' : ''}`} />
    </div>
  );
}

export function Button({ 
  children, 
  variant = 'terracotta', 
  size = 'md', 
  className = '', 
  icon: Icon,
  ...props 
}) {
  const base = "inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-center";
  
  const variants = {
    terracotta: "bg-[#C25E3E] text-white hover:bg-[#AA4E31] shadow-sm focus:ring-[#C25E3E] border border-[#C25E3E]",
    forest: "bg-[#143628] text-[#F9F6F0] hover:bg-[#0E261C] shadow-sm focus:ring-[#143628] border border-[#143628]",
    outline: "bg-transparent text-[#143628] border border-[#143628] hover:bg-[#143628]/5 focus:ring-[#143628]",
    'outline-light': "bg-transparent text-[#F9F6F0] border border-[#DFCA95] hover:bg-[#DFCA95]/10 focus:ring-[#DFCA95]",
    gold: "bg-[#C5A059] text-[#0E261C] font-semibold hover:bg-[#B38D45] shadow-sm focus:ring-[#C5A059] border border-[#C5A059]",
    ghost: "bg-transparent text-[#143628] hover:bg-[#143628]/5 focus:ring-[#143628]"
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-6 py-3.5 gap-2.5 font-semibold"
  };

  return (
    <button className={`${base} ${variants[variant] || variants.terracotta} ${sizes[size] || sizes.md} ${className}`} {...props}>
      {children}
      {Icon && <Icon className="w-4 h-4 ml-1" />}
    </button>
  );
}

export function Card({ children, className = '', hover = true, padding = 'p-6 sm:p-8', ...props }) {
  return (
    <div 
      className={`bg-white/80 backdrop-blur-sm rounded-lg border border-[#E8DFCE] ${padding} ${
        hover ? 'transition-all duration-300 hover:shadow-md hover:border-[#C5A059]/60' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function Badge({ children, variant = 'neutral', className = '' }) {
  const variants = {
    neutral: 'bg-[#143628]/10 text-[#143628] border-[#143628]/20',
    gold: 'bg-[#C5A059]/20 text-[#8F6C27] border-[#C5A059]/40',
    forest: 'bg-[#143628] text-[#F9F6F0] border-[#143628]',
    terracotta: 'bg-[#C25E3E]/15 text-[#AA4E31] border-[#C25E3E]/30',
    alert: 'bg-amber-100 text-amber-900 border-amber-300'
  };

  return (
    <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full border ${variants[variant] || variants.neutral} ${className}`}>
      {children}
    </span>
  );
}
