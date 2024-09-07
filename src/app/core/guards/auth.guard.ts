import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router)
  const _platForm_ID = inject(PLATFORM_ID)

if(isPlatformBrowser(_platForm_ID)){
  //* if user logged in
  if (localStorage.getItem('eToken')) return true;

  //* if user logged out 
  else {
    
    _router.navigate(["/login"])
    
    
    return false;}
}
else{
  return true
}
};
