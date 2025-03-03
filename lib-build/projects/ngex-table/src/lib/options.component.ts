import { Component, OnInit, Output, EventEmitter, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as commonMethods from './common-methods';
import { NgExTableConfig } from './ngex-table.config';
import { TableMainDirective } from './table-main.directive';
import { SortingTypeComponent } from './sorting-type.component';
import { NameValueItem } from './model-interface';
import { SortingTypeLocation } from './constants';

@Component({
    selector: 'options',    
    templateUrl: './options.component.html',
    imports: [CommonModule, FormsModule, SortingTypeComponent]
})
export class OptionsComponent implements OnInit {     
    config!: any;
    enableOptionBoard: boolean = false;
    showOptionBoardContent: boolean = false;
    optionToggleHint: string = '';    
    showGroupingLines: boolean = false;
    showGroupingLines_0: string = '';
    sortingTypeLocation: SortingTypeLocation = SortingTypeLocation.optionPanel;

    @Output() optionChanged: EventEmitter<any> = new EventEmitter<any>();

    constructor(private ngExTableConfig: NgExTableConfig, private tableMainDirective: TableMainDirective, 
        private renderer: Renderer2) {        
    }

    ngOnInit(): void {
        this.config = this.ngExTableConfig.main; 
        this.enableOptionBoard = this.tableMainDirective.enableOptionBoard == 'yes' ? true : false;
        this.showOptionBoardContent = this.tableMainDirective.showOptionBoardContent == 'yes' ? true : false; 

        ////Hide option board by default for Ctrl-key type. 
        //if (this.tableMainDirective.sortingTypeSwitch == 0) {
        //    this.showOptionBoardContent = false;
        //}

        this.showGroupingLines = this.tableMainDirective.showGroupingLines == 'yes' ? true : false;
        this.toggleOptionLinkHint();
    }       

    onShowGroupingLinesChange($event: any) {
        if (this.showGroupingLines) {
            this.tableMainDirective.showGroupingLines = 'yes';
        }
        else {
            this.tableMainDirective.showGroupingLines = 'no';
        }

        //Reload data to grid if set row group lines.
        if (this.tableMainDirective.showGroupingLines != this.showGroupingLines_0) {           
            this.showGroupingLines_0 = this.tableMainDirective.showGroupingLines;
            this.optionChanged.emit('grouping');
        }        
    }

    toggleOptions($event: any) {             
        this.showOptionBoardContent = !this.showOptionBoardContent;
        this.toggleOptionLinkHint();
    }

    toggleOptionLinkHint() {
        if (this.showOptionBoardContent) {
            this.optionToggleHint = 'Click to hide Option Board';
        }
        else {
            this.optionToggleHint = 'Click to show Option Board';
        }
    }
}
