import { useEffect, useState } from "react";

function useBounce(text: string, timeMs?: number) {
  const [value, setValue] = useState("");
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setValue(text);
    }, timeMs || 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [text]);
  return value;
}

export default useBounce;
