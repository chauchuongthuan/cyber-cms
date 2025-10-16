import { CreateEditRoleComponent } from "../components/create-edit-role/create-edit-role.component";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
} from "@angular/forms";
import { NzMessageService } from "ng-zorro-antd/message";
import { RoleService } from "../services/role.service";
import {
  Ipaginator,
  option,
  params,
  sort,
} from "src/app/common/constant/list.model";
import { HttpParams } from "@angular/common/http";
import { RouterService } from "src/app/common/services/router.service";
import { tableData } from "src/app/common/constant/pageList.constant";
import { CommonService } from "src/app/common/services/common.service";

@Component({
  selector: "app-role",
  templateUrl: "./role.component.html",
  styleUrls: ["./role.component.scss"],
})
export class RoleComponent implements OnInit {
  @ViewChild("actionComponent") actionComponent: CreateEditRoleComponent;
  public permissions: Array<string> = [];
  public tableLoading: boolean = false;
  public checked: boolean = true;
  public expandSet = new Set<number>();
  public filterForm: UntypedFormGroup;
  public createForm!: UntypedFormGroup;
  public listRole: any;
  public visible = false;
  public size: "large" | "default" = "default";
  public params: HttpParams = params;
  public paginator: Ipaginator = {
    option: option,
    limit: 10,
    currentPage: 1,
    total: 0,
    pageCount: 0,
  };

  public data: tableData = {
    column: [
      {
        dataIndex: "name",
        name: "Tên",
      },
      {
        dataIndex: "isAdmin",
        name: "Quyền admin",
        isHTML: true,
      },
      {
        dataIndex: "createdAt",
        name: "Ngày tạo",
      },
      {
        dataIndex: "action",
        name: "Hành động",
        listButton: true,
      },
    ],
    data: [],
  };
  constructor(
    private fb: UntypedFormBuilder,
    private roleService: RoleService,
    private msg: NzMessageService,
    private routerService: RouterService,
    private commonService: CommonService,
  ) {}

  ngOnInit(): void {
    this.initParams();
    this.getRole(this.params);
    this.roleService.getPermissions().subscribe(data => {
      this.permissions = data.data;
      setTimeout(() => {
        this.commonService.loadingState(false);
      }, 500);
    })
  }

  initParams() {
    let urlParams = this.routerService.params;
    let keys = Object.keys(urlParams);
    keys.forEach((key, index) => {
      this.params = this.params.set(key, urlParams[key]);
    });
  }

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  getRole(params: HttpParams) {
    this.tableLoading = true;
    this.roleService.getRole(params).subscribe((data) => {
      this.data.data = data.list?.map((item: any) => {
        let action = [
          {
            icon: "edit",
            fn: () => this.onEdit(item),
          },
          {
            icon: "delete",
            isDanger: true,
            isComfirm: true,
            tip: "Bạn có chắc muốn xóa?",
            fn: () => this.onDelete(item.id || item._id),
          },
        ];
        
        let createdAt = new Date(item.createdAt).toLocaleString("en-GB", {
          timeZone: "Asia/Ho_Chi_Minh",
        });
        return {
          ...item,
          action,
          createdAt,
        };
      });
      this.paginator = {
        ...data.paginator,
        option,
      };
      this.tableLoading = false;
      this.routerService.replaceParams(this.params);
    });
  }

  onFilter(filters: any) {
    if (filters) {
      let keys = Object.keys(filters);
      let values = Object.values(filters);
      keys.forEach((key, index) => {
        if (!values[index]) {
          this.params = this.params.set(key, "");
        } else if (
          ["number", "boolean", "string"].includes(typeof values[index])
        ) {
          this.params = this.params.set(key, `${values[index]}`);
        }
      });
    }
    this.getRole(this.params);
  }

  onEdit(data: any) {
    this.actionComponent.showLarge();
    this.actionComponent.dataInit(data, true);
  }

  onDelete(id: string) {
    this.tableLoading = true;
    this.roleService.deleteRole(id).subscribe(
      (data) => {
        this.getRole(this.params);
      },
      (error) => (this.tableLoading = false)
    );
  }

  get title(): string {
    return `${this.size} Drawer`;
  }

  tableChange(e: any) {
    let arraySort = e.sort as Array<any>;
    let fieldSort = arraySort.find((item) => item.value != null);

    let page = e.pageIndex;
    let limit = e.pageSize;
    let sort: sort = {
      orderBy: fieldSort ? fieldSort.key : "createdAt",
      order: fieldSort?.value == "ascend" ? 1 : -1,
    };
    this.onChange(page, limit, sort);
  }

  onChange(page: number, limit: number, sort: sort) {
    this.params = this.params.set("page", page);
    this.params = this.params.set("limit", limit);
    this.params = this.params.set("orderBy", sort.orderBy);
    this.params = this.params.set("order", sort.order);
    this.getRole(this.params);
  }

  onSuccess() {
    this.getRole(this.params);
  }

  exportRole(){
    this.roleService.exportRole(this.params);
  }
}
