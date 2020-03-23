import { FormBuilder, FormControl } from '@angular/forms';
import { Component } from '@angular/core';
import { QueryBuilderConfig, QueryBuilderClassNames } from "angular2-query-builder";
import moment from 'moment'

declare const __moduleName: string;

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  objectKeys = Object.keys;
  public queryCtrl: FormControl;


  public query = {
    condition: 'and',
    rules: [
      {field: 'age', operator: '<=', entity: 'physical'},
      {field: 'birthday', operator: '=', value: moment().toISOString(), entity: 'nonphysical'},
      {
        condition: 'or',
        rules: [
          {field: 'gender', operator: '=', entity: 'physical'},
          {field: 'occupation', operator: 'in', entity: 'nonphysical'},
          {field: 'school', operator: 'is null', entity: 'nonphysical'},
          {field: 'notes', operator: '=', entity: 'nonphysical'}
        ]
      }
    ]
  };

  queryArray = Object.keys(this.query).map(q => this.query[q]);

  public entityConfig: QueryBuilderConfig = {
    entities: {
      physical: {name: 'Physical Attributes'},
      nonphysical: {name: 'Nonphysical Attributes'}
    },
    fields: {
      age: {name: 'Age', type: 'number', entity: 'physical'},
      gender: {
        name: 'Gender',
        entity: 'physical',
        type: 'category',
        options: [
          {name: 'Male', value: 'm'},
          {name: 'Female', value: 'f'}
        ]
      },
      name: {name: 'Name', type: 'string', entity: 'nonphysical'},
      notes: {name: 'Notes', type: 'textarea', operators: ['=', '!='], entity: 'nonphysical'},
      educated: {name: 'College Degree?', type: 'boolean', entity: 'nonphysical'},
      birthday: {name: 'Birthday', type: 'date', operators: ['=', '<=', '>'],
        defaultValue: (() => moment().toISOString()), entity: 'nonphysical'
      },
      school: {name: 'School', type: 'string', nullable: true, entity: 'nonphysical'},
      occupation: {
        name: 'Occupation',
        entity: 'nonphysical',
        type: 'category',
        options: [
          {name: 'Student', value: 'student'},
          {name: 'Teacher', value: 'teacher'},
          {name: 'Unemployed', value: 'unemployed'},
          {name: 'Scientist', value: 'scientist'}
        ]
      }
    }
  };

  public config: QueryBuilderConfig = {
    fields: {
      age: {name: 'Age', type: 'number'},
      gender: {
        name: 'Gender',
        type: 'category',
        options: [
          {name: 'Male', value: 'm'},
          {name: 'Female', value: 'f'}
        ]
      },
      name: {name: 'Name', type: 'string'},
      notes: {name: 'Notes', type: 'textarea', operators: ['=', '!=']},
      educated: {name: 'College Degree?', type: 'boolean'},
      birthday: {name: 'Birthday', type: 'date', operators: ['=', '<=', '>'],
        defaultValue: (() => moment().toISOString())
      },
      school: {name: 'School', type: 'string', nullable: true},
      occupation: {
        name: 'Occupation',
        type: 'category',
        options: [
          {name: 'Student', value: 'student'},
          {name: 'Teacher', value: 'teacher'},
          {name: 'Unemployed', value: 'unemployed'},
          {name: 'Scientist', value: 'scientist'}
        ]
      }
    }
  };

  public currentConfig: QueryBuilderConfig;
  public allowRuleset: boolean = true;
  public allowCollapse: boolean = true;



  constructor(
    private formBuilder: FormBuilder
  ) {
    this.queryCtrl = this.formBuilder.control(this.query);
    this.currentConfig = this.config;
  }

  switchModes(event: Event) {
    this.currentConfig = (<HTMLInputElement>event.target).checked ? this.entityConfig : this.config;
  }

  changeDisabled(event: Event) {
    (<HTMLInputElement>event.target).checked ? this.queryCtrl.disable() : this.queryCtrl.enable();
  }
}
