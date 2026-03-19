import { useContext } from "react";
import MediaQueryContext from "shared/context/MediaQueryContext";

const useMediaQuery = () => {return useContext(MediaQueryContext)}

export default useMediaQuery;