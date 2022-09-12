import { Injectable } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { NbLayoutDimensions, NbLayoutRulerService } from '@nebular/theme';
import { BehaviorSubject, Observable } from 'rxjs';
import { Dimensions } from '../models/dimension.model';

@Injectable({
  providedIn: 'root'
})
export class DimensionsService {
  clinetDimensions = new BehaviorSubject<NbLayoutDimensions>(null);
  currentDeviceSize = new BehaviorSubject<string>(null);
  htmlDimensitopns = new BehaviorSubject<Dimensions>({
    pageHeight: '50px',
  });

  constructor(private layout: NbLayoutRulerService,
    private eventManager: EventManager) {
    this.eventManager.addGlobalEventListener('window', 'resize', this.onResize.bind(this));
  }
  private onResize(event: UIEvent) {
    this.getDimensions();
    this.getDeviceSize();
  }
  getDimensions(): Observable<NbLayoutDimensions> {
    this.layout.getDimensions()
      .subscribe((data) => {
        this.clinetDimensions.next(data);
        const newDimensions: Dimensions = {
          pageHeight: `${data.clientHeight - 130}px`,
        };
        this.htmlDimensitopns.next(newDimensions);
      }
      );
    return this.clinetDimensions;
  }
  getDeviceSize(): BehaviorSubject<string> {
    if (this.clinetDimensions) {
      if (this.clinetDimensions.value.clientWidth < 576) this.currentDeviceSize.next('small');
      else if (this.clinetDimensions.value.clientWidth > 576 &&
        this.clinetDimensions.value.clientWidth < 1000) this.currentDeviceSize.next('medium');
      else if (this.clinetDimensions.value.clientWidth > 1000) this.currentDeviceSize.next('large');
      return this.currentDeviceSize;
    }
    else {
      return null;
    }

  }


}
