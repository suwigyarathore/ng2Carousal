import {Component, OnInit, Input, Output, EventEmitter, ElementRef, AfterViewInit,OnChanges, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'ng2-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() src: String ;
  @Input() index: Number;
  @Input() activeIndex: Number;
  @Output() imageClicked: EventEmitter<any> = new EventEmitter() ;

  constructor(private elRef: ElementRef) { }

  ngOnInit() {
  }

  click(){
    this.imageClicked.emit({element: this.elRef.nativeElement, option: { src: this.src, index: this.index}});
  }

  ngAfterViewInit() {
    if (this.index === this.activeIndex) {
      this.imageClicked.emit({element: this.elRef.nativeElement, option: { src: this.src, index: this.index}});
    }
  }

  ngOnChanges() {
    console.log('chnaged');
    if (this.index === this.activeIndex) {
      this.imageClicked.emit({element: this.elRef.nativeElement, option: { src: this.src, index: this.index}});
    }
  }



}
