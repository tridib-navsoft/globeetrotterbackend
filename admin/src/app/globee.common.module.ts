import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CookieService, CookieModule } from 'ngx-cookie';
import { MatExpansionModule } from "@angular/material/expansion";
import { MatCardModule } from "@angular/material/card";
import { MatStepperModule } from "@angular/material/stepper";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTabsModule } from "@angular/material/tabs";
import { MatSelectModule } from "@angular/material/select";
import { MatDialogModule } from "@angular/material/dialog";
import { MatRadioModule } from "@angular/material/radio";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatChipsModule } from "@angular/material/chips";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatMenuModule } from "@angular/material/menu";
import { MatListModule } from "@angular/material/list";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from '@angular/material/sort';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ConfirmDialog, AlertDialog } from './global/dialog/confirm-dialog.component';
import { TimeFormatPipe } from './global/pipes/convertFrom24To12Format.pipe';
import { EqualValidator, SafeValidator, passwordValidator, MinValidator, MaxValidator } from './global/directive/equal-validator.directive';
import { AccordianDirective } from './global/directive/accordian.directive';
import { PopupImgDirective, ImageUploadUrlDialog, ImageMetaDataDialog, ImageUploadLibDialog } from './global/directive/popup-image.directive';
import { DialogsService } from './global/dialog/confirm-dialog.service';
import { SafeHtmlPipe } from './global/pipes/safe-html.pipe';
import { MoneyPipe } from './global/pipes/money.pipe';
import { GridComponent, ColumnLayoutComponent } from './global/grid/app.grid-global.component';
import { TableComponent } from './global/table/app.table-global.component'; 
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgSelectModule } from '@ng-select/ng-select';

import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { PopupIconDirective } from './global/directive/popup-icon.directive';
import { ImageCropDirective } from './global/directive/image-crop.directive';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    CookieModule.forRoot(),
    MatExpansionModule,
    MatCardModule,
    MatStepperModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatTooltipModule,
    MatTabsModule,
    MatSelectModule,
    MatDialogModule,
    MatRadioModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatListModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonToggleModule,
    NgxSkeletonLoaderModule,
    DragDropModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    NgSelectModule,
    ImageCropperModule
  ],
  declarations: [
    EqualValidator,
    SafeValidator,
    passwordValidator,
    MinValidator,
    MaxValidator,
    ConfirmDialog,
    AlertDialog,
    SafeHtmlPipe,
    TimeFormatPipe,
    AccordianDirective,
    /* GridComponent,
       ColumnLayoutComponent, */
    PopupImgDirective,
    PopupImgDirective,
    ImageUploadUrlDialog,
    ImageMetaDataDialog,
    ImageUploadLibDialog,
    MoneyPipe,
    GridComponent,
    ColumnLayoutComponent,
    TableComponent,
    PopupIconDirective,
    ImageCropDirective
  ],
  exports: [
    SafeHtmlPipe,
    NgxSkeletonLoaderModule,
    FormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule,
    MatStepperModule,
    MatCardModule,
    MatExpansionModule,
    MatTooltipModule,
    MatTabsModule,
    MatSelectModule,
    MatTooltipModule,
    MatTabsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatListModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonToggleModule,
    AccordianDirective,
    //GridComponent,
    PopupImgDirective,
    ImageUploadUrlDialog,
    ImageMetaDataDialog,
    ImageUploadLibDialog,
    DragDropModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    RouterModule,
    NgSelectModule,
    MoneyPipe,
    GridComponent, 
    ColumnLayoutComponent,
    TableComponent,
    ImageCropDirective
  ],
  providers: [
    DialogsService, CookieService,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: 'fill'
    }
  ],
  entryComponents: [
    PopupImgDirective,
    ImageUploadUrlDialog,
    ImageMetaDataDialog,
    ImageUploadLibDialog,
    ConfirmDialog,
    AlertDialog,
    /*     ColumnLayoutComponent, */
    PopupIconDirective,
    ImageCropDirective



  ]
})
export class GlobeeCommonModule { }