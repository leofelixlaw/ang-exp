import { Component, OnInit, ViewChild } from "@angular/core";
import { CrudService } from "./shared/crud.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgForm } from '@angular/forms';
import { UserFeild } from './shared/crud';

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
  user: UserFeild;
  id: any;

  constructor(
    private crudService: CrudService,

    ) {
    setTimeout(() => { this.loadingIndicator = false; }, 2000);
  }

  ngOnInit() {
    this.user = new UserFeild();
    this.crudService.getItems().subscribe(result => {
      this.list = result;
    });
  }
  
  // Save item
  onSave(){
    let request;
    let data = this.user; // Object.values(this.user);
    if (this.id) {
      this.crudService.putItem(this.id, data);
    } else {
      this.crudService.saveItem(data);
    }
  }

  // Delete item
  onDelete(){
    this.crudService.deleteItem(this.user.id);
  }
  
  // Click user
  onActivate(event) {
    if(event.type == 'click') {
      this.user = event.row;
      console.log(event.row);
        // this.router.navigate(['contacts/view/', event.row.uuid])
    }
  }
}
