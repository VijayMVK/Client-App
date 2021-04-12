import { Component, Input, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { GridModel } from 'src/app/models/grid.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxWheelComponent, TextAlignment, TextOrientation } from 'ngx-wheel'
import { AppconstantsService } from 'src/app/service/appconstants.service';
import { HttpUtilityService } from 'src/app/service/httputility.service';

@Component({
  selector: 'app-wheel-game-detail',
  templateUrl: './wheel-game-detail.component.html',
  styleUrls: ['./wheel-game-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WheelGameDetailComponent implements OnInit {
  @Input('currentOrder') row: {};
  imagePath: any = "./assets/img/noImg_placeholder.jpeg";
  @ViewChild('fileToUpload') fileUploaded?: ElementRef<HTMLElement>;
  File: any;
  @ViewChild(NgxWheelComponent, { static: false }) wheel;

  step = 0;
  public color: string = '#e920e9';
  isMaximize: boolean = false;
  isEdit: boolean = false;
  orderFields: any[] = [
    {
      fieldId: "status",
      label: "Status",
      fieldValue: "",
      type: "select",
      isValid: true,
      errorMesg: "",
      required: true,
      options: AppconstantsService.countryList
    },
    {
      fieldId: "delivery",
      label: "Delivery Men",
      fieldValue: "",
      type: "select",
      isValid: true,
      errorMesg: "",
      required: true,
      options: AppconstantsService.countryList
    }
  ];
  displayedColumns: string[] = ['id', 'button', 'name', 'textColor', 'bgColor', 'image', 'toggle', 'action'];
  dataSource: any[] = [
    { id: '1', name: 'Supplier 1', textColor: '#RRFFE', bgColor: '#FETYYU', image: "https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg", },
    { id: '2', name: 'Supplier 2', textColor: '#FFF', bgColor: '#FFFTTT', image: "https://cultivatedculture.com/wp-content/uploads/2019/12/LinkedIn-Profile-Picture-Example-Madeline-Mann.jpeg", }
  ];;
  sampleData: any[] = [
    {
      user: {
        displayName: "Steven Gonzalez",
        id: "0565898186",
        city: "New York",
        country: "USA",
        email: "abcd@abcd.com",
        address: "E-112, Austin Street, New York, USA",
        isNew: true
      },
      id: 1,
      displayName: "BarCode : 123456789",
      image: "https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg",
      reference: '70d4d7d0',
      uom: 'PCS',
      price: '10.24',
      total: '1',
      qty: 5,
      orderNumber: "40",
      deviceUsed: "Android",
      status: {
        status: 'Processing',
        statusIcon: './assets/img/orderStatus/processing.png',
        type: 'Platinum'
      },
      accountType: 'Credit Card',
      dateCreated: '2018/04/25 02:07:59',
      isHover: false
    },
    {
      user: {
        displayName: "Josephine Goodman",
        id: "0565898186",
        city: "New York",
        country: "USA",
        email: "abcd@abcd.com",
        address: "E-112, Austin Street, New York, USA",
        isNew: true
      },
      id: 2,
      displayName: "BarCode : 123456789",
      image: "https://cultivatedculture.com/wp-content/uploads/2019/12/LinkedIn-Profile-Picture-Example-Madeline-Mann.jpeg",
      reference: '70d4d7d0',
      uom: 'KG',
      price: '24.62',
      total: '1',
      qty: 5,
      orderNumber: "50",
      deviceUsed: "Android",
      status: {
        status: 'Awaiting Payment',
        statusIcon: './assets/img/orderStatus/ready-pickup.png',
        type: 'Gold'
      },
      accountType: 'Credit Card',
      dateCreated: '2018/04/25 02:07:59',
      isHover: false
    },
    {
      user: {
        displayName: "Mario Harmon",
        id: "0565898186",
        city: "New York",
        country: "USA",
        email: "abcd@abcd.com",
        address: "E-112, Austin Street, New York, USA",
        isNew: false
      },
      id: 3,
      displayName: "BarCode : 123456789",
      image: "https://wp.zillowstatic.com/8/Chris-Morrison-97ef0b-300x300.jpg",
      reference: '70d4d7d0',
      uom: 'KG',
      price: '49.29',
      total: '1',
      qty: 5,
      orderNumber: "60",
      deviceUsed: "Android",
      status: {
        status: 'Order In Progress',
        statusIcon: './assets/img/orderStatus/ordered.png',
        type: 'Silver'
      },
      accountType: 'Credit Card',
      dateCreated: '2018/04/25 02:07:59',
      isHover: false
    }
  ];
  OrderDetailsConfig: GridModel = {
    EnableSearch: true,
    tableHeader: 'Order',
    enablePagination: true,
    columns: [] = [
      {
        name: 'ID',
        type: 'string',
        id: 'id'
      },
      {
        name: 'Image',
        type: 'image',
        id: 'image',
        sortable: true
      },
      {
        name: 'Name',
        type: 'string',
        id: 'displayName'
      },
      {
        name: 'Supplier Name',
        type: 'string',
        id: 'supplierName',
        sortable: true
      },
      {
        name: 'Sub Order#',
        type: 'string',
        id: 'orderNumber',
        sortable: true
      },
      {
        name: 'UOM',
        type: 'string',
        id: 'uom',
        sortable: true
      },
      {
        name: 'Quantity',
        type: 'string',
        id: 'qty',
        sortable: true
      },
      {
        name: 'Price',
        type: 'string',
        id: 'price',
        sortable: true
      },
      {
        name: 'Total',
        type: 'string',
        id: 'total',
        sortable: true
      },
      {
        name: 'Status',
        type: 'orderStatus',
        id: 'status',
        sortable: true,
        displayColor: true,
        displayColorId: 'statusColor',
        options: AppconstantsService.orderStatus
      },
    ],
    data: [],
    currentPageSize: 20,
    tableToolbar: false,
    totalRows: 0,
    sortCol: 'CreateAt',
    sortOrder: 1
  };
  popupFlds: any[] = [
    {
      fieldId: "sliceText",
      label: "Slice Text",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: true,
    },
  ]

  seed = [...Array(12).keys()]
  idToLandOn: any;
  items: any[];
  maxItems: any[];
  textOrientation: TextOrientation = TextOrientation.HORIZONTAL
  textAlignment: TextAlignment = TextAlignment.OUTER

  constructor(private http: HttpUtilityService, private modalService: NgbModal) {
    let gridModel = {
      start: 0,
      limit: this.OrderDetailsConfig.currentPageSize,
      sortCol: this.OrderDetailsConfig.sortCol,
      sortOrder: 1,
      searchVal: ''
    };
    this.getDatFromServer(gridModel);
  }

  ngOnInit(): void {
    this.idToLandOn = this.seed[Math.floor(Math.random() * this.seed.length)];
    const colors = ['#FF0000', '#000000']
    this.items = this.seed.map((value) => ({
      fillStyle: colors[value % 2],
      text: `Prize ${value}`,
      id: value,
      textFillStyle: 'white',
      textFontSize: '10'
    }))
    this.maxItems = this.seed.map((value) => ({
      fillStyle: colors[value % 2],
      text: `Prize ${value}`,
      id: value,
      textFillStyle: 'white',
      textFontSize: '20'
    }))
  }

  reset() {
    this.wheel.reset()
  }

  triggerFileClick() {
    if (this.fileUploaded) {
      let el: HTMLElement = this.fileUploaded.nativeElement;
      el.click();
    }
  }

  onFileUploaded(event: any) {
    var file = event.target.files;
    this.File = file[0];
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      if (fileReader.result) {
        this.imagePath = fileReader.result.toString();
      }
    }
    fileReader.readAsDataURL(file[0]);
  }

  uploadFile(fileToUpload: File, fileName) {
    const formData: FormData = new FormData();
    formData.append('Image', fileToUpload, fileToUpload.name);
    // this.httpc.post('api/upload/PostFormData/' + fileName, formData, { reportProgress: true, observe: 'events' })
    //   .subscribe(event => {});
  }

  openModel(clr: any, isEdit: boolean) {
    this.isEdit = isEdit;
    this.modalService.open(clr, { size: 'md', backdrop: 'static', centered: true });
  }

  openWheel(clr: any) {
    this.isMaximize = true;
    this.modalService.open(clr, { size: 'lg', backdrop: 'static', centered: true, windowClass: 'cont' });
  }

  closeModel() {
    this.isEdit = false;
    this.isMaximize = false;
    this.modalService.dismissAll();
  }

  async spin(prize) {
    this.idToLandOn = prize
    await new Promise(resolve => setTimeout(resolve, 0));
    this.wheel.spin()
  }

  setStep(index: number) {
    this.step = index;
  }

  setTableData(data: any, gridModel: any) {
    console.log(data);
    this.OrderDetailsConfig.data = this.sampleData;
    this.OrderDetailsConfig.totalRows = this.sampleData.length;
  }

  getDatFromServer(gridModel: any) {
    this.OrderDetailsConfig.currentPageSize = gridModel.limit;
    this.setTableData(this.sampleData, gridModel);
  }

  getStatusColor(status) {
    switch (status) {
      case 0: return "#879193";
        break;
      case 1: return "#bddf57";
        break;
      case 2: return "#4a6fb3";
        break;
      case 3: return "#fccb05";
        break;
      case 4: return "#000";
        break;
      case 5: return "#7f5f3c";
        break;
      case 6: return "#ff9000";
        break;
      case 7: return "#bddf57";
        break;
      case 8: return "#cd3101";
        break;
      case 9: return "#fccb05";
        break;
      case 10: return "#72cdfa";
        break;
      case 11: return "#e7a0ae";
        break;
      case 12: return "#96f";
        break;
      case 13: return "#fccb05";
        break;
    }
  }

}
