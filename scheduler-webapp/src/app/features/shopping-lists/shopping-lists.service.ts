import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { HttpClient } from '@angular/common/http';
import { CreateShoppingListDto } from './dto/create-shopping-list.dto';
import { Observable } from 'rxjs';
import { ShoppingListModel } from './models/shopping-list.model';
import { FeatureUrl } from '@shared/enums';
import { UpdateShoppingListDto } from './dto/update-shopping-list.dto';

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

  getOne(id: number): Observable<ShoppingListModel> {
    return this.get<ShoppingListModel>(`/${FeatureUrl.SHOPPING_LISTS}/${id}`);
  }

  update(id: number, dto: UpdateShoppingListDto): Observable<ShoppingListModel> {
    return this.patch<ShoppingListModel>(`/${FeatureUrl.SHOPPING_LISTS}/${id}`, dto);
  }

  remove(id: number): Observable<ShoppingListModel> {
    return this.delete<ShoppingListModel>(`/${FeatureUrl.SHOPPING_LISTS}/${id}`);
  }
}
