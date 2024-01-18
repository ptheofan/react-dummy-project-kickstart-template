import { ThemeProviderContext } from '@/contexts/ThemeContext.tsx';
import { useContext } from 'react';

export default function DarkImage({ lightSrc, darkSrc, alt, className, ...rest }: { lightSrc: string, darkSrc: string, alt: string, className?: string }) {
  const theme = useContext(ThemeProviderContext);

  if (theme.theme === 'dark') {
    return (
      <picture className={ className } { ...rest }>
        <img src={ darkSrc } alt={ alt } className="object-cover w-full h-full"/>
      </picture>
  )
    ;
  }

  if (theme.theme === 'light') {
    return (
      <picture className={ className } { ...rest }>
        <img src={ lightSrc } alt={ alt } className={ className } { ...rest } />
      </picture>
    );
  }

  if (theme.theme === 'system') {
    return (
      <picture className={ className } { ...rest }>
        <source srcSet={ darkSrc } media="(prefers-color-scheme: dark)" />
        <img src={ lightSrc } alt={ alt } className="object-cover w-full h-full" />
      </picture>
    );
  }
}
