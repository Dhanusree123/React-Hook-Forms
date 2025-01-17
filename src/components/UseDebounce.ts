import { useEffect, useState } from "react";

const UseDebounce = <T>(value:T,delay=500) => {
    const [debouncedValue, setDebouncedvalue] = useState<T>(value);
    useEffect(() => {
        const handler = setTimeout(() => {
          setDebouncedvalue(value);
        }, delay);
        return () => {
          clearTimeout(handler);
        };
      }, [value,delay]);
      return debouncedValue
}

export default UseDebounce
