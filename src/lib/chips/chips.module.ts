import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ChipComponent } from './chip/chip.component';
import { ChipsComponent } from './chips/chips.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ChipsComponent, ChipComponent],
  exports: [ChipsComponent, ChipComponent],
})
export class ChipsModule {}
