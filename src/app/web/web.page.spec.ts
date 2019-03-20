import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebPage } from './web.page';

describe('Tab2Page', () => {
  let component: WebPage;
  let fixture: ComponentFixture<WebPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
