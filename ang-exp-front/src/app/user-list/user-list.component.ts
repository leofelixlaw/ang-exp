import { Component, OnInit } from "@angular/core";
import { CrudService } from "./shared/crud.service";

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

  constructor(private crudService: CrudService) {
    setTimeout(() => { this.loadingIndicator = false; }, 2000);
  }

  ngOnInit() {
    this.crudService.getUsers().subscribe(result => {
      this.list = result;
    });
  }
}
