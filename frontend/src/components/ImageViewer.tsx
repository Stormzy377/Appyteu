import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

type ImageViewerProps = {
  images: string[];
  initialIndex: number;
  onClose: () => void;
};

const ImageViewer: React.FC<ImageViewerProps> = ({
  images,
  initialIndex,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goToNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={28} color="white" />
        </TouchableOpacity>

        <Text style={styles.counter}>
          {currentIndex + 1} / {images.length}
        </Text>

        <View style={styles.placeholder} />
      </View>

      {/* Área da Imagem */}
      <View style={styles.imageArea}>
        <Image
          source={{ uri: images[currentIndex] }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Navegação entre imagens */}
      {images.length > 1 && (
        <>
          {/* Botão Anterior */}
          {currentIndex > 0 && (
            <TouchableOpacity
              style={[styles.navButton, styles.prevButton]}
              onPress={goToPrevious}
            >
              <Ionicons name="chevron-back" size={32} color="white" />
            </TouchableOpacity>
          )}

          {/* Botão Próximo */}
          {currentIndex < images.length - 1 && (
            <TouchableOpacity
              style={[styles.navButton, styles.nextButton]}
              onPress={goToNext}
            >
              <Ionicons name="chevron-forward" size={32} color="white" />
            </TouchableOpacity>
          )}

          {/* Indicadores na parte inferior - CORRIGIDO POSIÇÃO */}
          <View style={styles.pagination}>
            {images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  currentIndex === index && styles.paginationDotActive,
                ]}
              />
            ))}
          </View>
        </>
      )}

      {/* Footer com gestos - CORRIGIDO POSIÇÃO */}
      <View style={styles.footer}>
        <Text style={styles.helpText}>Toque no X para fechar</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000, // ✅ Garante que fica por cima de tudo
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 60, // ✅ Espaço para status bar
    paddingBottom: 16,
    backgroundColor: "rgba(0,0,0,0.8)",
    zIndex: 1001,
  },
  closeButton: {
    padding: 8,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
  },
  counter: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  placeholder: {
    width: 40,
  },
  imageArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  image: {
    width: screenWidth,
    height: screenHeight * 0.7,
  },
  navButton: {
    position: "absolute",
    top: "50%",
    marginTop: -25, // ✅ Centraliza verticalmente
    padding: 16,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 30,
    zIndex: 1002,
  },
  prevButton: {
    left: 20,
  },
  nextButton: {
    right: 20,
  },
  pagination: {
    position: "absolute",
    bottom: 120, // ✅ Ajustado para cima
    alignSelf: "center",
    flexDirection: "row",
    zIndex: 1001,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.4)",
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: "#FF6B6B",
  },
  footer: {
    position: "absolute",
    bottom: 80, // ✅ Ajustado para cima
    alignSelf: "center",
    zIndex: 1001,
  },
  helpText: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 14,
  },
});

export default ImageViewer;
// import React, { useState } from "react";
// import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, StatusBar } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// type ImageViewerProps = {
//   images: string[];
//   initialIndex: number;
//   onClose: () => void;
// };

// const ImageViewer: React.FC<ImageViewerProps> = ({
//   images,
//   initialIndex,
//   onClose,
// }) => {
//   const [currentIndex, setCurrentIndex] = useState(initialIndex);

//   const goToNext = () => {
//     if (currentIndex < images.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     }
//   };

//   const goToPrevious = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     }
//   };

//   const handleBackgroundPress = () => {
//     onClose();
//   };

//   const handleImagePress = () => {
//     // Não faz nada quando a imagem é pressionada - evita fechar acidentalmente
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor="black" barStyle="light-content" />

//       {/* Fundo preto */}
//       <TouchableOpacity
//         style={styles.background}
//         activeOpacity={1}
//         onPress={handleBackgroundPress}
//       >
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity style={styles.closeButton} onPress={onClose}>
//             <Ionicons name="close" size={28} color="white" />
//           </TouchableOpacity>

//           <Text style={styles.counter}>
//             {currentIndex + 1} / {images.length}
//           </Text>

//           <View style={styles.placeholder} />
//         </View>

//         {/* Área da Imagem */}
//         <TouchableOpacity
//           style={styles.imageArea}
//           activeOpacity={1}
//           onPress={handleImagePress}
//         >
//           <Image
//             source={{ uri: images[currentIndex] }}
//             style={styles.image}
//             resizeMode="contain"
//           />
//         </TouchableOpacity>

//         {/* Navegação entre imagens */}
//         {images.length > 1 && (
//           <>
//             {/* Botão Anterior */}
//             {currentIndex > 0 && (
//               <TouchableOpacity
//                 style={[styles.navButton, styles.prevButton]}
//                 onPress={goToPrevious}
//               >
//                 <Ionicons name="chevron-back" size={32} color="white" />
//               </TouchableOpacity>
//             )}

//             {/* Botão Próximo */}
//             {currentIndex < images.length - 1 && (
//               <TouchableOpacity
//                 style={[styles.navButton, styles.nextButton]}
//                 onPress={goToNext}
//               >
//                 <Ionicons name="chevron-forward" size={32} color="white" />
//               </TouchableOpacity>
//             )}

//             {/* Indicadores na parte inferior */}
//             <View style={styles.pagination}>
//               {images.map((_, index) => (
//                 <View
//                   key={index}
//                   style={[
//                     styles.paginationDot,
//                     currentIndex === index && styles.paginationDotActive,
//                   ]}
//                 />
//               ))}
//             </View>
//           </>
//         )}

//         {/* Footer com gestos */}
//         <View style={styles.footer}>
//           <Text style={styles.helpText}>Toque fora da imagem para fechar</Text>
//         </View>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "black",
//   },
//   background: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.95)",
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingTop: 60,
//     paddingBottom: 16,
//   },
//   closeButton: {
//     padding: 8,
//     backgroundColor: "rgba(255,255,255,0.2)",
//     borderRadius: 20,
//   },
//   counter: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   placeholder: {
//     width: 40,
//   },
//   imageArea: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   image: {
//     width: screenWidth,
//     height: screenHeight * 0.7,
//   },
//   navButton: {
//     position: "absolute",
//     top: "50%",
//     padding: 16,
//     backgroundColor: "rgba(255,255,255,0.2)",
//     borderRadius: 30,
//   },
//   prevButton: {
//     left: 20,
//   },
//   nextButton: {
//     right: 20,
//   },
//   pagination: {
//     position: "absolute",
//     bottom: 100,
//     alignSelf: "center",
//     flexDirection: "row",
//   },
//   paginationDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: "rgba(255,255,255,0.4)",
//     marginHorizontal: 4,
//   },
//   paginationDotActive: {
//     backgroundColor: "#FF6B6B",
//   },
//   footer: {
//     position: "absolute",
//     bottom: 40,
//     alignSelf: "center",
//   },
//   helpText: {
//     color: "rgba(255,255,255,0.6)",
//     fontSize: 14,
//   },
// });

// export default ImageViewer;
