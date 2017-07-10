import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmshopComponent } from './dmshop.component';

describe('DmshopComponent', () => {
  let component: DmshopComponent;
  let fixture: ComponentFixture<DmshopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmshopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
