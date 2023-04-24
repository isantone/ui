import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'isa-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipComponent {
  @Input()
  public accentColor = false;
}
