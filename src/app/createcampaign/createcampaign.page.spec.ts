import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecampaignPage } from './createcampaign.page';

describe('CreatecampaignPage', () => {
  let component: CreatecampaignPage;
  let fixture: ComponentFixture<CreatecampaignPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatecampaignPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatecampaignPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
