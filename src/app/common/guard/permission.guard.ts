import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { AdminMenu } from '../constant/menu.constant';
import { AuthenticationService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AdminPermissionGuard implements CanActivateChild {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {}

    verifyAdminPermission(user: any, path?: string){
        //isAdmin
        if(user.isAdmin) return true;

        //check permission
        let permissions = Object.keys(user?.role?.permissions)
        if(permissions){
            let item = AdminMenu.find((menu, index) => menu.children.find((child) => child.path.includes(path)) )
            if(item){
                let child = item.children.find(item => item.path.includes(path))
                if(child) return permissions.includes(child.permission)
            }
        }
        return false
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue; 

        let rs = this.verifyAdminPermission(currentUser, route.routeConfig?.path)
        if (rs) return rs;

        let path = '/'
        if(currentUser) path = '/admin'
        this.router.navigate([path]);
        return false;
    }
}