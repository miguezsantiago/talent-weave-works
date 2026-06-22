import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initAnalytics, trackPageview } from "@/lib/analytics";

/**
 * Monta los tags de medición una vez y registra un pageview en cada cambio
 * de ruta. Debe vivir dentro del <BrowserRouter>.
 */
const RouteAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    trackPageview(location.pathname + location.search);
  }, [location.pathname, location.search]);

  return null;
};

export default RouteAnalytics;
