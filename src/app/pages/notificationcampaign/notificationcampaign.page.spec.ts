import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationcampaignPage } from './notificationcampaign.page';

describe('NotificationcampaignPage', () => {
  let component: NotificationcampaignPage;
  let fixture: ComponentFixture<NotificationcampaignPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationcampaignPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationcampaignPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
