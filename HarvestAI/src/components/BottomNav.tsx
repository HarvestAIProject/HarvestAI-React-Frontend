import { View, Pressable, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import bottomNavStyles from '../styles/bottomNavStyles';

type Props = {
  activeTab: 'Home' | 'Discover' | 'Shop' | 'You';
  onTabPress: (tab: 'Home' | 'Discover' | 'Shop' | 'You') => void;
  onCameraPress: () => void;
};

const BottomNavBar = ({ activeTab, onTabPress, onCameraPress }: Props) => {
  const renderTab = (
    name: 'Home' | 'Discover' | 'Shop' | 'You',
    iconName: keyof typeof Ionicons.glyphMap,
    filledIconName: keyof typeof Ionicons.glyphMap
  ) => {
    const isActive = activeTab === name;
    return (
      <Pressable
        style={bottomNavStyles.iconGroup}
        onPress={() => onTabPress(name)}
      >
        <Ionicons
          name={isActive ? filledIconName : iconName}
          style={[
            bottomNavStyles.icon,
            isActive && bottomNavStyles.activeIcon,
          ]}
        />
        <Text
          style={[
            bottomNavStyles.label,
            isActive && bottomNavStyles.activeLabel,
          ]}
        >
          {name}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={bottomNavStyles.container}>
      {renderTab('Home', 'home-outline', 'home')}
      {renderTab('Discover', 'compass-outline', 'compass')}
      <View style={bottomNavStyles.cameraSpacer} />
      {renderTab('Shop', 'cart-outline', 'cart')}
      {renderTab('You', 'person-outline', 'person')}

      <Pressable style={bottomNavStyles.cameraButton} onPress={onCameraPress}>
        <Ionicons name="camera" style={bottomNavStyles.cameraIcon} />
      </Pressable>
    </View>
  );
};


export default BottomNavBar;
