import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  QueryList,
  Renderer2,
  ViewChild,
} from '@angular/core';

import { ChipComponent } from '../chip/chip.component';

@Component({
  selector: 'isa-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipsComponent implements AfterViewInit {
  @ContentChildren(ChipComponent, { read: ElementRef })
  public readonly chipComponents: QueryList<ElementRef<HTMLElement>> | undefined;

  @ViewChild('chipsContainer')
  private readonly chipsContainerEl: ElementRef<HTMLElement> | undefined;

  public visibleChipsAmount = 0;

  public hiddenChipsAmount = 0;

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    private readonly cdr: ChangeDetectorRef,
    private readonly renderer: Renderer2,
  ) {}

  ngAfterViewInit() {
    if (this.chipsContainerEl?.nativeElement) {
      this.chipComponents?.forEach((chipComponent) => {
        this.createObserver(chipComponent.nativeElement);
      });
    }
  }

  private createObserver(target: HTMLElement) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleChips = entries.filter((entry) => entry.isIntersecting);

        this.visibleChipsAmount += visibleChips.length;
        this.hiddenChipsAmount = (this.chipComponents || []).length - this.visibleChipsAmount;

        // eslint-disable-next-line no-console
        visibleChips.forEach((entry) => console.log('Visible entry', entry));
        this.setChipsVisibility(this.visibleChipsAmount);
        this.cdr.markForCheck();
      },
      {
        root: this.chipsContainerEl?.nativeElement,
        rootMargin: '0px -50px 0px 0px',
        threshold: 1.0,
      },
    );

    observer.observe(target);
  }

  private setChipsVisibility(visibleChipsCount: number) {
    this.chipComponents?.forEach((chipComponent, index) => {
      const isVisible = index >= visibleChipsCount;

      if (isVisible) {
        this.renderer.addClass(chipComponent.nativeElement, 'd-none');
      } else {
        this.renderer.removeClass(chipComponent.nativeElement, 'd-none');
      }
    });
  }
}
