import { SidenavItemModel } from './sidenav-item.model';

export const SIDENAV_CONFIG: readonly SidenavItemModel[] = [
  {
    labelTranslation: 'sidenav.shoppingLists',
    iconName: 'shopping_bag',
    path: 'shopping-lists',
  },
  {
    labelTranslation: 'sidenav.tasks',
    iconName: 'task',
    path: 'tasks',
  },
];
