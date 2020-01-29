import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupcampaignPage } from './groupcampaign.page';

describe('GroupcampaignPage', () => {
  let component: GroupcampaignPage;
  let fixture: ComponentFixture<GroupcampaignPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupcampaignPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupcampaignPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
