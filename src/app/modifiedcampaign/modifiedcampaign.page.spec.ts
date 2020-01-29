import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiedcampaignPage } from './modifiedcampaign.page';

describe('ModifiedcampaignPage', () => {
  let component: ModifiedcampaignPage;
  let fixture: ComponentFixture<ModifiedcampaignPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifiedcampaignPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifiedcampaignPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
