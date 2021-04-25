import { useEffect } from 'react';

// eslint-disable-next-line import/no-anonymous-default-export
export default (el, callback) => {
    const handleClick = e => {
        if (el && !el.contains(e.target)) {
            callback();
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => {
        document.removeEventListener("click", handleClick);            
        }
    }, [])
}