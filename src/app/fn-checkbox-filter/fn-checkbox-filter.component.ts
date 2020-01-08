import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

export class FnCheckboxFilterItem {
    id: string;
    description: string;
    isSelected: boolean;
    childArray?: Array<FnCheckboxFilterItem>;
}

@Component({
    selector: 'fn-checkbox-filter-component',
    templateUrl: 'fn-checkbox-filter.component.html',
    styleUrls: ['fn-checkbox-filter.component.scss']
})

export class FnCheckboxFilterComponent implements OnInit, OnDestroy {


    @Input() isGrouping: boolean;
    @Input() listItemArray: Array<FnCheckboxFilterItem> = [];
    @Output() cbSelectedItem = new EventEmitter();

    $wClickSubscrption: Subscription;
    description = 'Filter';

    uiFilterArray: Array<FnCheckboxFilterItem> = [];

    searchInput = "";
    showDropDown = false;

    selectedMap: Map<string, Map<string, string>>;

    constructor() {
        this.selectedMap = new Map();
        this.listenClick();
    }

    listenClick() {
        this.$wClickSubscrption = fromEvent(window, 'click').subscribe((event: any) => {
            if (!document.getElementById("fn-checkbox-filter-container").contains(event.target)) {
                this.showDropDown = false;
            }
        })
    }

    ngOnInit() {
        this.uiFilterArray = this.listItemArray;
    }
    ngOnDestroy() {
        this.$wClickSubscrption.unsubscribe();
    }

    toggleSelect(toggelValue: boolean) {
        this.showDropDown = toggelValue;
    }


    refreshSearch() {
        if (this.searchInput) {
            this.searchInput = "";
            this.uiFilterArray = this.listItemArray;

        }
    }

    selectAction(isSelectAll: boolean) {
        //     if (isSelectAll) {
        //         for (let i = 0; i < this.uiParentArray.length; i++) {
        //             this.uiParentArray[i].isActive = true;
        //             this.selectedMap.set(this.uiParentArray[i].id, new Map())
        //         }

        //         if (this.isGrouping) {
        //             this.tempSubArray = [];
        //             for (let j = 0; j < this.uiChildArray.length; j++) {
        //                 this.uiChildArray[j].isActive = true;
        //                 this.tempSubArray.push(this.uiChildArray[j].id);
        //             }
        //             this.selectedMap['child'] = this.tempSubArray;
        //         }

        //         if (this.selectedMap.size > 1) {
        //             this.description = this.selectedMap.size + ' ' + 'options selected';
        //         } else if (this.selectedMap.size == 1) {
        //             this.uiParentArray.forEach(element => {
        //                 if (this.selectedMap.has(element.id)) {
        //                     this.description = element.name;
        //                 }
        //             });
        //         }
        //     } else {
        //         this.uiParentArray.forEach(_item => {
        //             _item.isActive = false;
        //         });
        //         this.uiParentArray = this.parentArray;
        //         this.selectedMap['parent'] = [];

        //         if (this.isGrouping) {
        //             this.tempSubArray = [];
        //             this.uiChildArray.forEach(_item => {
        //                 _item.isActive = false;
        //             });
        //             this.searchInput = "";
        //             this.uiChildArray = this.childArray;
        //             this.selectedMap['child'] = this.tempSubArray;
        //         }
        //         this.description = "Filter";
        //     }
        //     console.log(this.selectedMap)
        //     this.cbSelectedItem.emit(this.selectedMap);
    }

    selectParent(uiItem: FnCheckboxFilterItem) {
        const _id = uiItem.id;
        if (this.selectedMap.has(_id)) {
            this.selectedMap.delete(_id);
        }

        if (uiItem.isSelected) {
            uiItem.isSelected = false;
            if (this.isGrouping && uiItem.childArray) {
                for (let i = 0; i < uiItem.childArray.length; i++) {
                    uiItem.childArray[i].isSelected = false;
                }
            }
        } else {
            uiItem.isSelected = true;
            let childMap: Map<string, string> = new Map();

            if (this.isGrouping && uiItem.childArray) {
                for (let i = 0; i < uiItem.childArray.length; i++) {
                    uiItem.childArray[i].isSelected = true;
                    childMap.set(uiItem.childArray[i].id, uiItem.childArray[i].id);
                }
            } else {
                childMap.set(_id, _id);

            }
            this.selectedMap.set(_id, childMap);
        }


        // this line of code execute when parent select 
        // if (this.isGrouping) {
        //     for (let i = 0; i < this.uiChildArray.length; i++) {
        //         if (this.uiChildArray[i].parentId == roleDesc) {
        //             this.uiChildArray[i].isActive = false;
        //             var index = this.tempSubArray.indexOf(roleDesc);
        //             if (index !== -1) {
        //                 this.tempSubArray.splice(index, 1);
        //             }
        //         }
        //     }
        // }

        //     if (this.tempArray.length > 0 && this.tempArray.length <= 1) {
        //         this.uiParentArray.forEach(element => {
        //             if (this.tempArray[0] == element.id) {
        //                 this.description = element.name;
        //             }
        //         });
        //     }
        //     else if (this.tempArray.length > 1) {
        //         this.description = this.tempArray.length + ' ' + 'options selected';
        //     } else {
        //         this.description = "Filter";
        //     }
        // } else {
        //     this.tempArray.push(roleDesc);
        //     // this line of code execute when parent select 
        //     if (this.isGrouping) {
        //         this.uiChildArray.forEach(element => {
        //             if (element.parentId == roleDesc) {
        //                 this.tempSubArray.push(element.id);
        //             }
        //         });
        //         this.uiChildArray.forEach(element => {
        //             if (this.tempSubArray.includes(element.id.toString())) {
        //                 element.isActive = true;
        //             } else {
        //                 element.isActive = false;
        //             }
        //         });
        //     }

        //     this.selectedMap['parent'] = this.tempArray;
        //     if (this.tempArray.length > 0 && this.tempArray.length <= 1) {
        //         this.uiParentArray.forEach(element => {
        //             if (this.tempArray[0] == element.id) {
        //                 this.description = element.name;
        //             }
        //         });
        //     }
        //     else if (this.tempArray.length > 1) {
        //         this.description = this.tempArray.length + ' ' + 'options selected';
        //     } else {
        //         this.description = "Filter";
        //     }
        // }
        // if (this.tempArray) {
        //     this.uiParentArray.forEach(element => {
        //         if (this.tempArray.includes(element.id.toString())) {
        //             element.isActive = true;
        //         } else {
        //             element.isActive = false;
        //         }
        //     });
        //     this.selectedMap['parent'] = this.tempArray;
        // }
        this.cbSelectedItem.emit(this.selectedMap);
    }

