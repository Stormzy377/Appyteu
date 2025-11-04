import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import locationService, { UserLocation } from '../services/locationService';

interface LocationContextType {
  userLocation: UserLocation | null;
  isLoading: boolean;
  error: string | null;
  refreshLocation: () => Promise<void>;
  hasPermission: boolean;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

interface LocationProviderProps {
  children: ReactNode;
}

export const LocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState(false);

  // Carregar localização quando o app inicia
  useEffect(() => {
    loadLocation();
  }, []);

  const loadLocation = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const location = await locationService.getCurrentLocation();
      
      if (location) {
        setUserLocation(location);
        setHasPermission(true);
        
        // Se não estiver em Luanda, mostrar aviso
        if (!locationService.isInLuanda(location.latitude, location.longitude)) {
          console.log('⚠️ Usuário fora de Luanda - usando dados mock para demonstração');
        }
      } else {
        setHasPermission(false);
        setError('Não foi possível obter a localização');
        
        // Usar localização mock de Luanda para demonstração
        setUserLocation({
          latitude: -8.8383,
          longitude: 13.2344,
          accuracy: 0,
        });
      }
    } catch (err) {
      setError('Erro ao carregar localização');
      console.log('❌ Erro no LocationContext:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshLocation = async () => {
    await loadLocation();
  };

  return (
    <LocationContext.Provider value={{
      userLocation,
      isLoading,
      error,
      refreshLocation,
      hasPermission,
    }}>
      {children}
    </LocationContext.Provider>
  );
};

// Hook personalizado
export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
// import React, { createContext, useState, useContext, useEffect, ReactNode, use } from 'react';
// import locationService, { UserLocation } from '../services/locationService';

// interface LocationContextType {
//     userLocation: UserLocation | null;
//     isLoading: boolean;
//     error: string | null;
//     refreshLocation: () => Promise<void>;
//     hasPermission: boolean;
// }

// const LocationContext = createContext<LocationContextType | undefined>(undefined);

// interface LocationProviderProps {
//     children: ReactNode;
// }

// export const LocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
//     const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [hasPermission, setHasPermission] = useState(false); 

//     // Carregar a localização do usuário quando o app iniciar
//     useEffect(() => {
//         loadLocation();
//     }, []);

//     const loadLocation = async () => {
//         try {
//             setIsLoading(true);
//             setError(null)

//             const location = await locationService.getCurrentLocation();

//             if (location) {
//                 setUserLocation(location);
//                 setHasPermission(true);

//                 // Se não estiver em Luanda, mostra aviso
//                 if (!locationService.isInLuanda(location.latitude, location.longitude)) {
//                     console.log('Usuário fora de Luanda - algumas funcionalidades podem estar limitadas.');
//                 }
//             } else {
//                 setHasPermission(false);
//                 setError('Não foi possível obter a localização.');

//                 // Usar localização mock de Luanda para demostração
//                 setUserLocation({
//                     latitude: -8.8383,
//                     longitude: 13.2344,
//                     accuracy: 0 // ou algum valor apropriado para accuracy
//                 });
// };

// // Esse o meu hook personalizado para usar o contexto de localização
// export const userLocation = () => {
//     const context = useContext(LocationContext);
//     if (context === undefined) {
//         throw new Error('useLocation must be used within a LocationProvider');
//     }
//     return context;
// };