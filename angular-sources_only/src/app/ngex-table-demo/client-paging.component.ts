import { Component, ViewChild, OnInit, OnDestroy, ElementRef, Renderer2, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpDataService } from './services/httpclient-data.service';
import {
    TableMainDirective, PaginationComponent, OptionsComponent, ColumnSortingComponent, MultiSortingCommandComponent, 
    NgExTableConfig, PagingParams, ClientPaginationOutput, ClientPaginationService, TableChange, PaginationType
} from 'ngex-table'; 
import * as commonMethods from 'ngex-table'; 
import { SearchComponent } from '../ngex-table-demo/search.component';
import * as glob from './services/globals';

@Component({
    selector: 'client-paging',    
    templateUrl: './client-paging.component.html',
    imports: [CommonModule, TableMainDirective, PaginationComponent, OptionsComponent,
        ColumnSortingComponent, MultiSortingCommandComponent, SearchComponent]
})
export class ClientPagingComponent implements OnInit, OnDestroy {
    config!: any;
    paginationType: PaginationType = PaginationType.client;
    searchEnabled: boolean = true;
    pagingEnabled: boolean = true;

    pagingParams!: PagingParams;
    numPages: number = 1;
    totalLength: number = 0;
    pagedLength: number = 0;

    originalDataList: Array<any> = [];
    currentDataList: Array<any> = [];
    rows: Array<any> = [];
    errorMsg: string = '';

    //Row group lines.
    @ViewChild('trHead', { static: true }) trHead!: ElementRef;
    @ViewChildren('trItems') trItems!: QueryList<any>;

    @ViewChild(TableMainDirective, { static: true }) tableMainDirective!: TableMainDirective;
    @ViewChild(PaginationComponent, { static: false }) paginationComponent!: PaginationComponent;

    constructor(private ngExTableConfig: NgExTableConfig, private httpDataService: HttpDataService,
        private clientPaginationService: ClientPaginationService, private renderer: Renderer2) {
    }

    ngOnInit(): void {
        glob.caches.clientPagingThis = this;

        //Set config to use merged NgExtableConfig.
        this.config = this.ngExTableConfig.main;

        //Set for loading filtered data initially.
        this.tableMainDirective.isFilterForInit = false;

        //---------------------------------------
        //Component-level sorting configurations.
        //this.tableMainDirective.sortingRunMode = 1; //0: single/multiple column sorting (default), or 1: single column sorting only.
        //this.tableMainDirective.sortingTypeSwitch = 1; //0: Ctrl-key mode (default), or 1: dropdown selection mode; Userd only for sortingRunMode = 0.
        //this.tableMainDirective.enableOptionBoard = 'yes'; //'yes' or 'no'(default; '' the same as 'no'); Used only for sortingTypeSwitch = 0.
        //this.tableMainDirective.showOptionBoardContent = 'yes'; //'yes' or 'no' (default; '' the same as 'no'); Used only for sortingTypeSwitch = 0.
        //this.tableMainDirective.showGroupingLines = 'yes'; //'yes' or 'no' (default; '' the same as 'no').
        //---------------------------------------

        //Set initial pagingParams.
        let pageSize = this.config.pageSize;
        this.pagingParams = {
            //pageSize: overwrite default setting in ngex-table.config.ts.
            pageSize: pageSize !== undefined ? pageSize : 10,
            pageNumber: 1,
            sortList: [],
            changeType: TableChange.init
        }
        //Call for data only at the beginning.
        this.getData();
    }

    ngOnDestroy() {
    }

    onChangeOptions(optionType: any) {
        if (optionType && optionType == 'grouping') {
            this.processClientData();
        }
    }

    onChangeSearch(filteredDataList: Array<any>) {
        if (filteredDataList) {
            this.currentDataList = filteredDataList;
            if (!this.currentDataList) {
                return;
            }
            this.pagingParams.changeType = TableChange.search;

            //For client-side pagination, need to reset the totalItems number value.
            this.paginationComponent.totalItems = this.currentDataList.length;

            //For TableChange.search, need to re-set pagingParams here for some conditions and based on config settings.
            this.tableMainDirective.setPagingParamsBeforeData(this.pagingParams);

            //Use filtered data list.
            this.processClientData();
        }
    }

    onChangeTable() {
        if (this.currentDataList && this.currentDataList.length > 0) {
            //Page number or size change always uses current data list.
            this.processClientData();
        }
    }

    getData() {
        let pThis: any = this;
        let dataSrc: string = "/angular-content/local-data-products.json";
        this.httpDataService.get(dataSrc).subscribe({
            next: (data: any) => {
                if (data && data.length > 0) {
                    pThis.originalDataList = data;

                    //Processing first client pagination data without filtering.                    
                    pThis.currentDataList = commonMethods.deepClone(pThis.originalDataList);
                    pThis.totalLength = pThis.currentDataList.length;

                    //For setting intial pager - passing attributes not working due to Ajax data call.
                    pThis.paginationComponent.totalItems = pThis.totalLength;

                    //Manually call selectPage which will fire event since changeType is not search or sorting.
                    pThis.paginationComponent.selectPage(pThis.pagingParams.pageNumber);

                    //Pass a cloned data array.
                    //pThis.processClientData();

                    //Call method to add sort settings if any and then load the data with tableChanged event.
                    pThis.tableMainDirective.initDataLoadWithSorting();
                }
            },
            error: (err: HttpErrorResponse) => {
                pThis.errorMsg = pThis.httpDataService.parseErrorMessage(err);
            }
        });
    }

    processClientData() {
        this.totalLength = this.currentDataList.length;
        this.paginationComponent.totalItems = this.totalLength;        
        let rtn: any = this.clientPaginationService.processData(this.pagingParams, this.currentDataList);
        this.rows = rtn.dataList;

        //Refresh current pagingParams.
        this.pagingParams = rtn.pagingParams;
        this.pagedLength = rtn.dataList.length;

        //Call service method to update pager. Also need to pass current data length.
        this.tableMainDirective.updatePagerAfterData(this.pagingParams, this.totalLength);

        //Show first sortBy group lines in grid. 
        this.tableMainDirective.setRowGroupLines(this.trHead, this.trItems);
    } 
}
