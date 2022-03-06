import { useState, useEffect } from "react";

export default function useTheme() {
    const [theme, setTheme] = useState(localStorage.getItem('theme'));
    const color = theme === 'dark' ? 'light' : 'dark';
    useEffect(() => {
       const root = window.document.documentElement;
       root.classList.remove(color)
       root.classList.add(theme);
       localStorage.setItem('theme',theme)
    }, [theme,color])

    return [color,setTheme];
}
