import {Component, OnInit} from '@angular/core';

import {ImageComponent} from '../app/image/image.component';
import {Observable} from 'rxjs/Observable';
import {Subject} from "rxjs";

@Component({
    selector: 'main-app',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    componentType: any = ImageComponent;
    outputEmitter: any = 'imageClicked';
    activeIndex: number = 5;
    dataArray:Array<any> = [{src: '../../assets/images/1.jpg', index: 0},
        {src: '../../assets/images/2.jpg', index: 1, activeIndex: this.activeIndex},
        {src: '../../assets/images/3.jpg', index: 2, activeIndex: this.activeIndex},
        {src: '../../assets/images/4.jpg', index: 3, activeIndex: this.activeIndex},
        {src: '../../assets/images/5.jpg', index: 4, activeIndex: this.activeIndex},
        {src: '../../assets/images/6.jpg', index: 5, activeIndex: this.activeIndex},
        {src: '../../assets/images/7.jpg', index: 6, activeIndex: this.activeIndex},
        {src: '../../assets/images/3.jpg', index: 7, activeIndex: this.activeIndex},
        {src: '../../assets/images/4.jpg', index: 8, activeIndex: this.activeIndex},
        {src: '../../assets/images/5.jpg', index: 9, activeIndex: this.activeIndex},
        {src: '../../assets/images/6.jpg', index: 10, activeIndex: this.activeIndex},
        {src: '../../assets/images/7.jpg', index: 11, activeIndex: this.activeIndex}];
    dataArrayObservable = Observable.of(this.dataArray);

    constructor() {
    }

    ngOnInit() {
    }

    itemClicked(item) {
        console.log(item);
        let modifiedDataArray = this.dataArray.map(itemData => {
            itemData.activeIndex = item.index ;
            return itemData
        });

        this.dataArray = modifiedDataArray;
        this.dataArrayObservable = Observable.of(this.dataArray);
    }

}
