import { Inject, Injectable } from '@angular/core';
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
import { API_URL, HttpService } from '@rennic/shared/services';

@Injectable()
export class ShoppingListsService extends HttpService {
  constructor(protected override readonly http: HttpClient, @Inject(API_URL) private readonly apiUrl: string) {
    super(http, `${apiUrl}/${FeatureUrl.SHOPPING_LISTS}`);
  }

  create(dto: CreateShoppingListDto): Observable<ShoppingListModel> {
    return this.post<ShoppingListModel>('', dto);
  }

  getAll(): Observable<ShoppingListModel[]> {
    return this.get<ShoppingListModel[]>('');
  }

  getAllShoppingListItems(shoppingListId: number): Observable<ShoppingListItemModel[]> {
    return this.get<ShoppingListItemModel[]>(`/${shoppingListId}`);
  }

  getOne(id: number): Observable<ShoppingListModel> {
    return this.get<ShoppingListModel>(`/${id}`);
  }

  update(id: number, dto: UpdateShoppingListDto): Observable<ShoppingListModel> {
    return this.patch<ShoppingListModel>(`/${id}`, dto);
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
