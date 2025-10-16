import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CategoryService } from '../services/category.service';
import { ICategory } from '../model/category.model';
import { Ipaginator, option, params, sort } from 'src/app/common/constant/list.model';
import { HttpParams } from '@angular/common/http';
import { RouterService } from 'src/app/common/services/router.service';
import { CreateEditCategoryComponent } from '../components/create-edit-category/create-edit-post-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  public tableLoading: boolean = false;
  public checked: boolean = true;
  public expandSet = new Set<number>();
  public filterForm!: UntypedFormGroup;
  public listCategory: any;
  public visible = false;
  public size: 'large' | 'default' = 'default';
  public params: HttpParams = params;
  public checkOptionsOne = [
    { label: 'Tên danh mục', value: 'name', checked: true },
    { label: 'Mô tả', value: 'shortDescription', checked: false },
  ];
  public paginator: Ipaginator = {
    option: option,
    limit: 10,
    currentPage: 1,
    total: 0,
    pageCount: 0
  };
  public sort: sort = {
    order: -1,
    orderBy: 'createdAt'
  }
  // public listOfData = [];
  @ViewChild('editForm') editForm: CreateEditCategoryComponent;

  constructor(
    private fb: UntypedFormBuilder,
    private categoryService: CategoryService,
    private msg: NzMessageService,
    private routerService: RouterService
  ) { }

  ngOnInit(): void {
    this.initParams();
    this.filterForm = this.fb.group({
      name: new FormControl('', []),
      active: new FormControl('', []),
      date: new FormControl('', []),
    });
    this.getCategory(this.params);
  }

  initParams(){
    // this.params = this.params.set('orderBy', this.sort.orderBy)
    // this.params = this.params.set('order', this.sort.order)

    let urlParams = this.routerService.params
    let keys = Object.keys(urlParams)
    keys.forEach((key, index) => {
      this.params = this.params.set(key, urlParams[key])
    })
  }

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  getCategory(params: HttpParams) {
    this.tableLoading = true;
    this.categoryService.getCategory(params).subscribe(data => {
      this.listCategory = data.list;
      this.paginator = {
        ...data.paginator,
        option
      }
      this.tableLoading = false;
      this.routerService.replaceParams(this.params);
    })
  }
  onFilter(filters: any){    
    if(filters){
      let keys = Object.keys(filters)
      let values = Object.values(filters)
      keys.forEach((key, index) => {
        if(!values[index]){
          this.params = this.params.set(key, '')
        }else if(['number', 'boolean', 'string'].includes(typeof values[index])){
          this.params = this.params.set(key, `${values[index]}`)
        }
      })
    }
    this.getCategory(this.params)
  }
  onEdit(data: any){
    this.editForm.visible = true;
    this.editForm.initData(data);
  }

  onDelete(id: string){
    this.tableLoading = true
    this.categoryService.deleteCategory(id).subscribe(data => {
        this.getCategory(this.params)
      },
      error => this.tableLoading = false
    )
  }
  onExport(){
    this.categoryService.exportCategory(this.params)
  }

  get title(): string {
    return `${this.size} Drawer`;
  }



  tableChange(e: any){
    let arraySort = e.sort as Array<any>;
    let fieldSort = arraySort.find((item) => item.value != null)

    let page = e.pageIndex;
    let limit = e.pageSize;
    let sort: sort = {
      orderBy: fieldSort ? fieldSort.key : 'createdAt',
      order: fieldSort?.value == 'ascend' ? 1 : -1
    }
    this.onChange(page, limit, sort)
  }

  onChange(page: number, limit: number, sort: sort){
    this.params = this.params.set('page', page)
    this.params = this.params.set('limit', limit)
    this.params = this.params.set('orderBy', sort.orderBy)
    this.params = this.params.set('order', sort.order)
    this.getCategory(this.params)
  }
  onSuccess(){
    this.getCategory(this.params);
  }
}
