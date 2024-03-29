import { FeatureUrl, Navigation } from '@rennic/shared/enums';

export class NavigationUtils {
  static getNavigationCommands(
    navigation: Navigation,
    params?: Record<string, string | number>,
  ): Array<string | number> {
    switch (navigation) {
      case Navigation.SHOPPING_LISTS:
        return [FeatureUrl.SHOPPING_LISTS];
      case Navigation.SHOPPING_LIST_CREATE:
        return [FeatureUrl.SHOPPING_LISTS, 'create'];
      case Navigation.SHOPPING_LIST_DETAILS:
        return [FeatureUrl.SHOPPING_LISTS, params?.['id'] ?? ''];
      case Navigation.SHOPPING_LIST_EDIT:
        return [FeatureUrl.SHOPPING_LISTS, params?.['id'] ?? '', 'edit'];
      case Navigation.TASKS:
        return [FeatureUrl.TASKS];
      case Navigation.TASK_CREATE:
        return [FeatureUrl.TASKS, 'create'];
    }
  }
}
