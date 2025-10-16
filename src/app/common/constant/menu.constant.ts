export interface Menu { 
    id: number, 
    name: string, 
    icon: string, 
    isApp?: string,
    path: Array<any>, 
    active: Array<string>,
    children: Array<any>,
    queryParams?: any
}

export const AdminMenu: Menu[] = [{
    id: 1,
    name: 'Quản trị',
    icon: 'icon-dashboard',
    active: ['roles', 'users', 'pages'],
    path: ['roles'],
    children: [{
        id: 1,
        name: 'Quyền quản trị',
        permission: 'role_list',
        icon: '',
        active: ['roles'],
        path: ['roles'],
    },{
        id: 2,
        name: 'Quản trị viên',
        permission: 'user_list',
        icon: '',
        active: ['users'],
        path: ['users'],
    },{
        id: 3,
        name: 'Quản trị trang',
        permission: '',
        icon: '',
        active: ['pages'],
        path: ['pages'],
        // queryParams: { isManager: true }
    },{
        id: 5,
        name: 'Quản trị template',
        permission: 'template_list',
        icon: '',
        active: ['templates'],
        path: ['templates'],
        // queryParams: { isManager: true }
    },{
        id: 6,
        name: 'Quản trị đối tác',
        permission: '',
        icon: '',
        active: ['partners'],
        path: ['partners'],
        // queryParams: { isManager: true }
    },{
        id: 7,
        name: 'Quản trị liên hệ',
        permission: '',
        icon: '',
        active: ['contacts'],
        path: ['contacts'],
        // queryParams: { isManager: true }
    },{
        id: 8,
        name: 'Quản trị liên hệ cửa hàng',
        permission: '',
        icon: '',
        active: ['contact-socials'],
        path: ['contact-socials'],
        // queryParams: { isManager: true }
    },{
        id: 9,
        name: 'Quản trị menu',
        permission: '',
        icon: '',
        active: ['menus'],
        path: ['menus'],
        // queryParams: { isManager: true }
    },{
        id: 10,
        name: 'Quản trị người đăng ký',
        permission: '',
        icon: '',
        active: ['subscribes'],
        path: ['subscribes'],
        // queryParams: { isManager: true }
    },{
        id: 11,
        name: 'Quản trị danh mục bài viết',
        permission: '',
        icon: '',
        active: ['editorial-categories'],
        path: ['editorial-categories'],
        // queryParams: { isManager: true }
    },{
        id: 12,
        name: 'Quản trị bài viết',
        permission: '',
        icon: '',
        active: ['editorials'],
        path: ['editorials'],
        // queryParams: { isManager: true }
    },{
        id: 13,
        name: 'Quản trị chi nhánh',
        permission: '',
        icon: '',
        active: ['stores'],
        path: ['stores'],
        // queryParams: { isManager: true }
    },]
},{
    id: 2,
    name: 'Cửa hàng',
    icon: 'icon-Order',
    active: ['shops'],
    path: ['shops'],
    children: [{
        id: 1,
        name: 'Danh sách cửa hàng',
        permission: 'shop_list',
        icon: '',
        active: ['shops'],
        path: ['shops'],
    },{
        id: 2,
        name: 'Quyền quản trị cửa hàng',
        permission: 'role_list',
        icon: '',
        active: ['roles'],
        path: ['roles'],
    },{
        id: 3,
        name: 'Nhân viên cửa hàng',
        permission: 'user_list',
        icon: '',
        active: ['users'],
        path: ['users'],
        // queryParams: { isManager: false }
    }]
},{
    id: 3,
    name: 'Sản phẩm',
    icon: 'icon-store1',
    active: ['products','product-category', 'product-highlight', 'product-reference', 'product-hashtags', 'product-props' , 'product-sizeguide', 'product-banners', 'product-reviews', 'product-collections'],
    path: ['products'],
    children: [
        {
            id: 1,
            name: 'Quản trị sản phẩm',
            permission: 'product_list',
            icon: '',
            active: ['products'],
            path: ['products'],
        },
        {
            id: 2,
            name: 'Danh mục sản phẩm',
            permission: 'product_category_list',
            icon: '',
            active: ['product-category'],
            path: ['product-category'],
        },
        {
            id: 3,
            name: 'Hashtag',
            permission: 'product_hashtag_list',
            icon: '',
            active: ['product-hashtags'],
            path: ['product-hashtags'],
        },
        {
            id: 4,
            name: 'Bộ sưu tập',
            permission: 'product_highlight_list',
            icon: '',
            active: ['product-highlight'],
            path: ['product-highlight'],
        },
        {
            id: 5,
            name: 'Chăm sóc',
            permission: 'product_reference_list',
            icon: '',
            active: ['product-reference'],
            path: ['product-reference'],
        },
        {
            id: 6,
            name: 'Đặc tính',
            permission: 'product_list',
            icon: '',
            active: ['product-props'],
            path: ['product-props'],
        },
        {
            id: 7,
            name: 'Danh mục size guide',
            permission: 'sizeguide_cateogry_list',
            icon: '',
            active: ['product-sizeguide-categories'],
            path: ['product-sizeguide-categories'], 
        },
        {
            id: 8,
            name: 'Bảng size guide',
            permission: 'product_size_guide_list',
            icon: '',
            active: ['product-sizeguide'],
            path: ['product-sizeguide'], 
        },
        {
            id: 9,
            name: 'Banner',
            permission: 'product_banner_list',
            icon: '',
            active: ['product-banners'],
            path: ['product-banners'], 
        },
        {
            id: 10,
            name: 'Đánh giá',
            permission: 'product_review_list',
            icon: '',
            active: ['product-reviews'],
            path: ['product-reviews'], 
        },
        {
            id: 11,
            name: 'Collection',
            permission: 'product_collection_list',
            icon: '',
            active: ['product-collections'],
            path: ['product-collections'], 
        },
    ]
},{
    id: 4,
    name: 'Mã giảm giá',
    icon: 'icon-percent',
    active: ['coupon'],
    path: ['shops'],
    children: []
},{
    id: 5,
    name: 'Kho hàng',
    icon: 'icon-warehouse',
    active: ['warehouses', 'slots', 'inventories', 'warehouse-histories'],
    path: ['warehouses'],
    children: [
        {
            id: 1,
            name: 'Quản lý kho hàng',
            permission: 'warehouse_list',
            icon: '',
            active: ['warehouses'],
            path: ['warehouses'],
        },
        {
            id: 5,
            name: 'Quản lý khu vực',
            permission: 'warehouse_list',
            icon: '',
            active: ['area'],
            path: ['area'],
        },
        {
            id: 2,
            name: 'Quản lý slot',
            permission: 'warehouse_list',
            icon: '',
            active: ['slots'],
            path: ['slots'],
        },
        {
            id: 3,
            name: 'Quản lý nhập xuất hàng',
            permission: 'warehouse_list',
            icon: '',
            active: ['inventories'],
            path: ['inventories'],
        },
        {
            id: 4,
            name: 'Lịch sử',
            permission: 'warehouse_list',
            icon: '',
            active: ['warehouse-histories'],
            path: ['warehouse-histories'],
        },
    ]
},{
    id: 6,
    name: 'Đơn vị vận chuyển',
    icon: 'icon-ship',
    active: ['store'],
    path: ['shops'],
    children: []
},{
    id: 7,
    name: 'Cấu hình',
    icon: 'icon-setting',
    active: ['setting'],
    path: ['shops'],
    children: []
}]
