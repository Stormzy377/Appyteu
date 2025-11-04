import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

type ImageCarouselProps = {
    images: string[];
    onImagePress?: (index: number) => void;
};

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, onImagePress }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    if (!images || images.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Ionicons name="images" size={48} color="#DDD" />
                <Text style={styles.emptyText}>Sem fotos disponíveis</Text>
            </View>
        );
    }

    const handleScroll = (event: any) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / screenWidth);
        setActiveIndex(index);
    };

    const goToSlide = (index: number) => {
        flatListRef.current?.scrollToIndex({ index, animated: true });
    };

    return (
        <View style={styles.container}>
            {/* Carousel Principal */}
            <FlatList
                ref={flatListRef}
                data={images}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={styles.imageContainer}
                        activeOpacity={0.9}
                        onPress={() => onImagePress?.(index)}
                >
                    <Image
                        source={{ uri: item }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
                )}
            />
                
                {/* Indicadores de Página */}
                {images.length > 1 && (
                    <View style={styles.pagination}>
                        {images.map((_, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.paginationDot,
                                    activeIndex === index && styles.paginationDotActive,
                                ]}
                                onPress={() => goToSlide(index)}
                            />
                        ))}
                        </View>
                        )}

                        {/* Contador de Imagens */}
                        <View style={styles.counter}>
                            <Text style={styles.counterText}>
                                {activeIndex + 1} / {images.length}
                            </Text>
                        </View>
                    </View>
    );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "#000",
  },
  imageContainer: {
    width: screenWidth,
    height: 250,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: 30, // ✅ Ajustado para cima
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: "#FF6B6B",
  },
  counter: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  counterText: {
    color: "white",
    fontSize: 12,
    fontWeight: "400",
  },
  emptyContainer: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  emptyText: {
    marginTop: 8,
    color: "#999",
    fontSize: 14,
  },
});

export default ImageCarousel;