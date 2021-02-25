import {
    Component, ViewChild, ElementRef, Input, OnInit, Output, EventEmitter, Renderer2
} from '@angular/core';
import { TableMainDirective } from './table-main.directive';
import { NgExTableConfig } from './ngex-table.config';
import { PagingParams, SortableItem, SortItem, NameValueItem } from './model-interface';
import { TableChange, SortingTypeLocation } from './constants';

@Component({
    selector: 'multi-sort-command',
    //moduleId: module.id.toString(),
    //templateUrl: "./multi-sorting-command.component.html"
    template: `
<div class="extable-sort-command" [class.opened]="showMultiSortPanel">
    <div class="form-inline">
        <span *ngIf="!showSortingTypeSelect" class="sort-box-label">Multiple Column Sorting</span>
        <sorting-type *ngIf="showSortingTypeSelect" [sortingTypeLocation]="sortingTypeLocation"></sorting-type>
        <button type="button" class="btn btn-primary" id="btnSort" (click)="sortOk()">&#160;&#160;OK&#160;&#160;</button>&#160;&#160;
        <button type="button" class="btn btn-secondary" id="btnCancelSort" (click)="cancel()">&#160;&#160;Cancel&#160;&#160;</button>&#160;&#160;
        <button type="button" class="btn btn-secondary" id="btnClearSort" (click)="clear()">Clear Sortings</button>&#160;&#160;
    </div>
</div>
`
})
export class MultiSortingCommandComponent implements OnInit {
    config: any;
    showMultiSortPanel: boolean = false;
    showSortingTypeSelect: boolean = false;
    sortingTypeLocation: SortingTypeLocation = SortingTypeLocation.commandPanel;

    constructor(private ngExTableConfig: NgExTableConfig, private tableMainDirective: TableMainDirective,
        private renderer: Renderer2) {
        let pThis: any = this;

        //Called from TableMainDirective to open this panel.
        this.tableMainDirective.multiSortCommandComponent$.subscribe(
            (subjectParam: NameValueItem) => {                
                switch (subjectParam.name) {
                    case 'setShowMultiSortPanelFlag':
                        //subjectParam.value: true or false.
                        pThis.showMultiSortPanel = subjectParam.value;

                        //showSortingTypeSelect. 
                        if (pThis.tableMainDirective.sortingRunMode == 0 &&
                            pThis.tableMainDirective.sortingTypeSwitch == 0 ) {
                            pThis.showSortingTypeSelect = true;

                            //- sortableListBk reflects sequence before opening command panel.
                            //pThis.tableMainDirective.sortableListBk.find(a => a.sequence > 1))
                        }
                        else {
                            pThis.showSortingTypeSelect = false;
                        }
                        break;
                    case 'getShowMultiSortPanelFlag':
                        subjectParam.value = pThis.showMultiSortPanel;
                        break;
                    //Not used.
                    //case 'showSingleColSortingLink':
                    //    pThis.showSingleColSortingLink = subjectParam.value;
                    //    break;
                    default:                        
                        break;
                }
            }
        );
    }  

    ngOnInit(): void {
        this.config = this.ngExTableConfig.main;                          
    }

    sortOk() {
        this.tableMainDirective.submitMultiSortAction();
        this.showMultiSortPanel = false;
    }

    cancel() {
        this.tableMainDirective.cancelMultiSortAction();
        this.showMultiSortPanel = false;
    }

    clear() {
        this.tableMainDirective.clearMultiSortings();
        this.showMultiSortPanel = false;
    }

    toSingleColumnSorting() {
        //In Ctrl/Shift key mode, switch to 'single' needs to save result status for cancel operation
        //in case doing 'multiple' later so that call method in tableMainDirective to process details.
        this.tableMainDirective.toSingleColumnSorting_S1();        
    }
}
