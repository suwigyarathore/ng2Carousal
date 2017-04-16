import {
  Component, Input, ViewEncapsulation, Output, EventEmitter, OnChanges,
  ChangeDetectionStrategy, ViewChild, AfterContentInit, AfterViewInit, ViewContainerRef, ComponentFactoryResolver,
  SimpleChanges, SimpleChange
} from '@angular/core';


enum VIEW_OPERATIONS_ENUM {
  RENDER_VIEW,
  UPDATE_VIEW
}

@Component({
  selector: 'ng2-carousel',
  templateUrl: 'carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CarouselComponent implements AfterContentInit, AfterViewInit, OnChanges {
  @Input() componentType: any;
  @Input() componentInputMapArray: Array<any>;
  @Input() componentOutputEmitter: any;
  @Output() itemClickEmitter: EventEmitter<any> = new EventEmitter() ;
  @ViewChild('container', {read: ViewContainerRef }) container;
  lastActiveItem: any;
  componentRefs: Array<any> = [];

  constructor(private resolver: ComponentFactoryResolver) {
  }

  ngAfterContentInit() {
    this.componentRefs = this.renderView(this.componentInputMapArray ,
        this.componentRefs,
        this.resolver,
        this.container,
        this.componentType,
        this.componentOutputEmitter);
  }

  ngAfterViewInit() {
    if (!this.isNullOrUndefined(this.lastActiveItem)) {
      this.itemClicked(this.lastActiveItem);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('it changed');
    switch (this.inputDataArrayChangeDetector(changes['componentInputMapArray'])) {
      case VIEW_OPERATIONS_ENUM.RENDER_VIEW:
        this.componentRefs = this.renderView(this.componentInputMapArray ,
            this.componentRefs,
            this.resolver,
            this.container,
            this.componentType,
            this.componentOutputEmitter);
        break;
      case VIEW_OPERATIONS_ENUM.UPDATE_VIEW:
        this.updateView(this.componentRefs);
        break;
      default :
        break;
    }
  }

  renderView(dataArray: Array<any>,
             componentRefArray: Array<any>,
             componentFactoryResolver: ComponentFactoryResolver,
             container: any,
             componentType: any,
             componentOutPutEmitter: any
  ) {
    if (!this.isNullOrUndefined(dataArray)) {
      componentRefArray.forEach( (compRef) => {
        compRef.destroy();
      });
      componentRefArray = [];
      let componentFactory = componentFactoryResolver.resolveComponentFactory(componentType);
      dataArray.forEach((itemData) => {

        let componentRef = container.createComponent(componentFactory);
        Object.assign(componentRef.instance, itemData);
        componentRefArray.push(componentRef);

        if (!this.isNullOrUndefined(componentRef.instance[componentOutPutEmitter])) {
          componentRef.instance[componentOutPutEmitter]
              .subscribe((eventData) =>  this.itemClicked(eventData));
        }
      });
    }
    return componentRefArray;
  }

  updateView(componentRefArray: Array<any>) {
    componentRefArray.forEach((compRef, index) => {
      Object.assign(compRef.instance, this.componentInputMapArray[index]);
    });
  }

  inputDataArrayChangeDetector(inputArray: SimpleChange) {
    if (inputArray.previousValue !== inputArray.currentValue) {
      if (inputArray.currentValue.length === inputArray.previousValue.length)
        return VIEW_OPERATIONS_ENUM.UPDATE_VIEW;
      else
        return VIEW_OPERATIONS_ENUM.RENDER_VIEW;
    }
    return null;
  }

  itemClicked(eventData) {
    if (!this.isNullOrUndefined(eventData)) {
      let el: HTMLElement = eventData.element;

      const scroll = el.parentElement.clientWidth / 2 - el.offsetLeft - el.clientWidth / 2;
      el.parentElement.style.left = scroll + 'px';

      if (!this.isNullOrUndefined(eventData.option) ) {
        if (!this.isNullOrUndefined(this.lastActiveItem) && (JSON.stringify(this.lastActiveItem) !== JSON.stringify(eventData))) {
          window.setTimeout(() => {
            this.itemClickEmitter.emit(eventData.option);
          }, 550);
        }
      }
      this.lastActiveItem = eventData;
    }
  }

  slideItem(direction: String) {
    let elementToSlide ;
    switch (direction) {
      case 'left':
        elementToSlide = this.lastActiveItem.element.previousElementSibling.firstElementChild ;
        if (!this.isNullOrUndefined(elementToSlide))
          elementToSlide.click();
        break;
      case 'right':
        elementToSlide = this.lastActiveItem.element.nextElementSibling.firstElementChild ;
        if (!this.isNullOrUndefined(elementToSlide))
          elementToSlide.click();
        break;
      default :
        break;
    }
  }

  isNullOrUndefined(object: any): boolean{
    return (object == null || object == undefined) ? true : false;
  }


}
