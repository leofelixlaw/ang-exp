import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { HttpApiInterceptorModule } from './http-api-interceptor.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
    // HttpApiInterceptorModule
  ],
})
export class SharedModule { }
