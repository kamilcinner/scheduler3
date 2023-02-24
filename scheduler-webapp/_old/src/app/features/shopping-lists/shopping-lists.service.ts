import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { HttpClient } from '@angular/common/http';
import {
  CreateShoppingListDto,
  UpdateShoppingListDto,
  UpdateShoppingListItemsDto,
  UpdateShoppingListItemsResponseDto,
} from './dto';
import { Observable } from 'rxjs';
import { ShoppingListItemModel, ShoppingListModel } from './models';
import { FeatureUrl } from '@shared/enums';

@Injectable()
export class ShoppingListsService extends HttpService {
  static sortShoppingListItems(
    a: ShoppingListItemModel,
    b: ShoppingListItemModel
  ): number {
    let result = ShoppingListsService.sortShoppingListItemsByBought(a, b);
    if (result === 0) {
      result = ShoppingListsService.sortShoppingListItemsByName(a, b);
    }
    return result;
  }

  static sortShoppingListItemsByBought(
    a: ShoppingListItemModel,
    b: ShoppingListItemModel
  ): number {
    if (!a.bought && b.bought) {
      return -1;
    }
    if (a.bought && !b.bought) {
      return 1;
    }
    return 0;
  }

  static sortShoppingListItemsByName(
    a: ShoppingListItemModel,
    b: ShoppingListItemModel
  ): number {
    return a.name.localeCompare(b.name);
  }

  constructor(protected override readonly http: HttpClient) {
    super(http);
  }

  create(dto: CreateShoppingListDto): Observable<ShoppingListModel> {
    return this.post<ShoppingListModel>(`/${FeatureUrl.SHOPPING_LISTS}`, dto);
  }

  getAll(): Observable<ShoppingListModel[]> {
    return this.get<ShoppingListModel[]>(`/${FeatureUrl.SHOPPING_LISTS}`);
  }

  getAllShoppingListItems(
    shoppingListId: number
  ): Observable<ShoppingListItemModel[]> {
    return this.get<ShoppingListItemModel[]>(
      `/${FeatureUrl.SHOPPING_LISTS}/${shoppingListId}`
    );
  }

  getOne(id: number): Observable<ShoppingListModel> {
    return this.get<ShoppingListModel>(`/${FeatureUrl.SHOPPING_LISTS}/${id}`);
  }

  update(
    id: number,
    dto: UpdateShoppingListDto
  ): Observable<ShoppingListModel> {
    return this.patch<ShoppingListModel>(
      `/${FeatureUrl.SHOPPING_LISTS}/${id}`,
      dto
    );
  }

  updateShoppingListItems(
    shoppingListId: number,
    dto: UpdateShoppingListItemsDto
  ): Observable<UpdateShoppingListItemsResponseDto> {
    return this.patch<UpdateShoppingListItemsResponseDto>(
      `/${FeatureUrl.SHOPPING_LISTS}/${shoppingListId}/items`,
      dto
    );
  }

  remove(id: number): Observable<ShoppingListModel> {
    return this.delete<ShoppingListModel>(
      `/${FeatureUrl.SHOPPING_LISTS}/${id}`
    );
  }

  toggleShoppingListItemBought(id: number): Observable<ShoppingListItemModel> {
    return this.patch<ShoppingListItemModel>(
      `/${FeatureUrl.SHOPPING_LISTS}/items/${id}/bought`,
      {}
    );
  }
}
