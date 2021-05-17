import {Component,OnInit,Input} from '@angular/core';
import { GlobalService } from '../global/service/app.global.service';

  export const table = {
    "status": 200,
    "columns": [
      'select',
      'recruiter_name',
      'recruiter_company',
      'recruiter_email',
      'recruiter_phone',
      'recruiter_status',
      'action'
    ],
    "data": [
      {
        position: 1,
        recruiter_name: 'Tridib Chatterjee',
        recruiter_company: 'IBM',
        recruiter_email: 'tridib.chatterjee@navsoft.in',
        recruiter_phone: 9051355531,
        recruiter_status: true,
        edit: 'fa fa-pencil',
        delete: 'fa fa-trash-o'
      },
      {
        position: 2,
        recruiter_name: 'Pratyay Chakraborty',
        recruiter_company: 'Microsoft',
        recruiter_email: 'prat@navsoft.in',
        recruiter_phone: 9051355531,
        recruiter_status: true,
        edit: 'fa fa-pencil',
        delete: 'fa fa-trash-o'
      },
      {
        position: 3,
        recruiter_name: 'Mahasin Tarafdar',
        recruiter_company: 'Google',
        recruiter_email: 'tridib.chatterjee@navsoft.in',
        recruiter_phone: 9051355531,
        recruiter_status: true,
        edit: 'fa fa-pencil',
        delete: 'fa fa-trash-o'
      },
      {
        position: 4,
        recruiter_name: 'Silvia Sanyal',
        recruiter_company: 'Amazon',
        recruiter_email: 'mahasin.tarafdar@navsoft.in',
        recruiter_phone: 9051355531,
        recruiter_status: false,
        edit: 'fa fa-pencil',
        delete: 'fa fa-trash-o'
      },
      {
        position: 5,
        recruiter_name: 'Panjak Pandit',
        recruiter_company: 'Dell',
        recruiter_email: 'tridib.chatterjee@navsoft.in',
        recruiter_phone: 9051355531,
        recruiter_status: true,
        edit: 'fa fa-pencil',
        delete: 'fa fa-trash-o'
      },
      {
        position: 6,
        recruiter_name: 'Shantanu Sarkar',
        recruiter_company: 'Hewlett Packard',
        recruiter_email: 'mahasin.tarafdar@navsoft.in',
        recruiter_phone: 9051355531,
        recruiter_status: false,
        edit: 'fa fa-pencil',
        delete: 'fa fa-trash-o'
      },
      {
        position: 7,
        recruiter_name: 'Rahul Mondal',
        recruiter_company: 'Deloitte',
        recruiter_email: 'tridib.chatterjee@navsoft.in',
        recruiter_phone: 9051355531,
        recruiter_status: true,
        edit: 'fa fa-pencil',
        delete: 'fa fa-trash-o'
      },
      {
        position: 8,
        recruiter_name: 'Anjan Saha',
        recruiter_company: 'SpaceX',
        recruiter_email: 'tridib.chatterjee@navsoft.in',
        recruiter_phone: 9051355531,
        recruiter_status: true,
        edit: 'fa fa-pencil',
        delete: 'fa fa-trash-o'
      },
      {
        position: 9,
        recruiter_name: 'Syed Zeeshan',
        recruiter_company: 'Tesla',
        recruiter_email: 'mahasin.tarafdar@navsoft.in',
        recruiter_phone: 9051355531,
        recruiter_status: false,
        edit: 'fa fa-pencil',
        delete: 'fa fa-trash-o'
      },
      {
        position: 10,
        recruiter_name: 'Dipankar Roy',
        recruiter_company: 'Oracle',
        recruiter_email: 'tridib.chatterjee@navsoft.in',
        recruiter_phone: 9051355531,
        recruiter_status: false,
        edit: 'fa fa-pencil',
        delete: 'fa fa-trash-o'
      },
      {
        position: 11,
        recruiter_name: 'Sankar Hait',
        recruiter_company: 'British Telecom',
        recruiter_email: 'prat@navsoft.in',
        recruiter_phone: 9051355531,
        recruiter_status: true,
        edit: 'fa fa-pencil',
        delete: 'fa fa-trash-o'
      },
      {
        position: 12,
        recruiter_name: 'Surjendu Dey',
        recruiter_company: 'TCS',
        recruiter_email: 'tridib.chatterjee@navsoft.in',
        recruiter_phone: 9051355531,
        recruiter_status: false,
        edit: 'fa fa-pencil',
        delete: 'fa fa-trash-o'
      },
      {
        position: 13,
        recruiter_name: 'Debayan Bhattacharyay',
        recruiter_company: 'Cognizant',
        recruiter_email: 'tridib.chatterjee@navsoft.in',
        recruiter_phone: 9051355531,
        recruiter_status: false,
        edit: 'fa fa-pencil',
        delete: 'fa fa-trash-o'
      },
      {
        position: 14,
        recruiter_name: 'Sandeep Halder',
        recruiter_company: 'Navigators Software',
        recruiter_email: 'mahasin.tarafdar@navsoft.in',
        recruiter_phone: 9051355531,
        recruiter_status: true,
        edit: 'fa fa-pencil',
        delete: 'fa fa-trash-o'
      },
      {
        position: 15,
        recruiter_name: 'Bishan Mukherjee',
        recruiter_company: 'Palantir Technologies',
        recruiter_email: 'mahasin.tarafdar@navsoft.in',
        recruiter_phone: 9051355531,
        recruiter_status: false,
        edit: 'fa fa-pencil',
        delete: 'fa fa-trash-o'
      },
      {
        position: 16,
        recruiter_name: 'Subhasish Debnath',
        recruiter_company: 'Flipkart',
        recruiter_email: 'prat@navsoft.in',
        recruiter_phone: 9051355531,
        recruiter_status: true,
        edit: 'fa fa-pencil',
        delete: 'fa fa-trash-o'
      },
      {
        position: 17,
        recruiter_name: 'Kalyansish Roy',
        recruiter_company: 'Uber',
        recruiter_email: 'tridib.chatterjee@navsoft.in',
        recruiter_phone: 9051355531,
        recruiter_status: false,
        edit: 'fa fa-pencil',
        delete: 'fa fa-trash-o'
      },
      {
        position: 18,
        recruiter_name: 'Mahasin Tarafdar',
        recruiter_company: 'Facebook',
        recruiter_email: 'prat@navsoft.in',
        recruiter_phone: 9051355531,
        recruiter_status: true,
        edit: 'fa fa-pencil',
        delete: 'fa fa-trash-o'
      },
      {
        position: 19,
        recruiter_name: 'Pratyay Chakraborty',
        recruiter_company: 'RS Software',
        recruiter_email: 'prat@navsoft.in',
        recruiter_phone: 9051355531,
        recruiter_status: false,
        edit: 'fa fa-pencil',
        delete: 'fa fa-trash-o'
      },
      {
        position: 20,
        recruiter_name: 'Tridib Chatterjee',
        recruiter_company: 'Infosys',
        recruiter_email: 'prat@navsoft.in',
        recruiter_phone: 9051355531,
        recruiter_status: false,
        edit: 'fa fa-pencil',
        delete: 'fa fa-trash-o'
      },
      
    ]
  }

@Component({
  selector: 'app-recruiters',
  template: `<global-table [childData]='childData'></global-table>`,
})
export class RecruitersComponent { 

  public tabIndex: number;
  public parentId: number = 0;
  public dataTable;
	childData = {};
	constructor(private _globalService: GlobalService){
    this.tabIndex = +_globalService.getCookie('active_tabs');
    this.parentId = _globalService.getParentId(this.tabIndex);
    this.childData = {
        table: 'EngageboostUsers',
        url: 'recruiter/list',
        heading: 'Recruiters',
        ispopup: 'N',
        tablink: 'users',
        tabparrentid: this.parentId,
        screen: 'list',
        is_import: 'N',
        is_export: 'N'
    }
  }
}