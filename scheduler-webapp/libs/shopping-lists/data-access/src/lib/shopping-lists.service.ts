import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CreateShoppingListDto,
  UpdateShoppingListDto,
  UpdateShoppingListItemsDto,
  UpdateShoppingListItemsResponseDto,
} from '@rennic/shopping-lists/shared/dto';
import { Observable } from 'rxjs';
import { ShoppingListItemModel, ShoppingListModel } from '@rennic/shopping-lists/shared/models';
import { FeatureUrl } from '@rennic/shared/enums';
import { HttpService } from '@rennic/shared/services';

@Injectable()
export class ShoppingListsService extends HttpService {
  constructor(protected override readonly http: HttpClient) {
    super(http);
  }

  create(dto: CreateShoppingListDto): Observable<ShoppingListModel> {
    return this.post<ShoppingListModel>(`/${FeatureUrl.SHOPPING_LISTS}`, dto);
  }

  getAll(): Observable<ShoppingListModel[]> {
    return this.get<ShoppingListModel[]>(`/${FeatureUrl.SHOPPING_LISTS}`);
  }

  getAllShoppingListItems(shoppingListId: number): Observable<ShoppingListItemModel[]> {
    return this.get<ShoppingListItemModel[]>(`/${FeatureUrl.SHOPPING_LISTS}/${shoppingListId}`);
  }

  getOne(id: number): Observable<ShoppingListModel> {
    return this.get<ShoppingListModel>(`/${FeatureUrl.SHOPPING_LISTS}/${id}`);
  }

  update(id: number, dto: UpdateShoppingListDto): Observable<ShoppingListModel> {
    return this.patch<ShoppingListModel>(`/${FeatureUrl.SHOPPING_LISTS}/${id}`, dto);
  }

  updateShoppingListItems(
    shoppingListId: number,
    dto: UpdateShoppingListItemsDto,
  ): Observable<UpdateShoppingListItemsResponseDto> {
    return this.patch<UpdateShoppingListItemsResponseDto>(`/${FeatureUrl.SHOPPING_LISTS}/${shoppingListId}/items`, dto);
  }

  remove(id: number): Observable<ShoppingListModel> {
    return this.delete<ShoppingListModel>(`/${FeatureUrl.SHOPPING_LISTS}/${id}`);
  }

  toggleShoppingListItemBought(id: number): Observable<ShoppingListItemModel> {
    return this.patch<ShoppingListItemModel>(`/${FeatureUrl.SHOPPING_LISTS}/items/${id}/bought`, {});
  }
}
