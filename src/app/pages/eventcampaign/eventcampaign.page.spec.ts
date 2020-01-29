import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventcampaignPage } from './eventcampaign.page';

describe('EventcampaignPage', () => {
  let component: EventcampaignPage;
  let fixture: ComponentFixture<EventcampaignPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventcampaignPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventcampaignPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
