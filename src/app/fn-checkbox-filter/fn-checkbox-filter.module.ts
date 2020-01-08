import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FnCheckboxFilterComponent } from './fn-checkbox-filter.component';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [FnCheckboxFilterComponent],
    providers: [],
    exports: [FnCheckboxFilterComponent]
})
export class FnCheckboxFilterModule {

}