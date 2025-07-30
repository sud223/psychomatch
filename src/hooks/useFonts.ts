import * as Font from 'expo-font';
import { MaterialIcons } from '@expo/vector-icons';

export const useFonts = async () => {
  await Font.loadAsync({
    'MaterialIcons': MaterialIcons.font.MaterialIcons,
  });
};