    onSearch(event: any) {
        //     var search = event.target.value;
        //     if (search != "") {
        //         var roles = this.parentArray.filter(item => Object.keys(item).some(k => item[k] != null && item[k].toString().toLowerCase().includes(search.toLowerCase())));
        //         this.uiParentArray = roles;
        //         if (this.isGrouping) {
        //             var subRoles = this.childArray.filter(item => Object.keys(item).some(k => item[k] != null && item[k].toString().toLowerCase().includes(search.toLowerCase())));
        //             this.uiChildArray = subRoles;
        //             if (subRoles) {
        //                 for (let subVal = 0; subVal < subRoles.length; subVal++) {
        //                     if (this.uiParentArray) {
        //                         var roles = this.parentArray.filter(item => Object.keys(item).some(k => item[k] != null && item[k].toString().includes(subRoles[subVal].parentId)));
        //                         roles.forEach(ui => {
        //                             const found = this.uiParentArray.some(el => el.id == ui.id);
        //                             if (!found) this.uiParentArray.push({ "id": ui.id.toString(), "name": ui.name });
        //                         });
        //                     }
        //                 }
        //             }
        //         }
        //     } else {
        //         this.uiParentArray = this.parentArray;
        //         if (this.isGrouping) {
        //             this.uiChildArray = this.childArray;
        //         }
        //     }
    }

    // sub field functions
    selectChildItem(childVal: FnCheckboxFilterItem) {
        //         if (this.tempSubArray.includes(childVal)) {
        //             var index = this.tempSubArray.indexOf(childVal);
        //             if (index !== -1) {
        //                 this.tempSubArray.splice(index, 1);
        //             }
        //             for (let uiChild = 0; uiChild < this.uiChildArray.length; uiChild++) {
        //                 if (this.uiChildArray[uiChild].id == childVal) {
        //                     this.uiChildArray[uiChild].isActive = false
        //                     var index = this.tempArray.indexOf(this.uiChildArray[uiChild].parentId.toString());
        //                     if (index !== -1) {
        //                         this.tempArray.splice(index, 1);
        //                         this.uiParentArray.forEach(pass => {
        //                             if (pass.id == this.uiChildArray[uiChild].parentId) {
        //                                 pass.isActive = false
        //                             }
        //                         });

        //                         if (this.tempArray.length > 0 && this.tempArray.length <= 1) {
        //                             this.uiParentArray.forEach(element => {
        //                                 if (this.tempArray[0] == element.id) {
        //                                     this.description = element.name;
        //                                 }
        //                             });
        //                         }
        //                         else if (this.tempArray.length > 1) {
        //                             this.description = this.tempArray.length + ' ' + 'options selected';
        //                         } else {
        //                             this.description = "Filter";
        //                         }
        //                     }
        //                 }
        //             }
        //             this.selectedMap['parent'] = this.tempArray;
        //             this.selectedMap['child'] = this.tempSubArray;

        //         } else {
        //             this.tempSubArray.push(childVal);
        //             if (this.tempSubArray) {
        //                 this.uiChildArray.forEach(element => {
        //                     if (this.tempSubArray.includes(element.id.toString())) {
        //                         element.isActive = true;
        //                     } else {
        //                         element.isActive = false;
        //                     }
        //                 });
        //             }

        //             this.uiChildArray.forEach(element => {
        //                 if (element.id == childVal) {
        //                     var numParent = this.uiChildArray.reduce(function (n, person) {
        //                         return n + (person.parentId == element.parentId);
        //                     }, 0);

        //                     var numChecked = this.uiChildArray.reduce(function (n, person) {
        //                         return n + (person.isActive && person.parentId == element.parentId);
        //                     }, 0);
        //                     if (numParent == numChecked) {
        //                         for (let checkParent = 0; checkParent < this.uiParentArray.length; checkParent++) {
        //                             if (this.uiParentArray[checkParent].id == element.parentId) {
        //                                 this.uiParentArray[checkParent].isActive = true;
        //                                 this.tempArray.push(element.parentId.toString());
        //                                 if (this.tempArray.length > 0 && this.tempArray.length <= 1) {
        //                                     this.uiParentArray.forEach(element => {
        //                                         if (this.tempArray[0] == element.id) {
        //                                             this.description = element.name;
        //                                         }
        //                                     });
        //                                 }
        //                                 else if (this.tempArray.length > 1) {
        //                                     this.description = this.tempArray.length + ' ' + 'options selected';
        //                                 } else {
        //                                     this.description = "Filter";
        //                                 }
        //                             }
        //                         }
        //                     }

        //                 }
        //             });
        //             // this.selectedMap['parent'] = this.tempArray;
        //             // this.selectedMap['child'] = this.tempSubArray;
        //         }
        //     }
    }


}