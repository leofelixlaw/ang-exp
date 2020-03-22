import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from "@angular/core";
import { CrudService } from "./shared/crud.service";
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgForm } from '@angular/forms';
import { UserFeild } from './shared/crud';
import { Common } from '../shared/common';
import { Router } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"]
})

export class UserListComponent implements OnInit {
  public list = [];
  reorderable: boolean = true;
  loadingIndicator: boolean = true;
  columns = [{ prop: "name" }, { name: "Email" }, { name: "Phone" }];
  @ViewChild('thisForm') form: NgForm;
  @ViewChild('table') table;
  user: any;
  id: any;
  temp: any;
  constructor(
    private crudService: CrudService,
    private toastr: ToastrManager,
    private common: Common,
    private router: Router,
    ) {
    setTimeout(() => { this.loadingIndicator = false; }, 2000);
  }

  ngOnInit() {
    this.user = new UserFeild();
    this.onLoadData();
  }
  
  onLoadData(){
    this.crudService.getItems().subscribe(result => {
      this.list = result;
      this.temp = [...result];
    });
  }

  resetForm(){
    this.form.reset();
    this.id = '';
  }
  
  // Save item
  onSave(){
    let request;
    let data = this.user; 
    if (this.id) {
      request = this.crudService.putItem(this.id, data);
    } else {
      request = this.crudService.saveItem(data);
    }

    request.subscribe(
      result => {
        this.toastr.successToastr(this.common.ToastInfo.saved, this.common.ToastInfo.success);
        this.onLoadData();
        this.resetForm();
      },
      (err: HttpErrorResponse) => {
        this.toastr.errorToastr(
          err.error && err.error.message ? err.error.message : this.common.ToastInfo.wrong,
          this.common.ToastInfo.failure
        );
      }
    );
  }
  
  onDelete() {
    if (window.confirm(this.common.Confirmation.delete)) {
      this.crudService.deleteItem(this.user.id).subscribe(
        result => {
          this.toastr.successToastr(this.common.ToastInfo.deleted, this.common.ToastInfo.success);
          this.onLoadData();
          this.resetForm();
        },
        (err: HttpErrorResponse) => {
          this.toastr.errorToastr(
            err.error && err.error.message ? err.error.message : this.common.ToastInfo.wrong,
            this.common.ToastInfo.failure
          );
        }
      );
    }
  }

  // Click user
  onActivate(event) {
    if(event.type == 'click') {
      this.user = event.row;
      this.id = event.row.id;
    }
  }

  // Filter list
  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.user = temp;
    this.table.offset = 0;

  }
}
