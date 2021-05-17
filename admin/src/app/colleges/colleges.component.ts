import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../global/service/app.global.service';
import { TableService } from '../global/service/table.service';
import { Subject } from 'rxjs';

export const table = {
  "status": 200,
  "columns": [
    'select',
    'college_name',
    'representative_name',
    'representative_email',
    'representative_phone',
    'representative_status',
    'action'
  ],
  "data": [
    {
      position: 1,
      college_name: 'Jawaharlal Neheru University',
      representative_name: 'Michael Jordan',
      representative_email: 'tridib.chatterjee@navsoft.in',
      representative_phone: 9051355531,
      representative_status: true,
      edit: 'fa fa-pencil',
      delete: 'fa fa-trash-o'
    },
    {
      position: 2,
      college_name: 'University of Delhi',
      representative_name: 'Jonathan Woodkin',
      representative_email: 'prat@navsoft.in',
      representative_phone: 9051355531,
      representative_status: true,
      edit: 'fa fa-pencil',
      delete: 'fa fa-trash-o'
    },
    {
      position: 3,
      college_name: 'Indian Institute of Technology',
      representative_name: 'Walter Gilburt',
      representative_email: 'tridib.chatterjee@navsoft.in',
      representative_phone: 9051355531,
      representative_status: true,
      edit: 'fa fa-pencil',
      delete: 'fa fa-trash-o'
    },
    {
      position: 4,
      college_name: 'West Bengal University of Technology',
      representative_name: 'Alan Baker',
      representative_email: 'mahasin.tarafdar@navsoft.in',
      representative_phone: 9051355531,
      representative_status: false,
      edit: 'fa fa-pencil',
      delete: 'fa fa-trash-o'
    },
    {
      position: 5,
      college_name: 'University of Calcutta',
      representative_name: 'Alan Baker',
      representative_email: 'tridib.chatterjee@navsoft.in',
      representative_phone: 9051355531,
      representative_status: true,
      edit: 'fa fa-pencil',
      delete: 'fa fa-trash-o'
    },
    {
      position: 6,
      college_name: 'Bangalore University',
      representative_name: 'Alan Baker',
      representative_email: 'mahasin.tarafdar@navsoft.in',
      representative_phone: 9051355531,
      representative_status: false,
      edit: 'fa fa-pencil',
      delete: 'fa fa-trash-o'
    },
    {
      position: 7,
      college_name: 'Vellore Institute of Technology',
      representative_name: 'Alan Baker',
      representative_email: 'tridib.chatterjee@navsoft.in',
      representative_phone: 9051355531,
      representative_status: true,
      edit: 'fa fa-pencil',
      delete: 'fa fa-trash-o'
    },
    {
      position: 8,
      college_name: 'Maulana Abul Kalam Azad University',
      representative_name: 'Alan Baker',
      representative_email: 'tridib.chatterjee@navsoft.in',
      representative_phone: 9051355531,
      representative_status: true,
      edit: 'fa fa-pencil',
      delete: 'fa fa-trash-o'
    },
    {
      position: 9,
      college_name: 'Banaras Hindu University',
      representative_name: 'Alan Baker',
      representative_email: 'mahasin.tarafdar@navsoft.in',
      representative_phone: 9051355531,
      representative_status: false,
      edit: 'fa fa-pencil',
      delete: 'fa fa-trash-o'
    },
    {
      position: 10,
      college_name: 'Aligarh Muslim University',
      representative_name: 'Matthew Hill',
      representative_email: 'tridib.chatterjee@navsoft.in',
      representative_phone: 9051355531,
      representative_status: false,
      edit: 'fa fa-pencil',
      delete: 'fa fa-trash-o'
    },
    {
      position: 11,
      college_name: 'Jadavpur University',
      representative_name: 'Timothy Fulner',
      representative_email: 'prat@navsoft.in',
      representative_phone: 9051355531,
      representative_status: true,
      edit: 'fa fa-pencil',
      delete: 'fa fa-trash-o'
    },
    {
      position: 12,
      college_name: 'Punjab Technical University',
      representative_name: 'Jhonny Young',
      representative_email: 'tridib.chatterjee@navsoft.in',
      representative_phone: 9051355531,
      representative_status: false,
      edit: 'fa fa-pencil',
      delete: 'fa fa-trash-o'
    },
    {
      position: 13,
      college_name: 'Meghnad Saha Institute of Technology',
      representative_name: 'Tridib Chatterjee',
      representative_email: 'tridib.chatterjee@navsoft.in',
      representative_phone: 9051355531,
      representative_status: false,
      edit: 'fa fa-pencil',
      delete: 'fa fa-trash-o'
    },
    {
      position: 14,
      college_name: 'Indian Institute of Hotel Management',
      representative_name: 'Jonathan Woodkin',
      representative_email: 'mahasin.tarafdar@navsoft.in',
      representative_phone: 9051355531,
      representative_status: true,
      edit: 'fa fa-pencil',
      delete: 'fa fa-trash-o'
    },
    {
      position: 15,
      college_name: 'Heritage Institute of Technology',
      representative_name: 'Shamim Akhter',
      representative_email: 'mahasin.tarafdar@navsoft.in',
      representative_phone: 9051355531,
      representative_status: false,
      edit: 'fa fa-pencil',
      delete: 'fa fa-trash-o'
    },
    {
      position: 16,
      college_name: 'Netaji Subhash Engineering College',
      representative_name: 'Navsoft Data',
      representative_email: 'prat@navsoft.in',
      representative_phone: 9051355531,
      representative_status: true,
      edit: 'fa fa-pencil',
      delete: 'fa fa-trash-o'
    },
    {
      position: 17,
      college_name: 'St. Thomas Institute of Technology',
      representative_name: 'Test Test',
      representative_email: 'tridib.chatterjee@navsoft.in',
      representative_phone: 9051355531,
      representative_status: false,
      edit: 'fa fa-pencil',
      delete: 'fa fa-trash-o'
    },
    {
      position: 18,
      college_name: 'Budge Budge Institute of Technology',
      representative_name: 'Title Surname',
      representative_email: 'prat@navsoft.in',
      representative_phone: 9051355531,
      representative_status: true,
      edit: 'fa fa-pencil',
      delete: 'fa fa-trash-o'
    },
    {
      position: 19,
      college_name: 'Techno India University',
      representative_name: 'Jordan Hill',
      representative_email: 'prat@navsoft.in',
      representative_phone: 9051355531,
      representative_status: false,
      edit: 'fa fa-pencil',
      delete: 'fa fa-trash-o'
    },
    {
      position: 20,
      college_name: 'Anna University',
      representative_name: 'Peter Simonds',
      representative_email: 'prat@navsoft.in',
      representative_phone: 9051355531,
      representative_status: false,
      edit: 'fa fa-pencil',
      delete: 'fa fa-trash-o'
    },

  ]
}

