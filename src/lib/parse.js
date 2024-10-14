import Parse from "parse";
import { useEffect, useState } from "react";

const ParseHook = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  useEffect(() => {
    if (!isInitialized) {
      Parse.initialize("1");
      Parse.serverURL = "http://localhost:1337/parse";
      console.log("se ha iniciado parse");
      setIsInitialized(true);
    }
  }, []);
  return { isInitialized };
};

export { ParseHook };
