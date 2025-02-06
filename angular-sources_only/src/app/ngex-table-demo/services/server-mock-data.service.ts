import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpDataService } from './httpclient-data.service';
import { ClientDataFilterService } from './client-data-filter.service';
import { ClientPaginationService, PagingParams } from
    //'../../ngex-table/ngex-table-module'; //Local
    'ngex-table'; //lib
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ServerMockDataService {
    constructor(private httpDataService: HttpDataService, private dataFilterService: ClientDataFilterService,
        private clientPaginationService: ClientPaginationService) { }

    getPagedDataList(searchParams: any, pagingParams: PagingParams): Observable<any> {

        let pThis: any = this;
        let totalCount: number = 0;

        let result: Observable<any> = new Observable((observer) => {
            let dataSrc: string = "/angular-content/local-data-products.json";
            this.httpDataService.get(dataSrc).subscribe({
                next: (dataList) => {
                    if (dataList && dataList.length > 0) {
                        //Filtering.
                        if (searchParams) {
                          dataList = this.dataFilterService.getFilteredDataList(dataList, searchParams);
                        }
                        totalCount = dataList.length;

                        if (pagingParams.sortList.length > 0) {
                          dataList = this.clientPaginationService.changeSort(pagingParams, dataList);
                        }

                        dataList = this.clientPaginationService.getPagedData(pagingParams, dataList).dataList;
                        let rtnData: any = {
                          TotalCount: totalCount,
                          Products: dataList
                        };
                        observer.next(rtnData);
                        observer.complete();
                    }
                },
                error: (err: HttpErrorResponse) => {
                  //pThis.errorMsg = this.httpDataService.parseErrorMessage(err);
                  observer.next(null);
                  observer.error(err);
                  observer.complete();
                }
                //,complete: () => console.log('Complete')
            });
        });       
        return result;
    }    
}
