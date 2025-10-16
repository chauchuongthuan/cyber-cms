import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionTokenDrawComponent } from '../components/action-token-draw/action-token-draw.component';
import { HttpParams } from '@angular/common/http';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { tableData } from 'src/app/common/constant/pageList.constant';
import { RouterService } from 'src/app/common/services/router.service';
import { ShareInfoDataService } from '../../user/services/shareInfoData.service';
import { UserService } from '../../user/services/user.service';
import {
  Ipaginator,
  option,
  params,
  sort,
} from "src/app/common/constant/list.model";
import { TokenDrawService } from '../services/token-draw.service';
import { ImportDataComponent } from '../components/import-data/import-data.component';
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  @ViewChild("actionComponent") actionComponent: ActionTokenDrawComponent;
  @ViewChild("importComponent") importComponent: ImportDataComponent;
  public tableLoading: boolean = false;
  public checked: boolean = true;
  public expandSet = new Set<number>();
  public filterForm: UntypedFormGroup;
  public createForm!: UntypedFormGroup;
  public listUser: any;
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
        dataIndex: 'token',
        name: 'Mã',
      },
      {
        dataIndex: 'isWin',
        name: 'Trúng giải',
        isHTML: true
      },
      {
        dataIndex: "winDate",
        name: "Ngày trúng",
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

  loading = false;
  indeterminate = false;
  listOfData: readonly any[] = [];
  listOfCurrentPageData: readonly any[] = [];
  setOfCheckedId = new Set<number>();
  constructor(
    private fb: UntypedFormBuilder,
    private tokenDrawService: TokenDrawService,
    private msg: NzMessageService,
    private routerService: RouterService,
    private shareInfoDataService: ShareInfoDataService,
  ) {}

  ngOnInit(): void {
    this.initParams();
    this.getTokenDraw(this.params);
    this.shareInfoDataService.data$.subscribe(data => {
      if(data){
        this.getTokenDraw(this.params);
      }
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

  getTokenDraw(params: HttpParams) {
    this.tableLoading = true;
    this.tokenDrawService.getTokenDraw(params).subscribe((data) => {
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
          role: item.role?.name,
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
    this.getTokenDraw(this.params);
  }

  onEdit(data: any) {
    this.actionComponent.showLarge();
    this.actionComponent.dataInit(data, true);
  }

  onDelete(id: string) {
    this.tableLoading = true;
    this.tokenDrawService.deleteTokenDraw(id).subscribe(
      (data) => {
        this.getTokenDraw(this.params);
      },
      (error) => (this.tableLoading = false)
    );
  }


  onReset(id: string) {
    this.tableLoading = true;
    this.tokenDrawService.onResetTokenDraw(id).subscribe(
      (data) => {
        this.getTokenDraw(this.params);
      },
      (error) => (this.tableLoading = false)
    );
  }

  onResetAll() {
    this.tableLoading = true;
    this.tokenDrawService.onResetTokenDrawAll().subscribe(
      (data) => {
        this.getTokenDraw(this.params);
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
    this.getTokenDraw(this.params);
  }

  onSuccess() {
    this.getTokenDraw(this.params);
  }
  
  exportUser(){
    this.tokenDrawService.exportTokenDraw(this.params)
  }

  importUser() {
    this.importComponent.showDefault();
  }

  onItemChecked(id: number, checked: any): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.listOfCurrentPageData
      .filter(({ disabled }) => !disabled)
      .forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  updateCheckedSet(id: number, checked: any): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData.filter(({ disabled }) => !disabled);
    this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id));
    this.indeterminate = listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
  }
}
