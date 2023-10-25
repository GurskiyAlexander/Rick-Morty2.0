import { StackScreenProps } from '@react-navigation/stack';
import { Item } from '../components/main';

export type TRootStackParamList = {
  main: undefined;
  character: {
    item: Item
  }
};