export interface TableData {
  heading: string,
  displayedColumns: Array<any>,
  data: Object
}

@Component({
  selector: 'app-colleges',
  template: `<global-table [childData]='childData'></global-table>`,
  providers: [TableService]
})
export class CollegesComponent implements OnInit, AfterViewInit {

  public tabIndex: number;
  public parentId: number = 0;
  public response : any;
	public errorMsg: string;
	public successMsg: string;
  pageData = {};
  childData = {};
  constructor(private _globalService: GlobalService) {
      this.tabIndex = +_globalService.getCookie('active_tabs');
      this.parentId = this._globalService.getParentId(this.tabIndex);
      
      this.childData = {
          table: 'GlobalCollege',
          url: 'college/list',
          heading: 'Colleges',
          ispopup: 'N',
          tablink: 'colleges',
          tabparrentid: this.parentId,
          screen: 'list',
          is_import: 'N',
          is_export: 'N'
      }
  }

  ngOnInit() { }

  ngAfterViewInit() {  }

/*   loadGrid() {
    this._globalService.showLoaderSpinner(true);

    this._tableService.loadCollegeTable(this.pageData).subscribe(
      (data) => {
        this.response = data;
        console.log(this.response)
        this.childData.heading = 'Colleges';
        console.log(this.response)
        if (this.response.status && this.response.status == 200) {
          this.childData.displayedColumns = this.response.columns;
          this.childData.displayedColumns = this.response.data;

          console.log(this.childData)

          this._globalService.showLoaderSpinner(false);
          
        } else {
          this.errorMsg = this.response.message;
        }
      },
      err => {
        this._globalService.showLoaderSpinner(false);
        this.errorMsg = "Something went wrong. Please try again."
      },
      function () {
        //completed callback
      }
    )
  } */


}