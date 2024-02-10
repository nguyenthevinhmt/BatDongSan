import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

const usePreviousRoute = () => {
  const router = useRouter();
  const asPath = router;
  const ref = useRef<any>();

  useEffect(() => {
    ref.current = asPath;
  }, [asPath]);

  return ref.current;
};
export default usePreviousRoute;
